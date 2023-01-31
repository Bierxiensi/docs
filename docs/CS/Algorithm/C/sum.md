---
title: sum
search: true

date: 2023-01-14 20:05:23
tags: [sum]
description:
comments:
---


### 1\. 循环输入，每输入一个正整数 n (n≤65535)，输出 1 + 2 + 3 + ... + n 的值，并且多输出一个空行。当没有任何输入时，结束程序
【错误的】
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

【正确的-循环枚举】
```js
while(scanf("d%", &n) != EOF){
    int sum = 0;
    while(n){
        sum += n;
        n--;
    }
    printf("d%\n", sum)
}
```

【正确的-奇偶性判断】
```js
while(scanf("d%", &n) != EOF){
    if(n % 2 == 0){
        printf("d%\n", n/2*(n+1))
    } else {
        printf("d%\n", (n+1)/2*n)
    }
}
```

【正确的-无符号整型】
```js
while(scanf("d%", &n) != EOF){
    unsigned int sum = n * (n+1) / 2;
    printf("d%\n", sum);
}
```

【正确的-64位整型】
```js
while(scanf("d%", &n) != EOF){
    long long sum = n * (n+1) / 2;
    printf("d%\n", sum);
}
```
- long long是C语言中的64位整型，范围比int大了一个平方量级，在[−2^63, 2^63 − 1]

