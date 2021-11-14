---
title: 响应式
search: true

date: 2021-11-13 09:05:23
tags: [Vue, Proxy]
photos:
description:
comments:
---

## 1\. 简单实现一个响应式函数，对一个对象内的key添加响应式
```javascript
const data = {
    a: 1,
    b: 2,
    c: {
        c1: 3
        c2: {
            cc: 4
        }
    }
}

输入：data.a = 'a'
输出：Set key=a value=a
输入：console.log(data.a)
输出：Get key=a value=a

const render = (key, value) => {
    console.log('Set key=${key} value=${value}');
}

const reactiveProperty = (key, Obj) => {
    reactive(pbj);

    Object.defineProperty(key, Obj, (
        get(){
            return Obj.key
        };
        set(){
            if(Obj.value === value){
                return
            }
            Obj.value = value
        }
        render(key, value)

    ))
}

const reactive = (obj) => {
    if(typeof obj === 'Object'){
        for(Obj in Obj){
            reactiveProperty(Obj)
        }

    }
}

## 2\. Vue对于数组的操作，怎么确定当前操作数组的方法


## 3\. Vue对于删除的操作（实现一个基于proxy的响应式，能监听基于删除的操作）

function makeObserver(target){
    let handlerName = Symbol('handler');
    observerStore.set(handlerName, []);

    target.observe = function(handler) {
        observerStore.get(handlerName.push(handler))
    };

    const proxyHandler = {
        get(target, property, receiver) {
            let success = Reflect.get(...arguments);

            if(success){
                observerStore.get(handlerName).forEach(handler => handler('Get', property, target[property]))
            }

            return success;
        },
        set(target, property, value, receiver) {
            let success = Reflect.get(...arguments);

            if(success){
                observerStore.get(handlerName).forEach(handler => handler('Get', property, target[property]))
            }

            return success;
        },
        deleteProperty(target, property, value, receiver) {
            let success = Reflect.deleteProperty(...arguments);

            if(success){
                observerStore.get(handlerName).forEach(handler => handler('Get', property, target[property]))
            }

            return success;
        },

    }
}

let user = {};

user = makeObserver(user);

user.Observe((action, key, value) => {
     console.log('${action} key=${key} value=${value || ''}');
})


输入：data.a = 'a'
输出：Set key=a value=a
输入：console.log(data.a)
输出：Get key=a value=a
输入：delete data.a = 'a'
输出：DELETE key=a value=
