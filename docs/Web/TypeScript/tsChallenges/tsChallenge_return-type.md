---
title: TypeScript学习记录-[ts-challenge-return-type]
search: true

date: 2022-04-20 21:05:23
tags: [TypeScript]
description:
comments:
---



## 前置知识

> 今日 【middle - 5.return-type】

在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)

# 二、题目分析

##  return-type

**实现 TypeScript 的 ReturnType<T> 泛型**

```js
type MyReturnType<T> = any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
]

type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2
```

- 首先可以确定的是返回的是泛型函数 `() => type`，对于其中的含参情况要做泛型处理即 `(...arguments: any[]) => type`，其中 `...arguments`称之为 `类数组类型` ，是一个对应于传递给函数的参数的类数组对象，可以参考 [MDN-Arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)，由于无法确定参数类型，这里使用 `any` 类型
- 为了返回正确的 `arguments` 类型，需要逐一对之进行类型匹配，这样的过程通常被称为 `模式匹配`， 一个常见的模式匹配如下 `type GetValueType<P> = P extends Promise<infer Value> ? Value : never;`， [通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。](https://juejin.cn/book/7047524421182947366/section/7048281581428932619)
- 由于 `arguments` 是 `类数组`，这里需要使用数组类型的模式匹配 `type MyReturnType<T extends any[]> = T extends (...args: any[]) => type ? type : never` 
- 经过前述分析我们知道 `类数组 arguments` 中值的类型是需要提取的，需要通过 infer 声明一个局部变量来保存，所以最终得到 `type MyReturnType<T extends any[]> = T extends (...args: any[]) => infer type ? type : never` 


Tips：关于 `模式匹配` 这点的细节可以参考[神说要有光](https://juejin.cn/user/2788017216685118) 的掘金小册

