---
title: CSS
search: true

date: 2021-12-08 20:05:23
tags: [CSS]
description:
comments:
---

## 这里有一些 CSS 内容

### 1\. 文本内容换行

#### 情景：设置 width 容器 width，但不会自动换行，

#### 原因：给定连续的数字或字母浏览器不会分开解析，而是会直接将一串当成一个单词不会自动切断字符串而进行换行，因此设置的宽度就失效了。

#### 解决方案：

-   使用到了[word-break](http://caibaojian.com/css3/properties/text/word-break.htm)

```cs
// IE私有属性，支持IE5.5+，其他部分浏览器支持，仅支持英文，以字母为换行依据
word-break: break-all
```

-   使用到了[word-wrap](http://caibaojian.com/css3/properties/text/word-wrap.htm)

```cs
// IE私有属性，支持IE5.5+，其他浏览器都支持，仅支持英文，以单词为换行依据
word-wrap: break-word
```

-   使用到了[overflow-wrap](http://caibaojian.com/css3/properties/text/overflow-wrap.htm)

```cs
// CSS3中将 word-wrap 改名为 overflow-wrap；最好同时使用 word-wrap 作为备选，作向前兼容，不支持IE、Firefox，以字母、文字为换行依据
overflow-wrap: break-word
```

-   使用到了[white-space](http://caibaojian.com/css3/properties/text/white-space.htm)

```cs
// 其他浏览器都支持，仅支持中文，以文字为换行依据
white-space: pre-wrap 不合并文字间的空白距离
white-space: pre-line 不保留文字间的空白距离
```
