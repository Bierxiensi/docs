---
title: Webpack
search: true

date: 2022-07-08 20:05:23
tags: [Webpack]
description:
comments:
---


# 什么是DLL
> DLL全称是动态链接库(Dynamic Link Library)，是为软件在Windows中实现共享函数库的一种实现方式;
那么webpack中也有内置DLL的功能，它指的是可以将可以共享，并且不经常改变的代码，抽取成一个共享的库;
这个库在之后编译的过程中，会被引入到其他项目的代码中，减少的打包的时间;



# DDL库的使用分为两步:

- 第一步:打包一个DLL库;
- 第二步:项目中引入DLL库

[](https://juejin.cn/post/6967164397127270436)
[webpack dll打包重复问题优化](https://juejin.cn/post/6844903687576354824)
