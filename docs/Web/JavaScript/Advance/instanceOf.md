---
title: instanceOf
search: true

date: 2021-11-14 09:05:23
tags: [instanceOf]
photos:
description:
comments:
---

## 前置
> 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
```js
object instanceof constructor

```
- object 某个实例对象
- constructor 某个构造函数
即object.__proto = construct.prototype

## 使用
-   循环引用

1\. 平时如何判断对象类型，分别适合哪些场景

-   typeof
-   instanceof
-   Object.prototype.tostring.call(obj)
-   Array.isArray

2\. 实现一个 instanceOf

```javascript
function instanceOf(left, right) {
    if (typeof left !== "object" || left === null) {
        return false;
    }

    while (true) {
        if (left === null) {
            return false;
        }
        if (left.__proto__ === right.prototype) {
            return true;
        }

        left = left.__proto__;
    }
}
```
