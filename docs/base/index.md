# Node.js

[Node.js](https://github.com/nodejs/node) 是一个基于 Chrome 的 V8 JavaScript 引擎的 JavaScript 运行时环境。

> Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine

Node.js 基于 V8 引擎来执行 JS 代码，但是不仅仅只有 V8 引擎：

- V8 可以嵌入到任何 C++应用程序中，无论是 Chrome 还是 Node.js，都是嵌入了 V8 引擎来执行 JS 代码。
- 但是在 Chrome 浏览器中，还需要解析、渲染 HTML、CSS 等相关渲染引擎，另外还需要提供支持浏览器操作的 API、浏览器自己的事件循环等；
- Node.js 中也需要一些额外的操作，比如文件系统读/写、网络 IO、加密、压缩解压文件等操作

## JS 引擎的作用

首先 JS 代码最终是需要被 CPU 执行的，然而 CPU 只认识自己的指令集（实际上就是机器语言），才能被 CPU 所执行，因为 JS 属于一门高级语言，高级语言要想执行，要先变成汇编语言然后再转成机器语言，然后 CPU 再执行，因此我们需要 JS 引擎来帮助我们将 JS 代码编译成 CPU 指令来执行。

### 比较常见的 JS 引擎

- SpiderMonkey：第一款 JS 引擎，由 JS 作者开发
- Chakra：微软开发，用于 IT 浏览器
- JavaScriptCore：WebKit 中的 JS 引擎，Apple 公司开发
- V8：Google 开发的强大 JS 引擎

## 浏览器内核是什么？

不同的浏览器有不同的内核组成。

- Gecko
- Trident IE4-11
- Webkit Safari
- Blink 是 Webkit 的分支，现在用于 Chrome、Edge、Opera

通常我们说的浏览器内核指的是浏览器的排版引擎，也称为浏览器引擎、页面渲染引擎或样板引擎

### 渲染引擎工作的过程

在这个执行过程中，如果 html 解析遇到了 script 标签的话，会停止解析，而去加载和执行 js 代码。

**为什么不直接异步去加载执行 js 代码呢？**

- 因为 JS 代码可以操作我们的 DOM，而浏览器希望将 HTML 解析的 DOM 和 JS 操作之后的 DOM 放到一起来生成最终的 DOM，而不是频繁的去生成新的 DOM 树

## 内核和引擎的关系

WebKit 为例，WebKit 由两部分组成：

- WebCode：负责 HTML 解析、布局、渲染等等相关工作。
- JavaScriptCore：解析、执行 JS 代码

小程序的架构图

- 渲染层 Webview
- 逻辑层 JSCore

## Node.js 的应用场景

- node 包的形式对库进行管理；
- 作为 Web 服务器开发
- 借助 Node.js 完成前后端渲染的同构操作
- 编写脚本工具
- Electron 开发桌面应用程序

## Node 的安装

Node.js 是在 2009 年诞生的。

- LTS 版本：相对稳定一些，推荐线上环境使用该版本（开发可以选择 LTS 版本）
- Current 版本：最新的 Node 版本，包含很多新特性（学习可以选择 Current 版本）

### 安装方式

- Linux 上的 yum、dnf
- Mac 上的 homebrew
- 直接下载对应的安装包 window（.msi），Mac(.pkg)

### Node 的版本工具

- nvm：(node.js version management)是一个 nodejs 的版本管理工具
- n（交互式管理你的 Node.js 版本）=>（tjd 大佬写的）

::: tip 注意
这两个工具都不支持 windows，可以使用 nvm-windows，安装路径最好不要出现中文和空格。
:::

#### nvm

通过它可以安装和切换不同版本的 nodejs。

```sh
# 查看本地安装的所有版本;有可选参数available,显示所有可下载的版本，list等同于ls
nvm list [有可选参数available]

# 安装node,version是指定版本也可以是最新的latest，可选arch是指定安装32位还是64位，默认系统位数
# 可以添加--insecure绕过远程服务器的SSL
nvm install <version> [arch]

# 使用指定版本node，可指定32/64位
nvm use [version] [arch]

# 卸载指定版本node
nvm uninstall [version]

# 设置npm镜像
# https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm npm_mirror [url]
# 设置node镜像
nvm node_mirror https://npm.taobao.org/mirrors/node/
# 设置npm镜像
nvm node_mirror https://npm.taobao.org/mirrors/npm/
# nvm配置淘宝镜像，在setting.txt文件中最后一行添加以下两行
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

# 显示node是运行在32位还是64位
nvm arch

# 开启node.js版本管理
nvm on

# 关闭node.js管理
nvm off

# 设置下载代理，不加可选参数url，显示当前代理，将url设置位none则移除代理
nvm proxy [url]

# 设置存储不同版本node的目录，如果未设置，默认使用当前目录
nvm root [path]

# 显示nvm版本
nvm -v
```

## Node 的 REPL

**什么是 REPL？**

- REPL 是 Read-Eval-Print Loop 的简称，翻译为"读取-求值-输出" 循环；
- REPL 是一个简单的、交互式的编程环境；

> 输入 node 即可进入 Node 的 REPL

## 浏览器和 Node.js 架构区别

Chrome

HTML/CSS JavaScript
Blink V8
中间层
操作系统（网卡/硬盘/显卡。。。）

Node

JS
V8
中间层（libuv）【包括了事件循环，通过 Node BINDINGS(NODE API)链接 LIBUV】
操作系统（网卡/硬盘/显卡。。。）

单独的 Node.js 架构图

- 我们编写的 JS 代码会经过 V8 引擎，再通过 Node.js 的 Bindings,将任务放到 Libuv 的事件循环中；
- libuv(Unicorn Velociraptor-独角伶盗龙)是使用 C 语言编写的库.
- libuv 提供了事件循环、文件系统读写、网络 IO、线程池等等内容

Node.js 使用 JS、C++和 C 语言来编写的
