---
title: compare
search: true

date: 2021-12-12 19:05:23
tags: []
photos:
description:
comments:
---

### 1. HTTP 协议是什么？
- 全称超文本传输协议（Hypertext Transfer Protocol），用来规范浏览器和服务器端的行为
- HTTP 是应用层协议，它以 TCP（传输层）作为底层协议，HTTP 默认端口号是 80
- HTTP 是一个无状态（stateless）协议，服务器不维护任何有关客户端过去所发请求的消息
- 优点是扩展性强、速度快、跨平台支持性好

### 2. HTTPS 协议是什么？
- 全称安全超文本传输协议 协议（Hyper Text Transfer Protocol Secure），是 HTTP 的加强安全版本
- HTTPS 是基于 HTTP 的，也是用 TCP 作为底层协议，并额外使用 SSL/TLS 协议用作加密和安全认证，默认端口号是 443
- 优点是保密性好、信任度高

小结：HTTPS 之所以能达到较高的安全性要求，就是结合了 SSL/TLS 和 TCP 协议，对通信数据进行加密，解决了 HTTP 数据透明的问题

### 3. SSL/TLS 协议是什么？
- SSL 指安全套接字协议（Secure Sockets Layer），首次发布与 1996 年
- SSL 的首次发布其实已经是它的 3.0 版本，SSL 1.0 从未面世，SSL 2.0 则具有较大的缺陷（DROWN 缺陷——Decrypting RSA with Obsolete and Weakened eNcryption）
- TLS 是基于 SSL 之上的，在 1999 年，SSL 3.0 进一步升级，新版本被命名为 TLS 1.0
- 由于习惯叫法，通常把 HTTPS 中的核心加密协议混成为 SSL/TLS，SSL 和 TLS 没有太大的区别

### 4. http 和 https 的区别是什么？
- 端口号 ：HTTP 默认是 80，HTTPS 默认是 443
- URL 前缀 ：HTTP 的 URL 前缀是 http://，HTTPS 的 URL 前缀是 https://
- 安全性和资源消耗 ： HTTP 协议运行在 TCP 之上，所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份。HTTPS 是运行在 SSL/TLS 之上的 HTTP 协议，SSL/TLS 运行在 TCP 之上。所有传输的内容都经过加密，加密采用对称加密，但对称加密的密钥用服务器方的证书进行了非对称加密。所以说，HTTP 安全性没有 HTTPS 高，但是 HTTPS 比 HTTP 耗费更多服务器资源

### 5. HTTP 协议通信过程
> HTTP 是应用层协议，它以 TCP（传输层）作为底层协议，默认端口为 80

- 服务器在 80 端口等待客户的请求
- 浏览器发起到服务器的 TCP 连接（创建套接字 Socket）
- 服务器接收来自浏览器的 TCP 连接
- 浏览器（HTTP 客户端）与 Web 服务器（HTTP 服务器）交换 HTTP 消息
- 关闭 TCP 连接

### 6. 比较 HTTP 1.0 与 HTTP 1.1

- 响应状态码
  - HTTP/1.0 仅定义了16种状态码
  - HTTP/1.1 中新加入了大量的状态码，光是错误响应状态码就新增了24种，如，100 (Continue)——在请求大资源前的预热请求，206 (Partial Content)——范围请求的标识码，409 (Conflict)——请求与当前资源的规定冲突，410 (Gone)——资源已被永久转移，而且没有任何已知的转发地址
- 缓存处理
  - HTTP/1.0
    - 服务器端使用Expires标签来标志（时间）一个响应体，在Expires标志时间内的请求，都会获得该响应体缓存
    - 服务器端在初次返回给客户端的响应体中，有一个Last-Modified标签，该标签标记了被请求资源在服务器端的最后一次修改
    - 在请求头中，使用If-Modified-Since标签，该标签标志一个时间，意为客户端向服务器进行问询：“该时间之后，我要请求的资源是否有被修改过？如果服务器接收到了请求头，并判断If-Modified-Since时间后，资源确实没有修改过，则返回给客户端一个304 not modified响应头，表示”缓冲可用，你从浏览器里拿吧！”
  - HTTP/1.1
     -  基本工作原理和HTTP/1.0保持不变，而是增加了更多细致的特性。其中，请求头中最常见的特性就是Cache-Control

### 7. Cache-Control 是什么？
- Cache-Control 通用消息头字段，被用于在 http 请求和响应中，`通过指定指令来实现缓存机制`
- `缓存指令是单向的`，这意味着在请求中设置的指令，不一定被包含在响应中

### 8. Cache-Control 可以设置哪些指令？
- 缓存请求指令
```js
    Cache-Control: max-age=<seconds>
    Cache-Control: max-stale[=<seconds>]
    Cache-Control: min-fresh=<seconds>
    Cache-control: no-cache
    Cache-control: no-store
    Cache-control: no-transform
    Cache-control: only-if-cached
```
- 缓存响应指令
```js
    Cache-control: must-revalidate
    Cache-control: no-cache
    Cache-control: no-store
    Cache-control: no-transform
    Cache-control: public
    Cache-control: private
    Cache-control: proxy-revalidate
    Cache-Control: max-age=<seconds>
    Cache-control: s-maxage=<seconds>
```

### 9. Cache-Control 可以设置的指令分别有什么作用？
- 可缓存性
  - public：表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存，即使是通常不可缓存的内容
  - private：表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）
  - no-cache：在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证 (协商缓存验证)
  - no-store：缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存

- 到期
  - max-age=<seconds>：设置缓存存储的最大周期，超过这个时间缓存被认为过期 (单位秒)
  - 

### 6.HTTP 1.0/1.1/2.0在并发请求上的区别是什么
#### HTTP1.0
每次TCP都只能发送一个请求，服务器响应后关闭连接，下次请求需重新建立TCP连接
#### HTTP1.1
- 默认采用持续连接，TCP连接默认不关闭，可以被多个请求复用，不用显示的声明Keep-alive

- 增加了管道机制，同一个TCP允许发送多个请求，增加了一定的并发性

- 同一个TCP链接里所有通信数据按序进行，如果服务器响应慢，会有很多的请求在排队造成“队头阻塞”

#### HTTP2.0
全双工通信、多路复用，同一TCP连接可以并发处理多个请求，服务器可以向客户端主动发送数据

### 2.HTTP1.1长连接和HTTP2.0多路复用的区别
- HTTP1.1同一时间同一TCP连接只能处理一个请求，采用一问一答模式，上一个请求结束后才能处理下一个请求（客户端最大并发请求限制原因）
- HTTP2.0同域名下的所有通信都在单个连接上完成

### 3.HTTP1.1为什么不能实现多路复用？
HTTP2.0基于二进制帧协议、HTTP1.1基于文本分割协议