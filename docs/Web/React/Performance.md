---
title: 性能
search: true

date: 2022-01-11 20:05:23
tags: [react]
description:
comments:
---
## 1. React应用卡顿该如何排查？

- 使用 Performance 录制应用快照，查看调用情况
- 查看network中网络请求情况，是否有资源因过大请求阻塞，导致后续资源无法加载，这种情况一般选择分包或固定资源选择cdn分担（多域名。浏览器设置的http2.0以下同域名仅允许同时最多6个tcp的限制）

- 可以通过 React Developer Tools 的 Profiler 的 Flamegraph（火焰图）或 Ranked（渲染时长排行榜） 查看各组件的渲染时长，根据对应的组件可以进行排查渲染问题，以下作答：
- a). 通过检查代码中是否有重复触发的 useEffect
- b). 检查是否有多次不同渲染周期中触发的setState导致的渲染（比如在一个事件中导致的state更新，导致依赖于该state的useEffect触发，而该effect中又有其他的setState，导致多个有依赖项的useEffect不同批次连环触发）
- c). 检查是否在某个超大组件中需要渲染的元素过多，可使用子组件可考虑使用 pureComponent，或 React.mome ，或使用useMome来根据依赖项更新子组件，或在父组件中将子组件需要的props通过使用useMome或useCallback缓存， 或在子组件中使用 shouldComponentUpdate 中校验是否需要更新来减少更新
- d). 检查是否存在拖拽业务，这类业务一般会导致大量的diff存在，可以的话可以考虑不使用React的方式去实现，使用第三方非React的JS库去实现。
- e). 同上情况，存在大量增删改查逻辑，会导致大量的的diff可以检查列表元素是否存在唯一的key，通过key可以让React复用Fiber从而避免重复创建 Fiber节点与 Dom 节点
- f). 存在未清除掉的定时器或dom监听事件