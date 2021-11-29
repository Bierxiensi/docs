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

## this指向
### 1\. 全局函数
this指向全局对象window，注意严格模式下，this为undefined
```javascript
//[object Window]
alert(this); 			
function f(){
  alert(this)
}
f(); 

// undefined
function demo() {
  'use strict';
   alert(this); 
}
demo();
```

### 2\. 全局函数
this指向调用该方法的对象
```javascript
let name = 'finget'
let obj = {
 name: 'FinGet',
 getName: function() {
   alert(this.name);
 }
}
obj.getName(); // FinGet

let fn = obj.getName;
fn(); //finget this -> window
```

### 3\. 构造函数
this指向创建出的实例
```javascript
function demo() {
  this.testStr = 'this is a test';
}
let a = new demo();
alert(a.testStr);  // 'this is a test'
```

### 4\. 事件函数
元素绑定事件，事件触发后执行函数中，this指向的是当前元素
```javascript
window.onload = function() {
 let $btn = document.getElementById('btn');
 $btn.onclick = function(){
 		alert(this); // this -> 当前触发元素
 }
}
```

### 5\. 箭头函数
触发后执行函数中，this指向的是当前元素
```javascript
var name = 'my name is window';
var obj = {
    name: 'my name is obj',
      fn: function () {
          var timer = null;
          clearInterval(timer);
          timer = setInterval(() => {
              console.log(this.name);  //my name is obj
          }, 1000)
    }
}
```


### 6\. 定时器、回调函数
定时器setTimeout或setInterval，this指向全局对window
```javascript
//定时器
setTimeout(function() {
   alert(this); // this -> window ，严格模式 也是指向window
},500)

var name = 'my name is window';
var obj = {
     name: 'my name is obj',
     fn: function () {
          var timer = null;
          clearInterval(timer);
          timer = setInterval(function () {
              console.log(this.name);  //my name is window, this指向window
          }, 1000)
     }
}
```

### 7\. 回调函数
回调函数或匿名函数自调用，this指向全局对window

- 函数内部的【this】指向于此函数的调用者（拥有者）。
- 虽然【callback】函数定义于对象【o】的【say】方法中，但实际上由于【callback】是在【func】函数中进行的普通调用，那么【func】中的【callback】的调用者可以理解为是【window】对象 
- 当使用一个对象的未定义的属性时不会报错，并返回“undefined”，而直接使用一个未定义的变量时便会报错

```javascript
//回调函数
var o = {
    age : 12,
    say : function() {
        function callback() {
            return this.age;
        }
        func(callback);
    }
};
function func(callback) {
    var name = "Xiao Ming";
    console.log(name + " is " + callback() + " years old.");
}
o.say(); //Xiao Ming is undefined years old.
```
