---
title: 加一
search: true

date: 2022-05-12 20:45:23
tags: [algorithm, leetcode, singleNumber]
description:
comments:
---

## 1️⃣ 66. plusOne

> 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。你可以假设除了整数 0 之外，这个整数不会以零开头。


### javascript 错误解法

```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let num = Number(digits.join(''));
    let str = String(num + 1);
    return str.split('')
};
```

**结果**


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
var plusOne = function(digits) {
    let length = digits.length + 1;
    let plus = 0;
    let sum = '';
    let str = digits.join('').padStart(length, '0');
    for (let index = length - 1; index > 0; index--) {
        let curCalc = index === length - 1 ? Number(str[index]) + 1 + plus : Number(str[index]) + plus
        sum = sum.padStart(length - index, String(curCalc % 10));
        plus = curCalc / 10 >= 1 ? 1 : 0;
    }
    if(plus){
        sum = sum.padStart(length, '1')
    }
    return sum.split('');
};
```

**结果**
执行用时： 48 ms , 在所有 JavaScript 提交中击败了 99.01% 的用户
内存消耗： 41 MB , 在所有 JavaScript 提交中击败了 72.58% 的用户

**解题分析**
位运算规律:


**Tips**

-  

**扩展-C**

```C

```

[](https://leetcode.cn/leetbook/read/top-interview-questions-easy/x2y0c2/)