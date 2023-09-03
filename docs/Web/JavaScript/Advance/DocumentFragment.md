---
title: documentFragment
search: true

date: 2023-07-01 21:25:23
tags: [documentFragment]
photos:
description:
comments:
---

## DocumentFragment 是什么
DocumentFragment 是一个 DOM API 中的接口，代表一个轻量级的文档片段。它可以作为一个容器来存储和操作一组 DOM 元素，但不会在文档中创建实际的节点。

通常情况下，当我们需要在文档中插入多个节点时，每次插入一个节点都会触发一次 DOM 操作，可能导致性能下降。而使用 DocumentFragment，可以将多个节点先插入到 DocumentFragment 中，再一次性地将整个 DocumentFragment 插入到文档中，从而减少 DOM 操作的次数，提高性能。

DocumentFragment 没有父节点，它类似于一个空的文档容器。可以使用标准的 DOM 方法来操作 DocumentFragment，比如添加、删除、替换或克隆节点。但是在将 DocumentFragment 插入到文档中后，其中的节点会被移动到相应的位置，DocumentFragment 本身不会保留在文档中。

## DocumentFragment 的使用场景

1. 动态生成大量 DOM 元素并插入到文档中，可以将这些元素先添加到 DocumentFragment 中，然后将 DocumentFragment 一次性地插入到文档中。

```js
const list = document.querySelector('#list')
const fruits = ['Apple', 'Orange', 'Banana', 'Melon']

const fragment = new DocumentFragment()

fruits.forEach((fruit) => {
  const li = document.createElement('li')
  li.textContent = fruit
  fragment.appendChild(li)
})

list.appendChild(fragment)
```

2. 在内存中构建复杂的 DOM 结构，进行一系列操作后，再将整个 DOM 结构插入到文档中，避免频繁的 DOM 操作。

3. 进行元素的拷贝和移动操作时，可以先将元素添加到 DocumentFragment 中，再将 DocumentFragment 插入到目标位置，以提高效率。

总之，DocumentFragment 是一个临时的、轻量级的文档容器，用于在 DOM 操作中提高性能和效率。


## 一道题目 ~ 页面上插入 30000 个  <li> 并绑定事件

```js
(() => {
    const ndContainer = document.getElementById('js-list');
    if (!ndContainer) {
        return;
    }

    const total = 30000;
    const batchSize = 4; // 每批插入的节点次数，越大越卡
    const batchCount = total / batchSize; // 需要批量处理多少次
    let batchDone = 0;  // 已经完成的批处理个数

    function appendItems() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < batchSize; i++) {
            const ndItem = document.createElement('li');
            ndItem.innerText = (batchDone * batchSize) + i + 1;
            fragment.appendChild(ndItem);
        }

        // 每次批处理只修改 1 次 DOM
        ndContainer.appendChild(fragment);

        batchDone += 1;
        doBatchAppend();
    }

    function doBatchAppend() {
        if (batchDone < batchCount) {
            window.requestAnimationFrame(appendItems);
        }
    }

    // kickoff
    doBatchAppend();

    ndContainer.addEventListener('click', function (e) {
        const target = e.target;
        if (target.tagName === 'LI') {
            alert(target.innerHTML);
        }
    });
})();
```

为了避免频繁修改 DOM 结构、循环时间长引发的插入卡顿做了以下操作
- requestAnimationFrame 解决非常耗时的代码段对渲染的阻塞问题
- 借助 DocumentFragment 通过分治的思想把 30000 个 <li> 分批次插入到页面中
