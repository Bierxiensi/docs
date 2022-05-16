---
title: 只出现一次的数字
search: true

date: 2022-05-10 20:45:23
tags: [algorithm, leetcode, singleNumber]
description:
comments:
---

## 1️⃣ 136. 只出现一次的数字

> 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

> 说明： 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？



### javascript map

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let map = new Map();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if(map.has(element)){
            map.delete(element)
        } else {
            map.set(element)
        }
    }
    let key = Array.from(map.keys())
    return key[0]
};
```

**结果**
执行用时： 72 ms , 在所有 JavaScript 提交中击败了 44.97% 的用户
内存消耗： 46.8 MB , 在所有 JavaScript 提交中击败了 6.75% 的用户

**解题分析**
-   时间复杂度：O(n)，其中 n 是数组的长度。
-   空间复杂度：O(n)。

**Tips**

-  

**扩展-C**

```C

```

### javascript Bit manipulation

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let ret = nums[0];
    for (let index = 1; index < nums.length; index++) {
        const pre = nums[index];
        ret = ret ^ pre
    }
    return ret
};
```

**结果**
执行用时： 56 ms , 在所有 JavaScript 提交中击败了 95.51% 的用户
内存消耗： 42.1 MB , 在所有 JavaScript 提交中击败了 75.78% 的用户

**解题分析**
位运算规律:

```js
1^1=0;
1^0=1;
0^1=1;
0^0=0;
```

0和1异或的时候相同的异或结果为0，不同的异或结果为1，根据上面的规律我们得到
- a^a=0；自己和自己异或等于0
- a^0=a；任何数字和0异或还等于他自己
- a^b^c=a^c^b；异或运算具有交换律

-   时间复杂度：O(n)，其中 n 是数组的长度。
-   空间复杂度：O(1)。

**Tips**

-  

**扩展-C**

```C

```

[](https://leetcode.cn/leetbook/read/top-interview-questions-easy/x21ib6/)