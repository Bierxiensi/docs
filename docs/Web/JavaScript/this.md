---
title: javaScript中的this
search: true

date: 2021-09-05 19:05:23
tags: [javaScript, this]
photos:
description:
comments:
---

## 前言
先来看一个吐槽，出自王垠-编程的宗派: [在JavaScript里面，每个函数同时又可以作为构造函数（constructor），所以每个函数里面都隐含了一个this变量，当嵌套多层对象和函数的时候就发现没法访问外层的this，非得bind一下](http://www.yinwang.org/blog-cn/2015/04/03/paradigms)


## 继承和原型链
> When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.