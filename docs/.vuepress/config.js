// const moment = require("moment");

module.exports = {
    title: "大前端工程师成长路线",
    description: "博客 分享 笔记 规划 ",
    base: "/docs/",
    port: "3000",
    dest: "./dist",
    lastUpdated: "上次更新时间",
    // theme: '@vuepress/blog',

    // markdown: {
    //   anchor: { permalink: false },
    //   toc: { includeLevel: [1, 2, 3] },
    //   config: (md) => {
    //     md.use(require("markdown-it-include"), "./");
    //   },
    // },
    plugins: [
        "@vuepress/pwa",
        {
            serviceWorker: true,
            updatePopup: true,
        },
        ["@vuepress/back-to-top"], // 返回顶部
        ["@vuepress/nprogress"], // 加载进度条
    ],
    themeConfig: {
        logo: "/images/home/balu.jpg",
        // navbar: true,
        // displayAllHeaders: true, // 默认值：false

        nav: [
            { text: "Home", link: "/" },
            {
                text: "计算机基础",
                items: [{ text: "算法", link: "/CS/Algorithm/" }],
            },
            {
                text: "读源码",
                items: [
                    { text: "Axios", link: "/SourceCode/Axios/" },
                    { text: "Lodash", link: "/SourceCode/Lodash/" },
                ],
            },
            {
                text: "Web端/移动端",
                items: [
                    { text: "JavaScript", link: "/Web/JavaScript/" },
                    { text: "HTML", link: "/Web/HTML/" },
                    { text: "CSS", link: "/Web/CSS/" },
                    { text: "HTTP", link: "/Web/HTTP/" },
                    { text: "TypeScript", link: "/Web/TypeScript/" },
                    { text: "App", link: "/App/App/" },
                    { text: "桌面应用", link: "/App/Desktop/" },
                ],
            },
            {
                text: "React系列",
                items: [
                    { text: "AntDesign", link: "/React/AntDesign/" },
                    { text: "React入门", link: "/React/ReactPrimer/" },
                ],
            },
            {
                text: "Vue系列",
                items: [{ text: "vue进阶", link: "/Vue/VueAdvance/" }],
            },
            {
                text: "Node",
                items: [
                    { text: "Node", link: "/Node/" },
                    { text: "Nest框架", link: "/Node/Nest/" },
                ],
            },
            {
                text: "打包与工具链",
                items: [
                    { text: "Server", link: "/Tools/Server/" },
                    { text: "Webpack", link: "/Tools/Webpack/" },
                ],
            },
            {
                text: "其他",
                items: [
                    { text: "面试题", link: "/Others/Question/" },
                    { text: "区块链", link: "/Others/BlockChain/" },
                    { text: "学习资源", link: "/Others/StudySource/" },
                ],
            },
            {
                text: "Tricks",
                items: [
                    { text: "js tricks", link: "/Tricks/JsTricks/" },
                    { text: "css tricks", link: "/Tricks/CssTricks/" },
                ],
            },
            { text: "GitHub", link: "https://github.com/bierxiensi" },
        ],

        sidebar: {
            "/all/": [
                {
                    title: "这里是所有的路由", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                },
            ],
            // CS/Algorithm
            "/CS/Algorithm/": [
                {
                    title: "算法的计划与flag", // 必要的
                    path: "/CS/Algorithm/",
                },
                {
                    title: "20天算法刷题记录", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "二分查找",
                            path: "/CS/Algorithm/binarySearch",
                        },
                    ],
                },
            ],

            // SourceCode/Axios
            "/SourceCode/Axios/": [
                {
                    title: "Axios", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "Axios",
                            path: "/SourceCode/Axios/",
                        },
                        {
                            title: "Axios工具函数",
                            path: "/SourceCode/Axios/Utils",
                        },
                        {
                            title: "Axios实例化配置函数",
                            path: "/SourceCode/Axios/Default",
                        },
                        {
                            title: "过度选项校验函数Validator研读解析",
                            path: "/SourceCode/Axios/Default",
                        },
                        {
                            title: "取消请求cancel模块研读解析",
                            path: "/SourceCode/Axios/Cancel",
                        },
                        {
                            title: "请求分发函数DispatchRequest研读解析",
                            path: "/SourceCode/Axios/DispatchRequest",
                        },
                        {
                            title: "适配器中的辅助函数helper研读解析",
                            path: "/SourceCode/Axios/Helper",
                        },
                        {
                            title: "适配器中的核心函数core研读解析",
                            path: "/SourceCode/Axios/Core",
                        },
                        {
                            title: "浏览器端适配器xhr研读解析",
                            path: "/SourceCode/Axios/Xhr",
                        },
                        {
                            title: "【axios 源码】- node适配器 http 研读解析【上】",
                            path: "/SourceCode/Axios/Http1",
                        },
                        {
                            title: "【axios 源码】- node适配器 http 研读解析【下】",
                            path: "/SourceCode/Axios/Http2",
                        },
                    ],
                },
            ],
            // SourceCode/Lodash
            "/SourceCode/Lodash/": [
                {
                    title: "Lodash", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "Lodash",
                            path: "/SourceCode/Lodash/",
                        },
                        {
                            title: "lodash-intersection-baseIntersection源码研读解析",
                            path: "/SourceCode/Lodash/BaseIntersection",
                        },
                        {
                            title: "lodash-chunk源码研读解析【上】",
                            path: "/SourceCode/Lodash/Chunk1",
                        },
                        {
                            title: "lodash-chunk 源码研读解析【下】",
                            path: "/SourceCode/Lodash/Chunk2",
                        },
                        {
                            title: "lodash-compact源码研读解析",
                            path: "/SourceCode/Lodash/Compact",
                        },
                        {
                            title: "lodash-difference源码研读解析【cache】",
                            path: "/SourceCode/Lodash/Difference(Cache)",
                        },
                        {
                            title: "lodash-difference源码研读解析【flatten】",
                            path: "/SourceCode/Lodash/Difference(Flatten)",
                        },
                        {
                            title: "lodash-difference源码研读解析【index】",
                            path: "/SourceCode/Lodash/Difference(Index)",
                        },
                        {
                            title: "lodash-differenceBy源码研读解析",
                            path: "/SourceCode/Lodash/DifferenceBy",
                        },
                        {
                            title: "lodash-differenceWith源码研读解析",
                            path: "/SourceCode/Lodash/DifferenceWith",
                        },
                        {
                            title: "lodash-drop源码研读解析",
                            path: "/SourceCode/Lodash/Drop",
                        },
                        {
                            title: "lodash-dropRight源码研读解析",
                            path: "/SourceCode/Lodash/DropRight",
                        },
                        {
                            title: "lodash-dropRightWhile源码研读解析",
                            path: "/SourceCode/Lodash/DropRightWhile",
                        },
                        {
                            title: "lodash-dropWhile源码研读解析",
                            path: "/SourceCode/Lodash/DropWhile",
                        },
                        {
                            title: "lodash-FindLastIndex源码研读解析",
                            path: "/SourceCode/Lodash/FindLastIndex",
                        },
                        {
                            title: "lodash-first源码研读解析",
                            path: "/SourceCode/Lodash/First",
                        },
                        {
                            title: "lodash-flatten源码研读解析",
                            path: "/SourceCode/Lodash/Flatten",
                        },
                        {
                            title: "lodash-flattenDeep源码研读解析",
                            path: "/SourceCode/Lodash/FlattenDeep",
                        },
                        {
                            title: "lodash-flattenDepth源码研读解析",
                            path: "/SourceCode/Lodash/FlattenDepth",
                        },
                        {
                            title: "lodash-head源码研读解析",
                            path: "/SourceCode/Lodash/Head",
                        },
                        {
                            title: "lodash-indexOf源码研读解析",
                            path: "/SourceCode/Lodash/IndexOf",
                        },
                        {
                            title: "lodash-initial源码研读解析",
                            path: "/SourceCode/Lodash/Initial",
                        },
                        {
                            title: "lodash-intersection源码研读解析",
                            path: "/SourceCode/Lodash/Intersection",
                        },
                        {
                            title: "lodash-intersectionBy源码研读解析",
                            path: "/SourceCode/Lodash/IntersectionBy",
                        },
                        {
                            title: "lodash-intersectionWith源码研读解析",
                            path: "/SourceCode/Lodash/IntersectionWith",
                        },
                        {
                            title: "【从源码看一道前端面试题】实现 lodash 中的 get 函数",
                            path: "/SourceCode/Lodash/ObjGet",
                        }  
                    ],
                },
               
            ],

            

            // App/App
            "/App/App/": [
                {
                    title: "app", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "app",
                            path: "/App/App/",
                        },
                        {
                            title: "cordova入门",
                            path: "/App/App/Cordova",
                        },
                    ],
                },
            ],
            // App/Desktop
            "/App/Desktop/": [
                {
                    title: "桌面应用", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "桌面应用",
                            path: "/App/Desktop/",
                        },
                    ],
                },
            ],

            // web/JavaScript
            "/Web/JavaScript/": [
                {
                    title: "ES6 到 ES12 特性总结", // 必要的
                    path: "/Web/JavaScript/",
                },
                {
                    title: "JavaScript初级", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "文本对象模型DOM",
                            path: "/Web/JavaScript/DOM",
                        },
                        {
                            title: "浏览器对象模型BOM",
                            path: "/Web/JavaScript/BOM",
                        },
                        {
                            title: "JavaScript中的this",
                            path: "/Web/JavaScript/this",
                        },
                        {
                            title: "promiseA+规范与promise",
                            path: "/Web/JavaScript/promise",
                        },
                    ],
                },
                {
                    title: "JavaScript进阶", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "symbol",
                            path: "/Web/JavaScript/Advance/symbol",
                        },
                        {
                            title: "instanceOf",
                            path: "/Web/JavaScript/Advance/instanceOf",
                        },
                        {
                            title: "内存泄漏与垃圾回收",
                            path: "/Web/JavaScript/Advance/advance3",
                        },
                        {
                            title: "闭包",
                            path: "/Web/JavaScript/Advance/advance4",
                        },
                        {
                            title: "截流与防抖",
                            path: "/Web/JavaScript/Advance/advance5",
                        },
                        {
                            title: "javascript安全",
                            path: "/Web/JavaScript/Advance/advance6",
                        },
                        {
                            title: "eventloop",
                            path: "/Web/JavaScript/Advance/eventloop",
                        },
                        {
                            title: "Buffer",
                            path: "/Web/JavaScript/Advance/Buffer",
                        },
                        {
                            title: "ArrayBuffer",
                            path: "/Web/JavaScript/Advance/ArrayBuffer",
                        },
                        {
                            title: "FormData",
                            path: "/Web/JavaScript/Advance/FormData",
                        },
                        {
                            title: "URLSearchParams",
                            path: "/Web/JavaScript/Advance/URLSearchParams",
                        },
                        {
                            title: "function",
                            path: "/Web/JavaScript/Advance/function",
                        },
                    ],
                },
            ],
            // Web/HTML
            "/Web/HTML/": [
                {
                    title: "HTML", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "HTML5",
                            path: "/Web/HTML/html",
                        },
                    ],
                },
            ],
            // Web/CSS
            "/Web/CSS/": [
                {
                    title: "CSS", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "CSS目录",
                            path: "/Web/CSS/",
                        },
                    ],
                },
            ],
            // Web/HTTP
            "/Web/HTTP/": [
                {
                    title: "HTTP", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "HTTP目录",
                            path: "/Web/HTTP/",
                        },
                        {
                            title: "网络和并发",
                            path: "/Web/HTTP/advance1",
                        },
                    ],
                },
            ],
            // web/TypeScript
            "/Web/TypeScript/": [
                {
                    title: "TypeScript", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "TypeScript目录",
                            path: "/Web/TypeScript/",
                        },
                        {
                            title: "TypeScript学习记录-[数据类型]",
                            path: "/Web/TypeScript/typescript1",
                        },
                        {
                            title: "TypeScript学习记录-[类和接口]",
                            path: "/Web/TypeScript/typescript2",
                        },
                        {
                            title: "TypeScript学习记录-[枚举和泛型]",
                            path: "/Web/TypeScript/typescript3",
                        },
                        {
                            title: "TypeScript学习记录-[类型别名]",
                            path: "/Web/TypeScript/typescript4",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-Hello World]",
                            path: "/Web/TypeScript/tsChallenges/tsChallenge_HelloWorld",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-实现Pick]",
                            path: "/Web/TypeScript/tsChallenges/tsChallenge_Pick",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-Readonly|omit]",
                            path: "/Web/TypeScript/tsChallenges/tsChallenge_Readonly_Omit",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-Readonly|omit]",
                            path: "/Web/TypeScript/tsChallenges/tsChallenge_ReadOnly2",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-returnType]",
                            path: "/Web/TypeScript/tsChallenges/tsChallenge_returnType",
                        }
                    ],
                },
            ],

            // React/AntDesign
            "/React/AntDesign/": [
                { title: "AntDesign", path: "/React/AntDesign/" },
            ],
            // React/ReactPrimer
            "/React/ReactPrimer/": [
                {
                    title: "🔯React与Vue比较研究",
                    path: "/React/ReactPrimer/",
                },
                {
                    title: "React入门",
                    collapsable: true,
                    children: [
                        {
                            title: "React入门（JSX）",
                            path: "/React/ReactPrimer/JSX",
                        },
                        {
                            title: "React入门（一、React基础）",
                            path: "/React/ReactPrimer/React_1",
                        },
                    ],
                },
            ],

            // Vue/VueAdvance
            "/Vue/VueAdvance/": [
                {
                    title: "🔯Vue原理剖析",
                    path: "/Vue/VueAdvance/",
                },
                {
                    title: "Vue进阶",
                    collapsable: true,
                    children: [
                        {
                            title: "手写响应式",
                            path: "/Vue/VueAdvance/advance1",
                        },
                        {
                            title: "手写虚拟dom",
                            path: "/Vue/VueAdvance/advance2",
                        },
                    ],
                },
            ],

            // Node
            "/Node/": [
                {
                    title: "Node",
                    collapsable: true,
                    children: [{ title: "Node", path: "/Node/" }],
                },
            ],
            // Node/Nest
            "/Node/Nest/": [
                {
                    title: "Node",
                    collapsable: true,
                    children: [{ title: "Nest框架", path: "/Node/Nest" }],
                },
            ],

            // Tools/Server
            "/Tools/Server/": [
                {
                    title: "Server端相关知识",
                    collapsable: true,
                    children: [
                        {
                            title: "防火墙linux",
                            path: "/Tools/Server/linux",
                        },
                        {
                            title: "nginx项目部署",
                            path: "/Tools/Server/nginx",
                        },
                    ],
                },
            ],
            // Tools/Webpack
            "/Tools/Webpack/": [
                {
                    title: "Webpack相关知识",
                    collapsable: true,
                    children: [
                        {
                            title: "Webpack",
                            path: "/Tools/Webpack/",
                        },
                        {
                            title: "【手写loader】- 在webpack打包阶段检测失效图片资源并替换",
                            path: "/Tools/Webpack/ReplaceLegalImg",
                        },
                    ],
                },
            ],

            // Others/Question
            "/Others/Question/": [
                {
                    title: "Question",
                    collapsable: true,
                    children: [
                        {
                            title: "前端面试题集锦",
                            path: "/Others/Question/",
                        },
                        {
                            title: "前端面试题集锦（转自https://github.com/wangjxk）",
                            path: "/Others/Question/question1",
                        },
                    ],
                },
            ],
            // Others/BlockChain
            "/Others/BlockChain/": [
                {
                    title: "区块链",
                    collapsable: true,
                    children: [
                        {
                            title: "区块链基础知识",
                            path: "/Others/BlockChain/",
                        },
                    ],
                },
            ],
            // Others/StudySource
            "/Others/StudySource/": [
                {
                    title: "🔯学习资源汇总",
                    path: "/Others/StudySource/",
                },
                {
                    title: "学习资源",
                    collapsable: true,
                    children: [
                        {
                            title: "Web端学习资源",
                            path: "/Others/StudySource/Web",
                        },
                        {
                            title: "Vue学习资源",
                            path: "/Others/StudySource/Vue",
                        },
                        {
                            title: "服务端学习资源",
                            path: "/Others/StudySource/Server",
                        },
                    ],
                },
            ],

            // Tricks/JsTricks
            "/Tricks/JsTricks/": [
                {
                    title: "Js Tricks",
                    collapsable: true,
                    children: [
                        {
                            title: "JsTricks",
                            path: "/Tricks/JsTricks/",
                        },
                    ],
                },
            ],
            // Tricks/CssTricks
            "/Tricks/CssTricks/": [
                {
                    title: "Css Tricks",
                    collapsable: true,
                    children: [
                        {
                            title: "CssTricks",
                            path: "/Tricks/CssTricks/",
                        },
                        {
                            title: "换行",
                            path: "/Tricks/CssTricks/wx_text_overflow",
                        },
                    ],
                },
            ],
        },
    },
};
