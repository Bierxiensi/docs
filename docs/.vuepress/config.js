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
  // plugins: [
  //   '@vuepress/pwa', {
  //     serviceWorker: true,
  //     updatePopup: true
  //   },
  //   ["@vuepress/back-to-top"], // 返回顶部
  //   ["@vuepress/nprogress"],   // 加载进度条 
  // ],
  themeConfig: {
    logo: '/images/home/balu.jpg',
    // navbar: true,
    // displayAllHeaders: true, // 默认值：false

    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Node', link: '/Node/' },
      {
        text: 'Web端',
        items: [
          { text: "JavaScript", link:"/Web/JavaScript/"},
          { text: "HTML", link:"/Web/HTML/"},
          { text: "CSS", link:"/Web/CSS/"},
        ]
      },
      { text: 'GitHub', link: 'https://github.com/bierxiensi' },
    ],

    sidebar: {
      "/all/": [
        // ['', '目录']
        // ['es', '盘点ES6到ES12的新增特性'],
        // ['BlockChain', '区块链基础知识'],
        // {
        //   title: 'ES',  
        //   path: '/Web/ES/', 
        // },
        {
          title: 'JavaScript',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            {
              title: 'ES6 到 ES12 特性总结',
              path: '/Web/JavaScript/',
            },
            {
              title: 'JavaScript中的this',
              path: '/Web/JavaScript/this',
            },
            {
              title: '文本对象模型',
              path: '/Web/JavaScript/DOM',
            },
            {
              title: '文本对象模型',
              path: '/Web/JavaScript/DOM',
            }
          ]
        },
        {
          title: 'HTML',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            {
              title: 'html基础',
              path: '/Web/HTML/html',
            }
          ]
        },
        {
          title: 'HTML',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            {
              title: 'CSS目录',
              path: '/Web/CSS/',
            }
          ]
        },
        // {
        //   title: 'Question',
        //   collapsable: true,
        //   children: [
        //     '/Web/Question/question'
        //   ]
        // },
        // {
        //   title: 'Server端相关知识',
        //   collapsable: true,
        //   children: [
        //     '/Web/Server/linux',
        //     '/Web/Server/nginx'
        //   ]
        // }
      ],

      "/Web/JavaScript/": [
        {
          title: 'JavaScript',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            {
              title: 'JavaScript目录',
              path: '/Web/JavaScript/',
            },
            {
              title: 'JavaScript中的this',
              path: '/Web/JavaScript/this',
            },
            {
              title: '文本对象模型',
              path: '/Web/JavaScript/DOM',
            }
          ]
        }
      ],
      "/Web/HTML/": [
        {
          title: 'HTML',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            {
              title: 'HTML基础',
              path: '/Web/HTML/html',
            }
          ]
        }
      ],
      "/Web/CSS/": [
        {
          title: 'CSS',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            {
              title: 'CSS目录',
              path: '/Web/CSS/',
            }
          ]
        }
      ],



      // "/Node/": [
      //   {
      //     title: 'Node',
      //     collapsable: false,
      //     children: [
      //       { title: 'Node01', path: '/Node/' },
      //       { title: 'Node02', path: '/Node/aaa' }
      //     ]
      //   }
      // ],
      
    }
  }
}