(window.webpackJsonp=window.webpackJsonp||[]).push([[186],{609:function(e,t,s){"use strict";s.r(t);var a=s(28),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h2",{attrs:{id:"前置知识"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前置知识"}},[e._v("#")]),e._v(" 前置知识")]),e._v(" "),s("blockquote",[s("p",[e._v("今日 【middle - 8.readonly2】")])]),e._v(" "),s("p",[e._v("在这之前需要掌握一点Ts基础知识，可以参考学习记录"),s("RouterLink",{attrs:{to:"/Web/TypeScript/typescript1.html"}},[e._v("TypeScript学习记录-[数据类型]")]),e._v("、"),s("RouterLink",{attrs:{to:"/Web/TypeScript/typescript1.html"}},[e._v("TypeScript学习记录-[类和接口]")]),e._v("、"),s("RouterLink",{attrs:{to:"/Web/TypeScript/typescript1.html"}},[e._v("TypeScript学习记录-[枚举和泛型]")]),e._v("、"),s("RouterLink",{attrs:{to:"/Web/TypeScript/typescript1.html"}},[e._v("TypeScript学习记录-[类型别名]")])],1),e._v(" "),s("h1",{attrs:{id:"二、题目分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、题目分析"}},[e._v("#")]),e._v(" 二、题目分析")]),e._v(" "),s("h2",{attrs:{id:"readonly2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#readonly2"}},[e._v("#")]),e._v(" readonly2")]),e._v(" "),s("p",[s("strong",[e._v("实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly"),s("T",[e._v("一样")])],1)]),e._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[e._v("type MyReadonly2"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),s("span",{pre:!0,attrs:{class:"token constant"}},[e._v("T")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[e._v("K")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" any\n\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("/* _____________ 测试用例 _____________ */")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("import")]),e._v(" type "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" Alike"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" Expect "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("from")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'@type-challenges/utils'")]),e._v("\n\ntype cases "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n  Expect"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("Alike"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("MyReadonly2"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("Todo1"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" Readonly"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("Todo1"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>>")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  Expect"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("Alike"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("MyReadonly2"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("Todo1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'title'")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'description'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" Expected"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  Expect"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("Alike"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("MyReadonly2"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("Todo2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'title'")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'description'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" Expected"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">>")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("interface")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("Todo1")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("title")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" string\n  description"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("?")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" string\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("completed")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" boolean\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("interface")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("Todo2")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  readonly title"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" string\n  description"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("?")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" string\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("completed")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" boolean\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("interface")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("Expected")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  readonly title"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" string\n  readonly description"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("?")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" string\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("completed")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" boolean\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),s("ul",[s("li",[e._v("首先可以确定的是返回类型是 "),s("code",[e._v("object")]),e._v("（索引类型index Type）， 且其中属于泛型 "),s("code",[e._v("K")]),e._v(" 的属性都是 "),s("code",[e._v("readonly")]),e._v(" 属性，即 "),s("code",[e._v("type MyReadonly2<T, keys extends keyof T> = { readonly [key in keys]: T[key] }")]),e._v(" ，其中 "),s("code",[e._v("keys extends keyof T")]),e._v(" 对联合类型 "),s("code",[e._v("keys")]),e._v(" 进行类型约束，确保后续使用 "),s("code",[e._v("in")]),e._v(" 遍历 "),s("code",[e._v("keys")]),e._v(" 时的每一个类型 "),s("code",[e._v("key")]),e._v(" 均在泛型 "),s("code",[e._v("T")]),e._v(" 的类型中")]),e._v(" "),s("li",[e._v("接下来要取包含在泛型 "),s("code",[e._v("T")]),e._v(" 但不包含在泛型 "),s("code",[e._v("k(keys)")]),e._v(" 中的属性，可以这样写 "),s("code",[e._v("[key in keyof T as key extends keys ? never : key]: T[key]")]),e._v("，这里的重映射运算符 "),s("code",[e._v("as")]),e._v(" 将在遍历运算中的每一项类型 "),s("code",[e._v("key")]),e._v(" 使用 "),s("code",[e._v("extends ? :")]),e._v(" 进行条件判断，符合前述条件的类型将被返回，而属于泛型 "),s("code",[e._v("k(keys)")]),e._v(" 的属性将被丢弃（"),s("code",[e._v("never")]),e._v(" 代表不可达）")]),e._v(" "),s("li",[e._v("经过上述分析我们将得到 "),s("code",[e._v("type MyReadonly2<T, keys extends keyof T> = { readonly [key in keys]: T[key] } & { [key in keyof T as key extends keys ? never : key]: T[key] }")]),e._v("，这里通过交叉类型（"),s("code",[e._v("Intersection")]),e._v("）运算对类型做合并（两者都属于"),s("code",[e._v("obj")]),e._v("类型，同一类型可以合并，不同的类型无法合并），这样经过 "),s("code",[e._v("MyReadonly2")]),e._v(" 运算就得到了一个 "),s("code",[e._v("K")]),e._v(" 指定应设置为 "),s("code",[e._v("Readonly")]),e._v(" 的 "),s("code",[e._v("T")]),e._v(" 的属性集")]),e._v(" "),s("li",[e._v("值得注意的是 "),s("code",[e._v("<T, Keys extends keyof T> = { [key in keyof T as key extends Keys ? never : key]: T[key] }")]),e._v(" 是 "),s("code",[e._v("Omit<T, K>")]),e._v(" 泛型的实现，前述内容可以简化为 "),s("code",[e._v("type MyReadonly2<T, keys extends keyof T> = { readonly [key in keys]: T[key] } & Omit<T, K>")])])]),e._v(" "),s("p",[s("a",{attrs:{href:"./../image/tsChallenge_ReadOnly2.1.png"}})]),e._v(" "),s("ul",[s("li",[e._v("为了实现 "),s("code",[e._v("如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样")]),e._v(" 这个条件，在 "),s("code",[e._v("keys extends keyof T")]),e._v(" 中，需要对泛型 "),s("code",[e._v("keys")]),e._v(" 设定原始类型，即 "),s("code",[e._v("keys = keyof T")]),e._v("，加上类型约束就得到了 "),s("code",[e._v("keys extends keyof T = keyof T")]),e._v("，从而得到了最终的结果 "),s("code",[e._v("type MyReadonly2<T, keys extends keyof T = keyof T> = { readonly [key in keys]: T[key] } & { [key in keyof T as key extends keys ? never : key]: T[key] }")])])]),e._v(" "),s("p",[s("a",{attrs:{href:"./../image/tsChallenge_ReadOnly2.2.png"}})])])}),[],!1,null,null,null);t.default=n.exports}}]);