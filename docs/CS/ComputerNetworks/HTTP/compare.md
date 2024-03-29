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
- 连接方式
  - HTTP/1.0
    - 默认使用短连接: 客户端和服务器每进行一次 HTTP 操作，就建立一次TCP连接
    - 短连接会导致有大量的 `握手报文` 和 `挥手报文` 占用了带宽
    - 仍提供了长连接选项，即在请求头中加入`Connection: Keep-alive`
  - HTTP/1.1 
    - 默认使用长连接: 当一个网页打开完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接不会关闭，客户端再次访问这个服务器时，会继续使用这一条已经建立的连接
    - 在HTTP/1.1中，如果不希望使用长连接选项，也可以在请求头中加入`Connection: close`
- Host头处理
  - HTTP/1.0
    - 为考虑域名系统（DNS）允许多个主机名绑定到同一个IP地址上的情况
    > 假设有一个资源URL是http://example1.org/home.html，HTTP/1.0的请求报文中，将会请求的是GET /home.html HTTP/1.0.也就是不会加入主机名。这样的报文送到服务器端，服务器是理解不了客户端想请求的真正网址
  - HTTP/1.1 
    - 在请求头中加入了Host字段
    ```js
        GET /home.html HTTP/1.1
        Host: example1.org
    ```
- 带宽优化(HTTP/1.1)
  - 范围请求（range request） 机制，避免带宽的浪费
    - HTTP/1.1可以在请求中加入Range头部，以请求（并只能请求字节型数据）数据的一部分
    - 如果一个响应包含部分数据的话，那么将带有206 (Partial Content)状态码
    - 在范围响应中，Content-Range头部标志指示出了该数据块的偏移量和数据块的长度
  - 状态码100
    - 存在某些较大的文件请求，服务器可能不愿意响应这种请求，此时状态码100可以作为指示请求是否会被正常响应
    - 在HTTP/1.0中，并没有100 (Continue)状态码，要想触发这一机制，可以发送一个Expect头部，其中包含一个100-continue的值
  - 压缩
    - HTTP/1.0对数据压缩的选项提供的不多，不支持压缩细节的选择，也无法区分端到端（end-to-end）压缩或者是逐跳（hop-by-hop）压缩
    - HTTP/1.1则对内容编码（content-codings）和传输编码（transfer-codings）做了区分。内容编码总是端到端的，传输编码总是逐跳的
    - HTTP/1.0包含了Content-Encoding头部，对消息进行端到端编码
    - HTTP/1.1加入了Transfer-Encoding头部，可以对消息进行逐跳传输编码
    - HTTP/1.1还加入了Accept-Encoding头部，是客户端用来指示他能处理什么样的内容编码


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
  - max-age=<seconds>：设置缓存存储的最大周期，超过这个时间缓存被认为过期 (单位秒)，与Expires相反，时间是相对于请求的时间
  - s-maxage=<seconds>：覆盖max-age或者Expires头，但是仅适用于共享缓存 (比如各个代理)，私有缓存会忽略它
  - max-stale[=<seconds>]：表明客户端愿意接收一个已经过期的资源。可以设置一个可选的秒数，表示响应不能已经过时超过该给定的时间
  - min-fresh=<seconds>：表示客户端希望获取一个能在指定的秒数内保持其最新状态的响应
  - stale-while-revalidate=<seconds>：表明客户端愿意接受陈旧的响应，同时在后台异步检查新的响应。秒值指示客户愿意接受陈旧响应的时间长度。
  - stale-if-error=<seconds>：表示如果新的检查失败，则客户愿意接受陈旧的响应。秒数值表示客户在初始到期后愿意接受陈旧响应的时间。

- 重新验证和重新加载
  - must-revalidate：一旦资源过期（比如已经超过max-age），在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。
  - proxy-revalidate：与 must-revalidate 作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略。
  - immutable：表示响应正文不会随时间而改变。资源（如果未过期）在服务器上不发生改变，因此客户端不应发送重新验证请求头（例如If-None-Match或 If-Modified-Since）来检查更新，即使用户显式地刷新页面。

### 10. 简述HTTP协议的数据压缩功能
- 数据压缩是提高 Web 站点性能的一种重要手段
- 对于有些文件来说，高达70%的压缩比率可以大大减低对于带宽的需求
- 在实际应用时，web 开发者不需要亲手实现压缩机制，浏览器及服务器都已经将其实现了，不过需要确保在服务器端进行了合理的配置
- 数据压缩会在三个不同的层面发挥作用
  - 首先某些格式的文件会采用特定的优化算法进行压缩
  - 在 HTTP 协议层面会进行通用数据加密，即数据资源会以压缩的形式进行端到端传输
  - 数据压缩还会发生在网络连接层面，即发生在 HTTP 连接的两个节点之间

### 11. HTTP中的端到端（end-to-end）压缩是什么？
- 对于各种压缩手段来说，端到端压缩技术是 Web 站点性能提升最大的部分之所在
- 端到端压缩技术指的是消息体压缩是在服务器端完成的，并且在传输过程中保持不变，直到抵达客户端
- 所有的现代浏览器及服务器都支持该技术，唯一需要协商的是所采用的压缩算法
- 有两种压缩算法有着举足轻重的地位：gzip 应用最广泛，br 则是新的挑战者
- 为了选择要采用的压缩算法，浏览器和服务器之间会使用主动协商机制
  - 浏览器发送 Accept-Encoding 首部，其中包含有它所支持的压缩算法，以及各自的优先级，服务器则从中选择一种，使用该算法对响应的消息主体进行压缩
  - 服务器发送 Content-Encoding 首部来告知浏览器它选择了哪一种算法
### 12. HTTP中的逐跳（hop-by-hop）压缩是什么？
- 对客户端与服务器端之间的任意两个节点之间传递的消息的主体的压缩
- 在两个相邻的中间节点之间的连接上，可能会应用不同的压缩方式
- 在实际应用中，逐跳压缩对于服务器和客户端来说是不可见的，并且很少使用
- 为了选择要采用的压缩算法，两节点之间会使用主动协商机制
  - 节点发送请求，使用 TE 首部来宣布它的意愿
  - 另外一个节点则从中选择合适的方法，进行应用，然后在 Transfer-Encoding 首部中指出它所选择的方法

### 13.HTTP 1.0/1.1/2.0在并发请求上的区别是什么
#### HTTP1.0
每次TCP都只能发送一个请求，服务器响应后关闭连接，下次请求需重新建立TCP连接
#### HTTP1.1
- 默认采用持续连接，TCP连接默认不关闭，可以被多个请求复用，不用显示的声明Keep-alive

- 增加了管道机制，同一个TCP允许发送多个请求，增加了一定的并发性

- 同一个TCP链接里所有通信数据按序进行，如果服务器响应慢，会有很多的请求在排队造成“队头阻塞”

#### HTTP2.0
全双工通信、多路复用，同一TCP连接可以并发处理多个请求，服务器可以向客户端主动发送数据

### 14.HTTP1.1长连接和HTTP2.0多路复用的区别
- HTTP1.1同一时间同一TCP连接只能处理一个请求，采用一问一答模式，上一个请求结束后才能处理下一个请求（客户端最大并发请求限制原因）
- HTTP2.0同域名下的所有通信都在单个连接上完成
### 15.HTTP1.1为什么不能实现多路复用？
HTTP2.0基于二进制帧协议、HTTP1.1基于文本分割协议