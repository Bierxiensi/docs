---
title: 服务器常用操作及命令
search: true

date: 2020-01-17 11:01:49
tags: [Linux, server]
photos:
description:
comments:
---

## 一、 防火墙 Firewalld、iptables
### 1、Firewalld
#### 1\.1 systemctl模式 
- systemctl status firewalld        #查看firewalld状态
- systemctl start firewalld         #开启防火墙
- systemctl enable firewalld        #开机启动 
- systemctl stop firewalld          #关闭防火墙设置
- systemctl restart firewalld       #重启防火墙
- systemctl disable firewalld       #禁止开机启动
#### 1\.2 firewall-cmd 防火墙控制台
- firewall-cmd --stat               #查看状态
- firewall-cmd --list-all           #查看所有已添加

添加防火墙分为添加端口和添加服务两种：

### 2、iptables
[linux防火墙查看状态firewall、iptable](https://www.cnblogs.com/zxg-blog/p/9835263.html)
 查看、打开、关闭防火墙
 service iptables status
 service iptables start
 service iptables stop

端口的添加和删除：
#####查看端口/协议
- Yum -y install net-tools #安装net-tools工具包
- netstat -anp

- firewall-cmd --add-port=端口号/协议               #临时添加端口(重新加载或重启后失效)
- firewall-cmd --list-port                        #查看已经添加的端口（暂时添加，重新加载就没了）

#####永久添加端口 --permanent (不会立即生效,需要重新加载或重启)
- firewall-cmd --add-port=端口号/协议 --permanent
- firewall-cmd --permanent --add-port=端口号/协议

eg：添加80tcp协议
- firewall-cmd --add-port=80/tcp
- firewall-cmd --add-port=80tcp --permanent

#####临时删除端口(重新加载或重启后失效)
- firewall-cmd --remove-port=端口号/协议

#####永久删除端口 --permanent (不会立即生效,需要重新加载或重启)
- firewall-cmd --remove-port=端口号/协议 --permanent
- firewall-cmd --permanent --remove-port=端口号/协议

#### Linux常用命令 
[chmod修改文件权限 ](https://blog.csdn.net/pythonw/article/details/80263428)
- sudo(ubuntu系统) chmod 777 路径:如[/etx/nginx] 

sudo ufw status 查看端口启动情况

sudo ufw allow 80 打开80端口

sudo ufw enable 开启防火墙

netstat -tln 查看所有端口的使用情况
netstat -l 查看listen状态下的端口
netstat -tln | grep 80 只查看80端口的使用情况

