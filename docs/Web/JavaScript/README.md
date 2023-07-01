---
title: 我所理解的Javascript
search: true

date: 2021-07-17 19:05:23
tags: [ES6, ES7, ES8, ES9, ES10, ES11, ES12]
photos:
description:
comments:
---

# what
- 首先，JS 是一门语言，意味着其
  - 有独立的[语法规范]()
  - 提供一些内置对象和 API（如数组、对象、函数等）
- 其次，JS 是 Dynamically Typed Language 即动态类型语言，意味着其
  - 运行时才去做类型检查
    - 需要借助eslint等三方工具实现运行时的类型检查
  - 是一门弱类型语言
  - 有多种运行时
	- nodejs
	- deno
- 🖋️ing...

# 特性

##### 1\. 变量提升
>var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined，let、const命令会报错


```
	// var 的情况
	console.log(foo); // 输出undefined
	var foo = 2;

	// let 的情况
	console.log(bar); // 报错ReferenceError
	let bar = 2;
```

##### 2\. 暂时性死区(temporal dead zone，简称 TDZ)
>只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```
	var tmp = 123;

	if (true) {
  	tmp = 'abc'; // ReferenceError
 	  let tmp;
	}
```

##### 3\. 暂时性死区与typeof
>“暂时性死区”意味着typeof不再是一个百分之百安全的操作。
```
	typeof x; // ReferenceError
	let x;

	typeof undeclared_variable // "undefined"
```
```
	function bar(x = y, y = 2) {
 	  return [x, y];
	}
	bar(); // 报错

	function bar(x = 2, y = x) {
  	  return [x, y];
	}
	bar(); // [2, 2]
```
``` 
	// 不报错
	var x = x;

	// 报错
	let x = x;
	// ReferenceError: x is not defined

	// 报错
	const x = x;
	// Cannot access 'x' before initialization
```

>暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

##### 4\. 块级作用域与匿名立即执行函数表达式（匿名 IIFE）
```
	// IIFE 写法
	(function () {
 	  var tmp = ...;
 	 ...
	}());

	// 块级作用域写法
	{
 	  let tmp = ...;
  	...
	}
```

##### 5\. 块级作用域与函数声明
>ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```
	// 情况一，应该报错但未报错
	if (true) {
 	  function f() {}
	}

	// 情况二，应该报错但未报错
	try {
 	  function f() {}
	} catch(e) {
 	  // ...
	}
```

>但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。


##### 6\. 块级作用域与函数提升
>ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。

>ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

```
	function f() { console.log('I am outside!'); }
	(function () {
  	  if (false) {
    	// 重复声明一次函数f
    	function f() { console.log('I am inside!'); }
  	  }
  	  f();
	}());

	// ES5 环境
	function f() { console.log('I am outside!'); }
	 (function () {
  	   function f() { console.log('I am inside!'); }
  	   if (false) {
  	   }
 	   f();
	}());
	// I am inside!

	// 浏览器的 ES6 环境
	function f() { console.log('I am outside!'); }
	 (function () {
  	   var f = undefined;
  	   if (false) {
    	 function f() { console.log('I am inside!'); }
  	   }
  	   f();
	}());
	// Uncaught TypeError: f is not a function
```

>ES5中存在函数提升，为了兼容ES5，ES6中规定函数声明提升规则
> - 允许在块级作用域内声明函数。
> - 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
> - 同时，函数声明还会提升到所在的块级作用域的头部。



