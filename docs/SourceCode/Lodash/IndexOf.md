---
title: lodash-indexOf源码研读解析
search: true

date: 2022-04-06 14:05:23
tags: [lodash, indexOf]
photos:
description:
comments:
---

> A modern JavaScript utility library delivering modularity, performance & extras.

> `lodash` 是一个一致性、模块化、高性能的 `JavaScript` 实用工具库

# 一、环境准备

-   `lodash` 版本 `v4.0.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/lodash/lodash/blob/HEAD/indexOf.js) `lodash - indexOf` 源码
-   调试测试用例可以 `clone` 到本地

```shell
git clone https://github.com/lodash/lodash.git

cd axios

npm install

npm run test
```

# 二、结构分析

![](./images/indexOf.png)

&emsp;&emsp;这是一张 `indexOf` 依赖引用路径图，相对复杂一些，按照功能划分，大致包括baseIndexOf模块、toInteger模块。接下来会自底向上分析各个依赖模块，包含`strictIndexOf`、`baseIsNaN`、`baseFindIndex`、`baseIndexOf`、`getTag`、`isSymbol`、`isObject`、`toNumber`、`toFinite`、`toInteger`、`toGetInteger`。


# 三、函数研读

## 1. strictIndexOf 模块

**indexOf的一个特殊版本，它执行严格的相等用于比较value，比如`===`**

```js
/**
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  let index = fromIndex - 1
  const { length } = array

  while (++index < length) {
    if (array[index] === value) {
      return index
    }
  }
  return -1
}

export default strictIndexOf
```

- 重点关注[MDN - Strict equality (===)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality)，全等运算符与相等运算符 `==` 最显著的区别是，如果操作数的类型不同，`==` 运算符会在比较之前尝试将它们转换为相同的类型。

## 2. baseIsNaN 模块

**'isNaN'的基本实现，不支持数字对象**

```js
/**
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value
}

export default baseIsNaN
```

-   重点关注全局属性 [NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN), `NaN` 的值表示不是一个数字（Not-A-Number）,在现代浏览器中（ES5中）， NaN 属性是一个不可配置（non-configurable），不可写（non-writable）的属性
-   在执行自比较之中：NaN，也只有NaN，比较之中不等于它自己，`NaN === NaN;  // false`


## 3. baseFindIndex 模块

**'findIndex'和'findLastIndex'的基本实现**

```js
/**
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate 每次迭代调用的函数
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}

export default baseFindIndex
```

-  重点关注 `index = fromIndex + (fromRight ? 1 : -1)` ，由于支持从右向左的迭代，起始`index`应该`+1`以防止`index--`越过`0`从而进入死循环，同理从左侧查起要确保查到`array[0]`从而起始 `index` 需要加一

## 4. baseIndexOf 模块

**没有`fromIndex`边界检查的`indexOf`的基本实现**

```js
import baseFindIndex from './baseFindIndex.js'
import baseIsNaN from './baseIsNaN.js'
import strictIndexOf from './strictIndexOf.js'

/**
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex)
}

export default baseIndexOf
```

-  `value` 如果不是 `NaN`，进入 `strictIndexOf`，从 `array[fromIndex]` 开始按序严格比较是否与 `value` 相等，若相等返回对应 `index`，否则返回 `-1`
-  `value` 如果是 `NaN`，进入 `baseFindIndex`，将 `baseIsNaN` 作为 `baseFindIndex` 的入参迭代函数 `predicate` 并开始从 `array[fromIndex]` 开始判断是否为 `NaN`，若找到 `NaN` 就返回对应 `index`，否则返回 `-1`
   
Tips：可以看到 `baseFindIndex` 模块中的有些形参是没有用到的，比如查找时是按照从左往右的顺序查找，并没有传入 `fromRight`，但提前占了坑，体现了很好的扩展性🐶

## 5. internal/getTag 模块

>

```js
const toString = Object.prototype.toString;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
    if (value == null) {
        return value === undefined ? "[object Undefined]" : "[object Null]";
    }
    return toString.call(value);
}

export default getTag;
```

- 使用非严格等 `==` 无法判断 `value` 是 `null` or `undefined`
- 使用严格等 `===` 判断 `value` 是 `null` or `undefined` 并设定 [toStringTag](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)(准确的说应该是`Symbol.toStringTag`)
- 如果 `null` or `undefined` 直接使用 `Object` 原型链函数 `toString()` 获取 `toStringTag`

Tips：许多内置的 `JavaScript` 对象类型即便没有 `toStringTag` 属性，也能被 `toString()` 方法识别并返回特定的类型标签，比如：`Object.prototype.toString.call([1, 2]);   // "[object Array]"`，但是有些对象类型则不然，`toString()` 方法能识别它们是因为`引擎`为它们设置好了 `toStringTag` 标签，比如：`Object.prototype.toString.call(new Map());   // "[object Map]"`

## 6. isSymbol 模块

```js
import getTag from "./.internal/getTag.js";

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
function isSymbol(value) {
    const type = typeof value;
    return (
        type == "symbol" ||
        (type === "object" &&
            value != null &&
            getTag(value) == "[object Symbol]")
    );
}

export default isSymbol;
```

-   可以通过 `typeof` 来获取 `未经计算的操作数` 的类型

## 7. isObject 模块

```js
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
function isObject(value) {
    const type = typeof value;
    return value != null && (type === "object" || type === "function");
}

export default isObject;
```

-   检查 value 是否是普通对象，即排除掉 null 类型的所有对象类型，包含 array、date、function 等对象类型

## 8. toNumber 模块

>

```js
import isObject from "./isObject.js";
import isSymbol from "./isSymbol.js";

/** 用作各种“数字”常量的引用 */
const NAN = 0 / 0;

/** 用于匹配前导和尾随空格 */
const reTrim = /^\s+|\s+$/g;

/** 用于检测错误的有符号十六进制字符串值 */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** 用于检测二进制字符串值 */
const reIsBinary = /^0b[01]+$/i;

/** 用于检测八进制字符串值 */
const reIsOctal = /^0o[0-7]+$/i;

/** 不依赖 `root` 的内置方法引用 */
const freeParseInt = parseInt;

/**
 * 将 `value` 转换成 number
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 */
function toNumber(value) {
    if (typeof value === "number") {
        return value;
    }
    if (isSymbol(value)) {
        return NAN;
    }
    if (isObject(value)) {
        const other =
            typeof value.valueOf === "function" ? value.valueOf() : value;
        value = isObject(other) ? `${other}` : other;
    }
    if (typeof value !== "string") {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, "");
    const isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value)
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : reIsBadHex.test(value)
        ? NAN
        : +value;
}

export default toNumber;
```

-   `NAN` 是一个不可写、不可配置、不可枚举的数据类型，表示未定义或不可表示的值。常在浮点数运算中使用。首次引入 NaN 的是 1985 年的 IEEE 754 浮点数标准。比如 0/0、0×∞、∞ + (−∞)、∞ - ∞、NANx1、ix1 等计算结果均会返回`NAN`

-   如果是 Number 类型则直接返回，如果是 symbol 类型返回 `NAN`
-   valueOf() 方法返回指定对象的原始值，配合 `typeof value.valueOf === "function"`，如果是 `function`类型则会返回函数本身，如果是其他非 `null`类型的 object 类型，则会返回对象本身
-   如果是非 string 类型且不为 0 则使用 + 操作符转换成 Number 类型
-   去掉首尾空格
-   在返回前对二进制、八进制、十六进制数据格式做最后检查，如果正确就使用 + 操作符转换成 Number 类型返回否则返回 NUll 🐶

## 9. toFinite 模块

```js
import toNumber from "./toNumber.js";

/** 用作各种“数字”常量的引用 */
const INFINITY = 1 / 0;
const MAX_INTEGER = 1.7976931348623157e308;

/**
 *  将 `value` 转换成有限 number
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 */
function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        const sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}

export default toFinite;
```

-   首先拿到 toNumber 返回的 value 值，判断是否为正负无穷，然后根据其正负状态转换成 js 可以表示的双精度浮点数。其中使用常量`INFINITY = 1 / 0` 表示无穷。

## 10. toInteger 模块

>

```js
import toFinite from "./toFinite.js";

/**
 * 将 `value` 转换成 integer
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @see isInteger, isNumber, toNumber
 * @example
 *
 * toInteger(3.2)
 * // => 3
 *
 * toInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2')
 * // => 3
 */
function toInteger(value) {
    const result = toFinite(value);
    const remainder = result % 1;

    return remainder ? result - remainder : result;
}

export default toInteger;
```

-   将 value 转换成整形操作步骤很简单，关键在于处理各种边界情况，相信也是日常开发以及面试的考察点。
-   这里主要是使用了 toFinite 做了边界处理，然后使用求余运算 `Number.MIN_VALUE`的余数为其本身，其余整数余数为 0 的性质将 `Number.MIN_VALUE`返回值置成 0

## 11. toGetInteger 模块

**使用 `SameValueZero` 等值比较，返回首次 `value` 在数组 `array` 中被找到的索引值，如果 `fromIndex` 为负值，将从数组 `array` 尾端索引进行匹配**

```js
import baseIndexOf from './.internal/baseIndexOf.js'
import toInteger from './toInteger.js'

/**
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array 需要查找的数组
 * @param {*} value 需要查找的值
 * @param {number} [fromIndex=0] 开始查询的位置
 * @returns {number} 返回值value在数组中的索引位置, 没有找到为返回-1
 * @example
 *
 * indexOf([1, 2, 1, 2], 2)
 * // => 1
 *
 * // Search from the `fromIndex`.
 * indexOf([1, 2, 1, 2], 2, 2)
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = fromIndex == null ? 0 : toInteger(fromIndex)
  if (index < 0) {
    index = Math.max(length + index, 0)
  }
  return baseIndexOf(array, value, index)
}

export default indexOf

```

- 如果参数 `array` 不为 `null` 并且有 `length` 属性，则认为其为 `Array` 类型，否则直接返回 `-1`
- 使用 `toInteger` 格式化入参 `fromIndex`，若 `fromIndex` 为负数，则将其按规则转化为自然数，使用此下标查询 `Array` 并返回查询结果