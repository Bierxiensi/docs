---
title: symbol
search: true

date: 2021-11-14 09:05:23
tags: [symbol]
photos:
description:
comments:
---

## 前置

-   循环引用

1\. 平时如何判断对象类型，分别适合哪些场景

-   typeof
-   instanceof
-   Object.prototype.tostring.call(obj)
-   Array.isArray

2\. 实现一个 instanceOf

```javascript
function instanceOf(left, right) {
    if (typeof left !== "object" || left === null) {
        return false;
    }

    while (true) {
        if (left === null) {
            return false;
        }
        if (left.__proto__ === right.prototype) {
            return true;
        }

        left = left.__proto__;
    }
}
```
