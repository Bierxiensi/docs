---
title: React Hooks
search: true

date: 2021-11-15 21:05:23
tags: [React, React Hooks]
photos:
description:
comments:
---

## 前置-纯函数

## 诞生
React 出现之时，主流的方式还是基于对象去考虑问题。例如获得一个对话框的实例，然后通过 dialog.show(), dialog.hide() 这样的方式细粒度地去控制 UI 的变化。


Class 在作为 React 组件的载体时，是否用了它所有的功能呢？如果你仔细思考，会发现使用 Class 其实是有点牵强的，主要有两方面的原因。

一方面，React 组件之间是不会互相继承的。比如说，你不会创建一个 Button 组件，然后再创建一个 DropdownButton 来继承 Button。所以说，React 中其实是没有利用到 Class 的继承特性的。

另一方面，因为所有 UI 都是由状态驱动的，因此很少会在外部去调用一个类实例（即组件）的方法。要知道，组件的所有方法都是在内部调用，或者作为生命周期方法被自动调用的。

而这在 React 中其实是没有必要的，因为所有的 UI 都是声明出来的，不用处理细节的变化过程。因此，通过函数去描述一个组件才是最为自然的方式。只是当时有一个局限是，函数组件无法存在内部状态，必须是纯函数，而且也无法提供完整的生命周期机制。这就极大限制了函数组件的大规模使用。

Class 作为 React 组件的载体，也许并不是最适合，反而函数是更适合去描述 State => View 这样的一个映射，但是函数组件又没有 State ，也没有生命周期方法。以此来看，我们应该如何去改进呢


比起 Class 组件，函数组件是更适合去表达 React 组件的执行的，因为它更符合 State => View 这样的一个逻辑关系。但是因为缺少状态、生命周期等机制，让它一直功能受限。而现在有了 Hooks，函数组件的力量终于能真正发挥出来了！


在 Hooks 出现之前，业务逻辑的重用可以说是 React 开发的一大痛点和难点。比如，在组件中去监听窗口大小的变化，以便在布局上做调整。那么就得在类组件的不同生命周期中做事件监听的绑定和解绑。

## 特点
函数和对象不同，并没有一个实例的对象能够在多次执行之间保存状态，那势必需要一个函数之外的空间来保存这个状态，而且要能够检测其变化，从而能够触发函数组件的重新渲染

梳理一下
能够把一个外部的数据绑定到函数的执行。当数据变化时，函数能够自动重新执行。这样的话，任何会影响 UI 展现的外部数据，都可以通过这个机制绑定到 React 的函数组件。这就是hooks


把某个目标结果钩到某个可能会变化的数据源或者事件源上，那么当被钩到的数据或事件发生变化时，产生这个目标结果的代码会重新执行，产生更新后的结果。

这个机制在vue1/2中称之为响应式，在vue3中通过拆包独立了出来，可以引入到react或其他框架内实现响应式

## react hooks

React 提供的 Hooks 其实非常少，一共只有 10 个，比如 useState、useEffect、useCallback、useMemo、useRef、useContext，其中useState 和 useEffect 这两个为核心的 Hooks。

* useState：让函数组件具有维持状态的能力

useState 就和类组件中的 setState 非常类似。不过两者最大的区别就在于，类组件中的 state 只能有一个。所以我们一般都是把一个对象作为 一个 state，然后再通过不同的属性来表示不同的状态。而函数组件中用 useState 则可以很容易地创建多个 state，所以它更加语义化。

state 中永远不要保存可以通过计算得到的值
props、url、storage

一旦组件有自己状态，意味着组件如果重新创建，就需要有恢复状态的过程，这通常会让组件变得更复杂，比如一个组件想在服务器端请求获取一个用户列表并显示，如果把读取到的数据放到本地的 state 里，那么每个用到这个组件的地方，就都需要重新获取一遍。
如果通过一些状态管理框架，如Redux，那么组件本身就可以是无状态的。无状态组件可以成为更纯粹的表现层，没有太多的业务逻辑，从而更易于使用、测试和维护。
* useEffect：执行副作用（一段和当前执行结果无关的代码。不影响渲染出来的 UI 的。）
- 每次 render 后执行：不提供第二个依赖项参数。比如useEffect(() => {})。
- 仅第一次 render 后执行：提供一个空数组作为依赖项。比如useEffect(() => {}, [])。
- 第一次以及依赖项发生变化后执行：提供依赖项数组。比如useEffect(() => {}, [deps])。
- 组件 unmount 后执行：返回一个回调函数。比如useEffect() => { return () => {} }, [])。


* 只能在函数组件的顶级作用域使用
Hooks 不能在循环、条件判断或者嵌套函数内执行，而必须是在顶层。同时 Hooks 在组件的多次渲染之间，必须按顺序被执行。因为在 React 组件内部，其实是维护了一个对应组件的固定 Hooks 执行列表的，以便在多次渲染之间保持 Hooks 的状态，并做对比。
filber 节点的queue, memerizedState
```javascript
function MyComp() {
  const [count, setCount] = useState(0);
  // ...
  return <div>{count}</div>;
}


function MyComp() {
  const [count, setCount] = useState(0);
  if (count > 10) {
    // 错误：不能将 Hook 用在条件判断里
    useEffect(() => {
      // ...
    }, [count])
  }
  
  // 这里可能提前返回组件渲染结果，后面就不能再用 Hooks 了
  if (count === 0) {
    return 'No content';
  }

  // 错误：不能将 Hook 放在可能的 return 之后
  const [loading, setLoading] = useState(false);
  
  //...
  return <div>{count}</div>
}
```



* 只能在函数组件或者其他 Hooks 中使用
如果一定要在 Class 组件中使用，可以利用高阶组件的模式，将 Hooks 封装成高阶组件，从而让类组件使用。
使用助手-eslint-plugin-react-hooks
```javascript
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    // 检查 Hooks 的使用规则
    "react-hooks/rules-of-hooks": "error", 
    // 检查依赖项的声明
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

定义依赖项时，我们需要注意以下三点：
- 依赖项中定义的变量一定是会在回调函数中用到的，否则声明依赖项其实是没有意义的。
- 依赖项一般是一个常量数组，而不是一个变量。因为一般在创建 callback 的时候，你其实非常清楚其中要用到哪些依赖项了。
- React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。这是一个刚开始使用 Hooks 时很容易导致 Bug 的地方。


  
```javascript  
function Sample() {
  // 这里在每次组件执行时创建了一个新数组
  const todos = [{ text: 'Learn hooks.'}];
  useEffect(() => {
    console.log('Todos changed.');
  }, [todos]);
}
```

* useCallback：缓存回调函数
在 React 函数组件中，每一次 UI 的变化，都是通过重新执行整个函数来完成的，这和传统的 Class 组件有很大区别：函数组件中并没有一个直接的方式在多次渲染之间维持一个状态。
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(count + 1);
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```
即使 count 没有发生变化，但是函数组件因为其它状态发生变化而重新渲染时，这种写法也会每次创建一个新的函数，不仅增加了系统的开销，更重要的是：每次创建新函数的方式会让接收事件处理函数的组件，需要重新渲染。如这个例子中的 button 组件，接收了 handleIncrement ，并作为一个属性。如果每次都是一个新的，那么这个 React 就会认为这个组件的 props 发生了变化，从而必须重新渲染。
我们需要做到的是：只有当 count 发生变化时，我们才需要重新定一个回调函数。而这正是 useCallback 这个 Hook 的作用。
```javascript
useCallback(fn, deps)


import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(
    () => setCount(count + 1),
    [count], // 只有当 count 发生变化时，才会重新创建回调函数
  );
  // ...
  return <button onClick={handleIncrement}>+</button>
}


```


## 生命周期

hook生命周期
componentDidMount, componentDidUpdate


useEffect：执行副作用（一段和当前执行结果无关的代码。不影响渲染出来的 UI 的。）

对应到 Class 组件，useEffect 涵盖了 ComponentDidMount、componentDidUpdate 和 componentWillUnmount 三个生命周期方法。不要把 useEffect 对应到某个或者某几个生命周期的方法。只要记住，useEffect 是每次组件 render 完后判断依赖并执行。