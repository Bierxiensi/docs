---
title: 学习资源汇总
search: true

date: 2021-10-30 14:45:23
tags: [algorithm, leetcode]
description:
comments:
---

## 1️⃣ 704. 二分查找

> 给定一个  n  个元素有序的（升序）整型数组  nums 和一个目标值  target  ，写一个函数搜索  nums  中的 target，如果目标值存在返回下标，否则返回 -1。

**javascript 递归/非递归**

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    // 设定左右指针
    let startIndex = 0,
        endIndex = nums.length - 1;
    while (startIndex <= endIndex) {
        // 找出中间位置
        let targetIndex = (startIndex + (endIndex - startIndex) / 2) >> 0;
        if (target === nums[targetIndex]) {
            return targetIndex;
        } else if (target > nums[targetIndex]) {
            startIndex = targetIndex + 1;
        } else {
            endIndex = targetIndex - 1;
        }
    }
    return -1;
};
```

**解题分析**
折半查找，见名思义，每次寻找中间点遇目标值比较
时间复杂度：O(logn)，其中 n 是数组的长度。
空间复杂度：O(1)。

**Tips**

-   💯 分析二分查找的一个技巧是：不要出现 else，而是把所有情况用 else if 写清楚，这样可以清楚地展现所有细节。[labuladong](https://leetcode-cn.com/problems/binary-search/solution/er-fen-cha-zhao-xiang-jie-by-labuladong/)

-   💯 计算 mid 时需要防止溢出，代码中 left + (right - left) / 2 就和 (left + right) / 2 的结果相同，但是有效防止了 left 和 right 太大直接相加导致溢出

**扩展-C 语言伪代码二叉树递归/非递归**

```C
int binarySearch(BTree BST, int x){
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

int binarySearch(BTree BST, int x){
    while(BST){
        if(x > BST->lChild){
            BST = BST->rChild;
        } else if(x < BST->lChild){
            BST = BST->lChild;
        } else {
            return BST
        }
    }
    return null;
}
```
