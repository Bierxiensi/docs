---
title: sum
search: true

date: 2023-01-14 20:05:23
tags: [sum]
description:
comments:
---


### 1\. 循环输入，每输入一个正整数 n (n≤65535)，输出 1 + 2 + 3 + ... + n 的值，并且多输出一个空行。当没有任何输入时，结束程序
```js
#include<stdio.h>
int main(){
    int n;
    while(scanf("d%", &n) != EOF){
        printf("d%\n", n*(n+1)/2);
    }
    return 0;
}
```
- n 取最大值 65535 时，n * (n + 1) = 65535 * 65536 = (2^16 - 1) * 2^16 = 2^32 - 2^16，而 int 能够表示的最大值为 2^31 - 1，所以产生了溢出。就变成了负数。

