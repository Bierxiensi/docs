---
title: 旋转数组
search: true

date: 2022-05-07 20:45:23
tags: [algorithm, leetcode, rotate]
description:
comments:
---

## 1️⃣ 189. 旋转数组

> 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

> 进阶：

尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

### javascript 暴力解-创建临时数组

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let pc = 0;
    for(let i = 0; i < nums.length; i++){
        if(nums[pc] === nums[i + 1]){
            nums[pc] = nums[i + 1]
        } else {
            pc++;
            nums[pc] = nums[i + 1]
        }
    } 
    return pc;
};
```

**结果**
执行用时： 104 ms , 在所有 JavaScript 提交中击败了 19.74% 的用户
内存消耗： 53.4 MB , 在所有 JavaScript 提交中击败了 7.22% 的用户

**解题分析**
-   时间复杂度：O(n)，其中 n 是数组的长度。
-   空间复杂度：O(n)。

**Tips**  

**扩展-C**

```C

```

### javascript 求余计算移动位置



[](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2skh7/)