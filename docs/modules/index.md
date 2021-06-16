# 内置模块

- path
- fs
- console
- debug
- http
- https
- net
- tcp
- udp
- dns
- url
- qs
- stream
- readline
- process
- child
- buffer
- events
- util
- crypto
- zlib
- cluster
- v8

## 全局对象和模块化开发

### Node 程序传递参数

获取参数其实是在 process 的内置对象中的 argv 属性，是一个数组，包含了参数；

```sh
# index.js就被载入到node里面，node里面有V8引擎，就可以执行js代码，会开启一个进程
node index.js
```

```js
console.log(process.argv);
// 第一个node命令所在的路径
// 第二个当前文件所在的路径
```

::: tip 为什么叫 argv 呢？

在 C/C++程序中的 main 函数中，实际上可以获取到两个参数；

- argc:argument counter 的缩写，传递参数的个数
- argv：argument vector 的缩写，传入的具体参数
  - vector 翻译过来是矢量的意思，在程序中表示的是一种数据结构。
  - 在 C++、Java 中都有这种数据结构，是一种数组结构
  - 在 JavaScript 中也是一个数组，里面存储一些参数信息

:::

### Node 的输出

- console.log 最常用的输出内容的方式
- console.clear 清空控制台
- console.trace 打印函数的调用栈

### 常见的全局对象

全局对象：在任何位置都可以访问到。

**process 对象**：process 提供了 Node 进程中相关的信息，比如 Node 的运行环境、参数信息，我们还可以将一些环境变量读取到 process 的 env 中。

**console 对象**：提供了简单的调试控制台

**定时器函数**：

- setTimeout(callback,delay[,...args]):callback 在 delay 毫秒后运行一次
- setInterval(callback,delay[,...args])：callback 每 delay 毫秒重复执行一次
- setImmediate(callback[,...args])：callback I/O 时间后的回调的"立即"执行
- process.nextTick(callback[,...args])：添加到下一次 tick 队列中

还有取消定时器函数

**global 对象**：

::: tip 小技巧
去 Node 的 REPL 下输入`global.`按两下`Tab`可以看到 global 下的属性。
:::

global 和 window 的区别

- 在浏览器中，全局变量都是在 window 上的，比如有 document、setInterval、alert、console 等等。
- 在 Node 中，我们也有一个 global 属性，里面有很多其他属性。
- 但是在浏览器中执行 JS 代码，如果在顶级范围内通过 var 定义一个属性，默认会被添加到 window 对象上
- 但是在 node 中，我们通过 var 定义一个变量，它只是在当前模块中有一个变量，不会放到全局中。

因为浏览器没有模块的概念。

```js
const name = "Monster";
console.log(name); // Monster
console.log(global.name); //undefine
```

```js
// 举例：源码手动把 process 挂载到了 global 对象上
let _process = process;

ObjectDefineProperty(global, "process", {
  get() {
    return _process;
  },
  set(value) {
    _process = value;
  },
  enumerble: false,
  configurable: true,
});
```

#### 特殊的全局对象：

这些全局对象实际上是模块中的变量，只是每个模块都有，看起来像是全局变量，在命令交互行是不可以使用的。它是每个模块都有的

其中包括：

- \_\_dirname：当前文件所在目录的绝对路径（不包括后面的文件名）。
- \_\_filename:当前文件所在的绝对路径（含后面的文件名称）。
- exports
- module
- require()

### JS 的模块化

JS 中各种模块化的实现方案，着重 CommonJS 和 ES6 的模块化

什么是模块化呢？

- 模块化开发的最终的目的是将程序分成一个个小的模块
- 这个模块中编写属于自己的逻辑代码，有自己的作用域，不会影响到其他的模块；
- 这个模块可以将自己希望的变量、函数、对象等导出给其它结构使用
- 也可以通过某种方式，导入另外模块的变量、函数、对象等；

按照这种模块划分开发程序的过程，就是模块化开发的过程；

JS 的缺陷：

- var 定义的变量作用域问题；
- JS 的面向对象并不能像常规面向对象语言一样使用 class；(借鉴 self 语言的)
- JS 没有模块化的问题等等；

JS 作者多次承认过 JS 设计之初的缺陷，但是随着 JS 的发展以及标准化，存在的缺陷问题基本都得到了完善，无论是 web、移动端、小程序端、服务器端、桌面应用都被广泛的使用；

::: tip 题外话
JS 被称之为是披着 C 语言外衣的 Lisp（这门语言被应用在人工智能领域），Lisp 被称为天才程序员使用的语言。《黑客与画家》
:::

函数式编程，各种各样闭包的使用。

#### 早期的 JavaScript

- 仅仅作为一门脚本语言，做一些简单的表单验证或动画实现
- 随着前端和 JS 的快速发展，JS 代码变得越来越复杂了
  - ajax 的出现，前后端开发分离，意味着后端返回数据，我们需要通过 JS 进行前端页面的渲染
  - SPA 的出现，前端页面变得更加复杂：包括前端路由、状态管理等等一些列复杂的需求需要通过 JS 来实现
  - 包括 Node 的实现，JS 编写复杂的后端程序，没有模块化是致命的硬伤。
- 模块化是一个迫切的需求：
  - 但是 JS 本身直到 ES6 才推出自己的模块化方案
  - 在此之前，为了让 JS 支持模块化，涌现出了很多不同的模块化规范：AMD、CMD、CommonJS 等

#### 没有模块化带来的问题
