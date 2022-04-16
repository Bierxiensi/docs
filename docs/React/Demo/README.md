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