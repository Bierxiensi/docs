---
title: 反转字符串
search: true

date: 2022-05-16 20:45:23
tags: [algorithm, leetcode, reverseString]
description:
comments:
---

## 1️⃣ 344. moveZeroes

> 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。



### javascript 双指针遍历

```javascript
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let p = s.length - 1;
    let middle = ((s.length - 1) / 2).toFixed(0);
    for(let i = 0; i < middle; i++){
        let temp = s[i];
        s[i] = s[p];
        s[p] = temp;
        p--;
    }
};
```

**结果**
执行用时： 76 ms , 在所有 JavaScript 提交中击败了 95.88% 的用户
内存消耗： 48.2 MB , 在所有 JavaScript 提交中击败了 14.66% 的用户

**解题分析**
-   时间复杂度：O(n)，其中 n 是 s 的长度。
-   空间复杂度：O(1)。

**Tips**

-  

**扩展-C**

```C

```


[](https://leetcode.cn/leetbook/read/top-interview-questions-easy/xnhbqj/)