---
title: React 开发环境配置
search: true
date: 2022-04-16 21:05:23
tags: [React]
photos:
description:
comments:
---

## creat-react-app （cli tools 命令行工具）
- 本地服务
- 静态验证
- 单元测试
- 构件生产环境

### 特性 [github](https://github.com/facebook/create-react-app)

- One Dependency
- No Configuration Required
- No Lock-In: You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.

## 启动
```js
npx create-react-app iui --typescript
```

### npx
- 避免安装全局模块（npm version > 5.2）
- 调动项目内部安装模块（无需配置scripts命令|node_modules/.bin/XX 目录运行）

## 利用ts-interface实现自动补全和类型约束
```js
import React from "react";

interface IHello {
    message: string;
}

const Hello = (props: IHello) => {
    return <h2>{props.message}</h2>
}

export default Hello;
```

## 对函数类型进行泛型约束
```js
import React from "react";

interface IHello {
    message?: string;
}

const Hello: React.FunctionComponent<IHello> = (props) => {
    return <h2>{props.message}</h2>
}

Hello.defaultProps = {
    message: 'Hello world'
}

export default Hello;
```

## 样式方案分析
> [Styling and CSS](https://reactjs.org/docs/faq-styling.html#gatsby-focus-wrapper)


- 全局变量
- 依赖
- 可重用性
- 可扩展性
...

**lnline css**
- js中计算
- 

**CSS in JS**

**Styled Component**

**Sass/Less**

### 色彩体系

**系统色板 = 基础色板 + 中性色板**

**产品色板 = 品牌色 + 功能色板**


## 字体变量方案

**组件库样式变量分类**

- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框阴影
- 可配置开关

- 无衬线字体
- 等宽字体

## normalize.css
> 只是一个很小的CSS文件，但它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案。

- 保护有用的浏览器默认样式而不是完全去掉它们
- 一般化的样式：为大部分HTML元素提供
- 修复浏览器自身的bug并保证各浏览器的一致性
- 优化CSS可用性：用一些小技巧
- 解释代码：用注释和详细的文档来

**scss**
@import 引入，无需额外发送http请求

_ 下划线开头称之为parital文件，编译器无需编译到css