---
title: TypeScript学习记录-[ts-challenge-实现 Pick、Readonly、Omit]
search: true

date: 2022-04-17 20:05:23
tags: [TypeScript]
description:
comments:
---
# 一、前置

[](./../image/TSChallenge1.png)

> 今日level 【easy 4・实现 Pick 7・实现 Readonly】、【middle 3・实现 Omit】


在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)，关于Playground如何使用、如何刷题可以参考[TypeScript学习记录-[ts-challenge-Hello World]](./tsChallenge1.md)

# 二、题目分析

## 1. 实现 Pick

**实现 TS 内置的 Pick<T, K>，但不可以使用它。从类型 T 中选择出属性 K，构造成一个新的类型**
```js
/* _____________ Your Code Here _____________ */

type MyPick<T, K> = any


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

```

- 首先可以确定的是返回类型是至少包含`title: string`、`description: string`、`completed: boolean` 三者之一键值对的 `object` ，即 `type MyPick<T, K> = { key：value }`
- 接下来需要确认 `object` 内部的 `key`、`value`，我们知道 `key` 取自泛型 `K`，`value` 取自泛型 `T` 中 键 `key` 的键值，那么就有`type MyPick<T, K> = { [U in K]: T[U] }`
- 验证一下会发现有如下错误 `Type 'K' is not assignable to type 'string | number | symbol'.(2322)`，需要对泛型 `K` 进行约束，保证他的类型是 `string | number | symbol`,
`

Tips：关于 `Expect`、`Equal` 已在前文[TypeScript学习记录-[ts-challenge-Hello World]](./tsChallenge1.md)说明，这里不做赘述


[](./../image/TSChallenge1.1.png)

主要是认识一下在线工具的使用，进入页面点击左上角 `run` 在右侧抛出两条错误，点击报红处给出同样的错误信息 `Type 'false' does not satisfy the constraint 'true'.`


[](./../image/TSChallenge1.2.png)

将鼠标移至 `Expect` 可以看到其类型值为继承自 `true` 的泛型约束，错误信息表示其内部的 `NotAny`、`Equal` 返回值均为 `false`，所以需要确保两者返回为 `true`

[](./../image/TSChallenge1.3.png)

将鼠标移至 `NotAny` 可以看到其类型值为布尔值，取决于 继承自对 `IsAny<T>` 类型的判断，若其返回值为 `true` 需要 `IsAny<T>` 为 `false`，即泛型 `<T>` 不能是 `any` 类型

[](./../image/TSChallenge1.4.png)

将鼠标移至 `Equal(X, Y)` 可以看到其类型值为布尔值，取决于泛型函数 `<T>()` 的返回值，若其返回值为 `true` 需要 `(T extends X)  extends (T extends Y)` 即 `X` 与 `Y` 相等

## 解答

[](./../image/TSChallenge1.5.png)
从前面的分析我们知道要确保第一条测试通过， `HelloWorld` 不能是 `any` 类型

[](./../image/TSChallenge1.6.png)
要确保第二条测试通过，`HelloWorld` 类型需要与 `string` 类型相同


## other

**isAny 的实现**
```js
type A = IsAny<string> // false
type B = IsAny<any> // true
type C = IsAny<unknown> // false
type D = IsAny<never> // false

// 实现IsAny
type IsAny<T> = true extends (T extends never ? true : false) ?
        false extends (T extends never ? true : false) ?  true : false 
    : false;

// 更简单的实现
type IsAny<T> = 0 extends (T & 1) ? true : false;
```


