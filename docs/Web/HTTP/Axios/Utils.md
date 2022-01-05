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
> utils 是一个非特定于 axios 的通用辅助函数库

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

### 1\. isArray

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
    return toString.call(val) === "[object Array]";
}
```

-   isArray 封装了 Object 原型链函数 toString()，借助 toString()判断属性类型的性质判断 val 是否为数组
-   Object 原型链函数 toString()在成功判断数组时固定返回'[object Array]'
-   关于 toString 更多的性质，详情见[toString](../../JavaScript/toString.md)

### 2\. isUndefined

```js
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
    return typeof val === "undefined";
}

- 直接使用typeof判断，详情见[typeOf](../../JavaScript/typeof.md)
```

### 3\. isBuffer
```js

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */

// 先判断不是 `undefined`和`null`
// 再判断 `val`存在构造函数，因为`Buffer`本身是一个类
// 最后通过自身的`isBuffer`方法判断

function isBuffer(val) {
  return val !== null 
          && !isUndefined(val) 
          && val.constructor !== null 
          && !isUndefined(val.constructor)
          && typeof val.constructor.isBuffer === 'function' 
          && val.constructor.isBuffer(val);
}

```
什么是Buffer?
JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
因为axios可以运行在浏览器和node环境中，所以内部会用到nodejs相关的知识。



### 4\. isArrayBuffer

```js
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

```
- 并未在MDN上找到示例

### 5\. isFormData

```js

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}
```
- 并未在MDN上找到示例


### 6\. isArrayBufferView

```js
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}
```

### 7\. isPlainObject

```js
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}


function Foo() {
  this.a = 1;
}

_.isPlainObject(new Foo);
// => false

_.isPlainObject([1, 2, 3]);
// => false

_.isPlainObject({ 'x': 0, 'y': 0 });
// => true

_.isPlainObject(Object.create(null));
// => true

```
- 判断目标对象的原型是不是`null` 或 `Object.prototype`

### 8\. isObject

```js
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}


_.isObject({});
// => true

_.isObject([1, 2, 3]);
// => true

_.isObject(_.noop);
// => true

_.isObject(null);
// => false
```

- 检查 value 是否是普通对象

### 9\. trim

```js
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

```

- 去除首尾空格，`trim`方法不存在的话，用正则


### 10\. trim

```js
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

```

- 判断标准浏览器环境，官方不再推荐navigator.product