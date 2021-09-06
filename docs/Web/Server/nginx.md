---
title: nginx部署
search: true
tags: [nginx, server]

date: 2020-02-24 16:00:55
photos:
description:
comments:
---
Ubuntu 18.04安装nginx
更新命令
sudo apt-get update
安装nginx
sudo apt install nginx
切换成root权限
sudo su root
查看nginx是否安装成功
http:// + your ip

1、[nginx部署-修改配置文件后重启](https://jingyan.baidu.com/article/656db9182973dae381249c99.html)
到更改的配置文件目录下运行nginx -t  得到
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
表示配置文件配置正常
此时运行nginx -s reload  重启nginx


查询nginx主进程号
ps -ef | grep nginx

查看是否已经启动了nginx
ps -e | grep nginx

Gunicorn进程
ps aux | grep gunicorn

Gunicorn进程树
pstree -ap|grep gunicorn


[常见错误](https://www.cnblogs.com/daipianpian/p/9551820.html)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] socket() [::]:80 failed (97: Address family not supported by protocol)

fuser -k 80/tcp 将进程杀死
