---
title: 整数反转
search: true

date: 2022-05-06 20:45:23
tags: [algorithm, leetcode, maxProfit]
description:
comments:
---

## 1️⃣ 7. 删除有序数组中的重复项

> 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。假设环境不允许存储 64 位整数（有符号或无符号）。



**javascript **

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let abs = 1;
    if(x < 0){
        abs = -1;
    }
    let strx = (abs * x).toString();
    let arrx = strx.split('');    
    let resx = arrx.reverse();
    let ret = Number(resx.join('')) * abs;
    if((ret > (Math.pow(2, 31) - 1)) || (ret < Math.pow(-2, 31))){
        ret = 0;
    }
    return ret;
};
```

**解题分析**
执行用时： 64 ms , 在所有 JavaScript 提交中击败了 88.64% 的用户
内存消耗： 42.9 MB , 在所有 JavaScript 提交中击败了 25.05% 的用户

-   时间复杂度：O(n)，其中 n 是数组的长度。
-   空间复杂度：O(1)。

**Tips**

-  

**扩展-C**

```C

```

[](https://leetcode.cn/leetbook/read/top-interview-questions-easy/xnx13t/)