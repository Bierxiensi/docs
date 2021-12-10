---
title: javaScript中的promise
search: true

date: 2021-11-30 19:05:23
tags: [javaScript, promise]
photos:
description:
comments:
---

# 期约与异步函数
> 同步行为与异步行为的统一是计算机科学的一个基本概念
## 前置 同步与异步
同步行为对应内存中顺序执行的处理器指令
```js
let a = 3
a = a + 4
```

异步行为类似于系统中断，当前进程的外部实体可以触发代码的执行
```js
let a = 3
setTimeout(()=> a = a + 4, 1000)
```

* 上述两段代码有相同的低级代码，但setTimeout中的累加、赋值操作是由计时器而非流水指令触发，会形成一个入队执行的中断，这对于js运行时来说是黑盒，js为了让后续代码能使用a，需要一种知道a何时可读取的机制

## 史前的异步编程模式
只支持定义异步回调函数表明异步操作完成，而串联异步操作是常见的，因此产生了回调地狱问题
```js
function double(value){
    setTimeout(() => setTimeout(console.log, 0, value * 2), 1000)
}

double(3) // 6
```
```js
// 异步返回值

```

# promiseA+
## 前置 测试套件
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
- then 方法可以被调用很多次，每次注册一组 onFulfilled 和 onRejected 的 callback。它们如果被调用，必须按照注册顺序调用，因此then 方法必须返回 promise，从而构成了promise的链式调用（回调地狱的由来）。

- onFulfilled和onRejected应该是微任务
> onFulfilled or onRejected must not be called until the execution context stack contains only platform code.

``js
function Promise(){
    this.state = PENDING;
    this.result = null;
    this.callbacks = [];
}

promise2 = promise.then(onFulFilled, onRejected) 

===》
Promise.prototype.then = function(onFulFilled, onRejected){
    // 返回promise
    return new Promise((resolve, reject) => {
        let callback = {onFulfilled, onRejected, resolve, reject}

        if(this.state===PENDING){
            // 链式顺序调用
            this.callbacks.push(callback)
        }else{
            // 微任务入栈，确保顺序调用
            setTimeout(()=>handleCallback(callback, this.state, this.result), 0)
        }
    })
}

const handleCallback = (callback, state, result) => {
    let { onFulfilled, onRejected, resolve, reject } = callback
    try {
        if (state === FULFILLED) {
            resolve(onFulfilled(state))
        } else if(state === REJECTED) {
            resolve(onRejected(state))
        }
    } catch (error) {
        reject(error)
    }
}

## The Promise Resolution Procedure
- 如果 result 是当前 promise 本身，就抛出 TypeError 错误。
- 如果 result 是另一个 promise，那么沿用它的 state 和 result 状态。
- 如果 result 是一个 thenable 对象。先取 then 函数，再 call then 函数，重新进入 The Promise Resolution Procedure 过程。
- 如果不是上述情况，这个 result 成为当前 promise 的 result。
``js
const resolvePromise = (promise, result, resolve, reject) => {
    if(result === promise){
        let reason = new TypeError('Can not fufill promise with itself');
        return reject(reason)
    }

    if(isPromise(result)){
        return result.then(resolve, reject)
    }

    if(isThenable(result)){
        try{
            let then = result.then;
            if(isFunction(then)){
                return new Promise(then.bind(result).then(resolve, reject))
            }
        }catch(error){  
            return reject(error)
        }
    }
}



