---
title: TypeScript学习记录-[数据类型]
search: true

date: 2022-04-09 20:05:23
tags: [TypeScript]
description:
comments:
---

## JS原始数据类型
```js
- Number
- Boolean
- String
- Symbol
- Bigint

// ES6 新增
- Null
- Undefined
```

- 一种既非[对象](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)也无[方法](https://developer.mozilla.org/zh-CN/docs/Glossary/Method)的数据，值本身不可变。


## 基于JS原始数据类型引申的基础类型

**String**
```js
【✅】let str: string = 1
【✅】str = 'i am a str'
【❌】str = 1
```

**Number**
```js
【✅】let number: number = 1
【✅】number = 0b0001
【❌】number = 'one'
```

**Number-二进制表示**
```js
【✅】let binaryNumber: number = 0b0010
【✅】binaryNumber = 2
【❌】binaryNumber = 'two'
```

- `number` 类型接受二进制表示赋值

**Null、Undefined**
```js
【✅】let u: undefined = undefined
【✅】let n: null = null
【✅】number = undefined
【✅】binaryNumber = null
```

- `Null` 和 `Number` 类型是所有类型的子类型，因此可赋值于其他基础类型

## any类型和联合类型

```js
【✅】let notSure: any = 1
【✅】notSure = 0b0010
【✅】notSure = 'maybe it is string' 
【✅】notSure = true

【✅】let numberOrString: number | string = 123
【✅】numberOrString = 'abc'
```
- 可被任意类型赋值

## 非原始类型-Array

```js
【✅】let arOfNumber: number[] = [1,2,3]
【✅】let arOfNumber: number[] = [1,2,3,0b0100]
【❌】let arOfNumber: number[] = [1,2,3,0b0100, 'five']
【✅】arOfNumber.push(5)
【❌】arOfNumber.push('six')
```

## 类数组类型-ArrayLike
```js
【❌】function argument() { 
    let arr: any[] = arguments 
}
```

## Tuple(元组)类型
```js
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
```

**1.可选属性**
```js
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
```

**2.只读属性**
```js
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

**1.声明式函数**
```js
function add(x: number, y: number){
    return x + y;
}
【✅】add(1, 2)
【❌】add(1)
【❌】add(1, 2, 3)
```



**1.1可选参数1**
```js
function add(x: number, y: number, z?: number){
    if(typeof z === "number"){
        return x + y + z;
    }
    return x + y;
}
【✅】add(1, 2)
【✅】add(1, 2, 3)
【❌】function add(x: number, y?: number, z: number){}
```
**可选参数2**
```js
function add(x: number, y: number, z: number = 3){
    if(typeof z === "number"){
        return x + y + z;
    }
    return x + y;
}
【✅】add(1, 2)
【✅】add(1, 2, 3)
```

**2.表达式函数**
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
