---
title: TypeScript学习记录-[枚举和泛型]
search: true

date: 2022-04-11 20:05:23
tags: [TypeScript]
description:
comments:
---

## enums

**普通枚举**
```js
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up) // 0
console.log(Direction[0]) // Up
```

- 描述一定范围内的一系列常量

**常量枚举**
```js
const enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

- 只有常量值可以进行常量枚举
- 直接内联枚举值，不会编译成JS，从而提升性能

## 泛型

**未知数据类型**
```js
function echo(arg: any): any{
  return arg
}

【🐛】const res: string = echo(123)
```

- 使用 `any `会引发类型 `bug`

**单元素泛型**
```js
function echo<T>(arg: T): T{
  return arg
}

【❌】const res: string = echo(123)
【✅】const res: string = echo('123')
【✅】const res = echo(123)
```

- `<T>` 可以理解为一个占位符/变量，接受的值为数据类型
- `T` 是一种通俗写法

**在元组中使用泛型**
```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
  
const res = swap([123, '123']) // const res: [string, number]
```

**约束泛型**
```js
function echoWithArr<T>(arg: T): T {
   【❌】 return arg.length // 类型“T”上不存在属性“length”
}
```
- 编译时不确定泛型 `T` 包含 `length`

```js
function echoWithArr<T>(arg: T[]): T[] {
    return arg
}

【❌】const arr = echoWithArr('123')
【✅】const arr1 = echoWithArr([1 ,2 ,3])
```
- 编译时知道泛型 `T` 是包含 `length` 的 `array`
- 传参时必须确保入参为数组

```js
interface IWithLength {
    length: number
}
function echoWithArr<T extends IWithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}

const str = echoWithArr('123') // const str: "123"
const obj = echoWithArr({ length: 3 }) // const obj: {  length: number; }
const arr = echoWithArr([1,2,3]) // const arr: number[]
```
- 使用 `extends` 实现条件约束，确保入参包含 `length` 属性

**在类中使用泛型**
```js
class Queue {
    private data = [];
    push(item: number){
        return this.data.push()
    }
    pop(): number{
        return this.data.pop()
    }
}

const queue = new Queue()
【✅】queue.push(1)
【❌】queue.push('1')
【✅】console.log(queue.pop().toFixed())
【❌】console.log(queue.pop().length)
```

- 必须确保所有数据为 `number` 类型

```js
class Queue<T> {
    private data = [];
    push(item: T){
        return this.data.push()
    }
    pop(): T{
        return this.data.pop()
    }
}

const queue = new Queue<number>()
【✅】queue.push(1)
【✅】console.log(queue.pop().toFixed())
const queue1 = new Queue<string>()
【✅】queue1.push('1')
【✅】console.log(queue.pop().length)
```

- 更加灵活

**在接口中使用泛型**
```js
interface KeyPair<T, U> {
    key: T;
    value: U
}

【✅】let kp1: KeyPair<number, string> = { key: 123, value: '123' }
【✅】let kp2: KeyPair<string, number> = { key: '123', value: 123 }

【✅】let arr1: number[] = [1, 2, 3]
=》泛型实现
【✅】let arr2: Array<number> = [1, 2, 3]

【✅】let arr3: string[] = ['1', '2', '3']
=》泛型实现
【✅】let arr4: Array<string> = ['1', '2', '3']
```

**在函数中使用泛型**
```js

interface IPlusOrIConnection<T> {
    (a: T, b: T) : T
}
function plus(a: number, b: number): number {
    return a + b
}

function connection(a: string, b: string): string {
    return a + b
}

【✅】const add: IPlusOrIConnection<number> = plus
【✅】const con: IPlusOrIConnection<string> = connection
```

- 泛型可以理解为类型的占位符，在使用时才指定数据的类型
- 随着参数不同可以适配多变的类、接口、函数




