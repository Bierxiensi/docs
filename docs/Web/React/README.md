---
title: React进阶
search: true

date: 2021-11-22 23:05:23
tags: [React]
description:
comments:
---


# 1、简史及版本
* 2011年诞生
* 2015年发布v0.14.0版本：拆分react package into two，react and react-dom
* 2016年发布v15.0版本：虚拟dom的diff操作同步执行
* 2017年发布React v16.0版本：使用fiber架构(分片)，<ie11需使用polyfill
 - react v16.2.0（2017年）：增加Fragment组件
 - react V16.3.0（2018年）：增加主要的api，React.createRef()、React.forwardRef()
 - react V16.6.0（2018年）：增加主要的api，React.memo()、React.lazy()
 - react V16.8.0（2019年）：增加React Hooks，用来解决状态逻辑复用问题，且不会产生 JSX 嵌套地狱
* 2020年发布React v17.0版本：引入渐进式升级

# 2、生态
* 脚手架/框架
 - umi：可插拔的企业级react应用框架
 - create react app：官方支持的创建react单页应用程序的方法
 - Nextjs：ssr框架
 - React-vr：vr框架，适用于展厅、房屋设计
 - Reactxp：多端框架

* 组件库
 - ant Design系列：pc、mobile，引入Ant Design设计概念
 - Material-UI：实现了谷歌Material Design设计规范，世界流行界面

* 工具类
 - Redux：遵循函数式编程思想的状态管理插件
 - Mobx：面向对象变迁和响应式编程的状态管理插件
 - Immutable-js：解决javasript Immutable Data的问题

* 跨端类
 - Remax：阿里的React跨端框架，目前支持支付宝、微信、字节小程序
 - Taro：类React跨端框架，支持主流小程序及React Native
 - React Native：js编写原生的React框架

* 其他
 - react-window和react-virtualized：虚拟滚动库，提供可服用组件，用于展示列表、网络和表格数据



 ## 3. 核心概念

 - React 事件合成机制

 - fiber

 - diff

 ## 4. hooks

 - useLayoutEffect
 
 - useEffect
