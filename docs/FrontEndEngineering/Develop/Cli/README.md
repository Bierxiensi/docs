---
title: 脚手架
search: true

date: 2023-06-12 12:09:00
tags: [CLI]
description:
comments:
---

## 脚手架工具
> 组织结构、模块依赖、工具配置、开发范式、基础代码

## 介绍
### vue cli
> Vue项目的集成式构件化方案
    
### creat react app

### [Yeoman]()
> 通用型项目脚手架

#### 搭建步骤
1. 安装yo
```js
npm install yo --global # or yarn global add yo 
```
2. 选择模版下载
```js
npm install generator-node --global # or yarn global add generator-node
```
3. yo运行generator
```js
yo node
```
4. 部分功能(sub generator)的使用(以[generator-node为例](https://github.com/yeoman/generator-node))
```js
yo node:cli
```

#### 总结
使用Yeoman的核心在于
1.明确需求
2.找到合适的[generator](https://yeoman.io/generators/)

#### 补充 - 创建自己的generator
1. 安装generator
```js
npm install yeoman-generator
```
2. generator 基类介绍
initializing -- 初始化方法（检查状态、获取配置等）
prompting -- 获取用户交互数据（this.prompt()）
configuring -- 编辑和配置项目的配置文件
default -- 如果 Generator 内部还有不符合任意一个任务队列任务名的方法，将会被放在 default 这个任务下进行运行
writing -- 填充预置模板
conflicts -- 处理冲突（仅限内部使用）
install -- 进行依赖的安装（eg：npm，bower）
end -- 最后调用，做一些 clean 工作

3. 自定义 Generator

[generator v5.0版本特性](https://github.com/yeoman/generator/releases/tag/v5.0.0)

[npmInstall不可用怎么办](https://stackoverflow.com/questions/68265615/yeoman-this-npminstall-is-not-a-function)

[spawnCommand - Yeoman 生成器完成后非嵌套方式同步执行命令行操作](https://stackoverflow.com/questions/24550828/performing-command-line-actions-synchronously-after-yeoman-generator-has-finishe)


### [Plop]()
> 创建特定类型文件

## 搭建自己的CLI

### my-cli
- [cleye]()
- [commander]() 命令行自定义指令
- [inquirer]() 命令行询问用户问题，记录回答结果
- [handlebars]() / [ejs]()
- [fs]()
- [fs-extra系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API]()
- [download-git-repo下载远程模版]()

- [chalk控制台输出内容样式美化]()
- [ora]()
- [loading]()
- [figlet控制台打印]()
- [logo]()
- [easy-table]() 控制台输出表格
- [cross-spawn]() 支持跨平台调用系统上的命令

