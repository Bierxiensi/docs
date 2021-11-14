---
title: symbol
search: true

date: 2021-11-14 09:05:23
tags: [Vue, Virture Dom]
photos:
description:
comments:
---
## 前置
- 循環引用

coding

1\. 如何让一个对象可遍历

const obj = {

}


for(const item of obj){
    console.log(item)
}

2\. json.stringify会忽略symbol？还有呢？
是的，還有undefined function

3\. 对象有循环引用，可以用JSON.stringify来处理吗
报错

4\. 确定是JSON.stringify不是JSON.parse？

5\. 实现深拷贝

JSON.parse(JSON.stringify(obj))

```javascript
// 循環引用
// WeakMap 弱引用，不影垃圾圾回收
function deepClone(obj, hash = new WeakMap()){
    if(obj === null) {
        return null
    }
    if(obj instanceof Date) {
        return new Date(obj)
    }
    if(obj instanceof RegExp) {
        return new RegExp(obj)
    }
    // 基本类型，递归终止
    if(obj !== 'object') {
        return obj
    }

    // 以下破解循环引用且不影垃圾圾回收
    const resObj = Array.isArray(obj) ? [] : {};
 
    hash.set(obj, resObj);

    Reflect.ownkeys(obj).forEach(key => {
        resObj[key] = deepColne(obj[key], hash)
    })

    return resObj;

}