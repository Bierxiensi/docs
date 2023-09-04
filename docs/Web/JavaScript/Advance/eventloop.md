---
title: eventloop
search: true

date: 2021-12-15 21:25:23
tags: [eventloop]
photos:
description:
comments:
---

## 什么是浏览器事件循环，为什么是浏览器？

## 为什么有时间循环机制？

## 两种任务，什么是宏任务，什么是微任务

宏任务：整体代码、setTimeout、setInterval、I/O操作
微任务：new Promise().then，MutaionObserver（前端的回溯）

## 为何引入微任务，只有宏任务可行否？

宏任务-队列、先进先出，无法控制执行时机，不适配有高优先级响应任务的场景

## node中的事件循环和浏览器中的事件循环有什么区别？

宏任务：
- time定时器：执行setTimeout和setInterval回调函数
- pending callback待定回调：执行延迟到下一个循环迭代的I/O回调
- idle prepare：仅系统内部使用
- poll：检索新的I/O事件，执行与I/O相关的回调
- check：执行setImmediate()回调
- close callback：socket.on('close',()=>{})


node中宏任务、微任务执行顺序:

- version < Node10:
    - 执行完一个阶段中所有任务
    - 执行nextTick队列内容
    - 执行微任务队列内容

- version > Node10
    - 与浏览器相同

