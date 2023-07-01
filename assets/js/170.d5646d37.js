(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{591:function(t,s,a){"use strict";a.r(s);var r=a(28),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"creat-react-app-cli-tools-命令行工具"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#creat-react-app-cli-tools-命令行工具"}},[t._v("#")]),t._v(" creat-react-app （cli tools 命令行工具）")]),t._v(" "),a("ul",[a("li",[t._v("本地服务")]),t._v(" "),a("li",[t._v("静态验证")]),t._v(" "),a("li",[t._v("单元测试")]),t._v(" "),a("li",[t._v("构件生产环境")])]),t._v(" "),a("h3",{attrs:{id:"特性-github"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特性-github"}},[t._v("#")]),t._v(" 特性 "),a("a",{attrs:{href:"https://github.com/facebook/create-react-app",target:"_blank",rel:"noopener noreferrer"}},[t._v("github"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[t._v("One Dependency")]),t._v(" "),a("li",[t._v("No Configuration Required")]),t._v(" "),a("li",[t._v("No Lock-In: You can “eject” to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.")])]),t._v(" "),a("h2",{attrs:{id:"启动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动"}},[t._v("#")]),t._v(" 启动")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("npx create"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("react"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("app iui "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("typescript\n")])])]),a("h3",{attrs:{id:"npx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npx"}},[t._v("#")]),t._v(" npx")]),t._v(" "),a("ul",[a("li",[t._v("避免安装全局模块（npm version > 5.2）")]),t._v(" "),a("li",[t._v("调动项目内部安装模块（无需配置scripts命令|node_modules/.bin/XX 目录运行）")])]),t._v(" "),a("h2",{attrs:{id:"利用ts-interface实现自动补全和类型约束"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#利用ts-interface实现自动补全和类型约束"}},[t._v("#")]),t._v(" 利用ts-interface实现自动补全和类型约束")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" React "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"react"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IHello")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("message")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("Hello")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("props")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" IHello")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("h2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("props"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("h2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" Hello"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"对函数类型进行泛型约束"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#对函数类型进行泛型约束"}},[t._v("#")]),t._v(" 对函数类型进行泛型约束")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" React "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"react"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IHello")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    message"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("Hello")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" React"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("FunctionComponent"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("IHello"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("props")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("h2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("props"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("message"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("h2"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nHello"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("defaultProps "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("message")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello world'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" Hello"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"样式方案分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#样式方案分析"}},[t._v("#")]),t._v(" 样式方案分析")]),t._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://reactjs.org/docs/faq-styling.html#gatsby-focus-wrapper",target:"_blank",rel:"noopener noreferrer"}},[t._v("Styling and CSS"),a("OutboundLink")],1)])]),t._v(" "),a("ul",[a("li",[t._v("全局变量")]),t._v(" "),a("li",[t._v("依赖")]),t._v(" "),a("li",[t._v("可重用性")]),t._v(" "),a("li",[t._v("可扩展性\n...")])]),t._v(" "),a("p",[a("strong",[t._v("lnline css")])]),t._v(" "),a("ul",[a("li",[t._v("js中计算")]),t._v(" "),a("li")]),t._v(" "),a("p",[a("strong",[t._v("CSS in JS")])]),t._v(" "),a("p",[a("strong",[t._v("Styled Component")])]),t._v(" "),a("p",[a("strong",[t._v("Sass/Less")])]),t._v(" "),a("h3",{attrs:{id:"色彩体系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#色彩体系"}},[t._v("#")]),t._v(" 色彩体系")]),t._v(" "),a("p",[a("strong",[t._v("系统色板 = 基础色板 + 中性色板")])]),t._v(" "),a("p",[a("strong",[t._v("产品色板 = 品牌色 + 功能色板")])]),t._v(" "),a("h2",{attrs:{id:"字体变量方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字体变量方案"}},[t._v("#")]),t._v(" 字体变量方案")]),t._v(" "),a("p",[a("strong",[t._v("组件库样式变量分类")])]),t._v(" "),a("ul",[a("li",[a("p",[t._v("基础色彩系统")])]),t._v(" "),a("li",[a("p",[t._v("字体系统")])]),t._v(" "),a("li",[a("p",[t._v("表单")])]),t._v(" "),a("li",[a("p",[t._v("按钮")])]),t._v(" "),a("li",[a("p",[t._v("边框阴影")])]),t._v(" "),a("li",[a("p",[t._v("可配置开关")])]),t._v(" "),a("li",[a("p",[t._v("无衬线字体")])]),t._v(" "),a("li",[a("p",[t._v("等宽字体")])])]),t._v(" "),a("h2",{attrs:{id:"normalize-css"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#normalize-css"}},[t._v("#")]),t._v(" normalize.css")]),t._v(" "),a("blockquote",[a("p",[t._v("只是一个很小的CSS文件，但它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案。")])]),t._v(" "),a("ul",[a("li",[t._v("保护有用的浏览器默认样式而不是完全去掉它们")]),t._v(" "),a("li",[t._v("一般化的样式：为大部分HTML元素提供")]),t._v(" "),a("li",[t._v("修复浏览器自身的bug并保证各浏览器的一致性")]),t._v(" "),a("li",[t._v("优化CSS可用性：用一些小技巧")]),t._v(" "),a("li",[t._v("解释代码：用注释和详细的文档来")])]),t._v(" "),a("p",[a("strong",[t._v("scss")]),t._v("\n@import 引入，无需额外发送http请求")]),t._v(" "),a("p",[t._v("_ 下划线开头称之为parital文件，编译器无需编译到css")])])}),[],!1,null,null,null);s.default=e.exports}}]);