
---
title: Mac环境搭建
search: true

date: 2023-06-05 14:45:23
tags: [mac]
description:
comments:
---

### 环境搭建

#### 终端相关

##### HomeBrew
> 使用 Homebrew 安装 Apple（或您的 Linux 系统）没有预装但 你需要的东西。

Mac 软件包管理工具。gitee极速安装指南：<https://gitee.com/cunkai/HomebrewCN> 。官网安装指南：<https://brew.sh/index_zh-cn> 。

> 根据 README.md 操作。

##### NVM

nodejs 版本管理。下载地址：<https://gitee.com/mirrors/nvm> 。

> 下载压缩包，解压后执行 install.sh 。
>
> 然后将下面指令添加到终端配置文件（例如 `~/.zshrc`）中。（脚本可能已自动添加）
>
> ```sh
> export NVM_DIR="$HOME/.nvm"
> [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
> [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
> ```


> 也可以使用 HomeBrew 下载 NVM。执行 `brew install nvm && echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc` 重新打开终端即可。

> ⚠️注意
>
> 上述指令中的 `.bash_profile` 需要替换成相应的终端配置文件。例如终端使用的 zsh 则用 `.zshrc` ，bash 则使用 `.bash_profile` 。

#### 工作相关

##### git

版本控制工具。使用 HomeBrew 安装。官网：<https://git-scm.com/> 。

```sh
brew install git

# 由于Mac自带git，所以需要链接到刚刚安装的新版本git
brew link git

# 重启终端
# 或者重载终端配置文件
source ~/.zshrc

# 生成ssh凭证
ssh-keygen -t rsa -b 2048 -C "<username>@github.com"

# 将凭证添加到github，复制 ~/.ssh/id_rsa.pub 的内容到 https://github.com/profile/keys 上）

# 全局设置用户名和邮箱
git config --global user.name "<username>"
git config --global user.email "<username>@github.com"
```

#### 推荐的效率工具

##### Alfred

本地搜索及快速启动工具。下载地址：<https://macwk.com/soft/alfred-4> 。

##### SwitchHosts

管理切换编辑系统hosts的工具。下载地址：<https://macwk.com/soft/switchhosts> 。

##### Typora

Markdown编辑器、写作软件。下载地址：<https://macwk.com/soft/typora> 。

##### Snipaste

屏幕截图工具。下载地址：<https://macwk.com/soft/snipaste> 。

##### Rectangle

Mac 窗口管理工具。下载地址：<https://macwk.com/soft/rectangle> 。


#### vscode 推荐插件

1.ESLint 将 ESLint JavaScript
集成到 VS Code

2.GitLens — Git supercharged
增强 Visual Studio Code 中内置的 Git 功能——通过 Git 责备注释和代码镜头一目了然地可视化代码作者，无缝导航和探索 Git 存储库，通过强大的比较命令获得有价值的见解等等

3.stylelint
样式线

4.Prettier - Code formatter
Prettier - 代码格式化程序

5.Bracket Pair Colorizer
支架对着色器

6.Auto Rename Tag
自动重命名标签
