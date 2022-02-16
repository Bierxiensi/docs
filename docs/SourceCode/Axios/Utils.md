---
title: axios-utils源码
search: true

date: 2021-12-25 14:05:23
tags: [axios, utils]
photos:
description:
comments:
---

> `utils` is a library of generic helper functions non-specific to axios

> `utils` 是一个非特定于 axios 的通用辅助函数库

# 一、环境准备

-   `axios` 版本 `v0.24.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/axios/axios/blob/HEAD/CONTRIBUTING.md) axios 源码
-   调试需要 `clone` 到本地

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

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ac5fbfede7a4a8daa04b9c81bb38d08~tplv-k3u1fbpfcp-watermark.image?)

Tips: 这是一个配合后述`extend`工具函数使用的方法，作用是当运行时存在明确的`this`指向即`thisArg`时将`fn`扩展（添加）到目标对象中，如图中的 showInfo

## 2. 使用`toString()`获取对象类型

> 可以通过 `toString()` 来获取每个对象的类型，关于 toString 更多的性质，详情见[toString](../../JavaScript/toString.md)

### 【2.1】 isArray

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
-   关于 Array 类型判断详情见[ECMA-262](https://262.ecma-international.org/6.0/#sec-object.prototype.tostring) - Let isArray be IsArray(Object).

Tips: 从`ECMA-262`文档可以看出，从 es6 后 toString()在判定 Array 类型时直接使用了 IsArray 方法，所以如果环境允许，直接使用 Array.isArray()也是可行的 🐶，这点在[`MDN` - Array.isArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)的 Polyfill 中也是有体现的。

Tips: `Array.isArray()` 是 es5 特性

### 【2.2】 isArrayBuffer

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
-   关于 ArrayBuffer 更多的性质，详情见[ArrayBuffer](../../JavaScript/Advance/ArrayBuffer.md)

### 【2.3】 isDate

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
-   关于 Date 类型判断详情见[ECMA-262](https://262.ecma-international.org/6.0/#sec-object.prototype.tostring) - if Object has a [[DateValue]] internal slot, let builtinTag be "Date".

### 【2.4】 isFile

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

### 【2.5】 isBlob

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

### 【2.6】 isFunction

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

-   isArray 封装了 Object 原型链函数 toString()，借助 toString()判断属性类型的性质判断 val 是否为 Function 函数类型
-   Object 原型链函数 toString()在成功判断数组时固定返回'[object Array]'
-   关于 Function 类型判断详情见[ECMA-262](https://262.ecma-international.org/6.0/#sec-object.prototype.tostring) - if Object has a [[Call]] internal method, let builtinTag be "Function".

## 3. 使用 `typeof` 获取未经计算的操作数

> 可以通过 `typeof` 来获取`未经计算的操作数`的类型，关于 typeof 更多的性质，详情见[typeof](../../JavaScript/typeof.md)

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

-   关于 isURLSearchParams（ URL 的查询字符串 ） 更多的性质，详情见[URLSearchParams](../../JavaScript/Advance/URLSearchParams.md)

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

-   先判断不是 undefined 和 再判断 `ArrayBuffer` 原型链存在`isView`方法，如果原型链存在 isView 方法，则使用`ArrayBuffer.isView()`判断，否则调用上述封装的`isArrayBuffer()`方法
-   关于 ArrayBuffer 更多的性质，详情见[ArrayBuffer](../../JavaScript/Advance/ArrayBuffer.md)

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
-   顾名思义，目标对象在原型链顶端或者其原型为 Object 类型，是纯粹的对象

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

-   关于 FormData 更多的性质，详情见[FormData](../../JavaScript/Advance/FormData.md)

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

-   关于 streams 流更多的概念参考[`MDN` - Streams API](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API)

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

-   去除首尾空格，str 原型链不存在`trim`方法的话就使用正则表达式
-   关于正则表达式更多内容见[正则表达式思维导图（学习补充 ing）](https://note.youdao.com/ynoteshare/index.html?id=7e3e1151acc297be673329bcba9c2e5b&type=note&_time=1642406764493)

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

-   如果是 null 或 undefined 直接返回
-   如果不可遍历则转换成 Array
-   如果是 Array 类型直接循环遍历
-   如果是 Object 类型则使用原型链上的`hasOwnProperty()`方法遍历，值得注意的是不推荐使用对象实例上的`hasOwnProperty()`，关于这一点参考[eslint no-prototype-builtins](https://eslint.org/docs/rules/no-prototype-builtins#disallow-use-of-objectprototypes-builtins-directly-no-prototype-builtins)

Tips: 这是一个配合后述`merge`与`extend`工具函数的方法，因此 `call` 中必填项`thisArg`未设置指向

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

-   作用是合并有相同键的 val 值
-   配合前述`forEach`工具函数，根据`arguments`长度循环遍历其中的每一项，需要注意的是`arguments[i]`有可能是对象 Object、数组 Array、null 或者未定义 undefined
-   首先进入 for 循环，其中 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 是一个对应于传递给函数的参数的类数组对象

-   每次遍历时调用`assignValue`方法，入参为`forEach`工具函数返回的内容
-   第一层 if 判断`result`中是否有键为`key`的纯对象，并且`forEach`返回的`val`即`obj[key]` 是否是纯对象，满足条件则进入递归，将 `val` 合并至 `result` 对应的键`key`下
-   第二层 else if `result`中是不含键为`key`的纯对象，并且 `val` 值是纯对象，满足条件则进入递归，在`result`中新建一个键为`key`的，值为`val`的纯对象
-   第三层 else if `val` 值是数组，满足条件则进入递归，在`result`中新建一个键为`key`的，值为`val`的对象，其中`val.slice()`作用是拷贝数据

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

-   作用是将`Object b`的属性和方法添加到`Object a`上
-   如果待添加的`val`是`function`且运行时存在明确的`this`指向`thisArg`，需要通过调用`bind`绑定至当前对象即`a`
-   如果待添加的`val`是`property`，直接在`a`上添加相应的`key-val`键值对

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

-   去掉字节顺序标记 BOM
-   字节顺序标记（英语：byte-order mark，BOM）是位于码点 U+FEFF 的统一码字符的名称。当以 UTF-16 或 UTF-32 来将 UCS/统一码字符所组成的字符串编码时，这个字符被用来标示其字节序，更多内容可以参考[`MDN` - TextDecoder](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder)

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

# 三、参考

1\. `Ethan01`的文章[阅读 axios 源码，发现了这些实用的基础工具函数](https://juejin.cn/post/7042610679815241758#heading-19)

2\. `李冰`老师的专栏[图解 Google V8 - 一篇文章彻底搞懂 JavaScript 的函数特点](https://time.geekbang.org/column/article/212123)

3\. [MDN](https://developer.mozilla.org/zh-CN/)
