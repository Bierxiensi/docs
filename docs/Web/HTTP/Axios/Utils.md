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

# 一、环境

-   [网页查看](https://github1s.com/axios/axios/blob/HEAD/CONTRIBUTING.md)

-   本地调试

```shell
git clone https://github.com/axios/axios.git

cd axios

npm start

http://localhost:3000/
```

# 二、函数研读

## 1. helper 函数

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

## 2. 使用`toString()`获取对象类型

> 可以通过 `toString()` 来获取每个对象的类型，关于 toString 更多的性质，详情见[toString](../../JavaScript/toString.md)

### 【2.1】\. isArray

```js
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
-   关于 Array 类型判断详情见[ECMA-262](https://262.ecma-international.org/6.0/#sec-object.prototype.tostring) Let isArray be IsArray(Object).

Tips: 从`ECMA-262`文档可以看出，从 es6 后 toString()在判定 Array 类型时直接使用了 IsArray 方法，所以如果环境允许，直接使用 Array.isArray()也是可行的 🐶，这点在`MDN`[Array.isArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)的 Polyfill 中也是有体现的。

Tips: `Array.isArray()` 是 es5

### 【2.2】\. isArrayBuffer

```js
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
}
```

-   并未在 MDN 上找到示例

### 【2.3】\. isDate

```js
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
    return toString.call(val) === "[object Date]";
}
```

-   isArray 封装了 Object 原型链函数 toString()，借助 toString()判断属性类型的性质判断 val 是否为日期类型
-   Object 原型链函数 toString()在成功判断数组时固定返回'[object Date]'
-   关于 Date 类型判断详情见[ECMA-262](https://262.ecma-international.org/6.0/#sec-object.prototype.tostring) if Object has a [[DateValue]] internal slot, let builtinTag be "Date".

### 【2.4】\. isFile

```js
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
    return toString.call(val) === "[object File]";
}
```

-   并未在 MDN 上找到示例

### 【2.5】\. isBlob

```js
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
    return toString.call(val) === "[object Blob]";
}
```

-   并未在 MDN 上找到示例

### 【2.6】\. isFunction

```js
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
    return toString.call(val) === "[object Function]";
}
```

-   isArray 封装了 Object 原型链函数 toString()，借助 toString()判断属性类型的性质判断 val 是否为日期类型
-   Object 原型链函数 toString()在成功判断数组时固定返回'[object Array]'
-   关于 Function 类型判断详情见[ECMA-262](https://262.ecma-international.org/6.0/#sec-object.prototype.tostring) if Object has a [[Call]] internal method, let builtinTag be "Function".

## 3. 使用 `typeof` 获取未经计算的操作数

> 可以通过 `typeof` 来获取`未经计算的操作数`的类型，关于 typeof 更多的性质，详情见[toString](../../JavaScript/typeof.md)

### 【3.1】 isUndefined

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
```

### 【3.2】 isString

```js
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
    return typeof val === "string";
}
```

### 【3.3】 isNumber

```js
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
    return typeof val === "number";
}
```

### 【3.4】 isObject

```js
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
    return val !== null && typeof val === "object";
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

-   检查 value 是否是普通对象，即排除掉 null 类型的所有对象类型，包含 array、date 等对象类型

## 4. 使用 `instanceof` 检测当前实例原型链是否包含 prototype 属性

> 可以通过 `instanceof` 运算符检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，关于 instanceof 更多的性质，详情见[instanceof](../../JavaScript/Advance/instanceOf.md)

### 【4.1】isURLSearchParams

```js
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
    return (
        typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams
    );
}
```

-   关于 isURLSearchParams（ URL 的查询字符串 ） 更多的性质，详情见[toString](../../JavaScript/Advance/URLSearchParams.md)

## 5. 复合类型

> 通过 `toString()` 、`typeof`、`instanceof`等 API 及上述工具函数功能组合

### 【5.1】isBuffer

```js
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */

function isBuffer(val) {
    return (
        val !== null &&
        !isUndefined(val) &&
        val.constructor !== null &&
        !isUndefined(val.constructor) &&
        typeof val.constructor.isBuffer === "function" &&
        val.constructor.isBuffer(val)
    );
}
```

-   先判断不是 undefined 和 null，再判断 `val`存在`构造函数`，因为`Buffer`本身是一个类，最后通过自身的`isBuffer`方法判断
-   axios 可以运行在浏览器和 node 环境中，所以内部会用到 nodejs 相关的 Buffer 类知识。
-   关于 Buffer 更多的性质，详情见[Buffer](../../JavaScript/Advance/Buffer.md)

### 【5.2】 isArrayBufferView

```js
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
    } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
}
```

### 【5.3】 isPlainObject

```js
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
        return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}

function Foo() {
    this.a = 1;
}

_.isPlainObject(new Foo());
// => false

_.isPlainObject([1, 2, 3]);
// => false

_.isPlainObject({ x: 0, y: 0 });
// => true

_.isPlainObject(Object.create(null));
// => true
```

-   判断目标对象的原型是不是`null` 或 `Object.prototype`

### 【5.4】 isFormData

```js
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
}
```

### 【5.5】 isStream

```js
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
```

## 6. 正则表达式

### 【6.1】 trim

```js
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
```

-   去除首尾空格，`trim`方法不存在的话，用正则

## 7. 重写

### 【7.1】 forEach

```js
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === "undefined") {
        return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== "object") {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }

    if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
```

## 8. js strikes

### 【8.1】merge

````js
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}
````

### 【8.2】extend

```js
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
```

### 【8.3】stripBOM

```js
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1);
    }
    return content;
}
```

## 9 环境

### 【9.1】 isStandardBrowserEnv

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
    if (
        typeof navigator !== "undefined" &&
        (navigator.product === "ReactNative" ||
            navigator.product === "NativeScript" ||
            navigator.product === "NS")
    ) {
        return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
}
```

-   判断标准浏览器环境，官方不再推荐[navigator.product](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/product)
