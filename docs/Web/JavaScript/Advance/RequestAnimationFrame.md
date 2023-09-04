---
title: requestAnimationFrame
search: true

date: 2023-07-01 21:25:23
tags: [requestAnimationFrame]
photos:
description:
comments:
---

## requestAnimationFrame的工作原理
[`requestAnimationFrame`](http://creativejs.com/resources/requestanimationframe/)是一个由浏览器提供的用于优化动画效果的API。它的工作原理如下：

1. 请求动画帧：当你调用`requestAnimationFrame`时，浏览器会在下一次重绘之前调用指定的回调函数。这个回调函数可以执行你希望在下一帧动画中更新的操作。

2. 刷新率同步：浏览器会自动根据显示器的刷新率来决定每秒钟重绘的次数。通常情况下，刷新率为60Hz，意味着每秒钟重绘60次。因此，`requestAnimationFrame`会与显示器的刷新率进行同步，以确保动画的流畅性。

3. 优化性能：浏览器会在每次重绘之前执行回调函数，这样可以利用浏览器的优化机制来最大限度地减少性能开销。例如，当浏览器的标签页不可见或最小化时，`requestAnimationFrame`会自动暂停，以节省资源。

4. 循环动画：为了创建连续的动画效果，通常会在回调函数中使用递归或循环来不断调用`requestAnimationFrame`。这样可以在每一帧中更新动画状态，并且在动画完成后停止调用`requestAnimationFrame`。

通过使用`requestAnimationFrame`，你可以创建平滑、高性能的动画效果，并且能够更好地与浏览器的渲染机制协同工作，以提供更好的用户体验。


