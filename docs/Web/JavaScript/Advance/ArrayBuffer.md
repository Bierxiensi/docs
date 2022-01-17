---
title: Buffer
search: true

date: 2022-01-15 21:08:10
tags: [Buffer]
photos:
description:
comments:
---

-   `ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区
-   某种程度上类似 C++的 `malloc`
-   不能直接操作 ArrayBuffer 的内容，而是要通过类型数组对象或 DataView 对象来操作

|                        api                        | 作用                                                                                                              |
| :-----------------------------------------------: | :---------------------------------------------------------------------------------------------------------------- |
|              ArrayBuffer.isView(arg)              | 如果参数是 ArrayBuffer 的视图实例则返回 true，例如 类型数组对象 或 DataView 对象；否则返回 false。                |
| ArrayBuffer.transfer(oldBuffer [, newByteLength]) | 返回一个新的 ArrayBuffer 对象，其内容取自 oldBuffer 中的数据，并且根据 newByteLength 的大小对数据进行截取或补 0。 |

```js
new ArrayBuffer(length)

length为要创建的 ArrayBuffer 的大小，单位为字节。
```
