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
    '@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    },
    ["@vuepress/back-to-top"], // 返回顶部
    ["@vuepress/nprogress"],   // 加载进度条 
  ],
  themeConfig: {
    logo: '/images/home/balu.jpg',
    // navbar: true,
    // displayAllHeaders: true, // 默认值：false

    nav: [
      { text: 'Home', link: '/' },
      {
        text: '移动端',
        items: [
          { text: "App", link:"/App/App/"},
          { text: "桌面应用", link:"/App/Desktop/"},
        ]
      },
      {
        text: 'Web端',
        items: [
          { text: "JavaScript", link:"/Web/JavaScript/"},
          { text: "HTML", link:"/Web/HTML/"},
          { text: "CSS", link: "/Web/CSS/" },
        ]
      },
      {
        text: 'React系列',
        items: [
          { text: "AntDesign", link:"/React/AntDesign/"},
          { text: "React入门", link:"/React/ReactPrimer/"},
        ]
      },
      { 
        text: 'Node',
        items: [
          { text: "Node", link: "/Node/" },
          { text: "Nest框架", link: "/Node/Nest/" },
        ]
      },
      {
        text: '打包与工具链',
        items: [
          { text: "Server", link: "/Tools/Server/" },
          { text: "Webpack", link: "/Tools/Webpack/" },
        ]
      },
      {
        text: '其他',
        items: [
          { text: "面试题", link: "/Others/Question/" },
          { text: "区块链", link: "/Others/BlockChain/" }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/bierxiensi' },
    ],

    sidebar: {
      "/all/": [
        {
          title: '这里是所有的路由',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
        },
      ],

      // app
      "/App/App/": [
        {
          title: 'app',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            {
              title: 'app',
              path: '/App/App/',
            },
            {
              title: 'cordova入门',
              path: '/App/App/Cordova',
            },
          ]
        }
      ],
      "/App/Desktop/": [
        {
          title: '桌面应用',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            {
              title: '桌面应用',
              path: '/App/Desktop/',
            },
          ]
        }
      ],

      // web
      "/Web/JavaScript/": [
        {
          title: 'ES6 到 ES12 特性总结',   // 必要的
          path: '/Web/JavaScript/',
        },
        {
          title: 'JavaScript初级',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [     
            {
              title: '文本对象模型DOM',
              path: '/Web/JavaScript/DOM',
            },
            {
              title: '浏览器对象模型BOM',
              path: '/Web/JavaScript/BOM',
            },
            {
              title: 'JavaScript中的this',
              path: '/Web/JavaScript/this',
            },
          ]
        }
      ],
      "/Web/HTML/": [
        {
          title: 'HTML',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            {
              title: 'HTML5',
              path: '/Web/HTML/html',
            }
          ]
        }
      ],
      "/Web/CSS/": [
        {
          title: 'CSS',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            {
              title: 'CSS目录',
              path: '/Web/CSS/',
            }
          ]
        }
      ],

      // react
      "/React/AntDesign/": [
        { title: 'AntDesign', path: '/React/AntDesign/' }
      ],
      "/React/ReactPrimer/": [
        {
          title: 'React入门',
          collapsable: false,
          children: [
            { title: 'React入门（一、安装及简介）', path: '/React/ReactPrimer/' }
          ]
        }
      ],

      // node
      "/Node/": [
        {
          title: 'Node',
          collapsable: false,
          children: [
            { title: 'Node', path: '/Node/' },
          ]
        }
      ],
      "/Node/Nest/": [
        {
          title: 'Node',
          collapsable: false,
          children: [
            { title: 'Nest框架', path: '/Node/Nest' }
          ]
        }
      ],

      // Tools
      "/Tools/Server/": [{
        title: 'Server端相关知识',
        collapsable: false,
        children: [
          {
            title: '防火墙linux',
            path: '/Tools/Server/linux',
          },
          {
            title: 'nginx项目部署',
            path: '/Tools/Server/nginx',
          }
        ]
      }],
      "/Tools/Webpack/": [{
        title: 'Webpack相关知识',
        collapsable: false,
        children: [
          {
            title: 'Webpack',
            path: '/Tools/Webpack/',
          }
        ]
      }],


      // others
      "/Others/Question/": [{
        title: 'Question',
        collapsable: false,
        children:[{
          title: '前端面试题集锦',
          path: '/Others/Question/',
        }]
      }],
      "/Others/BlockChain/": [{
        title: '区块链',
        collapsable: false,
        children: [
          {
            title: '区块链基础知识',
            path: '/Others/BlockChain/',
          }
        ]
      }],
      
    }
  }
}