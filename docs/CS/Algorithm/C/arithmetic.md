---
title: four arithmetic operations
search: true

date: 2023-01-12 20:05:23
tags: [arithmetic]
description:
comments:
---

### 1\. 输入两个正整数 a 和 b，输出 a + b 的值。 其中 a, b ≤ 10000
```js
#include<stdio.h>
int main(){
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\n", a + b);
    return 0;
}
```
- `#include` 是包含头文件的语法
- `stdio.h` 是输入输出相关的头文件，所有的 `scanf` 和输出函数 `printf` 都必须包含这个头文件

### 2\. 先输入一个 t (t≤100)，然后输入 t 组数据。对于每组数据，输入两个整数 a 和 b，输出 a + b 的值。其中 a, b ≤10000
```js
#include<stdio.h>
int main(){
    int a, b, t;
    scanf("d%", &t);
    while(t--){
        scanf("d% d%", &a, &b);
        printf("d%\n", a + b);
    }
    return 0;
}
```

### 3\. 循环输入，每输入两个正整数 a 和 b（其中 a, b ≤10000），就输出 a + b 的值。 当没有任何输入时，结束程序。
```js
#include<stdio.h>
int main(){
    int a, b;
    while(scanf("d% d%", &a, &b) != EOF){
        printf("%d\n", a + b);
    }
    return 0;
}
```
- 输入函数为 `scanf`，当这个函数返回 `EOF` 时，就代表没有任何输入了

### 4\. 循环输入，每输入两个正整数 a 和 b（其中 a, b ≤10000），就输出 a + b 的值。 当输入的 a 和 b 都等于零时，程序结束
```js
#include<stdio.h>
int main(){
    int a, b;
    while(scanf("d% d%", &a, &b) && (a || b)){
        printf("%d\n", a + b);
    }
    return 0;
}
```

### 5\. 输入一个表达式（用字符串表示），求这个表达式的值
> 保证字符串中的有效字符包括[‘0’-‘9’],‘+’,‘-’, ‘*’,‘/’ ,‘(’， ‘)’,‘[’, ‘]’,‘{’ ,‘}’。且表达式一定合法。
> 数据范围：表达式计算结果和过程中满足 |val| ≤ 1000  ，字符串长度满足 1 ≤ n ≤ 1000 

```js

```