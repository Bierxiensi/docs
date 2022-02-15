---
title: lodash-chunk 源码研读解析【下】
search: true

date: 2021-12-25 14:05:23
tags: [lodash, chunk]
photos:
description:
comments:
---

> A modern JavaScript utility library delivering modularity, performance & extras.

> `lodash` 是一个一致性、模块化、高性能的 `JavaScript` 实用工具库

# 一、环境准备

-   `lodash` 版本 `v4.0.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/lodash/lodash/blob/HEAD/chunk.js) `lodash - chunk` 源码
-   调试测试用例可以 `clone` 到本地

```shell
git clone https://github.com/lodash/lodash.git

cd axios

npm install

npm run test
```

# 二、结构分析

![](./images/chunk.png)

&emsp;&emsp;这是一张 `chunk` 依赖引用路径图，其中使用到了 `slice`、`toInteger`、`toFinite`、`toNumber`、`isObject`、`isSymbol`、`internal/getTag`，接下来会自底向上分析各个依赖模块。由于依赖较多，篇幅较长，分成上下两部分，下篇涉及到 `chunk`、`slice`、`toInteger` 三个部分。

![](./images/lodash_chunk.png)

&emsp;&emsp;这是一张 `lodash` 项目结构图，其中 `internal` 为内部函数库，其余对外暴露的功能模块如 `chunk` 在根目录下。

# 三、函数研读

## 1. toInteger 模块

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

## 2. slice 模块

```js
/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position. 负索引将被视为与末尾的偏移量
 * @param {number} [end=array.length] The end position. 负索引将被视为与末尾的偏移量
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var array = [1, 2, 3, 4]
 *
 * _.slice(array, 2)
 * // => [3, 4]
 */
function slice(array, start, end) {
    let length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    start = start == null ? 0 : start;
    end = end === undefined ? length : end;

    if (start < 0) {
        start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : (end - start) >>> 0;
    start >>>= 0;

    let index = -1;
    const result = new Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}

export default slice;
```

-   如果 array 是 null 直接返回空数组
-   如果 start 是 null 则默认为 0
-   如果 end 未定义则默认为 array 的 length 值
-   start 为负数即负索引，则将被视为与末尾的偏移量，需要注意的是如果偏移量大于 length 则默认为 0
-   end 为负数即负索引，则将被视为与末尾的偏移量，若为正数即正索引且大于 length 则默认与 length 值相等
-   根据 start 与 end 计算返回区间，其中 `>>> 0` 确保了 start 和 length 落在 js 双精度有效表达范围【0 ～ 0xFFFFFFFF】中，详情可以查看[js 中表达式 >>> 0 浅析](https://segmentfault.com/a/1190000014613703)
-   最后使用 `new Array(length)`重新创建一个 slice 数组并逐一赋值后返回

## 3. chunk

```js
import slice from "./slice.js";
import toInteger from "./toInteger.js";

/**
 * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size = 1) {
    size = Math.max(toInteger(size), 0);
    const length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    let index = 0;
    let resIndex = 0;
    const result = new Array(Math.ceil(length / size));

    while (index < length) {
        result[resIndex++] = slice(array, index, (index += size));
    }
    return result;
}

export default chunk;
```

-   如果 array 是 null 或传参 size < 1 直接返回空数组
-   根据 array.length 与 size 的比值创建对应拆分个数长度的分割数组 result，使用 Math.ceil 上取整
-   使用自定义 silce 方法分割 array，步长为 size，按序放到 result 中

# 四、参考

1\. [探秘 JavaScript 世界的神秘數字 1.7976931348623157e+308](https://copyfuture.com/blogs-details/20210915164159432s)

2\. [MDN-Math-ceil](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
