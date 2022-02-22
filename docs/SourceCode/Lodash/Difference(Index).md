---
title: lodash-difference源码研读解析【二、index】
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

&emsp;&emsp;这是一张 `difference` 依赖引用路径图，相对复杂一些，按照功能划分，大致包括cache模块、index模块和flatten模块。接下来会自底向上分析各个依赖模块。由于依赖较多，篇幅较长，将按照模块分成四个部分，本篇主要讲述 `Index` 模块，包含 `arrayIncludes`、`baseIndexOf`、`baseFindIndex`、`baseIsNaN`、`strictIndexOf`。


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

## 5. arrayIncludes 模块

**不支持从数组指定位置搜索的includes**

```js
import baseIndexOf from './baseIndexOf.js'

/**
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  const length = array == null ? 0 : array.length
  return !!length && baseIndexOf(array, value, 0) > -1
}

export default arrayIncludes
```

- 如果 length 不存在（包含null、0）或者没有找到 index 都会返回false

Tips：`!!` 运算符表示逻辑非的取反运算，如`!!obj`与 `obj != null && typeof obj === undefined && obj != "" && obj != false` 在计算上等价
