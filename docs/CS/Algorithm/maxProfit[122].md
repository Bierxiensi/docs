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


-   时间复杂度：O(n)，其中 n 是数组的长度。
-   空间复杂度：O(1)。

**Tips**

-  

**扩展-C**

```C

```

[](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2zsx1/)