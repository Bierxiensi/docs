---
title: function
search: true

date: 2021-12-21 19:05:23
tags: [function]
photos:
description:
comments:
---

> JavaScript 中的函数非常灵活，其根本原因在于 JavaScript 中的函数就是一种特殊的对象，把 JavaScript 中的函数称为一等公民 (First Class Function)。

> 基于函数是一等公民的设计，使得 JavaScript 非常容易实现一些特性，比如闭包，还有函数式编程等，而其他语言要实现这些特性就显得比较困难，比如要在 C++ 中实现闭包需要实现大量复杂的代码，而且使用起来也异常复杂。

> JavaScript 是基于对象设计的，但是它却不是一门面向对象的语言 (Object—Oriented Programming Language)，因为面向对象语言天生支持封装、继承、多态，但是 JavaScript 并没有直接提供多态的支持，因此要在 JavaScript 中使用多态并不是一件容易的事。

> 面向对象语言是由语言本身对继承做了充分的支持，并提供了大量的关键字，如 public、protected、friend、interface 等，众多的关键字使得面向对象语言的继承变得异常繁琐和复杂，而 JavaScript 中实现继承的方式却非常简单清爽，只是在对象中添加了一个称为原型的属性，把继承的对象通过原型链接起来，就实现了继承，我们把这种继承方式称为基于原型链继承。

> 对象的属性值有三种类型：

-   第一种是原始类型 (primitive)，所谓的原始类的数据，是指值本身无法被改变，比如 JavaScript 中的字符串就是原始类型，如果你修改了 JavaScript 中字符串的值，那么 V8 会返回给你一个新的字符串，原始字符串并没有被改变，我们称这些类型的值为“原始值”。JavaScript 中的原始值主要包括 null、undefined、boolean、number、string、bigint、symbol 这七种。
-   第二种就是对象类型 (Object)，对象的属性值也可以是另外一个对象。
-   第三种是函数类型 (Function)

### 函数调用方式

-   非匿名函数

```js
function foo() {
    var test = 1;
    console.log(test);
}
foo();
```

[函数对象具有隐藏属性](https://static001.geekbang.org/resource/image/9e/e2/9e274227d637ce8abc4a098587613de2.jpg)

-   匿名函数
    函数除了可以拥有常用类型的属性值之外，还拥有两个隐藏属性，分别是 name 属性和 code 属性。

```js
(function () {
    var test = 1;
    console.log(test);
})();
```

该函数对象的默认的 name 属性值就是 anonymous，表示该函数对象没有被设置名称。另外一个隐藏属性是 code 属性，其值表示函数代码，以字符串的形式存储在内存中。当执行到一个函数调用语句时，V8 便会从函数对象中取出 code 属性值，也就是函数代码，然后再解释执行这段函数代码。
