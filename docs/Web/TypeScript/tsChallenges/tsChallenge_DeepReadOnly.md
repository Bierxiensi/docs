---
title: TypeScript学习记录-[ts-challenge-DeepReadonly]
search: true

date: 2022-04-27 21:05:23
tags: [TypeScript、DeepReadonly]
description:
comments:
---



## 前置知识

> 今日【middle - 9.deep_readonly】

在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)

# 二、题目分析

## DeepReadonly

**实现一个通用的DeepReadonly<T>，它将对象的每个参数及其子对象递归地设为只读。**

```js
type DeepReadonly<T> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
```

- 我们知道JS的数据类型由七种原始数据类型（ Number， Boolean， String， Symbol， Bigint， Null， Undefined）以及对象（Objects）和函数（functions）两个基本元素构成，此外还有一些特殊的诸如 `Date`、`RegExp` 等对象元素。一个通用的 `DeepReadonly` 需要为所有原始数据类型添加 `readonly` 修饰符，而对于函数元素、`RegExp` 等对象元素来说并不需要，因此必然会分情况讨论。面对嵌套的 `Object` 也必然会使用递归。
- 普通的 `Readonly` 仅需一次循环即可为所有的属性添加 `readonly` 修饰 ，即 `type DeepReadonly<T, keys extends keyof T> = { readonly [key in keys]: T[key] }` ，其中 `keys extends keyof T` 对联合类型 `keys` 进行类型约束，确保后续使用 `in` 遍历 `keys` 时的每一个类型 `key` 均在泛型 `T` 的类型中。但目前的 `DeepReadonly` 有两点不同，一是无法确定类型 `key` 是否是原始类型，不能直接的在前面添加 `readonly`；二是无法确定类型 `key` 是否嵌套包含了其他类型，因此需要递归处理。
- 针对第一点，需要逐一对类型做枚举，即 `type DeepReadonly<T, keys extends keyof T> =  T extends Function ? T : readonly [key in keys]: T[key] }`这里仅以 `Function` 元素为例，使用 `extends ? :` 进行条件判断，如果泛型T是 `Function` 直接返回就好，否则才进行下一步。
- 针对第二点，需要对类型 `key` 进行递归调用，即 `type DeepReadonly<T, keys extends keyof T> =  T extends Function ? T : readonly [key in keys]: DeepReadonly<T[key]> }`。

一个完善的DeepReadonly可以参考[vuejs/core](https://github.com/vuejs/core/blob/main/packages/reactivity/src/reactive.ts)

![6d8d2bbce650c8298477abbaecf3292.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55a6196a965949c0bb7c907f6239bf41~tplv-k3u1fbpfcp-watermark.image?)
