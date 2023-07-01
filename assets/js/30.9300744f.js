(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{407:function(t,a,s){t.exports=s.p+"assets/img/dropRightWhile.05730da7.png"},537:function(t,a,s){"use strict";s.r(a);var n=s(28),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("blockquote",[n("p",[t._v("A modern JavaScript utility library delivering modularity, performance & extras.")])]),t._v(" "),n("blockquote",[n("p",[n("code",[t._v("lodash")]),t._v(" 是一个一致性、模块化、高性能的 "),n("code",[t._v("JavaScript")]),t._v(" 实用工具库")])]),t._v(" "),n("h1",{attrs:{id:"一、环境准备"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、环境准备"}},[t._v("#")]),t._v(" 一、环境准备")]),t._v(" "),n("ul",[n("li",[n("p",[n("code",[t._v("lodash")]),t._v(" 版本 "),n("code",[t._v("v4.0.0")])])]),t._v(" "),n("li",[n("p",[t._v("通过 "),n("code",[t._v("github1s")]),t._v(" 网页可以 "),n("a",{attrs:{href:"https://github1s.com/lodash/lodash/blob/HEAD/dropRightWhile.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("查看"),n("OutboundLink")],1),t._v(" "),n("code",[t._v("lodash - dropRightWhile")]),t._v(" 源码")])]),t._v(" "),n("li",[n("p",[t._v("调试测试用例可以 "),n("code",[t._v("clone")]),t._v(" 到本地")])])]),t._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/lodash/lodash.git\n\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" axios\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v("\n")])])]),n("h1",{attrs:{id:"二、结构分析"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二、结构分析"}},[t._v("#")]),t._v(" 二、结构分析")]),t._v(" "),n("p",[n("img",{attrs:{src:s(407),alt:""}})]),t._v(" "),n("p",[t._v("  这是一张 "),n("code",[t._v("dropRightWhile")]),t._v(" 依赖引用路径图，其中使用到了 "),n("code",[t._v("slice")]),t._v("、"),n("code",[t._v("internal/baseWhile.js")]),t._v("、"),n("code",[t._v("dropRightWhile")]),t._v("，接下来会自底向上分析各个依赖模块。")]),t._v(" "),n("h1",{attrs:{id:"三、函数研读"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三、函数研读"}},[t._v("#")]),t._v(" 三、函数研读")]),t._v(" "),n("p",[n("strong",[t._v("创建从 "),n("code",[t._v("start")]),t._v(" 到 "),n("code",[t._v("end")]),t._v(" 的 "),n("code",[t._v("array")]),t._v(" 片段，但不包括 "),n("code",[t._v("end")])])]),t._v(" "),n("h2",{attrs:{id:"_1-slice-模块"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-slice-模块"}},[t._v("#")]),t._v(" 1. slice 模块")]),t._v(" "),n("p",[n("strong",[t._v("裁剪数组"),n("code",[t._v("array")]),t._v("，从 "),n("code",[t._v("start")]),t._v(" 位置开始到"),n("code",[t._v("end")]),t._v("结束，但不包括 "),n("code",[t._v("end")]),t._v(" 本身的位置")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * **Note:** This method is used instead of\n * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are\n * returned.\n *\n * @since 3.0.0\n * @category Array\n * @param {Array} array The array to slice.\n * @param {number} [start=0] The start position. 负索引将被视为与末尾的偏移量\n * @param {number} [end=array.length] The end position. 负索引将被视为与末尾的偏移量\n * @returns {Array} Returns the slice of `array`.\n * @example\n *\n * var array = [1, 2, 3, 4]\n *\n * _.slice(array, 2)\n * // => [3, 4]\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" end")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    start "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" start "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" end"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("start "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        start "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("start "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" end"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" start "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("end "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    start "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>>=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" index "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("index "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        result"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" result"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" slice"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("ul",[n("li",[t._v("如果 array 是 null 直接返回空数组")]),t._v(" "),n("li",[t._v("如果 start 是 null 则默认为 0")]),t._v(" "),n("li",[t._v("如果 end 未定义则默认为 array 的 length 值")]),t._v(" "),n("li",[t._v("start 为负数即负索引，则将被视为与末尾的偏移量，需要注意的是如果偏移量大于 length 则默认为 0")]),t._v(" "),n("li",[t._v("end 为负数即负索引，则将被视为与末尾的偏移量，若为正数即正索引且大于 length 则默认与 length 值相等")]),t._v(" "),n("li",[t._v("根据 start 与 end 计算返回区间，其中 "),n("code",[t._v(">>> 0")]),t._v(" 确保了 start 和 length 落在 js 双精度有效表达范围【0 ～ 0xFFFFFFFF】中，详情可以查看"),n("a",{attrs:{href:"https://segmentfault.com/a/1190000014613703",target:"_blank",rel:"noopener noreferrer"}},[t._v("js 中表达式 >>> 0 浅析"),n("OutboundLink")],1)]),t._v(" "),n("li",[t._v("最后使用 "),n("code",[t._v("new Array(length)")]),t._v("重新创建一个 slice 数组并逐一赋值后返回")])]),t._v(" "),n("h2",{attrs:{id:"_2-internal-basewhile-模块"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-internal-basewhile-模块"}},[t._v("#")]),t._v(" 2. internal/baseWhile 模块")]),t._v(" "),n("p",[n("strong",[n("code",[t._v("dropWhile")]),t._v(" 和 "),n("code",[t._v("takeWhile")]),t._v(" 等方法的基本实现")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" slice "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../slice.js'")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @private\n * @param {Array} array The array to query.\n * @param {Function} predicate 每次迭代调用的函数\n * @param {boolean} [isDrop] 指定删除元素而不是获取它们\n * @param {boolean} [fromRight] 指定从右向左迭代\n * @returns {Array} Returns the slice of `array`.\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("baseWhile")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" predicate"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" isDrop"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fromRight")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" index "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fromRight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fromRight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" index"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v("index "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("predicate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" isDrop\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fromRight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" index"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fromRight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" index "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fromRight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" index "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fromRight "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" index"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" baseWhile\n\n")])])]),n("ul",[n("li",[t._v("入参 "),n("code",[t._v("isDrop")]),t._v("、"),n("code",[t._v("fromRight")]),t._v(" 默认为 "),n("code",[t._v("true")]),t._v(" 即从右向左删除元素，此时 "),n("code",[t._v("index")]),t._v(" 取 "),n("code",[t._v("array.length")]),t._v("(解构获取)")]),t._v(" "),n("li",[t._v("借助 "),n("code",[t._v("while")]),t._v(" 循环调用 "),n("code",[t._v("predicate")]),t._v(" ，若 "),n("code",[t._v("predicate")]),t._v(" 返回值始终为 "),n("code",[t._v("Truthy")]),t._v(" 则直至 "),n("code",[t._v("index = 0")]),t._v(" 退出循环，此时切片入参为 "),n("code",[t._v("slice(array, 0, 0)")]),t._v("， 返回值为空")]),t._v(" "),n("li",[t._v("若在循环过程中 "),n("code",[t._v("predicate")]),t._v(" 返回值为 "),n("code",[t._v("Falsy")]),t._v("，此时退出 "),n("code",[t._v("while")]),t._v(" 循环，直接从当前 "),n("code",[t._v("index")]),t._v(" 向前做切片，返回值即为 "),n("code",[t._v("Array[0] - Array[index]")])])]),t._v(" "),n("h2",{attrs:{id:"_3-droprightwhile-模块"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-droprightwhile-模块"}},[t._v("#")]),t._v(" 3. dropRightWhile 模块")]),t._v(" "),n("p",[n("strong",[t._v("创建一个切片数组，去除 "),n("code",[t._v("array")]),t._v(" 中从 "),n("code",[t._v("predicate")]),t._v("(谓词) 返回假值(falsey)开始到尾部的部分。"),n("code",[t._v("predicate")]),t._v(" 会传入3个参数： (value, index, array)。")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" baseWhile "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./.internal/baseWhile.js'")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @since 3.0.0\n * @category Array\n * @param {Array} array 要查询的数组.\n * @param {Function} predicate 这个函数会在每一次迭代调用\n * @returns {Array} 返回array剩余切片\n * @example\n *\n * const users = [\n *   { 'user': 'barney',  'active': false },\n *   { 'user': 'fred',    'active': true },\n *   { 'user': 'pebbles', 'active': true }\n * ]\n *\n * dropRightWhile(users, ({ active }) => active)\n * // => objects for ['barney']\n */")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("dropRightWhile")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" predicate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("baseWhile")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" predicate"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" dropRightWhile\n")])])]),n("ul",[n("li",[t._v("要查询的数组 "),n("code",[t._v("array")]),t._v(" 为 "),n("code",[t._v("null")]),t._v(" 或者 "),n("code",[t._v("[]")]),t._v("，直接返回 "),n("code",[t._v("[]")]),t._v("，否则进入 "),n("code",[t._v("baseWhile")]),t._v(" 逻辑，其中 "),n("code",[t._v("predicate")]),t._v(" 为函数类型，默认从右向左删除元素")])])])}),[],!1,null,null,null);a.default=r.exports}}]);