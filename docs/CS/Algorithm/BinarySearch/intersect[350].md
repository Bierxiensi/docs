---
title: 两个数组的交集 II
search: true

date: 2022-05-11 20:45:23
tags: [algorithm, leetcode, singleNumber]
description:
comments:
---

## 1️⃣ 350. 两个数组的交集 II

> 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

> 进阶：
> 如果给定的数组已经排好序呢？你将如何优化你的算法？
> 如果 nums1 的大小比 nums2 小，哪种方法更优？
> 如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？


### javascript map

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let map = new Map();
    let ret = [];
    for (let index = 0; index < nums1.length; index++) {
        const element = nums1[index];
        if(map.has(element)){
           let value = map.get(element)
           map.set(element, value + 1)
        } else {
            map.set(element, 1)
        }
    }
    for (let index = 0; index < nums2.length; index++) {
        const element = nums2[index];
        if(map.has(element) && map.get(element)){
            let value = map.get(element)
            map.set(element, value - 1)
            ret.push(element)
        }
    }
    return ret
};
```

**结果**
执行用时： 68 ms , 在所有 JavaScript 提交中击败了 54.02% 的用户
内存消耗： 43.2 MB , 在所有 JavaScript 提交中击败了 21.07% 的用户

**解题分析**
-   时间复杂度：O(n)，其中 n 是nums1 和 nums2 最大数组的长度。
-   空间复杂度：O(n)。

**Tips**

-  

**扩展-C**

```C

```

### javascript Bit manipulation

```javascript

```

**结果**


**解题分析**
位运算规律:


**Tips**

-  

**扩展-C**

```C

```

[](https://leetcode.cn/leetbook/read/top-interview-questions-easy/x2y0c2/)