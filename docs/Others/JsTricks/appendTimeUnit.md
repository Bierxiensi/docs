---
title: 天、小时、分钟、秒添加中文时间单位
search: true

date: 2022-05-24 20:05:23
tags: [JS, appendTimeUnit]
description: 添加中文时间单位
comments:
---

## 函数实现

```js
const day = (day) => {
    let ret = '';
    switch (day) {
        case 0:
            ret = '';
            break;
        default:
            ret = `${day}天`;
            break;
    }
    return ret;
};
const hour = (hour) => {
    let ret = '';
    switch (hour) {
        case 0:
            ret = '';
            break;
        default:
            ret = `${hour}小时`;
            break;
    }
    return ret;
};
const minute = (value) => {
    let ret = '';
    switch (value) {
        case 0:
            ret = '';
            break;
        default:
            ret = `${value}分钟`;
            break;
    }
    return ret;
};
const second = (second) => {
    let ret = '';
    switch (second) {
        case 0:
            ret = '';
            break;
        default:
            ret = `${second}秒`;
            break;
    }
    return ret;
};

let funEnums = {
    day: day,
    hour: hour,
    minute: minute,
    second: second,
};

let funUnion = ['day', 'hour', 'minute', 'second'];

const appendTimeUnit = (obj) => {
    if (!Object.keys(obj).length) {
        return '－';
    }
    let ret = '';
    for (var key in obj) {
        funUnion.includes(key) ? (ret = ret + funEnums[key](obj[key])) : (ret = ret);
    }
    return ret;
};

export default appendTimeUnit;
```

## 函数使用
```js

```