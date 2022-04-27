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

- 首先可以确定的是返回类型是 `object`（索引类型index Type）， 且其中属于泛型 `K` 的属性都是 `readonly` 属性，即 `type MyReadonly2<T, keys extends keyof T> = { readonly [key in keys]: T[key] }` ，其中 `keys extends keyof T` 对联合类型 `keys` 进行类型约束，确保后续使用 `in` 遍历 `keys` 时的每一个类型 `key` 均在泛型 `T` 的类型中
- 接下来要取包含在泛型 `T` 但不包含在泛型 `k(keys)` 中的属性，可以这样写 `[key in keyof T as key extends keys ? never : key]: T[key]`，这里的重映射运算符 `as` 将在遍历运算中的每一项类型 `key` 使用 `extends ? :` 进行条件判断，符合前述条件的类型将被返回，而属于泛型 `k(keys)` 的属性将被丢弃（`never` 代表不可达）
- 经过上述分析我们将得到 `type MyReadonly2<T, keys extends keyof T> =  { readonly [key in keys]: T[key] } & { [key in keyof T as key extends keys ? never : key]: T[key] }`，这里通过交叉类型（`Intersection`）运算对类型做合并（两者都属于`obj`类型，同一类型可以合并，不同的类型无法合并），这样经过 `MyReadonly2` 运算就得到了一个 `K` 指定应设置为 `Readonly` 的 `T` 的属性集
- 值得注意的是 `<T, Keys extends keyof T> = {  [key in keyof T as key extends Keys ? never : key]: T[key] }` 是 `Omit<T, K>` 泛型的实现，前述内容可以简化为 `type MyReadonly2<T, keys extends keyof T> =  { readonly [key in keys]: T[key] } & Omit<T, K>`
  
[](./../image/tsChallenge_ReadOnly2.1.png)

- 为了实现 `如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样` 这个条件，在 `keys extends keyof T` 中，需要对泛型 `keys` 设定原始类型，即 `keys = keyof T`，加上类型约束就得到了 `keys extends keyof T = keyof T`，从而得到了最终的结果 `type MyReadonly2<T, keys extends keyof T = keyof T> =  { readonly [key in keys]: T[key] } & { [key in keyof T as key extends keys ? never : key]: T[key] }`

[](./../image/tsChallenge_ReadOnly2.2.png)