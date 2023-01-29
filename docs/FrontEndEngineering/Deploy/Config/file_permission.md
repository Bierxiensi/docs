---
title: shell文件权限
search: true

date: 2021-11-15 09:45:23
tags: [shell]
description:
comments:
---

## 前置

-   新增一个 shell 文件，执行时报错
    > permission denied: ./fetch.sh

## 文件权限修改(eg：fetch.sh)

> sudo chmod -R 750 〈fetch.sh〉

-   -R 是指级联应用到目录里的所有子目录和文件
-   属主：rwx=4+2+1=7。
-   属组：r-x=4+0+1=5。
-   其他：---=0+0+0=0
