---
title: axios-utils源码
search: true

date: 2021-12-23 19:05:23
tags: [utils]
photos:
description:
comments:
---

> utils is a library of generic helper functions non-specific to axios

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

### 1\. helper

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