---
title: TypeScript学习记录-[ts-challenge-实现Pick]
search: true

date: 2022-04-17 20:05:23
tags: [TypeScript, Pick]
description:
comments:
---
# 一、前置

[](./../image/TSChallenge1.png)

> 今日level 【easy 4・实现 Pick】


在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)，关于Playground如何使用、如何刷题可以参考[TypeScript学习记录-[ts-challenge-Hello World]](./tsChallenge1.md)

# 二、题目分析

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

首先可以确定的是返回类型是至少包含`title: string`、`description: string`、`completed: boolean` 三者之一键值对的 `object` ，即 `type MyPick<T, K> = { key：value }`

接下来需要确认 `object` 内部的 `key`、`value`，我们知道 `key` 取自泛型 `K`，`value` 取自泛型 `T` 中 键 `key` 的键值，那么就有`type MyPick<T, K> = { [U in K]: T[U] }`，这里使用的 `in` 是用于遍历联合类型的运算符

[](./../image/TSChallenge2.1.png)

验证一下会发现有如下错误 `Type 'K' is not assignable to type 'string | number | symbol'.(2322)`，需要对泛型 `K` 进行约束，保证他的类型是 `string | number | symbol`，我们可以建立一个新的类型 `type Itype = string | number | symbol;` 让泛型 `K` 继承自它

[](./../image/TSChallenge2.2.png)

验证一下会发现有如下错误 `Type 'U' cannot be used to index type 'T'.(2536)`，在对泛型 `K` 进行约束，保证他的类型是 `string | number | symbol` 时，进行 `value` 取值发现泛型 `T` 识别不了类型 `U`，考虑让泛型 `K` 继承泛型 `T` 的键值类型，这里使用索引查询 `keyof` 索引泛型 `T` 的键值，并让泛型 `K` 继承

[](./../image/TSChallenge2.3.png)


Tips：关于 `Expect`、`Equal` 已在前文[TypeScript学习记录-[ts-challenge-Hello World]](./tsChallenge1.md)说明，这里不做赘述



