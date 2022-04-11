---
title: TypeScript学习记录-[类型别名]
search: true

date: 2022-04-11 20:05:23
tags: [TypeScript、aliases]
description:
comments:
---

## 类型别名（type aliases）

**普通类型别名**
```js
type plusType = (a: number, b: number) => number

function plus(a: number, b: number): number {
    return a + b
}
const add: plusType = plus
```

**联合类型别名**
```js

【❌】function getName1(n: string | ((x: number) => string)) {}

【✅】
type NameResolver = () => string
type NameOrResolver =  string | NameResolver
function getName(n: NameOrResolver): string {
    if(typeof n === 'string'){
        return n
    } else {
        return n()
    }
}
```

- 入参为 `string` 类型或返回值为 `string` 类型的函数（NameResolver）

## 类型断言（type assertion）
```js
【❌】
function getLength(input: string | number): number {
    return input.length // 类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。ts(2339)
}

【✅】
function getLength(input: string | number): number {
    const str = input as String
    if(str.length){
        return str.length
    } else {
        const number = input as Number
        return number.toString().length
    }
}

【✅】==> 简写
function getLength(input: string | number): number {
    const str = input as String
    if((`<string>`input).length){
        return (`<string>`input).length
    } else {
        return input.toString().length
    }
}

【❌】
function getLength(input: string | number): boolean {
    return `<boolean>`input // 类型 "string | number" 到类型 "boolean" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。类型“number”不可与类型“boolean”进行比较。
}
```

- TS不确定联合类型的变量具体是哪种类型时只能使用联合类型的公共属性、方法
- 通过关键字 `as` 断言 `input` 为 `String` 类型，从而绕过编译器类型推断
- `String`、`Number` 断言类型来自 `interface`
- 类型断言不是类型转换，需要断言的类型需要时联合类型中存在的类型

## 声明文件
**像 `JS` 使用 `<script>` 标签引入三方库一样， `Ts` 也需要使用一种语法引入第三反库，即 `declare` 语法**
```js
declare var jQuery: (selector: string) => any

==> jQuery.d.ts
```

- 借助类型声明 `.d.ts` 文件可以使 `.ts` 文件获得类型定义（需要配置 `tsc` 编译器确保 `.d.ts` 可被编译）
- 需要配置大量的 `declare` 声明文件，可以参考 [definitelytyped](http://definitelytyped.org/) 组织的 `@types` 声明文件 `npm install --save-dev @types/jquery`
- 可以在[typescriptlang](https://www.typescriptlang.org/dt/search?search=)搜索你需要安装的声明文件

