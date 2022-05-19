---
title: 存在重复元素
search: true

date: 2022-05-17 20:45:23
tags: [algorithm, leetcode, isValidSudoku]
description:
comments:
---

## 1️⃣ 36. 有效的数独

> 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。 数字 1-9 在每一行只能出现一次。 数字 1-9 在每一列只能出现一次。 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）



**javascript map**

```javascript
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    let length = board.length;
    let boardarr = new Array(length);
    let column = new Array(length); 
    let row = new Array(length); 
    for (let i = 0; i < length; i++) {
        row[i] = [];
        column[i] = [];
        for (let j = 0; j < length; j++) {
            row[i][j] = 0;
            column[i][j] = 0;
        }
    }
    for (let i = 0; i < 3; i++) {
        boardarr[i] = []; 
        for (let j = 0; j < 3; j++) {
            boardarr[i][j] = []; 
            for (let k = 0; k < 9; k++) {
                boardarr[i][j][k] = 0; 
            }
        }
    }
    for (let h = 0; h < length; h++) {
        for (let w = 0; w < length; w++) {
            let element = board[h][w];
            let bHeight = Math.floor(h / 3);
            let bWidth = Math.floor(w / 3);
            if(element !== '.'){
                let index = element - 1;
                row[h][index]++;
                column[w][index]++;
                boardarr[bHeight][bWidth][index]++;
                if(row[h][index] > 1 || column[w][index] > 1 || boardarr[bHeight][bWidth][index] > 1){
                    return false;
                }
            }
        }        
    }
    return true;
};
```

**结果**
执行用时： 72 ms , 在所有 JavaScript 提交中击败了 85.67% 的用户
内存消耗： 45 MB , 在所有 JavaScript 提交中击败了 61.01% 的用户

**解题分析**
- 时间复杂度：O(1)。数独共有 81 个单元格，只需要对每个单元格遍历一次即可。

- 空间复杂度：O(1)。由于数独的大小固定，因此哈希表的空间也是固定的。

**Tips**

-  

**扩展-C**

```C

```

[]()