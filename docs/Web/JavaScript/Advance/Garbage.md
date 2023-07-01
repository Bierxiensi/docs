---
title: 内存泄漏与垃圾回收
search: true

date: 2021-11-14 09:05:23
tags: [内存泄漏与垃圾回收]
photos:
description:
comments:
---

## 1\. 泄漏一:全局变量使用

```js
function foo (){
    barA = 'a'; // 上升为全全局变量 === window.barA
    this.barB = 'b';
    return barA + barB;
}

## 2\. 定时器存在
var
```
