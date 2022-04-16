---
title: lodash-intersection源码研读解析
search: true

date: 2022-04-08 14:05:23
tags: [lodash, intersection, baseIntersection]
photos:
description:
comments:
---

> A modern JavaScript utility library delivering modularity, performance & extras.

> `lodash` 是一个一致性、模块化、高性能的 `JavaScript` 实用工具库

# 一、环境准备

-   `lodash` 版本 `v4.0.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/lodash/lodash/blob/HEAD/intersection.js) `lodash - intersection` 源码
-   调试测试用例可以 `clone` 到本地

```shell
git clone https://github.com/lodash/lodash.git

cd axios

npm install

npm run test
```

# 二、结构分析

![](./images/intersection.png)

&emsp;&emsp;这是一张 `intersection` 依赖引用路径图，相对复杂一些，按照功能划分，大致包括basee4Intersection模块、castArrayLikeObject模块。接下来会自底向上分析各个依赖模块，包含`strictIndexOf`、`baseIsNaN`、`baseFindIndex`、`baseIndexOf`、`arrayIncludes`、`Hash`、`MapCache`、`SetCache`、`arrayIncludesWith`、`map`、`cahceHas`、`isLength`、`isArrayLike`、`isObjectLike`、`isArrayLikeObject`、`castArrayLikeObject`、`basee4Intersection`、`intersection`。


# 三、函数研读

## 1. isArrayLike 模块

**检查 `value` 是否与数组类似。值被视为数组，它不是函数并且有一个 `value.length` ，这是一个大于等于'0'且小于 `MAX_SAFE_INTEGER`的 `Number`**

```js
import isLength from './isLength.js'
/**
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值
 * @returns {boolean} 如果'value'类似于数组，则返回'true'，否则返回'false'
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
 * @param {*} value 要检查的值
 * @returns {boolean} 如果'value'类似对象，则返回'true'，否则返回'false'
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

-   除了纯对象，`null` 使用 `typeof` 获取类型结果也是 `object`，为了后续的使用，这里需要过滤掉
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

**此方法类似于 `isArrayLike`，只是它还检查 `value` 是否为一个 `Object`**

```js
import isArrayLike from './isArrayLike.js'
import isObjectLike from './isObjectLike.js'
/**
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值
 * @returns {boolean} 如果 value 是一个类数组对象，那么返回 true，否则返回 false
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

## 4. castArrayLikeObject 模块

**如果不是类数组对象，则将“value”强制转换为空数组**

```js
import isArrayLikeObject from '../isArrayLikeObject.js'

/**
 * @private
 * @param {*} value  要检查的值
 * @returns {Array|Object} 返回类似于cast数组的对象
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : []
}

export default castArrayLikeObject

```

- 封装了 `isArrayLikeObject` ，当 `value` 同时符合 `isArrayLikeObject` 所检测的目标类型时返回 `true`，此时返回 `value`，否则返回空数组

## 5. map 模块

**创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。 iteratee（迭代函数）调用3个参数(value, index|key, collection)**

```js
/**
 * @since 5.0.0
 * @category Array
 * @param {Array} array 用来迭代的集合
 * @param {Function} iteratee  每次迭代调用的函数
 * @returns {Array} 返回新的映射后数组
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

Tip: `lodash` 中有许多方法是防止作为其他方法的迭代函数（注：即不能作为iteratee参数传递给其他方法），例如：`_.every`,`_.filter`,`_.map`,`_.mapValues`,`_.reject`, 和`_.some`。

Tips: 受保护的方法有（注：即这些方法不能使用 `_.every`, `_.filter`, `_.map,_`. `mapValues`, `_.reject`, 和 `_.some` 作为 `iteratee` 迭代函数参数）：`ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`, `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`, `words`。


## 6. intersection 模块

**创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用[SameValueZero]((http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero))进行相等性比较**

```js
import map from './map.js'
import baseIntersection from './.internal/baseIntersection.js'
import castArrayLikeObject from './.internal/castArrayLikeObject.js'

/**
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] 待检查的数组
 * @returns {Array} 返回一个包含所有传入数组交集元素的新数组(给定数组的交集)
 * @example
 *
 * intersection([2, 1], [2, 3])
 * // => [2]
 */
function intersection(...arrays) {
  const mapped = map(arrays, castArrayLikeObject)
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : []
}

export default intersection
```

- 首先使用 `map` 配合迭代器 `castArrayLikeObject` 检测入参 `arrays` 是否是合法数组，返回 `mapped`
- 如 `mapped` 存在并且入参第一项 `arrays` 是合法数组，则调用 `baseIntersection` 检测公共元素，否则返回空数组  

**创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用[SameValueZero]((http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero))进行相等性比较**

```js
import map from './map.js'
import baseIntersection from './.internal/baseIntersection.js'
import castArrayLikeObject from './.internal/castArrayLikeObject.js'

/**
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] 待检查的数组
 * @returns {Array} 返回一个包含所有传入数组交集元素的新数组(给定数组的交集)
 * @example
 *
 * intersection([2, 1], [2, 3])
 * // => [2]
 */
function intersection(...arrays) {
  const mapped = map(arrays, castArrayLikeObject)
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : []
}

export default intersection
```

- 首先使用 `map` 配合迭代器 `castArrayLikeObject` 检测入参 `arrays` 是否是合法数组，返回 `mapped`
- 如 `mapped` 存在并且入参第一项 `arrays` 是合法数组，则调用 `baseIntersection` 检测公共元素，否则返回空数组  