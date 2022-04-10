---
title: TypeScript学习记录[1]
search: true

date: 2021-11-27 20:05:23
tags: [TypeScript]
description:
comments:
---

## 原始数据类型

- Number
- Boolean
- String
- Symbol
- Bigint

- Null
- Undefined

值本身不可变

```js
let 
```

## 基础类型
```js
【✅】let number: number = 1
【✅】number = 0b0001
【❌】number = 'one'

【✅】let binaryNumber: number = 0b0010
【✅】binaryNumber = 2
【❌】binaryNumber = 'two'

【✅】let u: undefined = undefined
【✅】let n: null = null
【✅】number = undefined
【✅】binaryNumber = null

```

- `Null` 和 `Number` 类型是所有类型的子类型

## any类型和联合类型

```js
【✅】let notSure: any = 1
【✅】notSure = 0b0010
【✅】notSure = 'maybe it is string' 
【✅】notSure = true

【✅】let numberOrString: number | string = 123
【✅】numberOrString = 'abc'
```

## 非原始类型-Array和Tuple(元组)类型

```js
【✅】let arOfNumber: number[] = [1,2,3]
【✅】let arOfNumber: number[] = [1,2,3,0b0100]
【❌】let arOfNumber: number[] = [1,2,3,0b0100, 'five']
【✅】arOfNumber.push(5)
【❌】arOfNumber.push('six')

【❌】function argument() { 
    let arr: any[] = arguments 
}

【✅】let numberOrString: [number, string] = [1, 'two']
【❌】let numberOrString: [number, string] = [1]
【❌】let numberOrString: [number, string] = [1, 'two', 3]
```

## Object类型-Interface
- 对对象的形状（shape）进行描述
- 对（class）进行抽象
- Duck Typing（鸭子类型）

```js
interface IPerson {
    name: string;
    age: number;
}
【✅】let bierxiensi: IPerson = {
    name: 'bierxiensi',
    age: 22
}
【❌】let bierxiensi: IPerson = {
    name: 'bierxiensi'
}
【❌】let bierxiensi: IPerson = {
    name: 'bierxiensi',
    age: 22,
    gender: 'male'
}

// 可选属性
interface IPerson {
    name: string;
    age?: number;
}
【✅】let bierxiensi: IPerson = {
    name: 'bierxiensi',
    age: 22
}
【✅】let bierxiensi: IPerson = {
    name: 'bierxiensi'
}

// 只读属性
interface IPerson {
    readonly name: string;
    age?: number;
}
【✅】let bierxiensi: IPerson = {
    name: 'bierxiensi'
}
【❌】bierxiensi.name = 'Bierxiensi'
```

- readonly 和 const 类似，区别为 readonly 用于属性，const 用于变量

## 函数和类型推断

**声明式函数**
```js
function add(x: number, y: number){
    return x + y;
}
【✅】add(1, 2)
【❌】add(1)
【❌】add(1, 2, 3)

// 可选参数1
function add(x: number, y: number, z?: number){
    if(typeof z === "number"){
        return x + y + z;
    }
    return x + y;
}
【✅】add(1, 2)
【✅】add(1, 2, 3)
【❌】function add(x: number, y?: number, z: number){}

// 可选参数2
function add(x: number, y: number, z: number = 3){
    if(typeof z === "number"){
        return x + y + z;
    }
    return x + y;
}
【✅】add(1, 2)
【✅】add(1, 2, 3)
```

**表达式函数**
```js
const add = function(x: number, y: number, z: number = 3): number{
    if(typeof z === "number"){
        return x + y + z;
    }
    return x + y;
}
【✅】add(1, 2)
【❌】const add1: number = add
【✅】const add1: (x: number, y: number, z?: number) => number = add
【✅】const add1: number = add(1, 2)
【❌】const add1: (x: number, y: number, z?: number) => number = add(1, 2)
```

- `(x: number, y: number, z?: number) => number` 为声明函数类型返回值，源于 TS 的 compiler - Type Deference（类型推导）

## class