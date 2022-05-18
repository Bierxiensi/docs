---
title: TypeScript学习记录-[ts-challenge-getReadOnlyKeys]
search: true

date: 2022-04-28 21:05:23
tags: [TypeScript]
description:
comments:
---



## 前置知识

> 今日 【extreme - 5.getReadOnlyKeys】

在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)

# 二、题目分析

## get-readonly-keys

**实现泛型GetReadonlyKeys<T>，该GetReadonlyKeys<T>返回对象的只读键的并集。**

```js
type GetReadonlyKeys<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}
```

- 首先可以确定的是返回类型是联合类型，类型值是泛型 `T` 中被 `readonly` 修饰的索引键名
- 为了挑选出符合条件的键需要对泛型 `T` 的每一项进行比较，这时候需要确定比较的方式，一个比较好的思路是利用 `Equal` 直接和符合条件的索引作比较，即 `Equal<{ [key in keyof T]: T[key] } , { readonly [Q]: T[Q] }>`
- 为了实现对泛型的每一项进行比较需要有两个前置工作 - 利用联合类型分发 `key`、通过 `Pick` 提取当前 `key` 的类型
- 利用联合类型分发 `key` 要求联合类型 `key` 约束为 `T` 类型，即 `type GetReadonlyKeys<T, Key extends keyof T>`
- `Pick<T, K>` 会从类型 `T` 中选择出属性 `K`，构造成一个新的类型，所以有 `Equal<Pick<T, K>, Readonly<Pick<T, K>>>`
- 结合上述分析得到 `type GetReadonlyKeys<T, K extends keyof T> = Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true ? K : never`


```js
/**
 * @description 获取只读`key`
 * @tips 1.利用联合类型分发`key`
 *       2.通过`Pick`提取当前`key`的类型
 *       3.通过`Equal`判断,只读与不只读是否一致
 */
type GetReadonlyKeys<T, K = keyof T> = K extends keyof T
  ? Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true
    ? K
    : never
  : never
```