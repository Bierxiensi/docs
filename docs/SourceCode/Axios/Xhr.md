---
title: 【axios 源码】- 浏览器端适配器 xhr 研读解析
search: true
date: 2022-02-08 20:05:23
tags: [axios, xhr]
photos:
description:
comments:
---

# 一、环境准备

-   `axios` 版本 `v0.24.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/axios/axios/blob/HEAD/lib/adapter/xhr.js) axios 源码
-   调试需要 `clone` 到本地

```shell
git clone https://github.com/axios/axios.git

cd axios

npm start

http://localhost:3000/
```

# 二、函数研读

## 1. 辅助函数总览

```js
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
var defaults = require('../defaults');
var Cancel = require('../cancel/Cancel');
```


包含前文中的工具函数 [`utils`](./Utils.md)、实例化配置函数 [`defaults`](./Default.md) 、取消请求模块 [`Cancel`](./Cancel.md) 以及部分核心函数[core](./Core.md)和[helper](./Helper.md)函数

## 2. 正文分析 

在浏览器环境中，Axios 直接封装 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)，具体封装细节和各种边界细节情况都做了特殊处理，流程大致如下所示：

1\. 判断请求是否被取消从而移除 `Cancel` 模块的订阅者信息
2\. 新建 `XHR` 对象
3\. `requestHeader` 处理
4\. 设置 `xhr.open` 的请求方式
5\. 处理 `onload` 事件或使用 `onreadystatechange` 模拟 `onload` 事件
6\. 添加 `onabort`、`onerror`、`ontimeout` 事件
7\. `xsrf` 请求配置
8\. 添加 `withCredentials`、`responseType`
9\. 监听 `Progress` 处理上传或下载动作
10\. 通过调用 `request.abort()` 实现取消功能
11\. 发送请求

接下来我们按照上述流程分步骤研读

### 【2.1】判断请求是否被取消从而移除 `Cancel` 模块的订阅者信息
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    function done() {
        if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
        }

        if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
        }
    }

    ...
  }
}
```
- 在适当的时机调用 `done` 函数，若 `cancelToken` 已被实例化，则调用原型方法 `unsubscribe` 通知订阅者表示请求已被取消
- `Axios` 也支持通过实例化 `AbortController` 方式去取消一个 `fetch API` 请求，在这里 `config.signal` 应为 `new AbortController().signal`，可以参见[Axios-README](https://github1s.com/axios/axios/blob/HEAD/README.md)

Tips：`...`是对上下文代码段的省略，两段`...`之间为待分析代码段

### 【2.2】新建 `XHR` 对象  
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    var request = new XMLHttpRequest();  

    ...
  }
}
```
-  新建 `XHR` 对象


### 【2.3】`requestHeader` 处理 
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // 拿到headers
    var requestHeaders = config.headers;
    ...

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // 删掉content-type，让浏览器来设置
    }

    // HTTP basic 认证
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password
        ? unescape(encodeURIComponent(config.auth.password))
        : '';
      // 编码base64字符串，构造出一个Authorization
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    // 给request添加headers
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (
          typeof requestData === 'undefined' &&
          key.toLowerCase() === 'content-type'
        ) {
          // 如果data是undefined，则移除Content-Type
          delete requestHeaders[key];
        } else {
          // 否则把header添加给request
          request.setRequestHeader(key, val);
        }
      });
    }
    
    ...
    }
}
```
-  `request` 来自上文创建的 `XHR` 对象

### 【2.4】设置 `xhr.open` 的请求方式
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    var fullPath = buildFullPath(config.baseURL, config.url); // 构造全路径
    
    request.open(
      config.method.toUpperCase(),
      buildURL(fullPath, config.params, config.paramsSerializer),
      true
    ); // 打开请求，request来自上文创建的XHR对象

    ...
  }
}
```

-  `request` 来自上文创建的 `XHR` 对象
-  建立请求 `API` 参见[MDN-XMLHttpRequest.open()语法](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)
   - xhrReq.open(method, url);
   - xhrReq.open(method, url, async);
   - xhrReq.open(method, url, async, user);
   - xhrReq.open(method, url, async, user, password);
- method要使用的 `HTTP` 方法，比如`「GET」`、`「POST」`、`「PUT」`、`「DELETE」`等，默认大写
- 适配器默认使用异步方式建立请求，事件监听器可以监听到已完成事务的通知


### 【2.5】处理 `onload` 事件或使用 `onreadystatechange` 模拟 `onload` 事件

```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    function onloadend() {
      if (!request) {
        return;
      }
      // 响应头处理
      var responseHeaders =
        'getAllResponseHeaders' in request
          ? parseHeaders(request.getAllResponseHeaders())
          : null;
      // 响应内容处理
      var responseData =
        !responseType || responseType === 'text' || responseType === 'json'
          ? request.responseText
          : request.response;
      // 构造response
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request,
      };

      // 调用settle方法来处理promise，在resolve后通过调用done判断是否有取消动作并做相关处理
       settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // 清空request
      request = null;
    }

    // 如果request上有onloadend属性，则直接替换
    if ('onloadend' in request) {
      request.onloadend = onloadend;
    } else {
      // 否则就用onreadystatechange来模拟onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // 请求出错，没有得到响应将由 onerror 处理
        // 但只有一个例外：请求使用 file:协议，此时即使它是一个成功的请求，大多数浏览器也将返回状态为 0
        if (
          request.status === 0 &&
          !(request.responseURL && request.responseURL.indexOf('file:') === 0)
        ) {
          return;
        }
        // readystate 处理器在 onerror 或 ontimeout处理器之前调用， 因此应该在next 'tick' 上调用onloadend
        setTimeout(onloadend);
      };
    }

    ...
  }
}
```
### 【2.6】添加 `onabort`、`onerror`、`ontimeout` 事件  
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    // 处理浏览器对request的取消(与手动取消不同)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // 清空request
      request = null;
    };

    // 处理更低级别的网络错误
    request.onerror = function handleError() {
      // 真正的错误被浏览器掩盖了
      // onerror应当只可被网络错误触发
      reject(createError('Network Error', config, null, request));

      // 清空request
      request = null;
    };

    // 处理超时
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(
        createError(
          timeoutErrorMessage,
          config,
          config.transitional && config.transitional.clarifyTimeoutError
            ? 'ETIMEDOUT'
            : 'ECONNABORTED',
          request
        )
      );

      // 清空request
      request = null;
    };

    ...
  }
}
```
### 【2.7】xsrf请求配置
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    // 添加 xsrf 头
    // 只能在浏览器环境中生效，在工作者线程或者RN中不生效
    if (utils.isStandardBrowserEnv()) {
      // 添加 xsrf 头
      var xsrfValue =
        (config.withCredentials || isURLSameOrigin(fullPath)) &&
        config.xsrfCookieName
          ? cookies.read(config.xsrfCookieName)
          : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    ...
  }
}

```
- 客户端支持防范 `XSRF`

### 【2.8】添加 `withCredentials`、`responseType`
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    // 添加withCredentials
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // 添加 responseType
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    ...
  }
}
```
- `withCredentials` 属性是一个Boolean类型，它指示了是否该使用类似`cookies`，`authorization headers`(头部授权)或者`TLS`客户端证书这一类资格证书来创建一个跨站点访问控制`（cross-site Access-Control）`请求，详情可参见[MDN-withCredentials](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials)


### 【2.9】监听 `Progress` 处理上传或下载动作
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    // 处理progess
    if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
    }

    // 不是所有的浏览器都支持上传事件
    if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
    }

    ...
  }
}

```
### 【2.10】通过调用 `request.abort()` 实现取消功能
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    // 处理手动取消
    if (config.cancelToken || config.signal) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // 清空request
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      });
    }

    ...
  }
}

```

### 【2.11】发送请求
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...

    
    if (!requestData) {
      requestData = null;
    }

    // 发送请求
    request.send(requestData);

    ...
  }
}

```


# 三、参考

1\. `林景宜`的文章[林景宜的记事本 - Axios源码解析（三）：适配器](https://linjingyi.cn/posts/dcd029a9.html)

2\. `仙凌阁`的文章[详细 Axios 源码解读](https://blog.csdn.net/qq_39221436/article/details/120652086)

3\. `若川`的文章[学习 axios 源码整体架构，打造属于自己的请求库](https://juejin.cn/post/6844904019987529735#heading-26)
