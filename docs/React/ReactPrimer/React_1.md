---
title: React基础
search: true

date: 2021-09-10 09:05:23
tags: [React, React-router, PubSub, Redux, Ant-Design]
photos:
description:
comments:
---

## 前置

this、class、ES6、npm、原型与原型链、数组方法、模块化

## what

用于构建用户界面（视图）的 Js 库

## designed

FaceBook 2011 Jordan Walke

## 优势

-   避免 DOM-API 繁琐操作
-   避免直接操作 DOM 引发的重绘重拍
-   引入组件化（包括 html、css、图片、字体、音视频，对比模块化的仅 js 拆分）编码方案，声明式编程，代码复用率高
-   React native 可以使用 React 语法进行移动端开发
-   使用虚拟 DOM + 优秀 Diffing 算法，尽量减少与真实 DOM 的交互

## 核心概念

1\. JSX

-   本身是表达式
-   允许嵌入表达式
-   引号指定字面量
-   花括号指定 JS 表达式
-   防止 XSS 注入攻击（React DOM 在渲染所有输入内容之前，默认会进行转义）
-   有两种元素，以首字母是否大小写区分 DOM 元素和 React 组件
-   显示的调用 preventDefault()或 stopPropagation()等原生方法阻止默认事件

单行注释推荐

> {/\* \_/}

多行注释推荐

> /\_ \*/

Tip-具有相同渲染结果

```javascript
    <div />
    <div></div>
    <div>{'false'}</div>
    <div>{true}</div>
    <div>{null}</div>
    <div>{undefined}</div>
```

2\. React-DOM

-   React 元素一旦创建不可修改
-   更新 UI 唯一的方式是 ReactDOM.render()
-   React-DOM 更新时仅进行必要的更新（将元素和它的子元素与它们之前的状态进行比较）

3\. 组件
3.1\. 函数组件

定义

```javascript
function Welcome(props) {
    return <span>Hello, {props.name}</span>;
}
```

3.2\. class 组件（ES6）

定义

```javascript
class Welcome extends React.Component {
    render() {
        return <span>Hello, {this.props.name}</span>;
    }
}
```

3.3\. 自定义组件&&props

-   组件名称必须以大写字母开头
-   JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”

定义

```javascript
function Welcome(props) {
    return <span>Hello, {props.name}</span>;
}
const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById("root"));
```

3.4\. 高阶组件(Higher-Order Component, HOC)

-   本质是一个函数
-   入参和返回值均为组件

给每个组件添加一个属性

```javascript
const Container = (WrappedComponent) => {
    class extends React.Component{
        render(){
            let newProps = { status: 'pending' };
            return <WrappedComponent {...this.props} {...newProps} />
        }
    }
}

使用方式：export时调用
class App extends React.Component {
    render(){
        return (
            <span>hello world</span>
        )
    }
}
export default Container(App)

使用方式：装饰器
@Container
export default class App extends React.Component {
    render(){
        return (
            <span>hello world</span>
        )
    }
}
```

4\. 数据流

-   不变属性 props 与可变属性 state
-   上下文 Context
-   Redux

    4.1.1\. props
    参见 3.3

    4.1.2\. state

    -   构造函数和 setState 方法可以给 this.state 赋值
    -   setState()更新可能是异步的
