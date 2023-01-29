---
title: 从状态机的角度理解 React 如何使用数据驱动渲染
search: true

date: 2021-09-10 09:05:23
tags: [React, Vue, PubSub, ES6, HOC]
photos:
description:
comments:
---

## 前置
[React, Vue, PubSub, ES6, HOC]


#### 两个场景

场景一：
[❌]this.state.Status === 'OK'
[✔️]this.setState({ Status: 'OK' })

场景二：


```javascript
[❌]
this.setStatus({ count: count + 1 })
this.setStatus({ count: count + 1 })

[✔️]
function(){
    this.setStatus((state, props) => { return { count: count + 1 }})
    this.setStatus((state, props) => { return { count: count + 1 }})
}
```

#### 状态机

### 面试题

1\. 问: 为什么需要状态管理

答: React 的组件只是通过 jsx 以及样式按照 state 构建最终的 UI，真正将页面动态化的实际上是 state 的变化实现的。对于简单的前端应用，在组件中通过组件自身的 state 加上父组件通过 props 状态的传递就能够满足应用数据管理的需求。但是当应用膨胀到一定程度后就会导致组件内维护的状态非常的复杂，加上组件之间状态的传递，很容易导致数据管理混乱。很小的修改都可能导致难以预料的副作用。

所以我们需要纯净的 UI 组件，除了渲染逻辑，不再杂糅其他（比如网络请求）。这样我们就要想办法把与渲染无关的业务逻辑抽离出来，形成独立的层（在 Umi 中就是 src/models 文件夹中所管理的 model ）去管理。让所有组件降级为无状态组件，仅仅依赖 props 渲染。这样 UI 层面就不需关心渲染无关的逻辑，专注做 UI 渲染。（注：这里说的组件主要是指 page 下面的页面组件，对于 component 下的组件本身就应该是比较通用的组件，更应该仅仅依赖 props 渲染，它们也不应该有 model，数据应该通过在页面组件中通过 props 传递过去）。

[state](./images/state.png)