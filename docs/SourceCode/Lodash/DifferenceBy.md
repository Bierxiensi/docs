---
title: 虚拟dom
search: true

date: 2022-02-22 20:05:23
tags: [lodash, difference]
photos:
description:
comments:
---


> A modern JavaScript utility library delivering modularity, performance & extras.

> `lodash` 是一个一致性、模块化、高性能的 `JavaScript` 实用工具库

# 一、环境准备

-   `lodash` 版本 `v4.0.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/lodash/lodash/blob/HEAD/differenceBy.js) `lodash - difference` 源码
-   调试测试用例可以 `clone` 到本地

```shell
git clone https://github.com/lodash/lodash.git

cd axios

npm install

npm run test
```

# 二、结构分析

![e0b5cde91580aac316f12d986e1e144.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/030d8d96b0d940509a677312de18418a~tplv-k3u1fbpfcp-watermark.image?)

&emsp;&emsp;这是一张 `differenceBy` 依赖引用路径图，还记得我们之前分析的 `difference`，`differenceBy` 相比 `difference`  只多了一个 `last` 依赖，下面将会全篇分析一下设计思路，详情部分可以关注前面的 [Difference](https://juejin.cn/post/7066424341025521671)、[Difference(Cache)](https://juejin.cn/post/7065293553043734536)、[Difference(Flatten)](https://juejin.cn/post/7066053963854020645)、[Difference(Index)](https://juejin.cn/post/7065675978437034021)。

# 三、模块分析

## differenceBy

**这个方法类似_.difference ，除了它接受一个 iteratee （迭代器）**

### 1. internal/baseDifference

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

- 若入参包含了自定义比较器 `comparator` 则设定非通用排除规则 `includes`（isCommon = false），需要注意的是 `values.length >= LARGE_ARRAY_SIZE = 200` 也要设定非通用排除规则 `includes`，此时需要对数据做 `map` 存储，牺牲更多空间换取更少的查询时间。


#### 1.1 SetCache

```js
import MapCache from './MapCache.js'

/** Used to stand-in for `undefined` hash values. */
const HASH_UNDEFINED = '__lodash_hash_undefined__'

class SetCache {

  /**
   * Creates an array cache object to store unique values.
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  constructor(values) {
    let index = -1
    const length = values == null ? 0 : values.length

    this.__data__ = new MapCache
    while (++index < length) {
      this.add(values[index])
    }
  }

  /**
   * Adds `value` to the array cache.
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  add(value) {
    this.__data__.set(value, HASH_UNDEFINED)
    return this
  }

  /**
   * Checks if `value` is in the array cache.
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   */
  has(value) {
    return this.__data__.has(value)
  }
}

SetCache.prototype.push = SetCache.prototype.add

export default SetCache
```

-  `SetCache` 对外暴露了添加 `add` 和查询 `has` 函数

- MapCache: `MapCache` 对外暴露了添加 `set` 、查询 `has` 函数、获取 `get` 函数等，以及全局变量 `__data__` 的初始化、清除、针对不同类型数据的存储处理细节

	- Hash: 专注于处理需要缓存的 `key-value` 数据

#### 1.2 arrayIncludes

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

- 如果 `length` 不存在（包含null、0、undefined）或者没有找到 `index` 都会返回 `false`

- baseIndexOf: 根据待查找值是否为 `NaN` 分别进入严格查找逻辑 `strictIndexOf` 或基础查找逻辑 `baseFindIndex`
- baseFindIndex: `findIndex` 和 `findLastIndex` 的基本实现，支持正向/反向查找 `index`
- baseIsNaN: 会过滤掉 `NaN`，因为在执行自比较之中 `NaN`，也只有 `NaN` ，比较之中不等于它自己，即 `NaN === NaN;  // false`
- strictIndexOf: `indexOf` 的一个特殊版本，它执行严格的相等 `===` 用于比较 `value`

#### 1.3 arrayIncludesWith

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

- 类似于 `arrayIncludes`，只是它接受一个比较器 `comparator`。使用 `for...of` 迭代待搜索数组 `array` 中的每一项，使用 `if` 判断比较器 `comparator(target, value)` 的返回值并给出对应返回结果，目前用不到，将会在下面的 `differenceWith` 当中出场 🐶


#### 1.4 map

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

-  通过 `iteratee` 运行 `array` 的每个元素来创建一个数组 `result`。使用 `new Array` 创建一个对应其长度的数组 `result`，其中 `array` 为 `null` 时，长度为 `0`，将会创建一个空数组，会按照 `array` 长度循环调用 `iteratee`，每次循环 `index + 1`。
 
#### 1.5 cacheHas

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

- 检查 `key` 的 `cache` 值是否存在，`cache` 和 `key` 均为入参

### 2. internal/baseFlatten

```js
import isFlattenable from './isFlattenable.js'

/**
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth 最大递归深度
 * @param {boolean} [predicate=isFlattenable] 每次迭代调用的函数
 * @param {boolean} [isStrict] 限制为通过“谓词”检查的值
 * @param {Array} [result=[]] 初始结果值
 * @returns {Array} 返回新的展平数组
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // 递归展平阵列（易受调用堆栈限制的影响）
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
      }
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}

export default baseFlatten

```
- 扁平化的基本实现，使用 `for...of` 迭代待展平 `array` 中的每一项，如果最大递归深度 `depth` 仍然未减至 `1` 则递归调用 `baseFlatten`，每次`depth - 1`，直至 `depth = 1` 将返回值放入 `result`。
- `depth = 1` 时由于所有项都已展平 `predicate(value)` 返回 `false`，进入 `else if (!isStrict)` 语句块，目的是限制“谓词”展平到`result`，其中谓词是一个可调用的表达式，其返回结果是一个能用作条件的值。通俗的说就是一个函数，会返回一个符合该条件(“truthy值”)的数组。


#### 2.1 isFlattenable

```js
import isArguments from '../isArguments.js'

/** Built-in value reference. */
const spreadableSymbol = Symbol.isConcatSpreadable

/**
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) ||
    !!(value && value[spreadableSymbol])
}

export default isFlattenable
```

-  重点关注 `value[spreadableSymbol]`，在这之前我们需要知道 `Array` 的 `concat` 运算，正常情况下 `['a', 'b', 'c'].concat([1, 2, 3]) = ["a", "b", "c", 1, 2, 3]`，但可通过设定被连接 `array`，`array[Symbol.isConcatSpreadable] = false;`，使得 `array` 不被展开到发起连接的 `array` 而是作为一个元素连接到其中，如 `['a', 'b', 'c'].concat([1, 2, 3]) = ["a", "b", "c", [ 1, 2, 3] ]`

       isArguments: `arguments` 对象是所有（非箭头）函数中都可用的局部变量，可以按照操作数组的方式获取参数，封装了 `getTag` 和 `isObjectLike`。
         
       getTag: 封装了 `Object` 原型链函数 `toString()`，借助 `toString()` 判断属性类型的性质判断 `value` 是否为 `Undefined` 或者 `Null`
       isObjectLike: 借助 `typeof` 可以获取 `未经计算的操作数` 的类型的性质判断 `value` 是否为非 `Null` 的 `object` 类型（js设计缺陷使得 `typeof null = Object`）

### 3. isArrayLikeObject

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

        isObjectLike: 借助 `typeof` 可以获取 `未经计算的操作数` 的类型的性质判断 `value` 是否为非 `Null` 的 `object` 类型（js设计缺陷使得 `typeof null = Object`）  
        isArrayLike: 会判断一个值非 `null`，非 `function` 类型，有 `.length` 属性且 `length` 为大小不超过 `MAX_SAFE_INTEGER = 9007199254740991` 的自然数

#### 3.1 isArrayLike
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
-  检查 `value` 是否与数组类似。其被视为数组，不是函数但是有 `.length` 值，是一个大于等于`0`且小于 `MAX_SAFE_INTEGER`的 `Number`
- 重点关注 `isLength`，判断规则是 `typeof value === 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER`，其中 `value % 1 == 0` 确保 `value` 是整数，`MAX_SAFE_INTEGER = 9007199254740991`

#### 3.2 isObjectLike
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

- 可以通过 `typeof` 来获取 `未经计算的操作数` 的类型，这里检查 `value` 是否与对象类似，如果不为空则是一个对象，并且会有一个`typeof` 运算结果为 `object` 返回值

### 4. last

```js
/**
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 */
function last(array) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

export default last
```

- 目的是获取数组最后一个元素