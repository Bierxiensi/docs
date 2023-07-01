---
title: node
search: true

date: 2021-09-02 19:05:23
tags: [node]
photos:
description:
comments:
---

# what
node 是基于 Google JS 引擎 V8 的 JS 【运行时]()，这意味着
- 首先，node 需要承担 JS 的类型检查责任
- 其次，为了丰富生态，node 需要承担一些 JS 相比其他语言不具备额外的扩展功能
    - 网络
    - 文件
    - 进程 
- 🖋️ing...

为了实现上述功能，node 需要 一个引擎 - `V8`、一些功能拓展库 - `Libuv` 以及一些三方库

# 