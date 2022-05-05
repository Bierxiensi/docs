---
title: 删除有序数组中的重复项
search: true

date: 2022-05-05 20:45:23
tags: [algorithm, leetcode, removeDuplicates]
description:
comments:
---

## 1️⃣ 24. 删除有序数组中的重复项

> 给你一个 `升序排列` 的数组 nums ，请你 `原地` 删除重复出现的元素，使每个元素 `只出现一次` ，返回删除后数组的新长度。元素的 `相对顺序` 应该保持一致。由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果。将最终结果插入 nums 的前 k 个位置后返回 k 。不要使用额外的空间，你必须在 `原地` 修改输入数组 `并在使用 O(1)` 额外空间的条件下完成。


**javascript 双指针**

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

**解题分析**
折半查找，见名思义，每次寻找中间点遇目标值比较，但是如何划分搜索区间会产生不同的写法，上述是一种两端闭区间的写法

-   时间复杂度：O(n)，其中 n 是数组的长度。
-   空间复杂度：O(1)。

**Tips**

-   💯 分析二分查找的一个技巧是：不要出现 else，而是把所有情况用 else if 写清楚，这样可以清楚地展现所有细节。[labuladong](https://leetcode-cn.com/problems/binary-search/solution/er-fen-cha-zhao-xiang-jie-by-labuladong/)

-   💯 计算 mid 时需要防止溢出，代码中 left + (right - left) / 2 就和 (left + right) / 2 的结果相同，但是有效防止了 left 和 right 太大直接相加导致溢出

**扩展-C 语言伪代码二叉树递归/非递归**

```C
int removeDuplicates(BTree BST, int x){
    if(!BST){
        return null;
    }
    if(x > BST->lChild){
        return binarySearch(BST->rChild, x)
    } else if(x < BST->lChild){
        return binarySearch(BST->lChild, x)
    } else {
        return BST
    }
}

```

[](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2gy9m/)