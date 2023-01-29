---
title: shell文件权限
search: true

date: 2021-11-16 11:45:23
tags: [shell]
description:
comments:
---

> ssh -T git@github.com
> github.com/: Permission denied (publickey,keyboard-interactive).
> ssh-keygen -t rsa -C "xxx.xxx.com"

> ssh -T git@github.com
> Hi XXX! You've successfully authenticated, but GitHub does not provide shell access.
> git remote set-url origin git@github.com:<用户名>/<仓库名>.git

ssh-keygen -t rsa -C "bierxiensi@163.com"
