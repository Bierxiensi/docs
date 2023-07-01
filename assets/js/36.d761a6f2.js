(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{328:function(t,a,e){t.exports=e.p+"assets/img/intersection.36b885a7.png"},546:function(t,a,e){"use strict";e.r(a);var s=e(28),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("blockquote",[s("p",[t._v("A modern JavaScript utility library delivering modularity, performance & extras.")])]),t._v(" "),s("blockquote",[s("p",[s("code",[t._v("lodash")]),t._v(" 是一个一致性、模块化、高性能的 "),s("code",[t._v("JavaScript")]),t._v(" 实用工具库")])]),t._v(" "),s("h1",{attrs:{id:"一、环境准备"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、环境准备"}},[t._v("#")]),t._v(" 一、环境准备")]),t._v(" "),s("ul",[s("li",[s("p",[s("code",[t._v("lodash")]),t._v(" 版本 "),s("code",[t._v("v4.0.0")])])]),t._v(" "),s("li",[s("p",[t._v("通过 "),s("code",[t._v("github1s")]),t._v(" 网页可以 "),s("a",{attrs:{href:"https://github1s.com/lodash/lodash/blob/HEAD/intersection.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("查看"),s("OutboundLink")],1),t._v(" "),s("code",[t._v("lodash - intersection")]),t._v(" 源码")])]),t._v(" "),s("li",[s("p",[t._v("调试测试用例可以 "),s("code",[t._v("clone")]),t._v(" 到本地")])])]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/lodash/lodash.git\n\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" axios\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v("\n")])])]),s("h1",{attrs:{id:"二、结构分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、结构分析"}},[t._v("#")]),t._v(" 二、结构分析")]),t._v(" "),s("p",[s("img",{attrs:{src:e(328),alt:""}})]),t._v(" "),s("p",[t._v("  这是一张 "),s("code",[t._v("intersection")]),t._v(" 依赖引用路径图，相对复杂一些，按照功能划分，大致包括basee4Intersection模块、castArrayLikeObject模块。接下来会自底向上分析各个依赖模块，包含"),s("code",[t._v("strictIndexOf")]),t._v("、"),s("code",[t._v("baseIsNaN")]),t._v("、"),s("code",[t._v("baseFindIndex")]),t._v("、"),s("code",[t._v("baseIndexOf")]),t._v("、"),s("code",[t._v("arrayIncludes")]),t._v("、"),s("code",[t._v("Hash")]),t._v("、"),s("code",[t._v("MapCache")]),t._v("、"),s("code",[t._v("SetCache")]),t._v("、"),s("code",[t._v("arrayIncludesWith")]),t._v("、"),s("code",[t._v("map")]),t._v("、"),s("code",[t._v("cahceHas")]),t._v("、"),s("code",[t._v("isLength")]),t._v("、"),s("code",[t._v("isArrayLike")]),t._v("、"),s("code",[t._v("isObjectLike")]),t._v("、"),s("code",[t._v("isArrayLikeObject")]),t._v("、"),s("code",[t._v("castArrayLikeObject")]),t._v("、"),s("code",[t._v("basee4Intersection")]),t._v("、"),s("code",[t._v("intersection")]),t._v("。")]),t._v(" "),s("h1",{attrs:{id:"三、函数研读"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、函数研读"}},[t._v("#")]),t._v(" 三、函数研读")]),t._v(" "),s("h2",{attrs:{id:"_1-isarraylike-模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-isarraylike-模块"}},[t._v("#")]),t._v(" 1. isArrayLike 模块")]),t._v(" "),s("p",[s("strong",[t._v("检查 "),s("code",[t._v("value")]),t._v(" 是否与数组类似。值被视为数组，它不是函数并且有一个 "),s("code",[t._v("value.length")]),t._v(" ，这是一个大于等于'0'且小于 "),s("code",[t._v("MAX_SAFE_INTEGER")]),t._v("的 "),s("code",[t._v("Number")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" isLength "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./isLength.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @since 4.0.0\n * @category Lang\n * @param {*} value 要检查的值\n * @returns {boolean} 如果'value'类似于数组，则返回'true'，否则返回'false'\n * @example\n *\n * isArrayLike([1, 2, 3])\n * // => true\n *\n * isArrayLike(document.body.children)\n * // => true\n *\n * isArrayLike('abc')\n * // => true\n *\n * isArrayLike(Function)\n * // => false\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArrayLike")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'function'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isLength")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" isArrayLike\n\n")])])]),s("ul",[s("li",[t._v("重点关注 "),s("code",[t._v("isLength")]),t._v("，判断规则是 "),s("code",[t._v("typeof value === 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER")]),t._v("，其中 "),s("code",[t._v("value % 1 == 0")]),t._v(" 确保 "),s("code",[t._v("value")]),t._v(" 是整数，"),s("code",[t._v("MAX_SAFE_INTEGER = 9007199254740991")])])]),t._v(" "),s("h2",{attrs:{id:"_2-isobjectlike-模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-isobjectlike-模块"}},[t._v("#")]),t._v(" 2. isObjectLike 模块")]),t._v(" "),s("p",[s("strong",[t._v("检查“value”是否与对象类似，如果不为空则是一个对象，并且会有一个“typeof”运算结果为“object”返回值")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @since 4.0.0\n * @category Lang\n * @param {*} value 要检查的值\n * @returns {boolean} 如果'value'类似对象，则返回'true'，否则返回'false'\n * @example\n *\n * isObjectLike({})\n * // => true\n *\n * isObjectLike([1, 2, 3])\n * // => true\n *\n * isObjectLike(Function)\n * // => false\n *\n * isObjectLike(null)\n * // => false\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isObjectLike")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'object'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" isObjectLike\n\n")])])]),s("ul",[s("li",[t._v("除了纯对象，"),s("code",[t._v("null")]),t._v(" 使用 "),s("code",[t._v("typeof")]),t._v(" 获取类型结果也是 "),s("code",[t._v("object")]),t._v("，为了后续的使用，这里需要过滤掉")]),t._v(" "),s("li",[t._v("可以通过 "),s("code",[t._v("typeof")]),t._v(" 来获取 "),s("code",[t._v("未经计算的操作数")]),t._v(" 的类型，下面是一个 "),s("code",[t._v("typeof")]),t._v(" 运算结果集")])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[t._v("类型")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("结果")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Undefined")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"undefined"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Null")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"object"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Boolean")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"boolean"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Number")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"number"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("BigInt(ECMAScript 2020 新增)")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"bigint"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("String")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"string"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Symbol (ECMAScript 2015 新增)")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"symbol"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("宿主对象（由 JS 环境提供）")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("取决于具体实现")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("Function 对象 (按照 ECMA-262 规范实现 [[Call]])")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"function"')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("其他任何对象")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('"object"')])])])]),t._v(" "),s("h2",{attrs:{id:"_3-isarraylikeobject-模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-isarraylikeobject-模块"}},[t._v("#")]),t._v(" 3. isArrayLikeObject 模块")]),t._v(" "),s("p",[s("strong",[t._v("此方法类似于 "),s("code",[t._v("isArrayLike")]),t._v("，只是它还检查 "),s("code",[t._v("value")]),t._v(" 是否为一个 "),s("code",[t._v("Object")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" isArrayLike "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./isArrayLike.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" isObjectLike "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./isObjectLike.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @since 4.0.0\n * @category Lang\n * @param {*} value 要检查的值\n * @returns {boolean} 如果 value 是一个类数组对象，那么返回 true，否则返回 false\n * @example\n *\n * isArrayLikeObject([1, 2, 3])\n * // => true\n *\n * isArrayLikeObject(document.body.children)\n * // => true\n *\n * isArrayLikeObject('abc')\n * // => false\n *\n * isArrayLikeObject(Function)\n * // => false\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArrayLikeObject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isObjectLike")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArrayLike")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" isArrayLikeObject\n\n")])])]),s("ul",[s("li",[t._v("封装了 "),s("code",[t._v("isObjectLike")]),t._v(" 与 "),s("code",[t._v("isArrayLike")]),t._v("，当 "),s("code",[t._v("value")]),t._v(" 同时符合两者所检测的目标类型时返回 "),s("code",[t._v("true")]),t._v("，否则返回 "),s("code",[t._v("false")])])]),t._v(" "),s("h2",{attrs:{id:"_4-castarraylikeobject-模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-castarraylikeobject-模块"}},[t._v("#")]),t._v(" 4. castArrayLikeObject 模块")]),t._v(" "),s("p",[s("strong",[t._v("如果不是类数组对象，则将“value”强制转换为空数组")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" isArrayLikeObject "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../isArrayLikeObject.js'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @private\n * @param {*} value  要检查的值\n * @returns {Array|Object} 返回类似于cast数组的对象\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("castArrayLikeObject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isArrayLikeObject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" castArrayLikeObject\n\n")])])]),s("ul",[s("li",[t._v("封装了 "),s("code",[t._v("isArrayLikeObject")]),t._v(" ，当 "),s("code",[t._v("value")]),t._v(" 同时符合 "),s("code",[t._v("isArrayLikeObject")]),t._v(" 所检测的目标类型时返回 "),s("code",[t._v("true")]),t._v("，此时返回 "),s("code",[t._v("value")]),t._v("，否则返回空数组")])]),t._v(" "),s("h2",{attrs:{id:"_5-map-模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-map-模块"}},[t._v("#")]),t._v(" 5. map 模块")]),t._v(" "),s("p",[s("strong",[t._v("创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。 iteratee（迭代函数）调用3个参数(value, index|key, collection)")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @since 5.0.0\n * @category Array\n * @param {Array} array 用来迭代的集合\n * @param {Function} iteratee  每次迭代调用的函数\n * @returns {Array} 返回新的映射后数组\n * @example\n *\n * function square(n) {\n *   return n * n\n * }\n *\n * map([4, 8], square)\n * // => [16, 64]\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" iteratee")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    result"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("iteratee")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" result\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" map\n\n")])])]),s("ul",[s("li",[t._v("使用 "),s("code",[t._v("new Array")]),t._v(" 创建一个对应其长度的数组 "),s("code",[t._v("result")]),t._v("，其中 "),s("code",[t._v("array")]),t._v(" 为 "),s("code",[t._v("null")]),t._v(" 时，长度为 "),s("code",[t._v("0")]),t._v("，将会创建一个空数组")]),t._v(" "),s("li",[t._v("按照 "),s("code",[t._v("array")]),t._v(" 长度循环调用 "),s("code",[t._v("iteratee")]),t._v("，每次循环步长 + 1")])]),t._v(" "),s("p",[t._v("Tip: "),s("code",[t._v("lodash")]),t._v(" 中有许多方法是防止作为其他方法的迭代函数（注：即不能作为iteratee参数传递给其他方法），例如："),s("code",[t._v("_.every")]),t._v(","),s("code",[t._v("_.filter")]),t._v(","),s("code",[t._v("_.map")]),t._v(","),s("code",[t._v("_.mapValues")]),t._v(","),s("code",[t._v("_.reject")]),t._v(", 和"),s("code",[t._v("_.some")]),t._v("。")]),t._v(" "),s("p",[t._v("Tips: 受保护的方法有（注：即这些方法不能使用 "),s("code",[t._v("_.every")]),t._v(", "),s("code",[t._v("_.filter")]),t._v(", "),s("code",[t._v("_.map,_")]),t._v(". "),s("code",[t._v("mapValues")]),t._v(", "),s("code",[t._v("_.reject")]),t._v(", 和 "),s("code",[t._v("_.some")]),t._v(" 作为 "),s("code",[t._v("iteratee")]),t._v(" 迭代函数参数）："),s("code",[t._v("ary")]),t._v(", "),s("code",[t._v("chunk")]),t._v(", "),s("code",[t._v("curry")]),t._v(", "),s("code",[t._v("curryRight")]),t._v(", "),s("code",[t._v("drop")]),t._v(", "),s("code",[t._v("dropRight")]),t._v(", "),s("code",[t._v("every")]),t._v(", "),s("code",[t._v("fill")]),t._v(", "),s("code",[t._v("invert")]),t._v(", "),s("code",[t._v("parseInt")]),t._v(", "),s("code",[t._v("random")]),t._v(", "),s("code",[t._v("range")]),t._v(", "),s("code",[t._v("rangeRight")]),t._v(", "),s("code",[t._v("repeat")]),t._v(", "),s("code",[t._v("sampleSize")]),t._v(", "),s("code",[t._v("slice")]),t._v(", "),s("code",[t._v("some")]),t._v(", "),s("code",[t._v("sortBy")]),t._v(", "),s("code",[t._v("split")]),t._v(", "),s("code",[t._v("take")]),t._v(", "),s("code",[t._v("takeRight")]),t._v(", "),s("code",[t._v("template")]),t._v(", "),s("code",[t._v("trim")]),t._v(", "),s("code",[t._v("trimEnd")]),t._v(", "),s("code",[t._v("trimStart")]),t._v(", "),s("code",[t._v("words")]),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"_6-intersection-模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-intersection-模块"}},[t._v("#")]),t._v(" 6. intersection 模块")]),t._v(" "),s("p",[s("strong",[t._v("创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用"),s("RouterLink",{attrs:{to:"/SourceCode/Lodash/(http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)"}},[t._v("SameValueZero")]),t._v("进行相等性比较")],1)]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" map "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./map.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" baseIntersection "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./.internal/baseIntersection.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" castArrayLikeObject "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./.internal/castArrayLikeObject.js'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @since 0.1.0\n * @category Array\n * @param {...Array} [arrays] 待检查的数组\n * @returns {Array} 返回一个包含所有传入数组交集元素的新数组(给定数组的交集)\n * @example\n *\n * intersection([2, 1], [2, 3])\n * // => [2]\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("intersection")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("arrays")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mapped "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" castArrayLikeObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mapped"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" mapped"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" arrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("baseIntersection")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mapped"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" intersection\n")])])]),s("ul",[s("li",[t._v("首先使用 "),s("code",[t._v("map")]),t._v(" 配合迭代器 "),s("code",[t._v("castArrayLikeObject")]),t._v(" 检测入参 "),s("code",[t._v("arrays")]),t._v(" 是否是合法数组，返回 "),s("code",[t._v("mapped")])]),t._v(" "),s("li",[t._v("如 "),s("code",[t._v("mapped")]),t._v(" 存在并且入参第一项 "),s("code",[t._v("arrays")]),t._v(" 是合法数组，则调用 "),s("code",[t._v("baseIntersection")]),t._v(" 检测公共元素，否则返回空数组")])]),t._v(" "),s("p",[s("strong",[t._v("创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用"),s("RouterLink",{attrs:{to:"/SourceCode/Lodash/(http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)"}},[t._v("SameValueZero")]),t._v("进行相等性比较")],1)]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" map "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./map.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" baseIntersection "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./.internal/baseIntersection.js'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" castArrayLikeObject "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./.internal/castArrayLikeObject.js'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @since 0.1.0\n * @category Array\n * @param {...Array} [arrays] 待检查的数组\n * @returns {Array} 返回一个包含所有传入数组交集元素的新数组(给定数组的交集)\n * @example\n *\n * intersection([2, 1], [2, 3])\n * // => [2]\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("intersection")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("arrays")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mapped "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" castArrayLikeObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mapped"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" mapped"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" arrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("baseIntersection")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mapped"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" intersection\n")])])]),s("ul",[s("li",[t._v("首先使用 "),s("code",[t._v("map")]),t._v(" 配合迭代器 "),s("code",[t._v("castArrayLikeObject")]),t._v(" 检测入参 "),s("code",[t._v("arrays")]),t._v(" 是否是合法数组，返回 "),s("code",[t._v("mapped")])]),t._v(" "),s("li",[t._v("如 "),s("code",[t._v("mapped")]),t._v(" 存在并且入参第一项 "),s("code",[t._v("arrays")]),t._v(" 是合法数组，则调用 "),s("code",[t._v("baseIntersection")]),t._v(" 检测公共元素，否则返回空数组")])])])}),[],!1,null,null,null);a.default=n.exports}}]);