module.exports = {
  title: "Node Note",
  base: "/Node/",
  head: [
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    ["meta", { name: "keywords", content: "Node Note" }],
    ["link", { rel: "icon", href: "/assets/favicon.ico" }],
  ],
  author: "Monster",
  themeConfig: {
    search: false,
    // 侧边栏深度2=>h3
    sidebarDepth: 3,
    // 是否展开所有标题
    displayAllHeaders: false,
    collapsable: false,
    // 页面滚动效果
    smoothScroll: true,
    nav: [
      { text: "🏃 基础", link: "/base/" },
      { text: "🚗 内置模块", link: "/modules/" },
      { text: "🚄 进阶", link: "/advance/" },
      { text: "🚀 Koa2", link: "/koa2/" },
      { text: "🛫 Express", link: "/express/" },
      { text: "Nest", link: "/nest/" },
      { text: "Egg", link: "/egg/" },
      { text: "🚢 其它", link: "/other/" },
      { text: "😘 GitHub", link: "https://github.com/MonsterXiong/Node" },
    ],

    sidebar: {
      "/modules/": [
        ["", "简介"],
        ["fs", "文件系统fs"],
        ["http", "网络http"],
      ],
      "/advance/": [
        ["", "简介"],
        ["log4j", "日志log4j"],
      ],

      "/koa2/": [
        ["", "简介"],
        ["qiniu", "上传图片到七牛云"],
        ["quick-deploy-site", "快速部署一个静态网站"],
      ],
      "/express/": [["", "简介"]],
      "/egg/": [["", "简介"]],
      "/nest/": [["", "简介"]],
      "/other/": [["", "其它"]],
      "/": [
        ["base/", "认识nodejs"],
        ["base/application", "应用"],
        ["base/deploy", "部署"],
        ["base/lib", "库"],
      ],
    },
  },
};
