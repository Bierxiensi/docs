---
title: React hooks
search: true
date: 2022-04-16 21:05:23
tags: [React、hooks]
photos:
description:
comments:
---

## 复用组件逻辑 


## 复杂组件难以理解

- state obj可以利用 usestate 单独管理，更加可读

## 副作用 effect

- 无需清除的effect

- 需要清除的effect

## 控制副作用运行时机

useEffect(() => {}, [deps])

## hooks
- 将组件逻辑提取到可重用函数中

## Hoc
- 添加逻辑
- 难以理解

## ref

- ref 在所有 render 中保持唯一引用，ref 包含所有引用的最终状态，不会因为 render 的不同而不同
- 对 ref 的更新不会引发重新渲染
- 访问 dom 节点

## context
- 解决多层属性传值问题
- 创建时时 `A = React.createContext(data)`，使用时 `<A.provider value={data}>` `useContext(A)`

## 规则

- 只在最顶层使用（循环、条件、嵌套函数中不可使用）
- 只在 `react` 函数中调用

## useReducer

## useCallback(性能调优)