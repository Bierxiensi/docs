---
title: sum
search: true

date: 2023-01-14 20:05:23
tags: [sum]
description:
comments:
---

### 1\. 循环输入，每输入一个浮点数 aa（其中 a \le 10000a≤10000），就输出 aa 的绝对值，精确到小数点后两位。 当没有任何输入时，结束程序
```js
#include<stdio.h>
#include<math.h>
int main(){
    double a;
    while(scanf("d%", &a) != EOF){
        printf("%.21f\n", fabs(a));
    }
}
```