---
title: 【axios源码】- 请求分发函数DispatchRequest研读解析
search: true

date: 2022-01-25 14:05:23
tags: [axios, DispatchRequest]
photos:
description:
comments:
---

> 用来调用 `http` 请求`适配器`方法发送请求

# 一、环境准备

-   `axios` 版本 `v0.24.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/axios/axios/blob/HEAD/lib/core/dispatchRequest.js) axios 源码
-   调试需要 `clone` 到本地

```shell
git clone https://github.com/axios/axios.git

cd axios

npm start

http://localhost:3000/
```

# 二、函数研读

## 1. 辅助函数总览

> `requestDispatch` 引用了取消请求`Cancel`模块、实例化配置模块`defaults`、工具函数`utils`与日期转换函数`transformData`，其中前三个部分已经在前文中分析过了，这里不再赘述。

```js
"use strict";

var utils = require("./../utils");
var transformData = require("./transformData");
var isCancel = require("../cancel/isCancel");
var defaults = require("../defaults");
var Cancel = require("../cancel/Cancel");
```

## 2. 辅助函数 `transformData`

> Transform the data for a request or a response
> 将请求或返回结果中的 `Data`

```js
"use strict";

var utils = require("./../utils");
var defaults = require("./../defaults");

/**
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
    var context = this || defaults;
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
    });

    return data;
};

===》调用
// Transform request data
config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
);

===》default.js

 transformResponse: [
    function transformResponse(data) {
        ...
        if (
            strictJSONParsing ||
            (forcedJSONParsing && utils.isString(data) && data.length)
        ) {
            try {
                return JSON.parse(data);
            } catch (e) {
                ...
            }
        }
        return data;
    },
],
```

-   声明全局变量`context`从当前上下文`this`或者实例`defaults`获取全局上下文
-   调用`utils`中的`forEach`，`fns`中的每一个函数`fn`都会被触发执行其内部逻辑，每个`fn`的入参都是`data`和`headers`
-   从上下文看其实就是用`JSON.parse()`处理了一下，`headers`就没使用到

Tips：这一块需要结合上下文一起看，否则从命名和功能分析上看知道是个处理日期的工具函数，但是具体的处理逻辑是什么？执行到哪里才会处理？就不清楚了，这也是读源码比较费劲的地方，所以一定要联系上下文。

## 3. 内部函数 `throwIfCancellationRequested`

> Throws a `Cancel` if cancellation has been requested.
> 如果取消请求的行为已经执行，则抛出一个 Cancel 对象

```js
function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
    }
}
```

-   第一个判断`cancelToken`是否被实例化，如果是就执行实例的`throwIfRequested`方法，通过[上一篇文章](./Cancel.md)我们知道`cancelToken`就是一个发布订阅函数，一旦被实例化会立即执行内部的订阅者事件`cancel`，如果是首次取消会通过`resolvePromise`返回一个 `Cancel`实例
-   第二个判断是针对[`fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API#aborting_a_fetch)做的支持，这一点还没有再文档中体现，但可以在[axios-README-line740](https://github1s.com/axios/axios/blob/HEAD/README.md)看到使用示例

## 4. 分发函数 `dispatchRequest`

> Dispatch a request to the server using the configured adapter.
> 用已经配置好的适配器向服务器发送请求

```js
/**
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
    );

    // Flatten headers
    config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
    );

    utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
            delete config.headers[method];
        }
    );

    var adapter = config.adapter || defaults.adapter;

    return adapter(config).then(
        function onAdapterResolution(response) {
            throwIfCancellationRequested(config);

            // Transform response data
            response.data = transformData.call(
                config,
                response.data,
                response.headers,
                config.transformResponse
            );

            return response;
        },
        function onAdapterRejection(reason) {
            if (!isCancel(reason)) {
                throwIfCancellationRequested(config);

                // Transform response data
                if (reason && reason.response) {
                    reason.response.data = transformData.call(
                        config,
                        reason.response.data,
                        reason.response.headers,
                        config.transformResponse
                    );
                }
            }

            return Promise.reject(reason);
        }
    );
};
```

-   调用`throwIfCancellationRequested`，如果用户主动取消请求会直接 `resolve` 或者 `reject`，不在执行后续逻辑
-   调用`transformData`转换请求头中的日期格式，`.call`传递当前上下文`config`
-   调用`utils`中的`merge`函数将`headers对象`信息便平化处理(可以用 ES6 中数组的 `flat`方法理解)
-   调用`utils`中的`forEach`函数，每次遍历给定数组元素都会触发`cleanHeaderConfig`方法，该方法会删除多余的被合并过的`headers`配置
-   定义全局`adapter`接受当前实例的适配器
-   返回适配器执行结果，由于适配器内发送异步请求，需要在链式调用`.then()`中拿到返回值，并且在这个过程中需要对 `resolved`或`reject`值做一些处理，处理逻辑分别在`onAdapterResolution`和`onAdapterRejection`中
-   在`onAdapterResolution`和`onAdapterRejection`中均调用了`throwIfCancellationRequested`，用于检测用户是否在此时触发了取消请求的动作。那么有问题了-请求都已经发过了，甚至结果都返回了还再做这些干啥呢？答，为了不再执行后续的逻辑，可以提升性能。

Tips：关于数组的扁平化可以参考[阮一峰老师的-es6 入门](https://es6.ruanyifeng.com/?search=flat&x=0&y=0#docs/array#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9Aflat%EF%BC%8CflatMap)

Tips: 不用过多的纠结适配器的概念，后面的文章会深入分析`[Browser、node]`的适配器

# 三、参考

1\. `仙凌阁`的文章[详细 Axios 源码解读](https://blog.csdn.net/qq_39221436/article/details/120652086)

2\. `林景宜`的文章[林景宜的记事本 - Axios 源码解析（五）：核心工具方法](https://linjingyi.cn/posts/f3c7b914.html#more)

3\. `若川`的文章[学习 axios 源码整体架构，打造属于自己的请求库](https://juejin.cn/post/6844904019987529735#heading-26)

4\. `杰凌`的文章[深入解读 axios 源码](https://zhuanlan.zhihu.com/p/376289400)
