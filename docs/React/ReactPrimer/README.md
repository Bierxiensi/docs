---
title: React与Vue
search: true

date: 2021-10-03 09:05:23
tags: [React, Vue]
photos:
description:
comments:
---

## 两个场景

场景一：

```javascript
[❌]this.state.Status === 'OK'
[✔️]this.setState({ Status: 'OK' })
```

# 一、本质 js 库 VS js 框架

[官网简介 React](https://reactjs.org/)

> A <font color="yellow">JavaScript library</font> for building user interfaces

[官网简介 Vue](https://reactjs.org/)

> The Progressive <font color="yellow">JavaScript Framework</font>

1\. [React] VS [Vue] = [js 库] VS [js 框架] <br>
2\. Vue 做的更多，React 需要开发者做的更多

# 二、差异对比

## 数据渲染 单向数据流 VS 双向数据流

![avatar](<./images/README(2).jpg>)

[React] 开发者通过 setState 更新 state 的值来达到重新 render <br>
[Vue] 响应式数据渲染，通过 getter/setter(vue2.x)以及一些函数的劫持可以精确感知数据变化

1\. Vue 和 React 设计理念上的区别，Vue 使用的是可变数据，而 React(onChange/setState()模式)更强调数据的不可变 <br>
2\. 由于一般会用 Vuex 以及 Redux 等单向数据流的状态管理框架，因此很多时候我们感受不到这一点区别

## API

[Vue]Vue 的 template 在处理上更加优雅于 React 的 jsx <br>
[React]Class Component 中在 render 中会存在大量 porps, state 的解构算是一个痛点
Vue 对 template 则不需要通过 this.data.xxx 来渲染 options api

## 脚手架

[Vue]VueCli <br>
[React] <br>
[❌]create-react-app <br>
[✔️]umi => 蚂蚁团队 ant design, dva

## 路由

[Vue]

```javascript
export default {
    routes: [
        { path: "/login", component: "login" },
        {
            path: "/",
            component: "@/layouts/index",
            children: [
                { path: "/list", component: "list" },
                { path: "/main", component: "main" },
            ],
        },
    ],
};
```

[React]

```javascript
export default {
    routes: [
        { path: "/login", component: "login" },
        {
            path: "/",
            component: "@/layouts/index",
            routes: [
                { path: "/list", component: "list" },
                { path: "/main", component: "main" },
            ],
        },
    ],
};
```

[对照 umi]

|   属性   |  vue-router  | react-router  |      umi       |
| :------: | :----------: | :-----------: | :------------: |
| 路由变化 |      ｜      | onRouteChange |
| 路由新增 | addRoutes ｜ | onRouteChange | patchRoutes ｜ |

## 状态管理

[Vue]vuex

```javascript
export default {
    // 同样的命名空间
    namespace: "todo",
    state: {
        // 类似Vuex State
        list: [],
    },
    Mutations: {
        // 类似Vuex Mutations
        save(state, { payload: { list } }) {
            return { ...state, list };
        },
    },
    actions: {},
};
```

[React]redux 全家桶 ,Mobx ==> dva

```javascript
export default {
    // 同样的命名空间
    namespace: "todo",
    state: {
        // 类似Vuex State
        list: [],
    },
    reducers: {
        // 类似Vuex Mutations
        save(state, { payload: { list } }) {
            return { ...state, list };
        },
    },
    effects: {
        *queryUserInfo({ payload: value }, { call, put, select }) {
            // 对比Vuex Actions
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            // 监听路由的变化，请求页面数据
        },
    },
};
```

## 逻辑复用 [React]HOC 与[Vue]mixin

> 如何在多个组件之间共享代码是一个重要问题，在 Vue 中组合不同功能的方式是通过 mixin，而在 React 中通过 HoC (高阶组件）

React 最早也是使用 mixins 的，不过后来他们觉得这种方式对组件侵入太强会导致很多问题([由于声明式渲染和自上而下的数据流，许多团队在采用 React 时能够在发布新功能的同时修复一堆错误](https://reactjs.bootcss.com/blog/2016/07/13/mixins-considered-harmful.html))

## 特殊的

### [Vue]插槽

[vue]在 Vue 中通过 slot 传递组件模板给组件进行渲染。
[React]React 没有插槽的概念，但其实在组件内部中不论是 JSX 还是 DOM 都会被传入到 Props 的 children 当中去，隐含的实现了类似于 Vue 的普通插槽。

往往我们可能会因为不同的插槽，做不同的事情，比如有一个 footer 插槽用来改变模态框底部的内容，header 用来改变顶部的内容。可以通过传入一个对象的形式进行具名插槽的一个场景模拟。同样的也会将其传递到一个 Props 当中去。

```javascript
<Model>
    {{
        header: <div>header slot</div>,
        footer: <div>footer slot</div>,
    }}
</Model>
```

### CSS

网页开发有一个原则，叫做[关注点分离（separation of concerns）](https://en.wikipedia.org/wiki/Separation_of_concerns#HTML.2C_CSS.2C_JavaScript)，旨在各种技术只负责自己的领域，不要混合在一起，形成耦合。对于网页开发来说，主要是三种技术分离
![avatar](<./images/README(1).jpg>)

```javascript
[bad]
<h1 style="color:red;font-size:46px;"  onclick="alert('Hi')">
Hello World
</h1>
```

[vue]在 style 标签上声明一个 scoped 以区分组件样式。最后组件打包时加入一个 hash 值
[react]使用的 cssModule 方案来进行

-   [Bem](https://juejin.cn/post/6844903672162304013) CssName
-   [Style Component](https://juejin.cn/post/6844903878580764686#heading-6)

    ```javascript
    import React from "react";
    import Styled from "styled-components";

    export default () => {
        const Wrapper = Styled.div`
              & >.title { 
                  color: red;
              }
          `;
        return (
            <Wrapper>
                Red Text Wrapper....
                <p className="title">1111</p>
            </Wrapper>
        );
    };
    ```

-   CssModule
-   [Css in js](https://www.ruanyifeng.com/blog/2017/04/css_in_js.html)

react：umi+dva+antd vue: vue-cli+vuex+element

参考：
[CSS in JS 简介](https://www.ruanyifeng.com/blog/2017/04/css_in_js.html)
