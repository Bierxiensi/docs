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

```js
// 定义构造函数
function C(){}
function D(){}

var o = new C();


o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype


o instanceof D; // false，因为 D.prototype 不在 o 的原型链上

o instanceof Object; // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
C.prototype instanceof Object // true，同上

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true 

o instanceof C; // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.

D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true 因为 C.prototype 现在在 o3 的原型链上

```
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
