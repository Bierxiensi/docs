---
title: javascript安全
search: true

date: 2021-12-14 20:25:23
tags: [javascript安全]
photos:
description:
comments:
---

### 1\. DOM API 操作

使用 innerHTML=、outerHTML=、document.write()、document.writeln()时，如变量值外部可控，应对特殊字符（&, <, >, ", '）做编码转义

```js
// 假设 params 为用户输入， text 为 DOM 节点
// bad：将不可信内容带入HTML标签操作
const { user } = params;
// ...
text.innerHTML = `Follow @${user}`;

// good: innerHTML操作前，对特殊字符编码转义
function htmlEncode(iStr) {
    let sStr = iStr;
    sStr = sStr.replace(/&/g, "&amp;");
    sStr = sStr.replace(/>/g, "&gt;");
    sStr = sStr.replace(/</g, "&lt;");
    sStr = sStr.replace(/"/g, "&quot;");
    sStr = sStr.replace(/'/g, "&#39;");
    return sStr;
}

let { user } = params;
user = htmlEncode(user);
// ...
text.innerHTML = `Follow @${user}`;

// good: 使用安全的DOM API替代innerHTML
const { user } = params;
// ...
text.innerText = `Follow @${user}`;
```

> 思考
> 这里只要是为了防止 XSS 攻击，如上述内容，若在其中包含一段自闭和 script 代码段`<script> window.open("一个钓鱼网站URL") </script>`，在页面加载时就会打开一个钓鱼网站
