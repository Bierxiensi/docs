---
title: toString
search: true

date: 2021-12-27 22:05:23
tags: [Object.property.tostring()]
photos:
description:
comments:
---

- 每个对象都有一个 toString() 方法
- 默认情况下，toString() 方法被每个 Object 对象继承
- 如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型

```js

var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]

```

重写Object原型链上的toString方法
```js
function Dog(name,breed,color,sex) {
  this.name = name;
  this.breed = breed;
  this.color = color;
  this.sex = sex;
}

var theDog = new Dog("Gabby", "Lab", "chocolate", "female");

// 重写前调用
theDog.toString(); // 返回 [object Object]

// 重写
Dog.prototype.toString = function dogToString() {
  return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
}
注意：（dogToString() 可以是一个匿名函数）

===》
Dog.prototype.toString = () =>{
  return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
}

// 重写后调用
theDog.toString() // "Dog Gabby is a female chocolate Lab"


```