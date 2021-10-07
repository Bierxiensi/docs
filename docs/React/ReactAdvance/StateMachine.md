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


