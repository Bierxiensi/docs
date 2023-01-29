
#### 简介
> 开源的移动开发框架,允许用标准的web技术-HTML5,CSS3和JavaScript做跨平台开发

<img src="http://cordova.axuer.com/static/img/guide/cordovaapparchitecture.png" height="400" width="480"></img>


#### 安装Cordova Cli
```
npm install -g cordova
```
#### 创建App
```
cordova create myApp
```
#### 进入子目录
```
cd myApp
```
#### 给App添加目标平台


web端开发环境browser
```
cordova platform add browser
```
移动端开发环境
```
cordova platform add ios --save
cordova platform add android --save
```


#### 移除App目标平台
```
cordova platform remove XXX --save
```


#### 查看平台设置状况和运行环境要求
```
cordova platform ls


```

张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_14-43-59.png

#### 查看运行环境要求
```
cordova requirements
```


张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_14-52-0.png



重新安装环境后（这一步有可能会遇到很多坑，如果Android SDK和Gradle安装有问题，特别是自定义安装目录、安装过程漏掉勾选项、和以前安装过的版本冲突时（环境变量位置不一致），建议卸掉在默认目录重装）

张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_16-14-10.png



#### 虚拟设备调试
```
cordova emulate android
```
张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_17-15-57.png



#### 构建APP
```
cordova build
```


张 翔宇 > 从0-1创建一个Cordova应用 > image2021-6-22_16-21-56.png



#### 应用发布
android stdio应用[发布](https://developer.android.com/studio/publish?hl=zh-cn)