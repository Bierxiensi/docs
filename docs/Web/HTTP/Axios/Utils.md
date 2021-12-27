---
title: axios-utils源码
search: true

date: 2021-12-25 14:05:23
tags: [utils]
photos:
description:
comments:
---

> utils is a library of generic helper functions non-specific to axios
> utils是一个非特定于axios的通用辅助函数库

## 环境

-   [网页查看](https://github1s.com/axios/axios/blob/HEAD/CONTRIBUTING.md)

-   本地调试

```shell
git clone https://github.com/axios/axios.git

cd axios

npm start

http://localhost:3000/
```

## 函数研读

### pre-1\. helper

```js
var bind = require('./helpers/bind');

===>
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

```


### 1\.

```js
// 可以通过 `toString()` 来获取每个对象的类型
var toString = Object.prototype.toString;



/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}
```