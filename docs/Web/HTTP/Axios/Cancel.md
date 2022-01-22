---
title: axios-calcel模块源码
search: true

date: 2022-01-20 14:05:23
tags: [axios, calcel]
photos:
description:
comments:
---

基于 TC39 的 [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises) 提议封装，但是这个提议已经被发起人自己取消了，详情可以到相关 issue[Why was this proposal withdrawn?](https://github.com/tc39/proposal-cancelable-promises/issues/70)看一下。

> A `Cancel` is an object that is thrown when an operation is canceled.

> 在取消操作时会抛出 `Cancel` 对象

# 一、环境准备

-   `axios` 版本 `v0.24.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/axios/axios/blob/HEAD/CONTRIBUTING.md) axios 源码
-   调试需要 `clone` 到本地

```shell
git clone https://github.com/axios/axios.git

cd axios

npm start

http://localhost:3000/
```

# 二、函数研读

> `cancel` 模块包含三个文件`Cancel`、`CancelToken`、`isCancel`

├─cancel // 取消请求
│ Cancel.js
│ CancelToken.js
│ isCancel.js

## 1. Cancel 类

> A `Cancel` is an object that is thrown when an operation is canceled.
> 当操作被取消时会抛出一个 `Cancel` 对象

```js
"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
    this.message = message;
}

Cancel.prototype.toString = function toString() {
    return "Cancel" + (this.message ? ": " + this.message : "");
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;
```

-   只有 8 行代码，实现了一个`Cancel` 类
-   包含一个原型方法 `toString` ，一个实例属性`__CANCEL__`
-   实例属性`__CANCEL__`被设定为 `true`，是 Cancel 类的标志

Tips:

## 2. isCancel 函数

```js
"use strict";

module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
};
```

-   只有 3 行代码，通过 `Cancel` 的实例属性`__CANCEL__` 这个标志来判断是否为 `Cancel` 实例
-   导出一个 `isCancel` 函数，如果入参 `val` 不是 `Cancel`类会返回 `false`，否则返回 `true`

## 3. CancelToken 类

> A `CancelToken` is an object that can be used to request cancellation of an operation.
> `CancelToken` 是被用于取消请求操作的类

### 【2.1】 引入 Cancel

```js
"use strict";

var Cancel = require("./Cancel");
```

### 【2.2】 内部函数 CancelToken

```js
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
    if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
    }

    var resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });

    var token = this;

    // eslint-disable-next-line func-names
    this.promise.then(function (cancel) {
        if (!token._listeners) return;

        var i;
        var l = token._listeners.length;

        for (i = 0; i < l; i++) {
            token._listeners[i](cancel);
        }
        token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = function (onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function (resolve) {
            token.subscribe(resolve);
            _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
            token.unsubscribe(_resolve);
        };

        return promise;
    };

    executor(function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }

        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}
```

-
-   首先判断入参`executor`是否是 function 类型，如果不是会抛出类型错 TypeError
-

### 【2.3】 添加原型方法 throwIfRequested

```js
/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};
```

### 【2.4】 添加原型方法 subscribe

```js
/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
        listener(this.reason);
        return;
    }

    if (this._listeners) {
        this._listeners.push(listener);
    } else {
        this._listeners = [listener];
    }
};
```

-

### 【2.5】 添加原型方法 unsubscribe

```js
/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
        return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
        this._listeners.splice(index, 1);
    }
};
```

-

### 【2.6】 source

```js
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel,
    };
};
```

# 三、

# 三、参考

1\. `Ethan01`的文章[阅读 axios 源码，发现了这些实用的基础工具函数](https://juejin.cn/post/7042610679815241758#heading-19)

2\. `李冰`老师的专栏[图解 Google V8 - 一篇文章彻底搞懂 JavaScript 的函数特点](https://time.geekbang.org/column/article/212123)

3\. [MDN](https://developer.mozilla.org/zh-CN/)
