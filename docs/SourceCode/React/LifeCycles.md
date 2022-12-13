---
title: 小程序中文本显示
search: true

date: 2022-01-04 20:05:23
tags: [CSS, Tricks, text-overflow]
description:
comments:
---

[react-reconciler/src/ReactFiberCommitWork.js
]
```js
function** commitLifeCycles(finishedRoot,current,finishedWork){
     switch (finishedWork.tag){                             /* fiber tag 在第一节讲了不同fiber类型 */
        case ClassComponent: {                              /* 如果是 类组件 类型 */
             const instance = finishedWork.stateNode        /* 类实例 */
             if(current === null){                          /* 类组件第一次调和渲染 */
                instance.componentDidMount() 
             }else{                                         /* 类组件更新 */
                instance.componentDidUpdate(prevProps,prevState，instance.__reactInternalSnapshotBeforeUpdate); 
             }
        }
     }
}
```
