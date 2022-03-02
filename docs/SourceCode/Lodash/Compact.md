---
title: lodash-compact源码研读解析
search: true

date: 2021-12-25 14:05:23
tags: [lodash, compact]
photos:
description:
comments:
---

> A modern JavaScript utility library delivering modularity, performance & extras.

> `lodash` 是一个一致性、模块化、高性能的 `JavaScript` 实用工具库

# 一、环境准备

-   `lodash` 版本 `v4.0.0`

-   通过 `github1s` 网页可以 [查看](https://github1s.com/lodash/lodash/blob/HEAD/compact.js) `lodash - compact` 源码
-   调试测试用例可以 `clone` 到本地

```shell
git clone https://github.com/lodash/lodash.git

cd axios

npm install

npm run test
```

# 二、结构分析

&emsp;&emsp;`compact` 没有其他依赖，代码块很简短，但其中涉及到的东西还是很有必要了解的，比如假值-`falsey`、`惰性运算`等。

# 三、函数研读

## 1. 功能模块

> Creates an array with all falsey values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.

> 创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。

```js
/**
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}

export default compact

```

-  逻辑很简单，如果是 `array` 是 `null`，直接返回空数组，否则使用 `for...of` 循环读取 `array` 键值，将满足条件的键值放到 `result` 并返回 
-  关键在于 `if (value)` 可以过滤掉所有的 `falsy` 值，看一下[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)中对于falsy 值的定义 - `A falsy (sometimes written falsey) value is a value that is considered false when encountered in a Boolean context.` 意味着不符合的键值在`布尔值上下文`中被转换为 false，从而绕过了 if 代码块。

## 2. 测试用例

```js
import assert from 'assert'
import lodashStable from 'lodash'
import { LARGE_ARRAY_SIZE, _, falsey } from './utils.js'
import compact from '../compact.js'
import slice from '../slice.js'

describe('compact', () => {
  const largeArray = lodashStable.range(LARGE_ARRAY_SIZE).concat(null)

  it('should filter falsey values', () => {
    const array = ['0', '1', '2']
    assert.deepStrictEqual(compact(falsey.concat(array)), array)
  })

  it('should work when in-between lazy operators', () => {
    let actual = _(falsey).thru(slice).compact().thru(slice).value()
    assert.deepEqual(actual, [])

    actual = _(falsey).thru(slice).push(true, 1).compact().push('a').value()
    assert.deepEqual(actual, [true, 1, 'a'])
  })

  it('should work in a lazy sequence', () => {
    const actual = _(largeArray).slice(1).compact().reverse().take().value()
    assert.deepEqual(actual, _.take(compact(slice(largeArray, 1)).reverse()))
  })

  it('should work in a lazy sequence with a custom `_.iteratee`', () => {
    let iteratee = _.iteratee,
      pass = false

    _.iteratee = identity

    try {
      const actual = _(largeArray).slice(1).compact().value()
      pass = lodashStable.isEqual(actual, compact(slice(largeArray, 1)))
    } catch (e) {console.log(e)}

    assert.ok(pass)
    _.iteratee = iteratee
  })
})

```



![671644918196_.pic.jpg](./images/compact.jpg)

&emsp;&emsp;这是一张 `compact` 测试用例运行情况图，我们可以看到对于 `compact`官方期望更健壮，在惰性运算符中也应当正常工作，但目前暴露给用户的只有 `filter falsey values` 功能，并且全局跑测试用例时也绕过了这个测试文件（不是.test.js结尾）。

**但是** 我们有自己的想法，本着钻研到底的精神，我们要研究一下为什么官方要提醒我们注意惰性运算！

![1ba216586bd3c5d0193063da676aa58b.jpeg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fec96a56859d40d19823a4bbc3174e83~tplv-k3u1fbpfcp-watermark.image?)

> 在编程语言理论中，惰性求值（英语：Lazy Evaluation），又译为惰性计算、懒惰求值，也称为传需求调用（call-by-need），是一个计算机编程中的一个概念，它的目的是要最小化计算机要做的工作。它有两个相关而又有区别的含意，可以表示为“延迟求值”和“最小化求值”，除可以得到性能的提升外，惰性计算的最重要的好处是它可以构造一个无限的数据类型。

&emsp;&emsp;用白话讲就是计算返回的不是一个值，而是一个表达式 `x:=expression`， 比如下图反映的就是测试用例中 `compact(slice(largeArray, 1)).reverse())` 的处理流程。在运行 `compact` 之前需要先运行 `slice`， 在 `slice` 运行完毕后还需要再运行 `reverse`，这就需要在三个求值函数之间维持一个数据流关系 `flow`，并且由于每次求值函数都会返回各种数据，所以得使用一个独一无二的值来作为判断流是否完成的标志，这就需要 `compact` 额外定义一个唯一表示符来充当完成标志，比如 `const over = Symbol()`。显然这对很多非惰性计算的 `compact` 操作是额外开销，也增加了耦合性，并不是一个好的选择。

&emsp;&emsp;那么问题来了，如何处理惰性运算中的 `compact` 操作呢？


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e6abfa4be7242d698b4617d41fd52dc~tplv-k3u1fbpfcp-watermark.image?)

Tips：修改一下package.json中的测试命令 `"test": "mocha -r esm test/*.test.js"` ==> `"test": "mocha -r esm test/compact.js"` 即可运行。

# 四、参考

1\. `浅笑·` 的 [如何用 JavaScript 实现一个数组惰性求值库](https://www.cnblogs.com/qianxiaox/p/14017475.html)

