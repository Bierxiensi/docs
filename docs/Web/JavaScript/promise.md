---
title: javaScript中的promise
search: true

date: 2021-11-30 19:05:23
tags: [javaScript, promise]
photos:
description:
comments:
---

## 前置
测试套件
> npm install promises-aplus-tests

## 术语
- promise 是一个包含 then 方法的对象或函数，该方法符合规范指定的行为。

- thenable 是一个包含 then 方法和对象或者函数。

- value 就是任意合法 JS 值。

- exception 就是 throw 语句抛出的值。

- reason 是一个指示 promise 为什么被 rejected 的值。

## Promise 状态
- 在 pending 状态，promise 可以切换到 fulfilled 或 rejected。

- 在 fulfilled 状态，不能迁移到其它状态，必须有个不可变的 value。

- 在 rejected 状态，不能迁移到其它状态，必须有个不可变的 reason。

状态流转如下：

pending -> resolve(value) -> fulfilled

pending -> reject(reason) -> rejected

```javascript
const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulFilled'

function promise() {
    this.state = PENDING;
    this.result = null;
}

const transition = (promise, state, result) => {
    if(promise !== PENDING) return;
    promise.state = state;
    promise.result = result;
}

## Then 方法
- promise 必须有 then 方法，接受 onFulfilled 和 onRejected 参数。
``js
Promise.property.then = function(onFulFilled, onRejected){
    
}

- onFulfilled必须是函数类型，可选，如果不是函数，应该被忽略。
    - 只能被调用一次（实现时需使用变量来限制执行次数）
    - 在promise变成fulfilled之前，不应该被调用
    - 在promise变为fulfilled时，应该调用onFulfilled，参数是value
- onRejected必须是函数类型，可选，如果不是函数，应该被忽略。
    - 只能被调用一次
    - 在promise变成rejected之前，不应该被调用
    - 在promise变成rejected时，应该调用onRejected，参数是reason
- then 方法可以被调用很多次，每次注册一组 onFulfilled 和 onRejected 的 callback。它们如果被调用，必须按照注册顺序调用。
``js
function Promise(){
    this.state = PENDING;
    this.result = null;
    this.callbacks = [];
}

promise2 = promise.then(onFulFilled, onRejected) 

- onFulfilled和onRejected应该是微任务





