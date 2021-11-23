title: 百度地图 Api 学习记录
search: true

date: 2021-11-22 20:05:23
tags: [baidu、map]
description:
comments:

---

## [前置] Viewport（视野）

|  属性  |  类型  |    描述    |
| :----: | :----: | :--------: |
| center | Point  | 视野中心点 |
|  zoom  | Number |  视野级别  |

-   简单的说在地图进行初始化时需要有两个信息
    1\. 地图呈现在屏幕上的中心坐标 center
    2\. 当前地图的展示范围，在 baidu api 中 zoom 值越小视野范围越大

## [初始化]

| 函数 |                      参数                       |         使用          |
| :--: | :---------------------------------------------: | :-------------------: | ------------------------------ |
| Map  | container: String/HTMLElement, opts: MapOptions | Map(container: String | HTMLElement, opts: MapOptions) |
| zoom |                     Number                      |       视野级别        |

| > Map(container: String | HTMLElement, opts: MapOptions) |

> this.map = new BMap.Map(mapDom, config);
