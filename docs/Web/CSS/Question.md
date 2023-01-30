---
title: CSS
search: true

date: 2023-01-30 20:05:23
tags: [CSS, Question]
description:
comments:
---

## 动手题

### 1. 画0.5px的线
使用transform加伪类实现（较常用）
```css
div::after{
    content:'';width:100%;
    border-bottom:1px solid #000;
    transform: scaleY(0.5);
}
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}
/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}
```

## 场景题

### 1. PPI适配 —— 在最小基本单位尺寸不固定的情况下，如何找到一个固定大小的尺寸单位?
对于文字，希望 16px 的文字无论在什么样的屏幕下看起来都是一样大的。这里的 px 是一个实际物理尺寸固定的单位。设置 viewport 就可以实现这个目的：`<meta name=“viewport” content=“width=device-width”>` 1个逻辑像素的尺寸 = 1 / PPI × 缩放因子，设置 viewport 本质上是把 px 变成了一个`绝对单位`。

### 2. 分辨率（resolution）适配 —— 如何找一个相对单位，使同一尺寸在不同大小的屏幕上看上去相对大小一致？
如一张宽100%，高100unit 的 banner 图，希望它在任何大小的屏幕上能够等比例缩放，因此需要这里的 unit 是一个相对单位。`vw `和 `vh` 就是很好的`相对单位`。

### 3. DPR（devicePixelRatio）适配 —— 在设置了 `viewport`，`width=device-width` 的情况下，如何画出1px（设备像素）?
DPR = 2 意味着 CSS 中的1px 会用2个设备像素来渲染，解决方案有：用小数、渐变、transform 缩放等，手机淘宝的做法是使用 js 动态设置 viewport 的 initial-scale。

### 4. 1px问题是什么？
多倍的设计图设计了1px的边框，在手机上缩小呈现时，由于css最低只支持显示1px大小，导致边框太粗的效果。


## 基础题

### 1. 文本内容换行

情景：设置 width 容器 width，但不会自动换行，

原因：给定连续的数字或字母浏览器不会分开解析，而是会直接将一串当成一个单词不会自动切断字符串而进行换行，因此设置的宽度就失效了。

解决方案：

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

## 职场题




