const moment = require("moment");

module.exports = {
  title: "大前端工程师成长路线",
  description: "博客 分享 笔记 规划",
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
    "@vuepress/back-to-top",
    // [
    //   "@vuepress/last-updated",
    //   {
    //     transformer: (timestamp, lang) => {
    //       moment.locale(lang);
    //       return moment(timestamp).format("YYYY-MM-DD HH:mm:SS");
    //     },
    //   },
    // ],
  ],
  themeConfig: {
    navbar: true,
    // displayAllHeaders: true, // 默认值：false

    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Doc', link: '/docs/' },
      { text: 'GitHub', link: 'https://github.com/bierxiensi' },
    ],

    sidebar: [
      '/ES/',
      '/BlockChain/',
      // {
      //   title: 'ES',   // 必要的
      //   path: '/ES/',  // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      // },
      {
        title: 'JavaScript',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/JavaScript/this'
        ]
      },
      {
        title: 'HTML',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/HTML/html',
          '/HTML/DOM'
        ]
      },
      {
        title: 'CSS',  
        collapsable: true,
        sidebarDepth: 2,  
        children: [
          '/CSS/html'
        ]
      },
      {
        title: 'Question', 
        collapsable: true, 
        sidebarDepth: 3, 
        children: [
          '/Question/question'
        ]
      },
      {
        title: 'Server端相关知识', 
        collapsable: true,
        sidebarDepth: 4,
        children: [
          '/Server端相关知识/linux',
          '/Server端相关知识/nginx'
        ]
      },
      // "/Home",
      // "/ES",
    ]
  }
}