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


包含前文中的工具函数、实例化配置、取消请求模块以及部分核心函数和helper函数

## 2. 正文分析 

在浏览器环境中，Axios 直接封装的 XMLHttpRequest，流程大致如下所示：

1\. 新建一个 XHR 对象
2\. 解析 URL
3\. 处理 data、headers 和 responseType
4\. 设置超时时间
5\. 打开请求
6\. 添加 onloadend、onloadend、onabort、onerror、ontimeout、onUploadProgress 事件
7\. 发送请求

```js
/**
 * @description: 浏览器环境中使用XHR对象来发送请求
 * @param {Object} config 已经合并并且标准化后的配置对象
 * @return {Promise} 返回一个promise对象
 */
module.exports = function xhrAdapter(config) {
  // 标准的新建Promise对象的写法
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // 拿到data，headers，和responseType
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // 删掉content-type，让浏览器来设置
    }

    // 新建一个XHR对象
    var request = new XMLHttpRequest();

    // HTTP basic 认证
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password
        ? unescape(encodeURIComponent(config.auth.password))
        : '';
      // 编码base64字符串,构造出一个Authorization
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    // 构造全路径
    var fullPath = buildFullPath(config.baseURL, config.url);
    // 打开请求
    request.open(
      config.method.toUpperCase(),
      buildURL(fullPath, config.params, config.paramsSerializer),
      true
    );

    // 设置毫秒级的超时时间限制
    request.timeout = config.timeout;

    /**
     * @description: 设置loadend的回调
     */
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
      // 构造出response
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request,
      };

      // 调用settle方法来处理promise
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

        // 请求出错，我们没有得到响应，这将由 onerror 处理。
        // 但只有一个例外：请求使用 file:协议，此时即使它是一个成功的请求,大多数浏览器也将返回状态为 0，
        if (
          request.status === 0 &&
          !(request.responseURL && request.responseURL.indexOf('file:') === 0)
        ) {
          return;
        }
        // readystate 处理器在 onerror 或 ontimeout处理器之前调用， 因此我们应该在next 'tick' 上调用onloadend
        setTimeout(onloadend);
      };
    }

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

    // 添加 xsrf 头
    // 只能在浏览器环境中生效
    // 在工作者线程或者RN中不生效
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

    // 给request添加headers
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (
          typeof requestData === 'undefined' &&
          key.toLowerCase() === 'content-type'
        ) {
          // 如果data是undefined,则移除Content-Type
          delete requestHeaders[key];
        } else {
          // 否则把header添加给request
          request.setRequestHeader(key, val);
        }
      });
    }

    // 添加withCredentials
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // 添加 responseType
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // 处理progess
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // 不是所有的浏览器都支持上传事件
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

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

    if (!requestData) {
      requestData = null;
    }

    // 发送请求
    request.send(requestData);
  });
};
```

-  

# 三、参考

1\. `林景宜`的文章[林景宜的记事本 - Axios源码解析（三）：适配器](https://linjingyi.cn/posts/dcd029a9.html)
