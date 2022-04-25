---
title: TypeScript学习记录-[ts-challenge-Readonly|omit]
search: true

date: 2022-04-20 21:05:23
tags: [TypeScript]
description:
comments:
---



## 前置知识

> 今日 【easy - 7.readonly】、【middle - 3.omit】

在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)

# 二、题目分析

## 1. readonly

**Readonly 会接收一个泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰**

```js
type MyReadonly<T> = any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
```

- 首先可以确定的是返回类型是 `object`（索引类型index Type）， 且其属性都会被 `readonly`，即 `type MyReadonly<T> = { readonly key：value }`，且包含的键值对个数
- `key` 应循环取自泛型 `T` 的索引，`value` 应循环取自泛型 `T` 的索引的值 `T[Key]`，需使用 `keyof T` 查询索引类型中所有的索引，结合运算符 `in ` 进行遍历，从而得到 `type MyReadonly<T> = { readonly [k in keyof T]: T[k] }`

## 2.Omit

**不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型**

```js
/* _____________ Your Code Here _____________ */

type MyOmit<T, K> = any


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}
```
- 首先可以确定的是返回类型是 `object`（索引类型index Type），且其属性均属于泛型 `T`，从而有 `type MyOmit<T, K> = { [key in keyof T]: T[key] }`
- `k` 中包含了需要排除的索引，即 `key in keyof K` 可以写作 `key in keyof Keys`, 从而有 `type MyOmit<T, key in keyof Keys> = { [key in keyof T]: T[key] }`，不过这样就产生了两个遍历联合类型的 `in` 运算，形成了嵌套判断。
- 这种情况下一般采用条件类型 `extends` 运算符进行判断，即 `k extends keyof T`、`key extends k ? never : key`。其中第一个 `extends` 结合 `keyof` 使用可以约束 `K` 的条件，即 `K` 的联合项必须来自接口 `T` 的属性否则 `Ts` 就会报错，此时 `extends` 通过推迟解析条件类型得到了一个联合类型；第二个 `extends` 用作条件类型判断，逻辑是 `key` 类型可被赋值于 `k` 类型则被赋予 `never`（），否则赋予 `key` 类型，从而排除掉泛型 `k` 中的 `key` 类型
- 结合上述分析，我们可以得到 `type MyOmit<T, Keys extends keyof T> = {  [key in keyof T as key extends Keys ? never : key]: T[key] }`，需要注意的是这里使用到了重映射运算符 `as` ，可以理解为前述中两个遍历联合类型的 `in` 运算中的嵌套链接。
