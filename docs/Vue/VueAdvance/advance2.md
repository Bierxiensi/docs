---
title: 虚拟dom
search: true

date: 2021-11-14 09:05:23
tags: [Vue, Virture Dom]
photos:
description:
comments:
---

嵌套对象表示，属性表示结点

优点

* 保证性能下限，在不进行手动优化的前提下也能提供过得去的性能
* 无需手动操作dom
* 跨平台（如服务端渲染、uniapp）

缺点

* 首次渲染大量dom，多了一层虚拟dom计算，比innerHtml插入更慢
* 性能优化时，真是dom操作更快

coding

1\. 一段数据转化成真是dom
```javascript
function render(vnode){
    if(typeof vnode === 'number'){
        vnode = String(vnode)
    }   

    if(typeof vnode === 'string'){
        return document.createTextNode(vnode)
    }

    const element = document.createElement(vnode, tag)

    if(vnode.attrs){
        objects.keys(vnode).forEach(attrkey => {
            element.setAttribute(key, vnode.attrs[attrkey])
        })
    }

    if(vnode.children){
        vnode.children.forEach(childNode => {
            element.appendChild(render(childNode));
        })
    }

    return element;
}


const vnode = {
    tag: 'DIV',
    attrs: {
        id: 'app'
    },
    children: [
        {
            tag: 'SPAN',
            children: [{
                tag: 'A',
                children: []
            }]
        },
        {
            tag: 'SPAN',
            children: [{
                tag: 'B',
                children: []
            }]
        }
    ]
}