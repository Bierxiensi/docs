---
title: TypeScript学习记录-[ts-challenge-Hello World]
search: true

date: 2022-04-16 20:05:23
tags: [TypeScript]
description:
comments:
---

> 最近学习了一些 `ts` 知识，偶然看到了 [type-challenges](https://github.com/type-challenges/type-challenges) 项目，感觉很有意思，是个很好的练习工具，来体验下

[](./../image/TSChallenge1.png)

## ts-challenge 是什么？

项目意在于更好的了解 TS 的类型系统，如果对于英文不熟悉可以直接看[README.zh-CN.md](https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md)

## 前置知识

在这之前需要掌握一点Ts基础知识，可以参考学习记录[TypeScript学习记录-[数据类型]](./../typescript1.md)、[TypeScript学习记录-[类和接口]](./../typescript1.md)、[TypeScript学习记录-[枚举和泛型]](./../typescript1.md)、[TypeScript学习记录-[类型别名]](./../typescript1.md)

## 题目分析

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


