---
title: TypeScript学习记录-[ts-challenge-Readonly2]
search: true

date: 2022-04-26 21:05:23
tags: [TypeScript、Readonly2]
description:
comments:
---

## 前置知识

> 今日 【middle - 8.readonly2】

在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)

# 二、题目分析

## readonly2

**实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样**

```js
type MyReadonly2<T, K> = any


/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
```

- 首先可以确定的是返回类型是 `object`（索引类型index Type）， 且其属性都会被 `readonly`，即 `type MyReadonly<T> = { readonly key：value }`，且包含的键值对个数
- `key` 应循环取自泛型 `T` 的索引，`value` 应循环取自泛型 `T` 的索引的值 `T[Key]`，需使用 `keyof T` 查询索引类型中所有的索引，结合运算符 `in ` 进行遍历，从而得到 `type MyReadonly<T> = { readonly [k in keyof T]: T[k] }`
