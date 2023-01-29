---
title: 时间戳转换至天、时、分、秒
search: true

date: 2022-05-24 20:05:23
tags: [JS, formatTimeWithSeconds]
description: 时间戳转换至天、时、分、秒
comments:
---

## 函数实现

### 转化成 天-时-分-秒
```js
export function formatTimeWithSeconds(seconds) {
    const day = Math.floor(seconds / 86400);
    const hour = Math.floor((seconds % 86400) / 3600);
    const minute = Math.floor(((seconds % 3600) % 3600) / 60);
    const second = Math.floor(seconds % 60);
    return `${day}-${hour}-${minute}-${second}`;
}
```

### 转化成 天-时-分(分需四舍五入)
```js
export function formatTimeWithSeconds(seconds) {
    // 四舍五入到分钟
    if (seconds % 60 > 30) {
        seconds = Math.floor(seconds / 60) * 60 + 60;
    } else {
        seconds = Math.floor(seconds / 60) * 60;
    }
    const day = Math.floor(seconds / 86400);
    const hour = Math.floor((seconds % 86400) / 3600);
    const minute = Math.floor(((seconds % 3600) % 3600) / 60);
    return `${day}-${hour}-${minute}`;
}
```