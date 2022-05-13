---
title: 移动零
search: true

date: 2022-05-13 20:45:23
tags: [algorithm, leetcode, singleNumber]
description:
comments:
---

## 1️⃣ 283. moveZeroes

> 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。请注意 ，必须在不复制数组的情况下原地对数组进行操作。


### javascript 双指针遍历

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let pc = nums.length - 1;
    for (let i = nums.length - 1; i > 0; i--) {
        const element = nums[i];
        if(element === 0 && pc !== i){
            for (let j = i; j < pc; j++) {
                nums[j] = nums[j + 1];
            }
            nums[pc] = 0;
            pc--;
        }
    }
    if(nums[0] === 0){
        for (let m = 0; m < pc; m++) {
            nums[m] = nums[m + 1];
        }
        nums[pc] = 0;
    }
};
```

**结果**
执行用时： 152 ms , 在所有 JavaScript 提交中击败了 20.59% 的用户 
内存消耗： 45.5 MB , 在所有 JavaScript 提交中击败了 52.41% 的用户

**解题分析**
-   时间复杂度：O(n^2)，其中 n 是 nums 的长度。
-   空间复杂度：O(1)。

**Tips**

-  

**扩展-C**

```C

```

### javascript Bit manipulation

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 输入: nums = [0,1,0,3,12] => [1,3,12,0,0]
 */
var moveZeroes = function(nums) {
    let k = 0
    for (let i = 0; i < nums.length; i++){
        if (nums[i] == 0){
            k++;
        } else {
            if(k > 0){
                nums[i-k] = nums[i];
                nums[i] = 0;
            }
        }
    }
};
```

**结果**
执行用时： 88 ms , 在所有 JavaScript 提交中击败了 72.65% 的用户
内存消耗： 45.8 MB , 在所有 JavaScript 提交中击败了 49.41% 的用户

**解题分析**
-   时间复杂度：O(n)，其中 n 是 nums 的长度。
-   空间复杂度：O(1)。


**Tips**

-  

**扩展-C**

```C

```

[](https://leetcode.cn/leetbook/read/top-interview-questions-easy/x2y0c2/)