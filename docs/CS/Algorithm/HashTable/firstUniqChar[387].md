---
title: 字符串中的第一个唯一字符
search: true

date: 2022-06-01 20:45:23
tags: [algorithm, leetcode, firstUniqChar]
description:
comments:
---

## 1️⃣ 387. 字符串中的第一个唯一字符

> 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。



**javascript map**

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let map = new Map();
    let tag = new Map();
    for(let i = 0; i < s.length; i++){
        if(map.has(s[i])){
            map.delete(s[i])
            tag.set(s[i])
        } else {
            if(!tag.has(s[i])){
               map.set(s[i], i)
            } 
        }
    }
    return map.size > 0 ? map.values().next().value : -1
};
```

**结果**
执行用时：92 ms , 在所有 JavaScript 提交中击败了 76.85% 的用户
内存消耗：44.5 MB , 在所有 JavaScript 提交中击败了 49.19% 的用户

**解题分析**
- 时间复杂度：O(n)。

- 空间复杂度：O(n)。

**Tips**

-  

**扩展-C**

```C

```

[]()