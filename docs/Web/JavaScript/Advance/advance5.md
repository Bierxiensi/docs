---
title: 截流与防抖
search: true

date: 2021-12-13 19:05:23
tags: [截流与防抖]
photos:
description:
comments:
---

```js
const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        if (timer) {
            clear(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};
```
