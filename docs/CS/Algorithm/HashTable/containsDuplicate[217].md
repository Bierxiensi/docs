---
title: 存在重复元素
search: true

date: 2022-05-09 20:45:23
tags: [algorithm, leetcode, containsDuplicate]
description:
comments:
---

## 1️⃣ 217. 删除有序数组中的重复项

> 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。


**javascript map**

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = function(nums) {
    let map = new Map();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if(map.has(element)){
            return true;
        } else {
            map.set(element)
        }
    }
    return false 
};
```

**结果**
执行用时： 80 ms , 在所有 JavaScript 提交中击败了 74.50% 的用户
内存消耗： 49.5 MB , 在所有 JavaScript 提交中击败了 64.48% 的用户

**解题分析**
-   时间复杂度：O(n)，其中 n 是数组的长度。
-   空间复杂度：O(n)。

**Tips**

-  

**扩展-C**

```C

```

[](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2gy9m/)