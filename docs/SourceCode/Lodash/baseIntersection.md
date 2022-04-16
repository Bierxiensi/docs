---
title: lodash-intersection-baseIntersection源码研读解析
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

&emsp;&emsp;这是一张 `intersection` 依赖引用路径图，相对复杂一些，按照功能划分，大致包括baseIntersection模块、castArrayLikeObject模块。接下来会自底向上分析各个依赖模块，包含`strictIndexOf`、`baseIsNaN`、`baseFindIndex`、`baseIndexOf`、`arrayIncludes`、`Hash`、`MapCache`、`SetCache`、`arrayIncludesWith`、`map`、`cahceHas`、`isLength`、`isArrayLike`、`isObjectLike`、`isArrayLikeObject`、`castArrayLikeObject`、`basee4Intersection`、`intersection`。


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

## 6. Hash 类

> Used to stand-in for `undefined` hash values.
> 用于替代 “未定义” 的哈希值

```js
const HASH_UNDEFINED = '__lodash_hash_undefined__'

class Hash {
  /**
   * 创建一个 hash object.
   * @private
   * @constructor
   * @param {Array} [entries] 需要缓存的 key-value 对
   */
  constructor(entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      const entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * 从hash中删除所有的 key-value 
   * @memberOf Hash
   */
  clear() {
    this.__data__ = Object.create(null)
    this.size = 0
  }

  /**
   * Removes `key` and its value from the hash.
   * @memberOf Hash
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const result = this.has(key) && delete this.__data__[key]
    this.size -= result ? 1 : 0
    return result
  }

  /**
   * Gets the hash value for `key`.
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    const data = this.__data__
    const result = data[key]
    return result === HASH_UNDEFINED ? undefined : result
  }

  /**
   * Checks if a hash value for `key` exists.
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    const data = this.__data__
    return data[key] !== undefined
  }

  /**
   * Sets the hash `key` to `value`.
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  set(key, value) {
    const data = this.__data__
    this.size += this.has(key) ? 0 : 1
    data[key] = value === undefined ? HASH_UNDEFINED : value
    return this
  }
}

export default Hash

```

-   使用了 [`es6-class`](https://es6.ruanyifeng.com/#docs/class) 语法，导出一个 `Hash` 类
-   在构造函数 `constructor` 中遍历 `entries`，按需调用 `set` 方法存储键值对信息，遍历前调用 `clear()` 清除缓存
-   `clear()` 内通过将全局变量 `__data__` 设定为 `null`，并将对应 `size` 置成 `0` 实现 `clear`
-   `has`、`set`、`get` 直接通过 `key` 查找/操作 `__data__`，在遇到 `value === undefined` 情形时 `set` 存储常量 `HASH_UNDEFINED = '__lodash_hash_undefined__'` 达到替换未定义键值效果


## 7. MapCache 类

```js
import Hash from './Hash.js'

/**
 * Gets the data for `map`.
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData({ __data__ }, key) {
  const data = __data__
  return isKeyable(key)
    ? data[typeof key === 'string' ? 'string' : 'hash']
    : data.map
}

/**
 * Checks if `value` is suitable for use as unique object key.
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  const type = typeof value
  return (type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean')
    ? (value !== '__proto__')
    : (value === null)
}

class MapCache {

  /**
   * 创建一个 map 缓存对象去存储 key-value 对
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      const entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * Removes all key-value entries from the map.
   * @memberOf MapCache
   */
  clear() {
    this.size = 0
    this.__data__ = {
      'hash': new Hash,
      'map': new Map,
      'string': new Hash
    }
  }

  /**
   * Removes `key` and its value from the map.
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const result = getMapData(this, key)['delete'](key)
    this.size -= result ? 1 : 0
    return result
  }

  /**
   * Gets the map value for `key`.
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    return getMapData(this, key).get(key)
  }

  /**
   * Checks if a map value for `key` exists.
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return getMapData(this, key).has(key)
  }

  /**
   * Sets the map `key` to `value`.
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  set(key, value) {
    const data = getMapData(this, key)
    const size = data.size

    data.set(key, value)
    this.size += data.size == size ? 0 : 1
    return this
  }
}

export default MapCache
```

-   使用了 [`es6-class`](https://es6.ruanyifeng.com/#docs/class) 语法，导出一个 `MapCache` 类
-   构造函数 `constructor` 逻辑同 `Hash` 类中构造函数逻辑，不同的是调用的 `clear()` 函数内部逻辑不同
-   `clear()` 内通过将全局变量 `__data__` 通过 `new` 操作符初始化为包含 `hash` , `map` , `string` 三种类型的 `object`，并将对应 `size` 置成 `0` 实现 `clear`
-   由于 `__data__` 是一个包含了 `hash` , `map` , `string` 三种类型的 `object`，所以在进行`has`、`set`、`get` 操作时无法直接通过 `key` 直接查找/操作 `__data__`。这时候需要一个辅助函数来帮助我们找到 `key` 所对应的键值对集合是 `hash` , `map` , `string` 三种类型中的哪一种，然后才进行操作，所以相比`Hash` 类多了两个内部辅助函数 `getMapData`、`isKeyable`。
-   `isKeyable` 用于判断 `key` 类型，如果key是 `string`, `number`, `boolean`, `symbol`, `null`中的一种且不是`__proto__`就会去`hash`, `string` 两种类型中查找，两者均由 `Hash` 类构造生成，否则去 `map` 中查找。（`null` 判断和 非`__proto__`判断 互斥）



Tips：理解 `getMapData`、`isKeyable` 的关键在于为什么有三种存储的数据类型？为什么`hash|string`类型使用自定义的 `Hash` 类存储？我们知道 `Hash` 类是按照 `Object` 存储，而 `map` 使用的js自身的 `Map` 类型是按照 `map` 存储，一个`Object`的键只能是`String`或者`Symbol`，但一个 `Map` 的键可以是任意值，包括函数、对象、基本类型。

Tips：关于对`value !== '__proto__'`的单独判断主要是由于 `'__proto__'`的特殊性。作为一个 `Property`，如果 `'__proto__'`被当做一个 `Object` 的 `key` 去进行读写操作，将会直接读取/修改当前原型信息。为了修复这个问题，一般会采取转义操作，将 `__proto__` 转义成 `__proto__%`，更多内容可以查看《Speaking JavaScript》这本书，相信面试遇到这个问题，也是一个考察点。

![Speaking JavaScript](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98839b079d144caa9bc3077bf551dc92~tplv-k3u1fbpfcp-zoom-1.image)

## 8. SetCache 类

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

-  操作同上述分析，需要注意的是 `this.__data__ = new MapCache` 这里，一般来说，我们都会写 `new MapCahe()`， 区别在于后续的运算优先级。由于 `new` 运算优先级要小于 `.` 运算优先级，如 `new MapCache.add()` 会报错，因为会先执行 `MapCache.add` 然后才执行 `new`。

## 9. arrayIncludesWith 模块

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

## 10. map 模块

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


## 11. cacheHas 模块

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

## 12. baseIntersection 模块

**“intersection”之类的方法的基本实现，接受要检查的数组**

```js
import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from './cacheHas.js'

/**
 * @private
 * @param {Array} arrays 要检查的阵列
 * @param {Function} [iteratee] 每个元素调用的迭代对象
 * @param {Function} [comparator] 每个元素调用的比较器
 * @returns {Array} 返回共享值的新数组
 */
function baseIntersection(arrays, iteratee, comparator) {
  const includes = comparator ? arrayIncludesWith : arrayIncludes
  const length = arrays[0].length
  const othLength = arrays.length
  const caches = new Array(othLength)
  const result = []

  let array
  let maxLength = Infinity
  let othIndex = othLength

  while (othIndex--) {
    array = arrays[othIndex]
    if (othIndex && iteratee) {
      array = map(array, (value) => iteratee(value))
    }
    maxLength = Math.min(array.length, maxLength)
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined
  }
  array = arrays[0]

  let index = -1
  const seen = caches[0]

  outer:
  while (++index < length && result.length < maxLength) {
    let value = array[index]
    const computed = iteratee ? iteratee(value) : value

    value = (comparator || value !== 0) ? value : 0
    if (!(seen
      ? cacheHas(seen, computed)
      : includes(result, computed, comparator)
    )) {
      othIndex = othLength
      while (--othIndex) {
        const cache = caches[othIndex]
        if (!(cache
          ? cacheHas(cache, computed)
          : includes(arrays[othIndex], computed, comparator))
        ) {
          continue outer
        }
      }
      if (seen) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}

export default baseIntersection
```

- 要检查的 `array` 过长（length > 120）时使用 `caches` 做缓存
- `outer` 执行多层嵌套语句
