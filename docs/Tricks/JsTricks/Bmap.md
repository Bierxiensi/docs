---
title: 百度地图代码段
search: true

date: 2022-03-03 20:05:23
tags: [JS, Tricks, Baidu, map]
description:
comments:
---

## 初始化地图、画圆
```js
// 南京市坐标
const NJ_lNG_LAT = {
    lng: 118.778611,
    lat: 32.043889,
};
const zoom = 10;
const isFenceShow = true;
const map = new BMap.Map(container, connfig);
// 默认南京新街口为地图中心
map.centerAndZoom(new BMap.Point(NJ_lNG_LAT.lng, NJ_lNG_LAT.lat), zoom);
// 画圆
const styleOptions = {
    strokeColor: '#F75C5D', // 边线颜色。
    fillColor: '#F75C5D', // 填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 4, // 边线的宽度，以像素为单位。
    strokeOpacity: 0.6, // 边线透明度，取值范围0 - 1。
    fillOpacity: 0.2, // 填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid', // 边线的样式，solid或dashed。
};
const c = new BMap.Point(NJ_lNG_LAT.lng, NJ_lNG_LAT.lat); // 圆心
const circle = new BMap.Circle(c, 100000, styleOptions); // 测试圆
if (isFenceShow) {
    map.addOverlay(circle);
} else {
    map.removeOverlay(circle);
}
```

## 添加交通流量控件
```js
const trafficControl = new BMapLib.TrafficControl({
    showPanel: true, // 是否显示路况提示面板
});
map.addControl(trafficControl);
```