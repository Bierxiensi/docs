---
title: 有效的字母异位词
search: true

date: 2022-06-02 20:45:23
tags: [algorithm, leetcode, isAnagram]
description:
comments:
---

## 1️⃣ 242. 有效的字母异位词

> 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

> 注意: 若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

> 提示: 1 <= s.length, t.length <= 5 * 104 , s 和 t 仅包含小写字母
 
> 进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？



**javascript 暴力解**

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length){
        return false
    }
    let sArr = [...new Set(s.split('').sort())];
    let tArr = [...new Set(t.split('').sort())];
    if(sArr.toString() !== tArr.toString()){
        return false
    }
    let s_map = new Map();
    let t_map = new Map();
    for (let index = 0; index < s.length; index++) {
        const s_element = s[index];
        const t_element = t[index];
        if(s_map.has(s_element)){
            let num = s_map.get(s_element) + 1;
            s_map.set(s_element, num)
        } else {
            s_map.set(s_element, 1)
        }
        if(t_map.has(t_element)){
            let num = t_map.get(t_element) + 1;
            t_map.set(t_element, num)
        } else {
            t_map.set(t_element, 1)
        }
    }
    for (let index = 0; index < sArr.length; index++) {
        if(s_map.get(sArr[index]) !== t_map.get(sArr[index])){
            return false
        }
    }
    return true
};
```

**结果**
执行用时： 120 ms , 在所有 JavaScript 提交中击败了 6.91% 的用户
内存消耗： 44.7 MB , 在所有 JavaScript 提交中击败了 31.68% 的用户

**解题分析**
- 时间复杂度：O(nlog(n))。 排序

- 空间复杂度：O(n)。 map

**Tips**

- `Unicode` 是为了解决传统字符编码的局限性而产生的方案，它为每个语言中的字符规定了一个唯一的二进制编码。而 `Unicode` 中可能存在一个字符对应多个字节的问题，为了让计算机知道多少字节表示一个字符，面向传输的编码方式的 `UTF−8` 和 `UTF−16` 也随之诞生逐渐广泛使用




**javascript 暴力解简化**
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    const sLen = s.length;
    const tLen = t.length;

    if(sLen !== tLen) return false;

    for(let i = 0;i < sLen; i++){
        t = t.replace(s[i], '')
    }

    return !t.length
}
```

**结果**
执行用时： 448 ms , 在所有 JavaScript 提交中击败了 5.02% 的用户
内存消耗： 46.9 MB , 在所有 JavaScript 提交中击败了 27.32% 的用户

**解题分析**
- 时间复杂度： 

- 空间复杂度： 


**javascript 暴力解简化2**
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  return s.length == t.length && [...s].sort().join('') === [...t].sort().join('')
}
```

**结果**
执行用时： 96 ms , 在所有 JavaScript 提交中击败了 27.81% 的用户
内存消耗： 48.3 MB , 在所有 JavaScript 提交中击败了 14.09% 的用户

**解题分析**
- 时间复杂度：O(nlog(n))。 排序

- 空间复杂度：O(n)。 array


**javascript 支持unicode**
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    const table = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
    }
    for (let i = 0; i < t.length; ++i) {
        table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
        if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
            return false;
        }
    }
    return true;
}
```

**结果**
执行用时： 56 ms , 在所有 JavaScript 提交中击败了 99.52% 的用户
内存消耗： 41.4 MB , 在所有 JavaScript 提交中击败了 93.33% 的用户

**解题分析**
- 时间复杂度：O(n)，其中 n 为 s 的长度。
- 空间复杂度：O(S)，其中 S 为字符集大小，此处 S = 26。
   



**扩展-C**

```C

```

[]()