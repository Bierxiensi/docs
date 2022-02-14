---
title: 【axios 源码】- node适配器 http 研读解析【上】
search: true
date: 2022-02-08 20:05:23
tags: [axios, http, node]
photos:
description:
comments:
---

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


- 包含前文中的工具函数 [`utils`](./Utils.md)、实例化配置函数 [`defaults`](./Default.md) 、取消请求模块 [`Cancel`](./Cancel.md) 以及部分核心函数[core](./Core.md)和[helper](./Helper.md)函数，另外还引入了一些三方包如 `http`、`https`、`url`、`zlib`

- 包含 两个 `function` - `setProxy` 和 `httpAdapter` 共388行代码，其中 `httpAdapter` 是被导出的函数实例，由于篇幅过长，文章将分成上下两个部分，该文是上半篇，主要讲述http/https请求被创建前的准备工作

## 2. 正文分析

在 node 环境中，Axios 封装的是 http 库，`httpAdapter` 的工作流程大致如下所示：

1\. 配置请求头信息
2\. 请求参数信息格式化处理
3\. 解析 URL 并选择与之对应的请求协议
4\. 创建请求
5\. 添加 `error` 、`timeout` 以及针对 `stream` 流的 `data`、`end`、`aborted` 等响应事件
6\. 发送请求

接下来我们按照上述流程分步骤研读前三个部分

### 【2.1】`setProxy` 函数
```js
/**
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic 格式的 proxy 身份凭证
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // 如果使用了代理，那么任何重定向都必须要经过这个代理
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}
```
- 见名知意，`axios` 内部定义的 `proxy` 设定函数，将根据用户的`proxy`配置设定请求头中的`host`信息并根据用户名和密码生成 `proxy` 身份凭证
- `Proxy-Authorization` 是一个请求首部，其中包含了用户代理提供给代理服务器的用于身份验证的凭证

Tips:  `Basic Authorization` 认证的核心是每次请求是都必须使用该用户的 `username` 和 `password`，优点和缺点都很明显，很方便调试和控制但不安全，那么问题来了，`axios` 为啥使用 `Basic Authorization`而不选择 `OAuth`、`Token` 或者 `JWT` 认证方式呢？

### 【2.2】判断请求是否被取消从而移除 `Cancel` 模块的订阅者信息
```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolvePromise, rejectPromise) {
    ...

    var onCanceled;
    function done() {
        if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
        }

        if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
        }
    }
    var resolve = function resolve(value) {
        done();
        resolvePromise(value);
    };
    var rejected = false;
    var reject = function reject(value) {
        done();
        rejected = true;
        rejectPromise(value);
    };

    ...
  }
}
```
- 在适当的时机调用 `done` 函数，若 `cancelToken` 已被实例化，则调用原型方法 `unsubscribe` 通知订阅者表示请求已被取消
- `Axios` 也支持通过实例化 `AbortController` 方式去取消一个 `fetch API` 请求，在这里 `config.signal` 应为 `new AbortController().signal`，可以参见[Axios-README](https://github1s.com/axios/axios/blob/HEAD/README.md)

Tips：`...`是对上下文代码段的省略，两段`...`之间为待分析代码段，后文不再赘述


### 【2.3】请求头信息配置
```js
module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...
       
        var headers = config.headers;
        var headerNames = {};

        Object.keys(headers).forEach(function storeLowerName(name) {
            headerNames[name.toLowerCase()] = name;
        });

        // Set User-Agent (required by some servers)
        // See https://github.com/axios/axios/issues/69
        if ("user-agent" in headerNames) {
            // User-Agent is specified; handle case where no UA header is desired
            if (!headers[headerNames["user-agent"]]) {
                delete headers[headerNames["user-agent"]];
            }
            // Otherwise, use specified value
        } else {
            // Only set header if it hasn't been set in config
            headers["User-Agent"] = "axios/" + VERSION;
        }

        ...
    });
};
```
- 主要是将`headerNames`做小写处理，并且针对`user-agent`做一下配置，若用户开启了`user-agent`，则使用用户的`user-agent`，否则使用`axios`默认的配置`axios/${version}`

Tips：`User-Agent` 会告诉网站服务器，访问者是通过什么工具来请求的，为了防止网络攻击或者维护商业信息，很多网站会设定一些比如反爬虫措施拒绝非浏览器请求，因此一般只有用户在使用非标准浏览器环境发请求，比如爬虫，才会自定义配置 ``User-Agent`
Tips：一个chrome浏览器请求头的 `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36`与一个使用 `request` 库的爬虫请求头 `User-Agent: python-request/2.11.1`

### 【2.4】请求参数信息格式化处理
```js
module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...
       
        var data = config.data;
      
        if (data && !utils.isStream(data)) {
            if (Buffer.isBuffer(data)) {
                // Nothing to do...
            } else if (utils.isArrayBuffer(data)) {
                data = Buffer.from(new Uint8Array(data));
            } else if (utils.isString(data)) {
                data = Buffer.from(data, "utf-8");
            } else {
                return reject(
                    createError(
                        "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
                        config
                    )
                );
            }

            // Add Content-Length header if data exists
            if (!headerNames["content-length"]) {
                headers["Content-Length"] = data.length;
            }
        }

        ...
    });
};
```

Tips：JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
Tips：在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用 Buffer.from() 接口去创建Buffer对象。




### 【2.5】`auth、url` 信息处理
```js
module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...
       

        // HTTP basic authentication
        var auth = undefined;
        if (config.auth) {
            var username = config.auth.username || "";
            var password = config.auth.password || "";
            auth = username + ":" + password;
        }

        // Parse url
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";

        if (!auth && parsed.auth) {
            var urlAuth = parsed.auth.split(":");
            var urlUsername = urlAuth[0] || "";
            var urlPassword = urlAuth[1] || "";
            auth = urlUsername + ":" + urlPassword;
        }

        if (auth && headerNames.authorization) {
            delete headers[headerNames.authorization];
        }

        ...
    });
};
```

- 如果配置了 `username` 和 `password` 直接拼接生成 `auth` 否则从 `url` 获取 `urlUsername` 和 `urlPassword` 生成 `auth`


### 【2.6】请求 `options` 信息配置
```js
var isHttps = /https:?/;

module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...
       

        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

        var options = {
            path: buildURL(
                parsed.path,
                config.params,
                config.paramsSerializer
            ).replace(/^\?/, ""),
            method: config.method.toUpperCase(),
            headers: headers,
            agent: agent,
            agents: { http: config.httpAgent, https: config.httpsAgent },
            auth: auth,
        };

        if (config.socketPath) {
            options.socketPath = config.socketPath;
        } else {
            options.hostname = parsed.hostname;
            options.port = parsed.port;
        }

        ...
    });
};
```
- 使用用户定义的 `config` 配置请求 `options`，使用正则表达式 `isHttps` 判断当前 `URL` 使用 `http` 还是 `https`协议


### 【2.7】`proxy` 信息配置
```js
module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...     

        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
            var proxyEnv = protocol.slice(0, -1) + "_proxy";
            var proxyUrl =
                process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
            if (proxyUrl) {
                var parsedProxyUrl = url.parse(proxyUrl);
                var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
                var shouldProxy = true;

                if (noProxyEnv) {
                    var noProxy = noProxyEnv.split(",").map(function trim(s) {
                        return s.trim();
                    });

                    shouldProxy = !noProxy.some(function proxyMatch(
                        proxyElement
                    ) {
                        if (!proxyElement) {
                            return false;
                        }
                        if (proxyElement === "*") {
                            return true;
                        }
                        if (
                            proxyElement[0] === "." &&
                            parsed.hostname.substr(
                                parsed.hostname.length - proxyElement.length
                            ) === proxyElement
                        ) {
                            return true;
                        }

                        return parsed.hostname === proxyElement;
                    });
                }

                if (shouldProxy) {
                    proxy = {
                        host: parsedProxyUrl.hostname,
                        port: parsedProxyUrl.port,
                        protocol: parsedProxyUrl.protocol,
                    };

                    if (parsedProxyUrl.auth) {
                        var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                        proxy.auth = {
                            username: proxyUrlAuth[0],
                            password: proxyUrlAuth[1],
                        };
                    }
                }
            }
        }

        if (proxy) {
            options.headers.host =
                parsed.hostname + (parsed.port ? ":" + parsed.port : "");
            setProxy(
                options,
                proxy,
                protocol +
                    "//" +
                    parsed.hostname +
                    (parsed.port ? ":" + parsed.port : "") +
                    options.path
            );
        }

    });
};
```
- 

### 【2.8】设置传输协议
```js
module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...     

        var transport;
        var isHttpsProxy =
            isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
            transport = config.transport;
        } else if (config.maxRedirects === 0) {
            transport = isHttpsProxy ? https : http;
        } else {
            if (config.maxRedirects) {
                options.maxRedirects = config.maxRedirects;
            }
            transport = isHttpsProxy ? httpsFollow : httpFollow;
        }

    });
};
```

- 设定传输协议 `transport`，使用正则表达式 `isHttps` 判断当前 `URL` 使用 `http` 还是 `https`协议

### 【2.9】设置 `Body` 最大传输长度
```js
module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...     

        if (config.maxBodyLength > -1) {
            options.maxBodyLength = config.maxBodyLength;
        }


    });
};
```

### 【2.10】设置 `insecureHTTPParser`
```js
module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(
        resolvePromise,
        rejectPromise
    ) {
        ...     

        if (config.insecureHTTPParser) {
            options.insecureHTTPParser = config.insecureHTTPParser;
        }

    });
};
```
Tips：使用接受无效 HTTP 标头的不安全 HTTP 解析器。 这可能允许与不一致的 HTTP 实现的互操作性。 它还可能允许请求走私和其他依赖于接受无效标头的 HTTP 攻击。 避免使用此选项。

# 三、参考

1\. `林景宜`的文章[林景宜的记事本 - Axios 源码解析（三）：适配器](https://linjingyi.cn/posts/dcd029a9.html)
