---
title: 【axios 源码】- 适配器中的核心函数 core 研读解析
search: true
date: 2022-01-26 14:05:23
tags: [axios, core]
photos:
description:
comments:
---

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

## 1. 辅助函数 helper 总览

### 浏览器适配器 xhr

```js
var utils = require("./../utils");
var settle = require("./../core/settle");
var cookies = require("./../helpers/cookies");
var buildURL = require("./../helpers/buildURL");
var buildFullPath = require("../core/buildFullPath");
var parseHeaders = require("./../helpers/parseHeaders");
var isURLSameOrigin = require("./../helpers/isURLSameOrigin");
var createError = require("../core/createError");
var defaults = require("../defaults");
var Cancel = require("../cancel/Cancel");
```

### node 适配器 http

```js
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

我们找到其中使用到的 core 函数 settle、buildFullPath、createError、enhanceError

## 2. 辅助函数 settle

```js
"use strict";

var utils = require("./../utils");

module.exports = utils.isStandardBrowserEnv()
    ? // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
          return {
              write: function write(
                  name,
                  value,
                  expires,
                  path,
                  domain,
                  secure
              ) {
                  var cookie = [];
                  cookie.push(name + "=" + encodeURIComponent(value));

                  if (utils.isNumber(expires)) {
                      cookie.push("expires=" + new Date(expires).toGMTString());
                  }

                  if (utils.isString(path)) {
                      cookie.push("path=" + path);
                  }

                  if (utils.isString(domain)) {
                      cookie.push("domain=" + domain);
                  }

                  if (secure === true) {
                      cookie.push("secure");
                  }

                  document.cookie = cookie.join("; ");
              },

              read: function read(name) {
                  var match = document.cookie.match(
                      new RegExp("(^|;\\s*)(" + name + ")=([^;]*)")
                  );
                  return match ? decodeURIComponent(match[3]) : null;
              },

              remove: function remove(name) {
                  this.write(name, "", Date.now() - 86400000);
              },
          };
      })()
    : // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
          return {
              write: function write() {},
              read: function read() {
                  return null;
              },
              remove: function remove() {},
          };
      })();
```

-   引用了工具函数 urils，使用其中的 isStandardBrowserEnv 方法判断是否标准开发环境
-   标准开发环境提供了 document，可以操作 cookie

## 3. 辅助函数 buildFullPath

```js
"use strict";

var utils = require("./../utils");

function encode(val) {
    return encodeURIComponent(val)
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+")
        .replace(/%5B/gi, "[")
        .replace(/%5D/gi, "]");
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
        return url;
    }

    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        var parts = [];

        utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === "undefined") {
                return;
            }

            if (utils.isArray(val)) {
                key = key + "[]";
            } else {
                val = [val];
            }

            utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                    v = v.toISOString();
                } else if (utils.isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(encode(key) + "=" + encode(v));
            });
        });

        serializedParams = parts.join("&");
    }

    if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }

    return url;
};
```

-   引用了工具函数 urils，使用其中的 isStandardBrowserEnv 方法判断是否标准开发环境
-   标准开发环境提供了 document，可以操作 cookie

## 4. 辅助函数 createError

````js
"use strict";

var utils = require("./../utils");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) {
        return parsed;
    }

    utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));

        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
            }
            if (key === "set-cookie") {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
            } else {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }
        }
    });

    return parsed;
};
````

-   引用了工具函数 urils，使用其中的 isStandardBrowserEnv 方法判断是否标准开发环境
-   标准开发环境提供了 document，可以操作 cookie

## 5. 辅助函数 enhanceError

```js
"use strict";

var utils = require("./../utils");

module.exports = utils.isStandardBrowserEnv()
    ? // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
          var msie = /(msie|trident)/i.test(navigator.userAgent);
          var urlParsingNode = document.createElement("a");
          var originURL;

          /**
           * Parse a URL to discover it's components
           *
           * @param {String} url The URL to be parsed
           * @returns {Object}
           */
          function resolveURL(url) {
              var href = url;

              if (msie) {
                  // IE needs attribute set twice to normalize properties
                  urlParsingNode.setAttribute("href", href);
                  href = urlParsingNode.href;
              }

              urlParsingNode.setAttribute("href", href);

              // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
              return {
                  href: urlParsingNode.href,
                  protocol: urlParsingNode.protocol
                      ? urlParsingNode.protocol.replace(/:$/, "")
                      : "",
                  host: urlParsingNode.host,
                  search: urlParsingNode.search
                      ? urlParsingNode.search.replace(/^\?/, "")
                      : "",
                  hash: urlParsingNode.hash
                      ? urlParsingNode.hash.replace(/^#/, "")
                      : "",
                  hostname: urlParsingNode.hostname,
                  port: urlParsingNode.port,
                  pathname:
                      urlParsingNode.pathname.charAt(0) === "/"
                          ? urlParsingNode.pathname
                          : "/" + urlParsingNode.pathname,
              };
          }

          originURL = resolveURL(window.location.href);

          /**
           * Determine if a URL shares the same origin as the current location
           *
           * @param {String} requestURL The URL to test
           * @returns {boolean} True if URL shares the same origin, otherwise false
           */
          return function isURLSameOrigin(requestURL) {
              var parsed = utils.isString(requestURL)
                  ? resolveURL(requestURL)
                  : requestURL;
              return (
                  parsed.protocol === originURL.protocol &&
                  parsed.host === originURL.host
              );
          };
      })()
    : // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
          return function isURLSameOrigin() {
              return true;
          };
      })();
```

-   引用了工具函数 urils，使用其中的 isStandardBrowserEnv 方法判断是否标准开发环境
-   标准开发环境提供了 document，可以操作 cookie

# 三、参考

1\. `仙凌阁`的文章[详细 Axios 源码解读](https://blog.csdn.net/qq_39221436/article/details/120652086)

2\. `林景宜`的文章[林景宜的记事本 - Axios 源码解析（五）：核心工具方法](https://linjingyi.cn/posts/f3c7b914.html#more)

3\. `若川`的文章[学习 axios 源码整体架构，打造属于自己的请求库](https://juejin.cn/post/6844904019987529735#heading-26)

4\. `杰凌`的文章[深入解读 axios 源码](https://zhuanlan.zhihu.com/p/376289400)
