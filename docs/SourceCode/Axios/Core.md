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

-   通过 `github1s` 网页可以 [查看](https://github1s.com/axios/axios/blob/HEAD/lib/core/settle.js) axios 源码
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

我们找到其中使用到的 `core` 函数 `settle`、`buildFullPath`、`createError`、`enhanceError`

## 2. 辅助函数 settle

> Resolve or reject a Promise based on response status

> 依据响应状态来 `resolve` 或 `reject` 一个 `Promise`

```js
'use strict';

var createError = require('./createError');

/**
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

```
-   根据 `http` 响应状态，改变 `Promise` 的状态
-   在 `reject` 时使通过调用自定义的 `createError` 方法生成 `reject` 返回内容


## 3. 辅助函数 buildFullPath

> Creates a new URL by combining the baseURL with the requestedURL, only when the requestedURL is not already an absolute URL

> 仅当请求的 `URL` 不是绝对 `URL` 时，才通过将 `baseURL` 与请求的 `URL` 组合来创建新 `URL`

> If the requestURL is absolute, this function returns the requestedURL untouched

> 如果请求的 `URL` 是绝对 `URL`，此函数会原封不动地返回所请求的 `URL`

```js
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};
```

- 其中 `isAbsoluteURL` 和 `combineURLs` 是两个正则表达式，分别会监测当前 `requestedURL` 是否为 `AbsoluteURL` 以及连接 `baseURL` 与 `requestedURL`， 最终目的让返回的 `url` 必须为一个绝对地址

Tips：`AbsoluteURL` 的判断规则是是否以 `scheme://` 开头或者是一个 [`协议相对URL(protocol-relative URL)`](https://www.ludou.org/the-protocol-relative-url.html) 即 `//`开头 

## 4. 辅助函数 createError

>  Create an Error with the specified message, config, error code, request and response

> 使用指定的 `message`、`config`、`code`、`request` 和 `resopnse` 来创建 `Error`

````js
'use strict';

var enhanceError = require('./enhanceError');

/**
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};
````

-   `createError`中使用 `new Error` 创建了一个错误对象
-   `Error` 对象刚生成的时候只有一个 `message` 属性，需要使用 `enhanceError` 来增强返回的 `error` 信息

## 5. 辅助函数 enhanceError

> Update an Error with the specified config, error code, and response

> 使用指定的配置、错误代码和响应来升级 `Error`

```js
'use strict';

/**
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};

```

-  入参 `error` 是一个使用 `new Error` 创建的错误对象
-  enhanceError 方法就是单纯为了升级 Error 对象，给 Axios 生成的错误对象添加 config、code、request 和 response 属性
-  另外根据不同的浏览器环境返回了一些对应的补充信息，`reject` 返回的内容将是一个包含了这些补充信息的 `error` 类型信息

# 三、参考

1\. `林景宜`的文章[林景宜的记事本 - Axios 源码解析（五）：核心工具方法](https://linjingyi.cn/posts/f3c7b914.html#more)
