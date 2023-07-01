---
title: 闭包
search: true

date: 2021-12-12 19:05:23
tags: [闭包]
photos:
description:
comments:
---

## 闭包的含义

能访问自由变量的函数

## 自由变量

在函数中使用的既不是函数参数也不是函数局部变量的变量

##

1\. 理论角度：所有函数都是，函数中去访问全局变量
2\. 实践角度
1\. 即使上下文被销毁仍然存在
2\. 代码中引用自由变量

## 应用场景

1\. 柯里化函数
避免频繁调用具有相同参数的函数，同时能轻松复用

```js
function getArea(width, height) {
    return width * height;
}

function getArea(width) {
    return (height) => {
        return height * width;
    };
}
const getTenWidthArea = getArea(10);
```

2\. 使用闭包实现私有化方法、变量
模块：现代化打包方式，最终每个模块代码相互独立

```js
function fun(i) {
    function fun1() {
        console.log(i);
    }
    return fun1;
}

const fa = fun(1);
const fb = fun(2);
```

3\. 匿名自执行函数

```js
var fun() = (function(){
    var num = 0;
 return function(){
     num++;
     return num;
 }
})();
```

4\. 缓存一些结果
外部函数中创建一个数组，闭包函数可以获取、修改这个数组，延长了这个数组使用周期

```js
function fun() {
    let arr = [];

    function fun1(i) {
        arr.push(i);
        console.log(i);
    }
    return fun1;
}
```

## 总结

-   创建私有变量
-   延长生命周期

## 题目

1\. compose 函数

```js
function fn1(x) {
    return x + 1;
}

function fn2(x) {
    return x + 2;
}

function fn3(x) {
    return x + 3;
}

function fn4(x) {
    return x + 4;
}
compose(fn1, fn2, fn3, fn4);

console.log(1); // 1+4+3+2+1

// 解答
function compose() {
    const argFnList = [...arguments];

    return (num) => {
        return argFnList.reduce((pre, cur) => cur(pre), num);
    };
}
```

2\. currying 函数 柯里化函数

```js
const add = (a, b, c) => a + b + c;

const a1 = currying(add, 1);
const a2 = a1(2);
console.log(a2(3));


function currying(fn, ...args){
    const originFnArgLength = fn.length;
    let allArg = [...args];

    const resFn = (...newArgs) => {
        allArg = [...args, ...newArgs];

        if(allArg.length === originFnArgLength){
            return fn(...allArg)
        } else {
            return resFn;
        }
    }

    retrun resFn;
}

```
