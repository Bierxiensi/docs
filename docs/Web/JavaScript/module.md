---
title: 什么是JS模块化-从import和import()谈起
search: true

date: 2022-09-08 20:05:23
tags: [Javascript]
description:
comments:
---


`用过import吗？`

```js
import lodash from 'lodash';
```

只想使用其中的clone方法

```js
import { clone } from 'lodash';
```

也许你还见过这样的写法?

```js
import lodash;
```

你觉得这样可以吗？

```js
import * from 'lodash';
```

```js
import _ from 'lodash';
```

这样呢？
```js
import * as _ from 'lodash';
```

那这样呢？
```js
import lodash as _ from 'lodash';
```

还有这样?
```js
import lodash, { clone } from 'lodash';
```


你用过吗？为什有些模块可以这样导入？
```js
import React, { useEffect } from 'react';
```

终极问题-你觉得 `import 和 import() 是一个东西吗？`


长久以来陷入到了使用困境中！不知所起，怎能用好？

# 模块（module）体系

- 起源

- 发展

- es6使用

## 一、起源 
> 历史上，JavaScript `一直没有模块体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来`。其他语言都有这项功能，比如 Ruby 的require、Python 的import，甚至就连 CSS 都有@import，但是 JavaScript 任何这方面的支持都没有，这`对开发大型的、复杂的项目形成了巨大障碍`。 


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96a82201641e4ed4a1c9ffbe8312fd84~tplv-k3u1fbpfcp-watermark.image?)

> 产品：一个简单的要求，展示两张折线图 

```js 
<!DOCTYPE html> 
<html> 
    <head> 
        <meta charset='utf-8'> 
    </head> 
    <body> ... </body> 

    <script type="text/javascript"> 
        var params = window.location.href; 
        ... 
        function formatParams(){ ... } 
        function requestData(){ ... } 
        function initChart(){ ... } 
        function renderChart(){ ... } 
        formatParams() 
        requestData() 
        initChart() 
        renderChart() 
    <script> 
</html> 

``` 
- 100 line+ 



![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0130b38cd154f049f8fc72b47807c22~tplv-k3u1fbpfcp-watermark.image?)
> 产品：加一(亿)点点功能，可以选择展示时间，按钮样式要联动，再加几张图，可以根据类型展示不同的图 


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b6baf6aafd943d6bf6ee6978ebb28ef~tplv-k3u1fbpfcp-watermark.image?)

```js 
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
</head>

<body> 
    <button id="btn-one">1小时</button> 
    <button id="btn-six">6小时</button> 
</body>

<script type="text/javascript"> 

    var params = window.location.href; 
    ... 
    function formatParams() { ... } 
    function requestData() { ... } 
    function initChart() { ... } 
    function renderChart() { ... } 
    formatParams() 
    searchBatteryData(){ 
        ...
        renderChart(); 
    } 
    onSearch(){ 
        if (params.model.substring(0, 2) === 'ZP') { 
            searchBatteryData(); 
            searchGyroData(); 
            searchDeviceOilData(); 
            document.getElementById('axis').style.display = "none"; 
            document.getElementById('sensor').style.display = "none"; 
        } else if (params.model.substring(0, 2) === 'Z0') { ... } 
    } 

    
    handleClickOneHour(){ 
        params.start_ts = Math.round(new Date().setHours(new Date().getHours() - 1) / 1000); 
        params.end_ts = Math.round(new Date() / 1000); 
        onSearch(); 
    } 
    handleClickSixHour(){ ... } 
    let btnOne = document.getElementById('btn-one'); 
    btnOne.onclick = function () { 
        handleClickOneHour(); 
        btnOne.setAttribute("style", "background-color: #1e9383;color: white;") 
        btnSix.setAttribute("style", "background-color: #efefef;color: #000000;") 
    } 
    let btnSix = document.getElementById('btn-six'); 
    btnSix.onclick = function () { 
        handleClickSixHour(); 
        btnSix.setAttribute("style", "background-color: #1e9383;color: white;") 
        btnOne.setAttribute("style", "background-color: #efefef;color: #000000;") 
    } 
    initChart() 
    renderChart() 
    handleClickOneHour() 
    btnOne.setAttribute("style", "background-color: #1e9383;color: white;") 
<script> 
</html> 
``` 

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3ae90cbf374450f8c0651010df69e30~tplv-k3u1fbpfcp-watermark.image?)

- Global 被污染，很容易命名冲突，要小心的取名 
- 方法很多，代码过长，既要处理model也要处理render，心智负担大 

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a5c1528dd0a44c391f5ecfecef6f3dd~tplv-k3u1fbpfcp-watermark.image?)

## 二、发展 

### 1. 命名空间 namespace 
```js 
var sensor = { 
    searchBatteryData: function(){ ... }, 
    renderBatteryChart: function(){ ... } 
} 
var Device = { 
    searchDeviceData: function(){ ... }, 
    renderDeviceChart: function(){ ... } 
} 
``` 

- 减少 Global 上的变量数目 
- 本质是对象，内部属性全部会暴露出来，可以被外部更改，所以不安全 

### 2. 闭包 IIFE 

```js 

var Module = (function(){ 
    var batteryData = ""; 
    searchBatteryData(){ ... }, 
    renderBatteryChart(){ ... } 
    return { 
        searchBatteryData(); 
        renderBatteryChart(); 
    } 
})() 

Module.foo(); ✅ 
Module.batteryData; ❌ 

``` 

- 函数是 JavaScript 唯一的 Local Scope，实现了数据私有化和共享方法 

### 3. 依赖引入
前进了一小步，但却是模块化发展的一大步

```js 
var Module = (function(params){ 
    var batteryData = ""; 
    searchBatteryData(){ ... }, 
    renderBatteryChart(){ ... } 
    return { 
        searchBatteryData(); 
        renderBatteryChart(); 
    } 
})(params) 

Module.foo(); 
``` 

- 通过函数传参实现依赖引入（模块模式，也是现代模块实现的基石） 


`当我学会了依赖引入，尝试去开发项目` 

```js 
// module.js文件 
(function(window, $) { 
    let data = '' 
    function foo() { 
        $('body').css('background', 'red') 
    } //暴露行为
    window.myModule = { foo } 
})(window, jQuery) 

 // index.html文件  
 <!-- 引入的js必须有一定顺序 --> 
 <script type="text/javascript" src="jquery-1.10.1.js"></script> 
 <script type="text/javascript" src="module.js"></script> 
 <script type="text/javascript"> myModule.foo() </script> 

``` 

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4ae9da2dfb744138b77a3c7a16f5f76~tplv-k3u1fbpfcp-watermark.image?)

`但是有几个问题很值得注意 `
- JS Order is essential 
- JS Load in parallel
- DOM 顺序即执行顺序 


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a49991135d8440b5a04060f6d48d077f~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a5c1528dd0a44c391f5ecfecef6f3dd~tplv-k3u1fbpfcp-watermark.image?)

### 4.依赖`注入`
专业的人做专业的事情 - 引入依赖，我们是专业的

```js 
let injector = {    
    dependencies: {}, 
    register: function(key, value) { 
        this.dependencies[key] = value; 
    }, 
    resolve: function(deps, func, scope) { 
        var args = []; 
        for(var i = 0; i < deps.length, d = deps[i]; i++) { 
            if(this.dependencies[d]) { 
                // 存在此依赖 
                args.push(this.dependencies[d]); 
            } else { 
                // 不存在 
                throw new Error('不存在依赖：' + d); } 
            } 
            return function() { 
                func.apply(scope || {}, args.concat(Array.prototype.slice.call(arguments, 0))); 
            } 
        } 
    } 
}
                
===> 使用 
(injector.resolve(
    ['fnA', 'fnB'], 
    function(fnA, fnB, str){ 
        let a = fnA() 
        let b = fnB() 
        console.log(a, b, str) 
    }
))('extend realy')
```

要点：
- 被注入依赖的函数的参数应当是自由定义的（可遍历的[arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)) 
- 依赖注入器应该可以接收依赖（函数/字符串等） 
- 依赖注入器应该返回一个包含了被注入的依赖的函数 
- 依赖注入器应该保持函数的作用域 
...... 

你能提出什么问题吗？ 

`一个好的模块化方案，就是解决我们上面依赖注入提出的几个问题一样解决实际问题而存在，或者说更优雅的闭包方案` 

### 5. 百花齐放的时代 

- LAB 


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8d269c5c29e47fc9d4d3eeed9fe2fb6~tplv-k3u1fbpfcp-watermark.image?)

- YUI 

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9e7295cba764c98a80fc7262ef4c372~tplv-k3u1fbpfcp-watermark.image?)

### 6. CommonJS 规范 （从百花齐放 到 一枝独秀）
我为什么叫做 CommonJS， 因为之前的不够Common！

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd4dca8f85e2454baf4f92cc1e2bc70b~tplv-k3u1fbpfcp-watermark.image?)

#### 6.1 功能上更Common 
- 代码合并 
- 代码压缩 
...... 

不只有依赖注入

#### 6.2 运行环境更Common 

总的来说希望js可以运行在任何地方，更多的说的是服务端模块规范，Node.js采用了这个规范。 催生了一个庞大的社区，催生了很多强大的社区产品 


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ea256432e664aefae67169416a38087~tplv-k3u1fbpfcp-watermark.image?)

- 在服务器端，模块的加载是运行时`同步`加载的
Tips：服务器端加载的模块文件一般都存在本地硬盘，加载起来比较快，不用考虑异步加载的方式。 

### 7. AMD/CMD(UMD) (浏览器环境模块化方案) 

同步意味着阻塞加载，浏览器资源是异步加载的

- 允许非同步加载模块/模块的加载是异步的 (没有严格的加载次序要求) 
- AMD 是RequireJS在推广过程中对模块定义的规范化产出，是异步加载模块，推崇依赖前置
- [CMD](https://so.csdn.net/so/search?q=CMD&spm=1001.2101.3001.7020) 是SeaJS在推广过程中对模块定义的规范化产出，对于模块的依赖，CMD是延迟执行，推崇依赖就近
- UMD 兼容AMD和commonJS规范，根据环境选择加载方式

Tips：在浏览器端，模块还需要提前编译打包处理，也是催生浏览器环境模块化方案的重要原因。

`RequireJS - AMD规范最好的实现者之一 `


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ad212b3e3f54984af229dd076573604~tplv-k3u1fbpfcp-watermark.image?)

```js 
<!DOCTYPE html> 
<html> 
    <head> 
        <script type="text/javascript" src="a.js"></script> 
    </head> 
    <body> 
        <span>body</span> 
    </body> 
</html> 

===> 
function fun1(){ 
    alert("it works"); 
} 
fun1(); 

``` 
- 页面渲染被 a.js 加载阻塞了 

```js 
<!DOCTYPE html> 
<html> 
    <head> 
        <script type="text/javascript" src="require.js"></script> 
        <script type="text/javascript"> require(["a"]); </script> 
    </head> 
    <body> 
        <span>body</span> 
    </body> 
</html> 

===> 

define(function(){ 
    function fun1(){ alert("it works"); } 
    fun1(); 
}) 
``` 

- 模块 a 会在页面渲染完毕后加载 

Tips：browser 并不认识 `define`, `require`，需要编译器来帮忙，转换成 browser认识的 js， `seajs`、`browserify`、`Gulp`、`Webpack`...... 

### 8. ES6 module 

> ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。 

```js 
// CommonJS模块 
let { stat, exists, readfile } = require('fs'); 
// 等同于 
let _fs = require('fs'); 
let stat = _fs.stat; 
let exists = _fs.exists; let readfile = _fs.readfile; 

// ES6模块 
import { stat, exists, readFile } from 'fs'; 

``` 

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。 
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。 
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。 

`现在你明白为啥使用了 ES Module 规范而实现的 no-bundle 构建工具 Vite 这么快了吗？` 

## 三、es6 使用 

### import 
> import 和 import() 是一个东西吗？ 

> 差不多是卡巴斯基与巴基斯坦的关系

- import 命令叫做“连接” binding 其实更合适，与所加载的模块有静态连接关系，会被 JavaScript 引擎静态分析 

- import()返回的是一个 Promise，通过then()方法指定的处理函数是加载完毕的模块（它可以叫任何名字） 

> 其他的 

```js 
import lodash from 'lodash'; 

import { clone } from 'lodash'; 

import lodash; import * from 'lodash'; 

import _ from 'lodash'; 

import * as _ from 'lodash'; 

import lodash as _ from 'lodash'; 

import lodash, { clone } from 'lodash'; 

```

- 本质上只是模块内部选择性对外暴露的不同属性、方法的引入 - 通过具名/匿名，实现更高效的引入 

### export 



## 参考 
1. [理解CommonJS、AMD、CMD三种规范](https://zhuanlan.zhihu.com/p/26625636) 2. [前端模块化开发那点历史](https://github.com/seajs/seajs/issues/588) 
3. [Module 的语法](https://wangdoc.com/es6/module.html#navbar) 
4. [js模块化七日谈](https://huangxuan.me/js-module-7day/#/)



