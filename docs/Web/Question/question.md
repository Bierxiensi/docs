---
title: 面试题
search: true

date: 2021-06-03 11:01:49
tags: [Linux, server]
photos:
description:
comments:
---


### 计算机网络
### HTTP和HTTPS
### 浏览器





### HTML
##### 1\. HTML5新增特性




### CSS
##### 1\. BFC是什么，有哪些应用
```
BFC(Block Format Context)，块级格式化上下文
```
##### 2\. flex布局
```
:nth-of-type()
align-self: 
```
##### 3\. 浮动样式？如何清除

##### 4\. 手绘三角箭头













### JavaScript
##### 1\. 哪几种数据类型？

##### 2\. 什么是深拷贝？什么是浅拷贝？分别实现

##### 3\. JSON.Strinify处理空值

##### 4\. 重绘和回流

##### 5\. 原型、异步、闭包

##### 6\. 深拷贝循环引用

##### 7\. bind、call、apply

##### 8\. 手写promise

##### 9\. 反转字符串、截取字符串


















### webpack
##### 发展

##### 1\. 为什么需要构建工具（webpack）
```
1. 转换es6语法
2. 转换JSX
3. CSS预处理/前缀补全
4. 压缩混淆
5. 图片压缩
```
##### 2\. webpack与gulp区别
```
glup文件流概念，每一步构建结果存到内存，速度比grunt快
grunt每一步构建存到磁盘
webpack模块化解决方案
```
##### 3\. webpack中loader与plugins区别
```
说法一：
loader：文件加载器，能对文件进行编译、压缩等处理，webpack内置babel-loader默认只能处理js和json文件，其他文件需要安装别的loader，如css需要安装css-loader
plugins：用于完成loader不能完成的复杂功能，如对webpack运行周期内的事件进行监听，如HotModuleReplacementPlugin用于监听文件变化，进行热更新
说法二：
loader： loader 是一个转换器， 将 A 文件进行编译成 B 文件， 属于单纯的文件转换过程；
plugin： plugin 是一个扩展器， 它丰富了 webpack 本身， 针对是 loader 结束
后， webpack 打包的整个过程， 它并不直接操作文件， 而是基于事件机制工作，
会监听 webpack 打包过程中的某些节点， 执行广泛的任务。
```
##### 4\. webpack打包原理
```
将项目当做整体，通过指定主文件，如main.js，从主文件出发，找到依赖的文件，用相关loader处理对应格式的文件，打包成一个或多个浏览器可识别的js文件
```
##### 5\. 你知道的webpack打包优化有哪些？
loader: thread-loader，可以多进程打包css和js，加快打包速度；url-loader，通过设置options-limit，将较小的图片和文字自动转换成base64格式，无需向服务器发起网络资源请求
plugins: UglifyjsWebpackPlugin，压缩js体积；ZipWebpackPlugin，将打出的资源生成zip包
##### 6\. webpack监听原理?
```
1.通过轮询判断文件的最后编辑时间是否发生变化，当文件最后编辑时间据当前超过规定时间（aggregateTime）后进行更新，否则进入缓存
```
##### 7\. webpack热更新原理?如何做到在不刷新浏览器的前提下更新页面的?
```
[点此处查看图文详情](https://note.youdao.com/)
1). 当修改了一个或多个文件，文件系统接收更改并通知 webpack；
2). webpack 重新编译构建一个或多个模块，并通知HMR（ Hot Module Replacement）服务器进行更新；
3). HMR Server使用webSocket通知HMR runtime需要更新，HMR  runtime通过HTTP请求更新jsonp；
4). HMR runtime替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。
```
##### 8\. 模块化发展历史
```
可从 IIFE、 AMD、 CMD、 CommonJS、 UMD、 webpack(require.ensure)、 ES Module、
<script type="module"> 这几个角度考虑。
```











### Vue
##### 1\. vue2.0生命周期有哪些，分别做了什么事

##### 2\. 实例销毁前会做什么事情

##### 3\. 组件间哪几种通信方式

##### 4\. vue响应式原理核心思想

##### 5\. ajax请求放在哪个钩子里较好

##### 6\. beforeDestroy使用场景