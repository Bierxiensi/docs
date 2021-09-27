---
title: HTML5
date: 2020-01-08 14:14:12
tags: [html]
description: 学习反刍
---
# 写在前面
#### HTML5 是 HTML 文档的最新标准，由万维网联盟（W3C）于 2014 年 10 月完成标准制定。它添加了一些新的语法特征，修改或删除了一些旧的属性元素。包含HTML5 的新变化、文档、新特性等。
#### 知识点
- 什么是 HTML5
- HTML5 文档
- HTML5 代码规范
- HTML5 的新特性
- HTML5 新的结构元素介绍
- 浏览器支持
- HTML5 视频
- HTML5 音频

## 什么是HTML5
HTML5 是 HTML 最新的修订版本，由万维网联盟（W3C）于 2014 年 10 月完成标准制定。目标是取代 1999 年 所制定的 HTML 4.01 和 XHTML 1.0 标准，以期能在互联网应用迅速发展的时候，使网络标准达到匹配当代的网络需求。广义论及 HTML5 时，实际指的是包括 HTML、CSS 和 JavaScript 在内的一套技术组合。它希望能够减少网页浏览器对于需要插件的丰富性网络应用服务（Plug-in-Based Rich Internet Application，RIA），例如：Adobe Flash、Microsoft Silverlight 与 Oracle JavaFX 的需求，并且提供更多能有效加强网络应用的标准集。

HTML5 添加了许多新的语法特征，其中包括 `<video>`、`<audio>` 和 `<canvas>`元素，同时集成了 SVG 内容。这些元素是为了更容易的在网页中添加和处理多媒体和图片内容而添加的。其它新的元素如 `<section>`、`<article>`、`<header>` 和 `<nav>` 则是为了丰富文档的数据内容。新的属性的添加也是为了同样的目的。同时也有一些属性和元素被移除掉了。一些元素，像 `<a>`、`<cite>` 和 `<menu>` 被修改，重新定义或标准化了。同时 APIs 和 DOM 已经成为 HTML5 中的基础部分了。HTML5 还定义了处理非法文档的具体细节，使得所有浏览器和客户端程序能够一致地处理语法错误。

## HTML5文档

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
        </body>
    </html>

注：对于中文网页需要使用 <meta charset="utf-8"> 声明编码，否则会出现乱码。<!DOCTYPE> 对大小写不敏感。

## HTML5代码规范
### 使用正确的文档类型
文档类型声明位于 HTML 文档的第一行：

    <!DOCTYPE html>
也可以写成：

    <!doctype html>
### 可以省略html和body标签但不推荐

### 使用小写元素名
HTML5 元素名可以使用大写和小写字母，建议使用小写字母，会显得更加好看一点，千万不要使用大小写混写，那样会显得很不专业。建议的写法如下：
    
    <section>
      <p>我是段落。</p>
    </section>
### 关闭所有HTML元素
在 HTML5 中, 不一定要关闭所有元素 (例如 <p> 元素)，但是建议每个元素都要添加关闭标签。比如下面这样写也不会报错：

    <section>
      <p>我是段落甲。
      <p>我是段落乙。
    </section>
    
### 关闭空的 HTML 元素
在 HTML5 中, 空的 HTML 元素也不一定要关闭, 可以这样写：
    
    <meta charset="utf-8">
建议的写法还是关闭：

    <meta charset="utf-8" />

### 使用小写属性名
同样的 HTML5 属性名允许使用大写和小写字母。建议使用小写字母：

    <div class="test">
    
### 属性值
HTML5 属性值可以不用引号。但是属性值我们推荐使用引号，尤其是属性值有空格的话，一定要使用引号，不然不会起作用，属性的命名如果很长我们建议使用驼峰命名法：

    <div class="test changeColor">
    
### 图片属性
图片通常使用 alt 属性。 在图片不能显示时，它能替代图片显示。建议定义好图片的尺寸，在加载时可以预留指定空间，减少闪烁。比如：

    <img src="syl.png" alt="HTML5" style="width:520px;height:1314px">
    
### 空格前后的等号
等号的前后可以使用空格，也可以不使用，推荐少用空格。

    <link rel="stylesheet" href="styles.css">
### 避免一行代码过长
使用 HTML 编辑器，一行代码过长时左右滚动代码来查看是不方便的。如果实在太长，建议分为几行来写。

### 空格和缩近
不要无缘无故的添加空行，一般一个模块或一个功能添加一个空行便于区分，缩进使用两个空格，不建议使用 Tab。

### 注释

    <!-- 这是注释 -->
## HTML5 的新特性
- 语义特性：HTML5 新标准中添加了拥有具体含义的 HTML 标签比如：`<article>`、`<footer>`、`<header>`、`<nav>`、`<section>`。
- 连通性：能够让你和服务器之间通过创新的新技术方法进行通信。
- 对本地离线存储的更好的支持。
- 用于媒介回放的 video 和 audio 元素。
- 用于绘画的 canvas 元素。
- 性能与集成特性：提供了非常显著的性能优化和更有效的计算机硬件使用。
- 设备兼容特性：能够处理各种输入和输出设备。 
- CSS3 特性。

## HTML5 新的结构元素介绍
### section 标签
`<section>` 表示文档中的一个区域（或节）。比如章节、页眉、页脚或文档中的其他部分，一般来说会包含一个标题。

    <!DOCTYPE html>
    <html>
        <head>
            <title>my page</title>
        </head>
        <body>
            <section>
                <h1>section是什么？</h1>
                <p>一个新章节</p>
            </section>
        </body>
    </html>
注：不要把 `<section>` 元素作为一个普通的 div 容器来使用。一般来说，一个 `<section>` 应该出现在文档大纲中。
### article 标签
`<article>` 标签定义独立的内容。常常使用在论坛帖子，报纸文章，博客条目，用户评论等独立的内容项目之中。article 可以嵌套，内层的 article 对外层的 article 标签有隶属关系。

    <!DOCTYPE html>
    <html>
        <head>
            <title>my page</title>
        </head>
        <body>
            <article>
                <h1>实验楼是什么</h1>
                <p>一个在线学习的网站</p>
            </article>
        </body>
    </html>
### nav 标签
`<nav>` 标签定义导航链接的部分：描绘一个含有多个超链接的区域，这个区域包含转到其他页面，或者页面内部其他部分的链接列表。

    <!DOCTYPE html>
    <html>
        <head>
            <title>my page</title>
        </head>
        <body>
            <nav>
                <ul>
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                </ul>
            </nav>
        </body>
    </html>
注：并不是所有的链接都必须使用 `<nav>` 标签,它只用来将一些热门的链接放入导航栏。一个网页也可能含有多个 `<nav>` 标签,例如一个是网站内的导航列表,另一个是本页面内的导航列表。
### header 标签
`<header>` 标签定义文档的页眉，通常是一些引导和导航信息。它不局限于写在网页头部，也可以写在网页内容里面。

通常 header 标签至少包含一个标题标记（h1-h6），还可以包括 hgroup 标签，还可以包括表格内容、标识、搜索表单、nav 导航等。

    <!DOCTYPE html>
    <html>
        <head>
            <title>my page</title>
        </head>
        <body>
            <header>
                <h1>网站标题</h1>
                <h1>网站副标题</h1>
            </header>
        </body>
    </html>
### footer 标签
`<footer>` 标签定义 section 或 document 的页脚，包含了与页面、文章或是部分内容有关的信息，比如说文章的作者或者日期。 它和 header 标签使用基本一样，可以在一个页面中多次使用，如果在一个区段的后面加入了 footer 标签，那么它就相当于该区段的页脚了。

    <!DOCTYPE html>
    <html>
        <head>
            <title>my page</title>
        </head>
        <body>
            <footer>
                <span>Copyright @2013-2019 实验楼在线教育</span>
            </footer>
        </body>
    </html>
### aside 标签
`<aside>` 标签表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者嵌入内容。他们通常包含在工具条，例如来自词汇表的定义。也可能有其他类型的信息，例如相关的广告、笔者的传记、web 应用程序、个人资料信息，或在博客上的相关链接。

    <!DOCTYPE html>
    <html>
        <head>
            <title>my page</title>
        </head>
        <body>
            <aside>
                <h1>实验楼简介</h1>
                <p>一个在线学习的网站</p>
            </aside>
        </body>
    </html>
### figure 标签
`<figure>` 标签规定独立的流内容（图像、图表、照片、代码等等）。

figure 元素的内容应该与主内容相关，但如果被删除，则不应对文档流产生影响。

## 浏览器支持
最新版本的 Safari、Chrome、Firefox 以及 Opera 支持某些 HTML5 特性。Internet Explorer 9 将支持某些 HTML5 特性。

## HTML5 视频
HTML5 规定了一种通过 video 元素来包含视频的标准方法。
<table width="300" height="200" bgcolor="green"
    align="center" border="1">
    <caption>视频格式和浏览器支持</caption>
    <tr bgcolor="#808080">
        <th>格式</th>
        <th>浏览器</th>
    </tr>
    <tr bgcolor="white">
        <td>.ogg</td>
        <td>FireFox 3.5+ ，chrome 5.0+ ，Opera 10.5+</td>
    </tr>
    <tr bgcolor="white">
        <td>.mp4/H.264</td>
        <td>Safari 3.0+ ，chrome 5.0+ ，IE 9.0+</td>
    </tr>
    <tr bgcolor="white">
        <td>.webm</td>
        <td>FireFox 4.0+ ，chrome 6.0+ ，Opera10.6+</td>
    </tr>
</table>

注：`<video>` 与 `</video>` 之间插入的内容是供不支持 video 元素的浏览器显示的。video 元素允许多个 source 元素，source 元素可以链接不同的视频文件，浏览器将使用第一个可识别的格式。
引入单个文件也可以这样写：

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            <video src="http://labfile.oss.aliyuncs.com/courses/1248/video.ogg" width="320" height="240" controls="controls">
                你的浏览器不支持video元素
            </video>
        </body>
    </html>
<table width="300" height="200" bgcolor="green"
    align="center" border="1">
    <caption>video 标签的属性如下所示</caption>
    <tr bgcolor="#808080" style="color:white">
        <th>属性</th>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr bgcolor="white">
        <td>autoplay</td>
        <td>autoplay</td>
        <td>如果出现该属性，则视频在就绪后马上播放</td>
    </tr>
    <tr bgcolor="white">
        <td>controls</td>
        <td>controls</td>
        <td>如果出现该属性，则向用户显示控件，比如播放按钮</td>
    </tr>
    <tr bgcolor="white">
        <td>height</td>
        <td>pixels</td>
        <td>设置播放器的高度</td>
    </tr>
    <tr bgcolor="white">
        <td>loop</td>
        <td>loop</td>
        <td>如果出现该属性，则当媒介文件完成播放后再次开始播放</td>
    </tr>
    <tr bgcolor="white">
        <td>muted</td>
        <td>muted</td>
        <td>规定视频的音频输出应该被静音</td>
    </tr>
    <tr bgcolor="white">
        <td>poster</td>
        <td>URL</td>
        <td>规定视频下载时显示的图像，或者在用户点击播放按钮前现实的图像</td>
    </tr>
    <tr bgcolor="white">
        <td>preload</td>
        <td>preload</td>
        <td>如果出现该属性，则视频在页面加载时进行加载，并预备播放。
        如果使用"autoplay"，则忽略该属性</td>
    </tr>
    <tr bgcolor="white">
        <td>src</td>
        <td>url</td>
        <td>要播放的视频的URL</td>
    </tr>
    <tr bgcolor="white">
        <td>width</td>
        <td>pixels</td>
        <td>设置视频播放的宽度</td>
    </tr>
</table>    
    
### 字幕的简单使用
使用常用的 WebVtt 字幕格式，在 `<video>` 中使用 `<track>` 元素引入字幕。例如：

    <track src="http://labfile.oss.aliyuncs.com/courses/1248/video_ch.vtt" srclang="zh"   kind="subtitles" label="中文" default>
    <track src="http://labfile.oss.aliyuncs.com/courses/1248/video_en.vtt" srclang="en" kind="subtitles" label="English">

track 元素属性说明：
- src：指定资源 url。
- srclang：资源的语言，例如：中文 zh，英文 en。
- kind：默认值是 subtitles 字幕，captions 标题、音效及其他音频信息，descriptions 视频的文本描述，chapters 章节导航，metadata 元数据。
- label：选择字幕时候出现的文字。
- default：default 指的是默认会显示的字幕。例如两个 <track> 元素，如果都没有 default 属性，那都不显示，需要用户手动调出。另外，default 只能出现在一个 <track> 元素上。

例子：

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
            <style type="text/css">
            ::cue{
                color: red;
            }
    
            </style>
        </head>
        <body>
            <video src="http://labfile.oss.aliyuncs.com/courses/1248/video.ogg" width="320" height="240" controls="controls">
                你的浏览器不支持video元素
                <track src="video_ch.vtt" srclang="en" kind="subtitles" label="中文" default>
                <track src="video_en.vtt" srclang="en" kind="subtitles" label="English">
            </video>
        </body>
    </html>
    
可以为字幕设置样式，通过设置专门的伪元素 ::cue 来控制字幕的样式。可以控制的 css 属性包括：color，opacity，visibility，text-decoration 及相关属性，text-shadow，background 及相关属性，outline 及相关属性，font 及相关属性包括 line-height，white-space，text-combine-upright，ruby-position。

## HTML5 音频
HTML5 规定了一种通过 audio 元素来包含音频的标准方法。
<table width="300" height="200" bgcolor="green"
    align="center" border="1">
    <caption>音频格式和浏览器支持如下所示</caption>
    <tr bgcolor="#808080">
        <th>格式</th>
        <th>浏览器</th>
    </tr>
    <tr bgcolor="white">
        <td>.ogg</td>
        <td>FireFox 3.5+ ，chrome 3.0+ ，Opera 10.5+</td>
    </tr>
    <tr bgcolor="white">
        <td>.mp3</td>
        <td>Safari 3.0+ ，chrome 3.0+ ，IE 9.0+</td>
    </tr>
    <tr bgcolor="white">
        <td>.wav</td>
        <td>FireFox 3.5+ ，Safari 3.0+ ，Opera10.5+</td>
    </tr>
</table>

例子：

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            <audio controls="controls">
                <source src="http://labfile.oss.aliyuncs.com/courses/1248/video.ogg" type="audio/ogg">
                <source src="http://labfile.oss.aliyuncs.com/courses/1248/phone.mp3" type="audio/mpeg">
                你的浏览器不支持audio元素
            </audio>
        </body>
    </html>
    
注：<audio> 与 </audio> 之间插入的内容是供不支持 audio 元素的浏览器显示的。audio 元素允许多个 source 元素，source 元素可以链接不同的音频文件，浏览器将使用第一个可识别的格式。

<table width="300" height="200" bgcolor="green"
    align="center" border="1">
    <caption>audio标签的属性如下所示</caption>
    <tr bgcolor="#808080" style="color:white">
        <th>属性</th>
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr bgcolor="white">
        <td>autoplay</td>
        <td>autoplay</td>
        <td>如果出现该属性，则音频在就绪后马上播放</td>
    </tr>
    <tr bgcolor="white">
        <td>controls</td>
        <td>controls</td>
        <td>如果出现该属性，则向用户显示控件，比如播放按钮</td>
    </tr>
    <tr bgcolor="white">
        <td>loop</td>
        <td>loop</td>
        <td>如果出现该属性，则当音频文件完成播放后重新开始播放</td>
    </tr>
    <tr bgcolor="white">
        <td>muted</td>
        <td>muted</td>
        <td>规定音频输出应该被静音</td>
    </tr>
    <tr bgcolor="white">
        <td>preload</td>
        <td>preload</td>
        <td>如果出现该属性，则音频在页面加载时进行加载，并预备播放。
        如果使用"autoplay"，则忽略该属性</td>
    </tr>
    <tr bgcolor="white">
        <td>src</td>
        <td>url</td>
        <td>要播放的音频的URL</td>
    </tr>
</table>    
