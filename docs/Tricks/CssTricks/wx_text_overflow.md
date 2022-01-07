---
title: 小程序中文本显示
search: true

date: 2022-01-04 20:05:23
tags: [CSS, Tricks, text-overflow]
description:
comments:
---

1\. 单行显示，超出内容省略
```css
/* 固定宽度 */
width: inherit
/* 超出部分隐藏 */
over-flow: hidden 
/* 不换行 */
white-space: nowrap
```

2\. 单行显示，超出内容显示小数点
```css
/* 固定宽度 */
width: inherit
/* 超出部分隐藏 */
over-flow: hidden 
/* 不换行 注意nowrap/no-wrap写法 */
white-space: nowrap
/* 超出部分显示小数点 */
text-overflow: ellipsis
```

3\. 多行显示，超出内容显示小数点
[](https://www.jianshu.com/p/169864825438)