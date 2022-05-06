---
title: 买卖股票的最佳时机 II
search: true

date: 2022-05-06 20:45:23
tags: [algorithm, leetcode, maxProfit]
description:
comments:
---

## 1️⃣ 122. 删除有序数组中的重复项

> 给你一个整数数组 `prices` ，其中 `prices[i]` 表示某支股票第 `i` 天的价格。在每一天，你可以决定是否购买和/或出售股票。你在任何时候 `最多` 只能持有 `一股` 股票。你也可以先购买，然后在 `同一天` 出售。返回你能获得的 `最大` 利润。



**javascript 贪心算法**

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let pc = 0;
    let ret = 0;
    for (let index = 1; index < prices.length; index++) {
        const curElement = prices[index];
        const preElement = prices[pc];
        if(preElement < curElement){
            ret = ret + curElement - preElement;
        }
        pc++;
        
    }
    return ret;
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

[](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2zsx1/)