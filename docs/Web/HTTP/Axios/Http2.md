---
title: 【axios 源码】- node适配器 http 研读解析【下】
search: true
date: 2022-02-12 19:05:23
tags: [axios, http, node]
photos:
description:
comments:
---

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.


# 一、环境准备

-   `axios` 版本 `v0.24.0`
-   通过 `github1s` 网页可以 [查看](https://github1s.com/axios/axios/blob/HEAD/lib/adapter/http.js) axios 源码
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
"use strict";

var utils = require("./../utils");
var settle = require("./../core/settle");
var buildFullPath = require("../core/buildFullPath");
var buildURL = require("./../helpers/buildURL");
var http = require("http");
var https = require("https");
var httpFollow = require("follow-redirects").http;
var httpsFollow = require("follow-redirects").https;
var url = require("url");
var zlib = require("zlib");
var VERSION = require("./../env/data").version;
var createError = require("../core/createError");
var enhanceError = require("../core/enhanceError");
var defaults = require("../defaults");
var Cancel = require("../cancel/Cancel");
```


- 包含前文中的工具函数 [`utils`](./Utils.md)、实例化配置函数 [`defaults`](./Default.md) 、取消请求模块 [`Cancel`](./Cancel.md) 以及部分核心函数 [core](./Core.md) 和 [helper](./Helper.md) 函数，另外还引入了一些三方包如 `http`、`https`、`url`、`zlib`

- 包含 两个 `function` - `setProxy` 和 `httpAdapter` 共388行代码，其中 `httpAdapter` 是被导出的函数实例，由于篇幅过长，文章将分成上下两个部分，该文是下半篇，主要讲述http/https请求被创建前的准备工作

## 2. 正文分析

在 node 环境中，Axios 封装的是 http 库，`httpAdapter` 的工作流程大致如下所示：

1\. 配置请求头信息

2\. 请求参数信息格式化处理

3\. 解析 URL 并选择与之对应的请求协议

4\. 创建请求

5\. 添加 `error` 、`timeout` 以及针对 `stream` 流的 `data`、`end`、`aborted` 等响应事件

6\. 发送请求

接下来我们按照上述流程分步骤研读后三个部分

### 【2.1】创建请求
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolvePromise, rejectPromise) {
    ...

    var req = transport.request(options, function handleResponse(res) {
        
        ...
        
    })
    
    ...
  })
}     
```

- `transport` 是前文中设定好的传输协议，根据正则表达式判断当前 `URL` 使用 `http` 还是 `https`协议
- `options` 是前文中根据用户定义的 `config` 配置设定好的配置项


Tips：`...` 是对上下文代码段的省略，两段 `...` 之间为待分析代码段，后文不再赘述

### 【2.2】根据 `http(s)` 请求返回内容创建返回信息

```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolvePromise, rejectPromise) {
    ...

    var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // 在需要的情况下，自动解压响应体
        var stream = res;

        // 如果重定向，则返回最后一次请求的信息
        var lastRequest = res.req || req;

        // 如果HEAD请求没有内容且配置了禁止解压项则不被解压
        if (
            res.statusCode !== 204 &&
            lastRequest.method !== "HEAD" &&
            config.decompress !== false
        ) {
            switch (res.headers["content-encoding"]) {
                case "gzip":
                case "compress":
                case "deflate":
                    // 将解压程序添加到stream管道中
                    stream = stream.pipe(zlib.createUnzip());

                    // remove the content-encoding in order to not confuse downstream operations
                    delete res.headers["content-encoding"];
                    break;
            }
        }

        var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config: config,
            request: lastRequest,
        };

        ...
    })
    
    ...
  })
}     
```

- `Content-Encoding` 是一个实体消息首部，用于对特定媒体类型的数据进行压缩。这个消息首部用来告知客户端应该怎样解码才能获取在 Content-Type 中标示的媒体类型内容。
- 此处的 `res` 属于 `Stream` 的消费接口，为 `Readable Stream`

Tips：本质上来说，编码就是对数据的读取，处理最后返回结果，数据在一个程序又一个程序中不断传递。理想情况下，数据的传递应该是不停滞的，但是现实情况中因为诸如单个数据过大，内存较小，`IO` 处理较慢等客观原因使数据不能流畅的流动起来。这时我们就需要一种方法去将数据拆分成一小块一小块的数据 `chunks` ，流水一样的读取处理写入。这种方法便是流 `stream`

### 【2.3】针对 `stream` 流的 `data`、`end`、`aborted` 等响应事件处理
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolvePromise, rejectPromise) {
    ...

    var req = transport.request(options, function handleResponse(res) {
        
        ...

        if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
        } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
                responseBuffer.push(chunk);
                totalResponseBytes += chunk.length;

                // 确保内容长度不超过指定的最大长度
                if (
                    config.maxContentLength > -1 &&
                    totalResponseBytes > config.maxContentLength
                ) {
                    // stream.destoy() emit aborted event before calling reject() on Node.js v16
                    rejected = true;
                    stream.destroy();
                    reject(
                        createError(
                            "maxContentLength size of " +
                                config.maxContentLength +
                                " exceeded",
                            config,
                            null,
                            lastRequest
                        )
                    );
                }
            });

            stream.on("aborted", function handlerStreamAborted() {
                if (rejected) {
                    return;
                }
                stream.destroy();
                reject(
                    createError(
                        "error request aborted",
                        config,
                        "ERR_REQUEST_ABORTED",
                        lastRequest
                    )
                );
            });

            stream.on("error", function handleStreamError(err) {
                if (req.aborted) return;
                reject(enhanceError(err, config, null, lastRequest));
            });

            stream.on("end", function handleStreamEnd() {
                var responseData = Buffer.concat(responseBuffer);
                if (config.responseType !== "arraybuffer") {
                    responseData = responseData.toString(
                        config.responseEncoding
                    );
                    if (
                        !config.responseEncoding ||
                        config.responseEncoding === "utf8"
                    ) {
                        responseData = utils.stripBOM(responseData);
                    }
                }

                response.data = responseData;
                settle(resolve, reject, response);
            });
        }        
    })
    
    ...
  })
}     
```
- 每当流将数据块的所有权移交给消费者时，则会触发 `data` 事件
- 当流中没有更多数据可供消费时，则会触发 `end` 事件，如果返回类型是非 `arraybuffer` 类型，需要使用工具方法 `stripBOM` 根据编码类型做字节顺序标记删除处理
- `error` 事件可以随时由 `Readable` 的实现触发。 通常，如果底层流由于底层内部故障而无法生成数据，或者当流实现尝试推送无效数据块时，可能会发生这种情况
- 返回在触发 `end` 之前流是被破销毁或出错会触发 `aborted` 事件
- 关于 `stream` 的更多内容可以查看 [`Node.js` - stream流](http://nodejs.cn/api/stream.html)

Tips： 字节顺序标记 `（byte-order mark，BOM）` 是位于码点 `U+FEFF` 的统一码字符的名称。当以 `UTF-16` 或 `UTF-32` 来将 `UCS` 统一码字符所组成的字符串编码时，这个字符被用来标示其字节序，更多内容可以参考[`MDN` - TextDecoder](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder)

### 【2.4】添加 `error` 、`timeout` 等响应事件
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolvePromise, rejectPromise) {
    ...

    var req = transport.request(options, function handleResponse(res) {
        
        ...

        // 处理c错误
        req.on("error", function handleRequestError(err) {
            if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS") return;
            reject(enhanceError(err, config, null, req));
        });

        // 处理超时请求
        if (config.timeout) {
            //  如果`req`接口无法处理其他类型，将强制用一个整数的超时时间
            var timeout = parseInt(config.timeout, 10);

            if (isNaN(timeout)) {
                reject(
                    createError(
                        "error trying to parse `config.timeout` to int",
                        config,
                        "ERR_PARSE_TIMEOUT",
                        req
                    )
                );

                return;
            }

            // 有时响应将非常缓慢，甚至没有响应，连接事件将被事件循环系统打断
            // 此时触发定时器回调，在连接前将调用abort()，然后获取"socket hang up" 和ECONNRESET码
            // 此时，如果出现大量的请求，nodejs会在幕后挂起一些socket。并且数目会不断增长
            // 然后这些挂起的socket将一点点占用 CPU
            // ClientRequest.setTimeout 将在指定毫秒内启动，并且可以确保连接之后触发abort()
            req.setTimeout(timeout, function handleRequestTimeout() {
                req.abort();
                var transitional = config.transitional || defaults.transitional;
                reject(
                    createError(
                        "timeout of " + timeout + "ms exceeded",
                        config,
                        transitional.clarifyTimeoutError
                            ? "ETIMEDOUT"
                            : "ECONNABORTED",
                        req
                    )
                );
            });
        }
    })
    
    ...
  })
}    
```

### 【2.5】通过调用 `request.abort()` 实现取消功能

```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolvePromise, rejectPromise) {
    ...

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
        
        ...

        if (config.cancelToken || config.signal) {
            onCanceled = function (cancel) {
                if (req.aborted) return;

                req.abort();
                reject(
                    !cancel || (cancel && cancel.type)
                        ? new Cancel("canceled")
                        : cancel
                );
            };

            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted
                    ? onCanceled()
                    : config.signal.addEventListener("abort", onCanceled);
            }
        }
    })
    
    ...
  })
}    
```

- 手动处理取消
- `Axios` 也支持通过实例化 `AbortController` 方式去取消一个 `fetch API` 请求，在这里 `config.signal` 应为 `new AbortController().signal`，可以参见 [Axios-README](https://github1s.com/axios/axios/blob/HEAD/README.md)

### 【2.6】发送请求

```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolvePromise, rejectPromise) {
    ...

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
        
        ...

        // Send the request
        if (utils.isStream(data)) {
            data.on("error", function handleStreamError(err) {
                reject(enhanceError(err, config, null, req));
            }).pipe(req);
        } else {
            req.end(data);
        }
    })
            
    ...
  })
}    
```

- 通过工具函数 `isStream` 监测 `data` 是否是流格式，通过 `.pipe` 接口可以将其数据传递给一个 `writable` 即 `req` 否则直返回
- 关于 streams 流更多的概念参考 [`MDN` - Streams API](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API)

# 三、参考

1\. `vajoy` 的文章 [gulp源码解析（一）—— Stream详解](https://www.cnblogs.com/vajoy/p/6349817.html)

2\. `林景宜` 的文章 [林景宜的记事本 - Axios 源码解析（三）：适配器](https://linjingyi.cn/posts/dcd029a9.html)

3\. [`MDN` - Streams API](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API)

4\. [`Node.js` - stream流](http://nodejs.cn/api/stream.html)