---
title: TypeScript学习记录-[类和接口]
search: true

date: 2022-04-10 20:05:23
tags: [TypeScript]
description:
comments:
---

## class

- 类（class）定义了一切事物的抽象特点
- 对象（Object）类的实例
- 面向对象（OOP）三大特性-封装、继承、多态

**封装**
```js
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
       return `${this.name} is running` 
    }
}

const rabbit = new Animal('Zhu Di')
```

- 包含属性、方法

**继承**
```js
class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}

const littleEight = new Dog('Little Eight')
```
- 使用关键字 `extends` 表明继承的父类为 `Animal`

**多态**
```js
class Cat extends Animal {
    constructor(name: string){
        super(name);
    }
    run() {
       return `${this.name}` + super.run() 
    }
}

const Tom = new Cat('Tom')
```

- 在构造函数 `constructor` 中使用关键字 `super` 可以重写父类的方法，同时也可调用父类的方法

## class-权限管理-修饰符

**public**
```js
class Animal {
    public name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
       return `${this.name} is running` 
    }
}

const rabbit = new Animal('Zhu Di')
【✅】rabbit.name = 'Xiao hong mao'
```

- 包含其子类在内，均可读可写添加上 `public` 修饰符的属性

**private**
```js
class Animal {
    private name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
       return `${this.name} is running` 
    }
}

const rabbit = new Animal('Zhu Di')

【❌】rabbit.name = 'Xiao hong mao'
【❌】class Cat extends Animal {
            constructor(name: string){
                super(name);
            }
            run() {
            return `${this.name}` + super.run() 
            }
        }
```

- 包含其子类在内，均不可读写添加上 `private` 修饰符的属性

**protected**
```js
class Animal {
    protected name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
       return `${this.name} is running` 
    }
}

const rabbit = new Animal('Zhu Di')

【❌】rabbit.name = 'Xiao hong mao'
【✅】class Cat extends Animal {
        constructor(name: string){
            super(name);
        }
        run() {
        return `${this.name}` + super.run() 
        }
    }
```

- 仅其子类可读写添加上 `protected` 修饰符的属性

**readonly**
```js
class Animal {
    readonly name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
       return `${this.name} is running` 
    }
}

const rabbit = new Animal('Zhu Di')
【✅】console.log(rabbit)
【❌】rabbit.name = 'Xiao hong mao'
```

- 包含其子类在内，均只能读取添加上 `public` 修饰符的属性

**static**
```js
class Animal {
    public name: string;
    static categories: string[] = ['mammal', 'bird'];
    static isAnimal(val) {
        return val instanceof Animal;
    };
    constructor(name: string) {
        this.name = name
    }
    run() {
       return `${this.name} is running` 
    }
}

const rabbit = new Animal('Zhu Di')

【✅】console.log(rabbit.categories)
【✅】console.log(rabbit.isAnimal())
```

- 无需实例化子类即可直接使用添加上 `public` 修饰符的属性和方法

## interface

```js
interface Action {
    run(): void;
}

class Animal implements Action {
    run(){

    }
}

class Car implements Action {
    run(){

    }
}
```

- 在某些可能基于不同的父类但却有相同行为的情况下可以使用接口(`interface`)提取不同类之间的相同行为，极大的提高了灵活性
