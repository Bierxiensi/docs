---
title: 百度地图 Api 学习记录
search: true
date: 2023-03-10 20:05:23
tags: [baidu、map]
description:
comments:
---

```js
import { useDispatch, useSelector } from 'dva';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import working_icon from '../../../../assets/machine_working.png';
import static_icon from '../../../../assets/machine_static.png';
import warning_icon from '../../../../assets/machine_warning.png';
import idle_icon from '../../../../assets/machine_idle.png';
import working_icon_flash from '../../../../assets/machine_working_flash.png';
import static_icon_flash from '../../../../assets/machine_static_flash.png';
import warning_icon_flash from '../../../../assets/machine_warning_flash.png';
import idle_icon_flash from '../../../../assets/machine_idle_flash.png';

import zhuangzai_icon from '../../../../assets/machine_zhuangzai.png';
import yalu_icon from '../../../../assets/machine_yalu.png';
import qichediao_icon from '../../../../assets/machine_qichediao.png';
import qingsao_icon from '../../../../assets/machine_qingsao.png';
import zixie_icon from '../../../../assets/machine_zixie.png';
import wajue_icon from '../../../../assets/machine_wajue.png';
import sashui_icon from '../../../../assets/machine_sashui.png';
import tuitu_icon from '../../../../assets/machine_tuitu.png';
import chache_icon from '../../../../assets/machine_chache.png';
import jiaoban_icon from '../../../../assets/machine_jiaoban.png';

import MachineCard from './MachineCard';
import MapControl from './MapControl';
import styles from './RealTimeDynamic.less';
import { styleJson } from './styleJson.js';
import WarningLabel from './WarningLabel';

export default () => {
    const dispatch = useDispatch();
    const { machineList, machine_state_map, projectId } = useSelector(
        (state) => state.sitesManagement,
    );
    const [card, setCard] = useState(false);
    const [map, setMap] = useState(null);
    const [cardPosition, setCardPosition] = useState(null);
    const [item, setItem] = useState(false);

    const onClick = () => {
        setCard(false);
    };
    const props = {
        onClick,
        ...item,
    };

    useEffect(() => {
        map && map.clearOverlays();
        dispatch({ type: 'sitesManagement/fetchMachineList' });
    }, [projectId]);

    useEffect(() => {
        let map = new BMap.Map('container', { enableMapClick: false });
        map.centerAndZoom(new BMap.Point(118.778611, 32.043889), 13); // 默认南京新街口为地图中心
        map.setMapStyleV2({ styleJson });
        map.enableScrollWheelZoom(); // 添加鼠标滚动缩放
        setMap(map);
    }, []);
    useEffect(() => {
        if (map && machineList?.length) {
            // const markerClusterer = new BMapLib.MarkerClusterer(map, { markers: null });
            // markerClusterer._minClusterSize = 5;
            // let markers = [];
            machineList.forEach((item) => {
                let mapIcon = '';
                let machineIcon = '';
                switch (item.status) {
                    case 'working':
                        mapIcon = working_icon;
                        break;
                    case 'static':
                        mapIcon = static_icon;
                        break;
                    case 'warning':
                        mapIcon = warning_icon;
                        break;
                    case 'idle':
                        mapIcon = idle_icon;
                        break;
                    default: // off
                        mapIcon = static_icon;
                        break;
                }
                switch (item.type) {
                    case 'zhuangzai':
                        machineIcon = zhuangzai_icon;
                        break;
                    case 'yalu':
                        machineIcon = yalu_icon;
                        break;
                    case 'qichediao':
                        machineIcon = qichediao_icon;
                        break;
                    case 'qingsao':
                        machineIcon = qingsao_icon;
                        break;
                    case 'zixie':
                        machineIcon = zixie_icon;
                        break;
                    case 'wajue':
                        machineIcon = wajue_icon;
                        break;
                    case 'sashui_icon':
                        machineIcon = sashui_icon;
                        break;
                    case 'tuitu':
                        machineIcon = tuitu_icon;
                        break;
                    case 'chache':
                        machineIcon = chache_icon;
                        break;
                    case 'jiaoban':
                        machineIcon = jiaoban_icon;
                        break;
                    default: // 默认
                        machineIcon = wajue_icon;
                        break;
                }
                // 背景marker
                const marker = new BMap.Marker(new BMap.Point(item.longitude, item.latitude), {
                    icon: new BMap.Icon(mapIcon, new BMap.Size(45, 49), {
                        imageSize: new BMap.Size(45, 49),
                    }),
                });
                marker.setZIndex(601);
                // 机械marker
                const machine_marker = new BMap.Marker(
                    new BMap.Point(item.longitude, item.latitude),
                    {
                        icon: new BMap.Icon(machineIcon, new BMap.Size(32, 32), {
                            imageSize: new BMap.Size(32, 32),
                        }),
                    },
                );
                machine_marker.setZIndex(602);
                // machine_marker.setOffset(new BMap.Size(0, -8));
                machine_marker.addEventListener('click', () => {
                    setCardPosition(marker.getPosition());
                    setItem({
                        machineIcon,
                        ...item,
                    });
                    setCard(true);
                });
                map.addOverlay(marker);
                map.addOverlay(machine_marker);
            });
            // markerClusterer.addMarkers(markers);
            map.centerAndZoom(
                new BMap.Point(machineList[0].longitude, machineList[0].latitude),
                13,
            );
        }
    }, [machineList.length, map]);

    useEffect(() => {
        let cardOverlay = null;
        if (card && item) {
            if (map) {
                // 定义自定义覆盖物的构造函数
                function CardOverlay(point) {
                    this._point = point;
                }
                // 继承API的BMap.Overlay
                CardOverlay.prototype = new BMap.Overlay();
                // 实现初始化方法
                CardOverlay.prototype.initialize = function (map) {
                    var div = (this._div = document.createElement('div'));
                    div.style.position = 'absolute';
                    ReactDOM.render(<MachineCard {...props} />, div);
                    map.getPanes().labelPane.appendChild(div);
                    return div;
                };
                // 实现绘制方法
                CardOverlay.prototype.draw = function () {
                    var pixel = map.pointToOverlayPixel(this._point);
                    this._div.style.left = pixel.x - 176 + 'px';
                    this._div.style.top = pixel.y - 320 + 'px';
                };
                cardOverlay = new CardOverlay(cardPosition);
                map.addOverlay(cardOverlay);
            }
            return () => {
                map.removeOverlay(cardOverlay);
            };
        }
    }, [card, item]);

    useEffect(() => {
        let labelOverlay = null;
        machineList.forEach((item) => {
            if (item.status === 'warning') {
                if (map) {
                    // 定义自定义覆盖物的构造函数
                    function LabelOverlay(point) {
                        this._point = point;
                    }
                    // 继承API的BMap.Overlay
                    LabelOverlay.prototype = new BMap.Overlay();
                    // 实现初始化方法
                    LabelOverlay.prototype.initialize = function (map) {
                        var div = (this._div = document.createElement('div'));
                        div.style.position = 'absolute';
                        ReactDOM.render(<WarningLabel {...item} />, div);
                        map.getPanes().labelPane.appendChild(div);
                        return div;
                    };
                    // 实现绘制方法
                    LabelOverlay.prototype.draw = function () {
                        var pixel = map.pointToOverlayPixel(this._point);
                        this._div.style.left = pixel.x + 35 + 'px';
                        this._div.style.top = pixel.y - 26 + 'px';
                    };
                    labelOverlay = new LabelOverlay(new BMap.Point(item.longitude, item.latitude));
                    map.addOverlay(labelOverlay);
                }
                return () => {
                    map.removeOverlay(labelOverlay);
                };
            }
        });
    }, [map]);

    return (
        <div className={styles.containerBox}>
            <div id="container" className={styles.container} />
            <MapControl map={map} />
            <div className={styles.bottomBox}>
                <div className={styles.boxItem}>
                    <span
                        className={`${styles.static_color} ${styles.font_size_12} ${styles.font_weight_700}`}
                    >
                        总数:
                    </span>
                    <span className={styles.digitial_number}>{machine_state_map.total}</span>
                    <span>台</span>
                </div>
                <div className={styles.boxItem}>
                    <span
                        className={`${styles.working_color} ${styles.font_size_12} ${styles.font_weight_700}`}
                    >
                        运行:
                    </span>
                    <span className={styles.digitial_number}>{machine_state_map.working}</span>
                    <span>台</span>
                </div>
                <div className={styles.boxItem}>
                    <span
                        className={`${styles.idle_color} ${styles.font_size_12} ${styles.font_weight_700}`}
                    >
                        怠速:
                    </span>
                    <span className={styles.digitial_number}>{machine_state_map.idle}</span>
                    <span>台</span>
                </div>
                <div className={styles.boxItem}>
                    <span
                        className={`${styles.static_color} ${styles.font_size_12} ${styles.font_weight_700}`}
                    >
                        闲置:
                    </span>
                    <span className={styles.digitial_number}>{machine_state_map.unused}</span>
                    <span>台</span>
                </div>
            </div>
        </div>
    );
};
```