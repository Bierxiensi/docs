---
title:  基于深 度学习的时间序列预测方法综述
search: true

date: 2023-08-31 20:30:23
tags: []
photos:
description:
comments:
---

# 基于深度学习的时间序列预测方法综述

## 综述

### 目标
通过目前既有的信息来预测未来的目标值y^(t+1), 利用t时刻之前的历史数据预测t时刻之后的数据

### 分类
- 单步预测
使用`历史观测值y^(t-K:t)`和`协变量x^(t-K:t)`作为`输入变量`,来预测`下一个时间步`的`观测值y^(t+1)`

- 多步预测

### 方法
#### ARIMA 
表示：
AR = Auto Regressive term（自回归）
I = Differencing（由于去趋势化产生的差异）
MA = Moving Average term（平均移动）