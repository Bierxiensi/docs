<!--
 * @Descripttion: 
 * @version: 
 * @Author: zhangxiangyu
 * @Date: 2022-04-25 18:50:06
 * @LastEditors: zhangxiangyu
 * @LastEditTime: 2022-04-25 19:06:33
-->
---
title: TypeScript学习记录-[ts-challenge-return-type|omit]
search: true

date: 2022-04-20 21:05:23
tags: [TypeScript]
description:
comments:
---



## 前置知识

> 今日 【middle - 5.return-type】、【middle - 3.omit】

在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)

# 二、题目分析

## 1. return-type

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

- 首先可以确定的是返回类型是 `object`（索引类型index Type）

