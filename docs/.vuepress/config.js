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
                text: "读研生涯",
                items: [
                    { text: "探索与记录", link: "/PostGraduate/Explore/" },
                ],
            },
            {
                text: "计算机基础",
                items: [
                    { text: "数据结构与算法", link: "/CS/Algorithm/" },
                    { text: "计算机组成原理", link: "/CS/ComputerComposition/" },
                    { text: "计算机网络", link: "/CS/ComputerNetworks/" },
                    { text: "操作系统", link: "/CS/OperatingSystem/" }
                ],
            },
            {
                text: "前端",
                items: [
                    { text: "JavaScript", link: "/Web/JavaScript/" },
                    { text: "HTML", link: "/Web/HTML/" },
                    { text: "CSS", link: "/Web/CSS/" },
                    { text: "React", link: "/Web/React/" },
                    { text: "Vue", link: "/Web/Vue/" },
                    { text: "TypeScript", link: "/Web/TypeScript/" },
                    { text: "Gis", link: "/Web/Gis/" },
                    { text: "App", link: "/Web/App/" },
                    { text: "桌面应用", link: "/Web/Desktop/" },
                    { text: "小程序", link: "/Web/WxApp/" },
                ],
            },
            {
                text: "后端",
                items: [
                    { text: "Koa", link: "/BackEnd/Koa/" },
                    { text: "Nest", link: "/BackEnd/Nest/" },
                    { text: "Node", link: "/BackEnd/Node/" },
                ],
            },
            {
                text: "工程化",
                items: [
                    { text: "软件工程", link: "/FrontEndEngineering/SoftwareEnginner/" },
                    { text: "开发", link: "/FrontEndEngineering/Develop/" },
                    { text: "构建", link: "/FrontEndEngineering/Build/" },
                    { text: "部署", link: "/FrontEndEngineering/Deploy/" },
                    { text: "性能", link: "/FrontEndEngineering/Performance/" },
                    { text: "规范", link: "/FrontEndEngineering/Norm/" },
                ],
            },
            {
                text: "书&源码精读",
                items: [
                    { text: "ES", link: "/SourceCode/ES/" },
                    { text: "Axios", link: "/SourceCode/Axios/" },
                    { text: "Lodash", link: "/SourceCode/Lodash/" },
                    { text: "React", link: "/SourceCode/React/" },
                ],
            },
            {
                text: "其他",
                items: [
                    { text: "面试题", link: "/Others/Question/" },
                    { text: "区块链", link: "/Others/BlockChain/" },
                    { text: "英语", link: "/Others/English/" },
                    { text: "学习资源", link: "/Others/StudySource/" },
                    { text: "Js Tricks", link: "/Others/JsTricks/" },
                    { text: "Css Tricks", link: "/Others/CssTricks/" },
                    { text: "开发技巧", link: "/Others/DevelopSkills/" },
                    { text: "备忘录", link: "/Others/Note/" },
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
             /*
            * 读研生涯
            */ 
            // 探索与记录
            "/PostGraduate/Explore/": [
                {
                    title: "探索与记录", 
                    path: "/PostGraduate/Explore/",
                },
                {
                    title: "Transformer", 
                    collapsable: true, 
                    children: [
                        {
                            title: "Transformer",
                            path: "/PostGraduate/Explore/Transformer",
                        },
                    ],
                },
            ],

            /*
            * 计算机基础
            */ 
            // 数据结构与算法
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
                {
                    title: "初级算法", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "Array-移动零",
                            path: "/CS/Algorithm/Array/moveZeroes[283]",
                        },
                        {
                            title: "Array-加一",
                            path: "/CS/Algorithm/Array/plusOne[66]",
                        },
                        {
                            title: "Array-旋转图像",
                            path: "/CS/Algorithm/Array/rotate[48]",
                        },
                        {
                            title: "BinarySearch-两个数组的交集 II",
                            path: "/CS/Algorithm/BinarySearch/intersect[350]",
                        },
                        {
                            title: "BitManipulation-只出现一次的数字",
                            path: "/CS/Algorithm/BitManipulation/singleNumber[136]",
                        },
                        {
                            title: "HashTable-存在重复元素",
                            path: "/CS/Algorithm/HashTable/containsDuplicate[217]",
                        },
                        {
                            title: "HashTable-只出现一次的数字",
                            path: "/CS/Algorithm/HashTable/isValidSudoku[36]",
                        },
                        {
                            title: "TwoPoints-反转字符串",
                            path: "/CS/Algorithm/TwoPoints/reverseString[344]",
                        },
                    ],
                },
                {
                    title: "C语言", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "求和溢出",
                            path: "/CS/Algorithm/C/sum",
                        },
                        {
                            title: "四则运算",
                            path: "/CS/Algorithm/C/arithmetic",
                        },
                        
                    ],
                },
            ],
            // 计算机网络
            "/CS/ComputerNetworks/": [
                {
                    title: "计算机网络", // 必要的
                    path: "/CS/ComputerNetworks/",
                },
                {
                    title: "HTTP", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        { 
                            title: "版本比较", 
                            path: "/CS/ComputerNetworks/HTTP/compare" 
                        },
                    ],
                },
                {
                    title: "OSI", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        { 
                            title: "版本比较", 
                            path: "/CS/ComputerNetworks/OSI/" 
                        },
                    ],
                },
            ],
            // 计算机组成原理
            "/CS/ComputerComposition/": [
                {
                    title: "计算机组成原理",
                    path: "/CS/ComputerComposition/",
                }
            ],
            // 操作系统
            "/CS/OperatingSystem/": [
                {
                    title: "操作系统",
                    path: "/CS/OperatingSystem/",
                }
            ],

            /*
             * 前端
            */
           // App
           "/Web/App/": [
                {
                    title: "app", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "app",
                            path: "/Web/App/",
                        },
                        {
                            title: "cordova入门",
                            path: "/Web/App/Cordova",
                        },
                    ],
                },
            ],
            // CSS
            "/Web/CSS/": [
                {
                    title: "CSS", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "CSS目录",
                            path: "/Web/CSS/",
                        },
                        {
                            title: "CSS名词概念",
                            path: "/Web/CSS/Words",
                        },
                        {
                            title: "CSS面试题",
                            path: "/Web/CSS/Question",
                        },
                    ],
                },
            ],
            // Desktop
            "/Web/Desktop/": [
                {
                    title: "桌面应用", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "桌面应用",
                            path: "/Web/Desktop/",
                        },
                    ],
                },
            ],
            // Gis
            "/Web/Gis/": [
                {
                    title: "Gis", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "Gaode",
                            path: "/Web/Gis/Gaode",
                        },
                        {
                            title: "Baidu_api",
                            path: "/Web/Gis/Baidu_api",
                        },
                    ],
                },
            ],
            // HTML
            "/Web/HTML/": [
                {
                    title: "HTML", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "HTML5",
                            path: "/Web/HTML/Html",
                        },
                    ],
                },
            ],
            // JavaScript
            "/Web/JavaScript/": [
                {
                    title: "JavaScript", // 必要的
                    path: "/Web/JavaScript/",
                },
                {
                    title: "JavaScript初级", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "阮一峰ES6精读",
                            path: "/Web/JavaScript/ES",
                        },
                        {
                            title: "ES6 到 ES12 特性总结",
                            path: "/Web/JavaScript/ES",
                        },
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
                            path: "/Web/JavaScript/This",
                        },
                        {
                            title: "promiseA+规范与promise",
                            path: "/Web/JavaScript/Promise",
                        },
                    ],
                },
                {
                    title: "JavaScript进阶", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "symbol",
                            path: "/Web/JavaScript/Advance/Symbol",
                        },
                        {
                            title: "instanceOf",
                            path: "/Web/JavaScript/Advance/InstanceOf",
                        },
                        {
                            title: "内存泄漏与垃圾回收",
                            path: "/Web/JavaScript/Advance/Garbage",
                        },
                        {
                            title: "闭包",
                            path: "/Web/JavaScript/Advance/Closure",
                        },
                        {
                            title: "截流与防抖",
                            path: "/Web/JavaScript/Advance/Debounce",
                        },
                        {
                            title: "javascript安全",
                            path: "/Web/JavaScript/Advance/Security",
                        },
                        {
                            title: "eventloop",
                            path: "/Web/JavaScript/Advance/Eventloop",
                        },
                        {
                            title: "requestAnimationFrame",
                            path: "/Web/JavaScript/Advance/RequestAnimationFrame",
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
                            path: "/Web/JavaScript/Advance/Function",
                        },
                    ],
                },
            ],            
            // React
            "/Web/React/": [
                {
                    title: "🔯React与Vue比较研究",
                    path: "/Web/React/ReactPrimer/",
                },
                {
                    title: "React入门",
                    collapsable: true,
                    children: [
                        {
                            title: "React入门（JSX）",
                            path: "/Web/React/ReactPrimer/JSX",
                        },
                        {
                            title: "React入门（一、React基础）",
                            path: "/Web/React/ReactPrimer/React_1",
                        },
                    ],
                },
                {
                    title: "React进阶",
                    collapsable: true,
                    children: [
                        {
                            title: "JSX",
                            path: "/Web/React/Advance/JSX",
                        },
                        {
                            title: "React性能优化",
                            path: "/Web/React/Advance/Performance",
                        },
                    ],
                },
            ],
            // TypeScript
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
                            path: "/Web/TypeScript/Typescript1",
                        },
                        {
                            title: "TypeScript学习记录-[类和接口]",
                            path: "/Web/TypeScript/Typescript2",
                        },
                        {
                            title: "TypeScript学习记录-[枚举和泛型]",
                            path: "/Web/TypeScript/Typescript3",
                        },
                        {
                            title: "TypeScript学习记录-[类型别名]",
                            path: "/Web/TypeScript/Typescript4",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-Hello World]",
                            path: "/Web/TypeScript/tsChallenges/TsChallenge_HelloWorld",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-实现Pick]",
                            path: "/Web/TypeScript/tsChallenges/TsChallenge_Pick",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-Readonly|omit]",
                            path: "/Web/TypeScript/tsChallenges/TsChallenge_Readonly_Omit",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-Readonly2]",
                            path: "/Web/TypeScript/tsChallenges/TsChallenge_ReadOnly2",
                        },
                        {
                            title: "TypeScript学习记录-[ts-challenge-returnType]",
                            path: "/Web/TypeScript/tsChallenges/TsChallenge_returnType",
                        }
                    ],
                },
            ],
            // Vue
            "/Web/Vue/": [
                {
                    title: "目录",
                    path: "/Web/Vue/",
                },
                {
                    title: "设计思想",
                    path: "/Web/Vue/DesignIdea",
                },
                {
                    title: "手写响应式",
                    path: "/Web/Vue/Advance1",
                },
                {
                    title: "手写虚拟dom",
                    path: "/Web/Vue/Advance2",
                },
            ],
            // WxApp
            "/Web/WxApp/": [
                {
                    title: "小程序", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "桌面应用",
                            path: "/Web/WxApp/",
                        },
                    ],
                },
            ],
            /*
             * 后端
            */
           
           "/BackEnd/Koa/": [
                {
                    title: "Koa",
                    collapsable: true,
                    children: [
                        { title: "Koa", path: "/BackEnd/Koa/" }
                    ],
                },
            ],
            // Nest
           "/BackEnd/Nest/": [
                {
                    title: "Nest",
                    collapsable: true,
                    children: [
                        { title: "Nest", path: "/BackEnd/Nest/" }
                    ],
                },
            ],
            // Node
            "/BackEnd/Node/": [
                {
                    title: "Node",
                    collapsable: true,
                    children: [
                        { title: "Node", path: "/BackEnd/Node/" }
                    ],
                },
            ],
            

            /*
             * 工程化
            */
            // 软件工程
            "/FrontEndEngineering/SoftwareEnginner/": [
                {
                    title: "目录", // 必要的
                    path: "/FrontEndEngineering/SoftwareEnginner/",
                },
                {
                    title: "Foundation", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "软件工程基础",
                            path: "/FrontEndEngineering/SoftwareEnginner/Foundation/",
                        },
                    ],
                },
            ],
            // 开发
            "/FrontEndEngineering/Develop/": [
                {
                    title: "目录", // 必要的
                    path: "/FrontEndEngineering/Develop/",
                },
                {
                    title: "Foundation", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "基础",
                            path: "/FrontEndEngineering/Develop/Foundation/",
                        },
                    ],
                },
                {
                    title: "Cli", 
                    collapsable: true, 
                    children: [
                        {
                            title: "脚手架",
                            path: "/FrontEndEngineering/Develop/Cli/",
                        },
                    ],
                },
            ],
            // 构建
            "/FrontEndEngineering/Build/": [
                {
                    title: "目录", // 必要的
                    path: "/FrontEndEngineering/Build/",
                },
                {
                    title: "Webpack", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "Webpack",
                            path: "/FrontEndEngineering/Build/Webpack/",
                        },
                        {
                            title: "Dll",
                            path: "/FrontEndEngineering/Build/Webpack/Dll",
                        },
                        {
                            title: "【手写loader】- 在webpack打包阶段检测失效图片资源并替换",
                            path: "/FrontEndEngineering/Build/Webpack/ReplaceLegalImg",
                        },
                    ],
                },
            ],
            // 部署
            "/FrontEndEngineering/Deploy/": [
                {
                    title: "目录", // 必要的
                    path: "/FrontEndEngineering/Deploy/",
                },
                {
                    title: "Server", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "防火墙linux",
                            path: "/FrontEndEngineering/Deploy/Server/linux",
                        },
                        {
                            title: "nginx项目部署",
                            path: "/FrontEndEngineering/Deploy/Server/nginx",
                        },
                    ],
                },
                {
                    title: "Config", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "git_ssh",
                            path: "/FrontEndEngineering/Deploy/Config/git_ssh",
                        },
                        {
                            title: "file_permission",
                            path: "/FrontEndEngineering/Deploy/Config/file_permission",
                        },
                    ],
                },
            ],
            // 性能
            "/FrontEndEngineering/Performance/": [
                {
                    title: "目录", // 必要的
                    path: "/FrontEndEngineering/Performance/",
                },
                {
                    title: "Foundation", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "基础",
                            path: "/FrontEndEngineering/Performance/Foundation/",
                        },
                    ],
                },
            ],
            // 规范
            "/FrontEndEngineering/Norm/": [
                {
                    title: "目录", // 必要的
                    path: "/FrontEndEngineering/Norm/",
                },
                {
                    title: "Foundation", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "git",
                            path: "/FrontEndEngineering/Norm/Git/",
                        },
                    ],
                },
            ],

            /*
             * 读源码
            */
            // Axios
            "/SourceCode/ES/": [
                {
                    title: "ECMAScript6入门教程", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "ES",
                            path: "/SourceCode/ES/",
                        },
                    ],
                },
            ],
            // Axios
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
            // Lodash
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
            // React
            "/SourceCode/React/": [
                {
                    title: "React", // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    children: [
                        {
                            title: "Lodash",
                            path: "/SourceCode/React/",
                        },
                        {
                            title: "生命周期",
                            path: "/SourceCode/React/LifeCycles",
                        },

                    ],
                },
            ],

            /*
            * 其他
            */ 
            // Question
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
                            title: "前端面试题集锦",
                            path: "/Others/Question/Question1",
                        },
                    ],
                },
            ],
            // BlockChain
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
            // StudySource
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
            // JsTricks
            "/Others/JsTricks/": [
                {
                    title: "Js Tricks",
                    collapsable: true,
                    children: [
                        {
                            title: "JsTricks",
                            path: "/Others/JsTricks/",
                        },
                        {
                            title: "百度地图代码段",
                            path: "/Others/JsTricks/Bmap",
                        },
                        {
                            title: "天、小时、分钟、秒添加中文时间单位",
                            path: "/Others/JsTricks/AppendTimeUnit",
                        },
                        {
                            title: "时间戳转换至天、时、分、秒",
                            path: "/Others/JsTricks/FormatTimeWithSeconds",
                        },
                    ],
                },
            ],
            // CssTricks
            "/Others/CssTricks/": [
                {
                    title: "Css Tricks",
                    collapsable: true,
                    children: [
                        {
                            title: "CssTricks",
                            path: "/Others/CssTricks/",
                        },
                        {
                            title: "换行",
                            path: "/Others/CssTricks/Wx_text_overflow",
                        },
                    ],
                },
            ],
            // Note
            "/Others/Note/": [
                {
                    title: "Css Tricks",
                    collapsable: true,
                    children: [
                        {
                            title: "Note",
                            path: "/Others/Note/",
                        },
                    ],
                },
            ],
            // DevelopSkills
            "/Others/DevelopSkills/": [
                {
                    title: "Css Tricks",
                    collapsable: true,
                    children: [
                        {
                            title: "CssTricks",
                            path: "/Others/DevelopSkills/",
                        },
                        {
                            title: "devTool使用-chrome",
                            path: "/Others/DevelopSkills/DevTool",
                        },
                    ],
                },
            ],
            // English
            "/Others/English/": [
                {
                    title: "English",
                    collapsable: true,
                    children: [
                        {
                            title: "English",
                            path: "/Others/English/",
                        },
                    ],
                },
            ],
        },
    },
};
