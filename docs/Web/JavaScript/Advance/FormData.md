---
title: FormData
search: true

date: 2022-01-16 20:05:23
tags: [FormData]
photos:
description:
comments:
---

-   FormData 接口提供了一种表示表单数据的键值对 `key/value` 的构造方式
-   可以将数据通过 `XMLHttpRequest.send()` 方法发送出去，如果送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式
-   构建一个简单的 GET 请求，并且通过`<form>`的形式带有查询参数，可以将它直接传递给 `URLSearchParams`
-   与[URLSearchParams](./URLSearchParams.md)相同的是可以直接在`for...of`结构中使用，而不需要调用`entries()`

```js
for (const [key, value] of myFormData) {
}
for (const [key, value] of myFormData.entries()) {
}
```

|        api         | 作用                                                                                         |
| :----------------: | :------------------------------------------------------------------------------------------- |
| FormData.append()  | 向 FormData 中添加新的属性值，对应的属性值存在也不会覆盖原值，如果属性不存在则新增一项属性值 |
| FormData.delete()  | 从 FormData 对象里面删除一个键值对                                                           |
| FormData.entries() | 返回一个 iterator 可以遍历所有键/值对的对象                                                  |
|   FormData.get()   | 返回在 FormData 对象中与给定键关联的第一个值                                                 |
| FormData.getAll()  | 返回一个包含 FormData 对象中与给定键关联的所有值的数组                                       |
|   FormData.has()   | 返回一个布尔值表明 FormData 对象是否包含某些键                                               |
|  FormData.keys()   | 返回一个包含所有键的 iterator 对象                                                           |
|   FormData.set()   | 给 FormData 设置属性值，如果 FormData 对应的属性值存在则覆盖原值，否则新增一项属性值         |
| FormData.values()  | 返回一个包含所有值的 iterator 对象                                                           |
