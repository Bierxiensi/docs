---
title: lodash-difference源码研读解析【一、cache】
search: true

date: 2021-12-25 14:05:23
tags: [lodash, difference]
photos:
description:
comments:
---

> A modern JavaScript utility library delivering modularity, performance & extras.

> `lodash` 是一个一致性、模块化、高性能的 `JavaScript` 实用工具库

# 一、环境准备

-   `lodash` 版本 `v4.0.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/lodash/lodash/blob/HEAD/difference.js) `lodash - difference` 源码
-   调试测试用例可以 `clone` 到本地

```shell
git clone https://github.com/lodash/lodash.git

cd axios

npm install

npm run test
```

# 二、结构分析

![](./images/difference_relation.jpg)

&emsp;&emsp;这是一张 `difference` 依赖引用路径图，相对复杂一些，按照功能划分，大致包括 `cache` 模块、 `index` 模块和  `flatten` 模块。接下来会自底向上分析各个依赖模块。由于依赖较多，篇幅较长，将按照模块分成四个部分，本篇主要讲述 `difference` 主体模块，包含 `isArrayLike`、`isObjectLike`、`isArrayLikeObject`、`arrayIncludesWith`、`map`、`cacheHas`、`baseDifference`、`difference`。

# 三、函数研读

## 1. isArrayLike 模块

**检查 `value` 是否与数组类似。值被视为数组，它不是函数并且有一个 `value.length` ，这是一个大于等于'0'且小于 `MAX_SAFE_INTEGER`的 `Number` **

```js
import isLength from './isLength.js'
/**
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 */
function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length)
}

export default isArrayLike

```

-  重点关注 `isLength`，判断规则是 `typeof value === 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER`，其中 `value % 1 == 0` 确保 `value` 是整数，`MAX_SAFE_INTEGER = 9007199254740991`

## 2. isObjectLike 模块

**检查“value”是否与对象类似，如果不为空则是一个对象，并且会有一个“typeof”运算结果为“object”返回值**

```js
/**
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}

export default isObjectLike

```

-   可以通过 `typeof` 来获取 `未经计算的操作数` 的类型，下面是一个 `typeof` 运算结果集

|                      类型                       | 结果              |
| :---------------------------------------------: | :---------------- |
|                    Undefined                    | "undefined"       |
|                      Null                       | "object"          |
|                     Boolean                     | "boolean"         |
|                     Number                      | "number"          |
|          BigInt(ECMAScript 2020 新增)           | "bigint"          |
|                     String                      | "string"          |
|          Symbol (ECMAScript 2015 新增)          | "symbol"          |
|           宿主对象（由 JS 环境提供）            | 取决于具体实现    |
| Function 对象 (按照 ECMA-262 规范实现 [[Call]]) | "function"        |
|                  其他任何对象                   | "object"          |


## 3. isArrayLikeObject 模块

**此方法类似于 `isArrayLike`，只是它还检查 `value` 是一个 `Object`**

```js
import isArrayLike from './isArrayLike.js'
import isObjectLike from './isObjectLike.js'
/**
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * isArrayLikeObject([1, 2, 3])
 * // => true
 *
 * isArrayLikeObject(document.body.children)
 * // => true
 *
 * isArrayLikeObject('abc')
 * // => false
 *
 * isArrayLikeObject(Function)
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value)
}

export default isArrayLikeObject

```

-  封装了 `isObjectLike` 与 `isArrayLike`，当 `value` 同时符合两者所检测的目标类型时返回 `true`，否则返回 `false`

## 4. arrayIncludesWith 模块

**这个函数类似于 `arrayIncludes`，只是它接受一个比较器(comparator)**

```js
/**
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, target, comparator) {
  if (array == null) {
    return false
  }

  for (const value of array) {
    if (comparator(target, value)) {
      return true
    }
  }
  return false
}

export default arrayIncludesWith

```

- 如果待搜索数组 `array` 是 `null`，直接返回 `false`
- 使用 `for...of` 迭代待搜索数组 `array` 中的每一项，使用 `if` 判断比较器 `comparator(target, value)` 的返回值并给出对应返回结果 🐶

## 5. map 模块

**通过 `iteratee` 运行 `array` 的每个元素来创建一个数组 `result`。`iteratee` 由三个参数调用：(value, index, array)。**

```js
/**
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map([4, 8], square)
 * // => [16, 64]
 */
function map(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}

export default map

```

-  使用 `new Array` 创建一个对应其长度的数组 `result`，其中 `array` 为 `null` 时，长度为 `0`，将会创建一个空数组
-  按照 `array` 长度循环调用 `iteratee`，每次循环步长 + 1


## 6. cacheHas 模块

**检查 `key` 的 `cache` 值是否存在**

```js
/**
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key)
}

export default cacheHas
```

- `cache` 和 `key` 均为入参

## 7. baseDifference 模块

**像 `difference` 这样的方法的基本实现，不支持排除多个数组**

```js
import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from './cacheHas.js'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

/**
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] 每个元素调用的迭代对象
 * @param {Function} [comparator] 每个元素调用的比较器
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    const computed = iteratee == null ? value : iteratee(value)

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    } else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}

export default baseDifference
```

- 要检查的 `array` 为空（`array.length = 0`），直接返回空数组
- 迭代器 `iteratee` 存在，则在 `map` 内完成对待排除内容数组 `values` 每一项元素的迭代，返回一个符合迭代器规则的待排除数组 `values`
- 比较器 `comparator` 存在，则设定排除方法 `includes = arrayIncludesWith`，若待排除内容过大 `values.length >= LARGE_ARRAY_SIZE = 200` 则不宜使用数组间比较，而是使用 `cache` 中的 `map` 做存储比较（`values = new SetCache(values)`），这样虽然牺牲了空间，但可以用 `map` 操作时间短的优势弥补，典型的牺牲空间换时间策略
