---
title: axios-calcel模块源码
search: true

date: 2022-01-20 14:05:23
tags: [axios, calcel]
photos:
description:
comments:
---

> 基于 TC39 的 [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises) 提议封装，但是这个提议已经被发起人自己取消了，据说是因为 Google 内部反对意见很大，详情可以到相关 issue[Why was this proposal withdrawn?](https://github.com/tc39/proposal-cancelable-promises/issues/70)看一下。

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

```js
├─cancel // 取消请求
│   Cancel.js
│   CancelToken.js
│   isCancel.js
```

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

Tips：我们知道一个请求会有三种状态`请求前`、`请求中`、`请求结束`，取消动作可能发生在其中的任何一个阶段。不同阶段对应的取消逻辑在`axios`中是不一样的，且在`请求中`这个阶段，函数执行的逻辑位置也不一样，所以当我们发起取消请求时，`axios`需要一种机制获知当前网络请求走到了哪个阶段的哪个位置才能执行对应的取消和返回逻辑，`Cancel` 类就是这样一个机制。

## 2. isCancel 函数

```js
"use strict";

module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
};
```

-   只有 3 行代码，通过 `Cancel` 的实例属性`__CANCEL__` 来判断`value`是否为 `Cancel` 实例
-   导出一个 `isCancel` 函数，如果入参 `val` 不是 `Cancel`类会返回 `false`，否则返回 `true`

## 3. CancelToken 类

> A `CancelToken` is an object that can be used to request cancellation of an operation.
> `CancelToken` 是被用于取消请求操作的类

> 参考文章`林景宜的记事本`提到这是一个`让人一头雾水`的类，刚看的时候笔者也有同感，虽然经过一些剖析笔者已经分析的尽可能详细（自我感觉良好 🐶），但在观看之前还是推荐不了解设计模式的小伙伴去了解一下其中的`发布/订阅`模式，会有助于理解

### 【2.1】 引入 Cancel 类

```js
"use strict";

var Cancel = require("./Cancel");
```

### 【2.2】 内部函数 CancelToken

> 两段`this.promise.then`并不是取消逻辑，暂时先忽略

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

接下来按行分析

-   1\. 首先判断入参`executor`是否是 function 类型，如果不是会抛出类型错 TypeError

    -   为什么入参`executor`是一个函数？
    -   答：`CancelToken`通过发布订阅模式来实现传递取消信息，订阅者把自己想订阅的事件`cancel/c`注册到调度中心`CancelToken`，当适配器返回信息时发布者发布到调度中心`CancelToken`，调度中心再统一调度执行订阅者注册到调度中心的处理代码`cancel`。这也就理解了这个函数为什么叫`executor-执行器`。

-   2\. 创建全局变量`resolvePromise`

    -   为什么要创建这个变量？为什么要以全局的方式创建？
    -   答：为了拿到`resolve`便于后续的链式调用，且只有全局变量才能`穿过函数作用域`拿到 `resolve` 值

-   3\. 使用`new Promise()`创建函数`promiseExecutor`的实例对象，表明`executor`是一个异步函数，其返回值`resolve`传递给全局变量`resolvePromise`，调用时可使用`this.promise.then()`获取返回值`resolve`或直接使用`resolvePromise`

    -   为什么创建 `promise` 对象?
    -   因为真正取消请求的动作`request.abort()`在适配器`xhr.js`或`http.js`里触发，这是一个异步的方法，当这个动作发生后我们才能在 `resolve` 中拿到返回值

-   4\. 创建全局变量`token`表示当前`CancelToken`的实例

-   5\. `executor`执行器执行订阅者事件`cancel` ，该方法入参`message`来自用户调用时传参

-   6\. 订阅者事件`cancel`在执行时首先会判断实例`token`是否存在`reason`属性值，如果存在直接返回，否则使用`new Cancel()`声明一个 cancel 类给`reason`赋值
    -   为什么用`new Cancel()`声明一个 cancel 类给`reason`赋值？
    -   答：这样`reason`的原型链上会挂载一个`__CANCEL__`表示 cancel 类，同时配合`resolvePromise`执行会把`this.promise`实例状态改为`fulfilled`，这意味着是用户主动取消请求返回的信息而非因为其他异常返回（会把`this.promise`实例状态改为`reject`）

**`CancelToken` 构造函数就是一个发布订阅函数，通过发布订阅触发向外 `resolve` 或者抛出错误（`reject`），`Promise` 链式结构成功拿到`resolve`值或者 `catch` 到错误后，会返回用户的输入`message`或停止继续执行并执行错误回调。**

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

-   如果已触发取消事件，则抛出一个错误信息

### 【2.4】 source

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

-   初始化时返回值是一个对象，包含新的`CancelToken`对象 `token` 和函数 `cancel`
-   执行时订阅者会将订阅事件`c`注册到调度中心`CancelToken`，调度中心在执行器`executor`中立即执行订阅者事件
-   `cancel`函数通过`全局作用域`拿到`c`，通过 `return` 暴露给用户一个订阅事件的入口

### 【2.5】 添加原型方法 subscribe

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

-   添加订阅时执行的函数，订阅事件`cancel`被执行时，会向当前实例的`_listeners`属性上追加链式调用的返回值

### 【2.6】 添加原型方法 unsubscribe

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

-   添加订阅时的执行的函数，订阅事件`cancel`被执行时，如果是重复取消就移除当前实例的`_listeners`属性上对应位置的链式调用

# 三、参考

1\. `仙凌阁`的文章[详细 Axios 源码解读](https://blog.csdn.net/qq_39221436/article/details/120652086)

2\. `林景宜`的文章[林景宜的记事本 - Axios 源码解析（二）：通用工具方法](https://linjingyi.cn/posts/fe9fb5af.html)

3\. `若川`的文章[学习 axios 源码整体架构，打造属于自己的请求库](https://juejin.cn/post/6844904019987529735#heading-26)

4\. `杰凌`的文章[深入解读 axios 源码](https://zhuanlan.zhihu.com/p/376289400)

5\. `海角在眼前`的文章[设计模式（三）：观察者模式与发布/订阅模式区别](https://www.cnblogs.com/lovesong/p/5272752.html)
