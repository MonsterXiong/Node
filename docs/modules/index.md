# 内置模块

## Node API 操作方式

这些 API 大多数都提供三种操作方式：

- 方式一：同步操作文件：代码会被阻塞，不会继续执行；
- 方式二：异步回调函数操作文件：代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行；
- 方式三：异步 Promise 操作文件：代码不会被阻塞，通过 fs.promises 调用方法操作，会返回一个 Promise 可以通过 then、catch 进行处理

## 全局对象

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

### 特殊的全局对象：

这些全局对象实际上是模块中的变量，只是每个模块都有，看起来像是全局变量，在命令交互行是不可以使用的。它是每个模块都有的

其中包括：

- \_\_dirname：当前文件所在目录的绝对路径（不包括后面的文件名）。
- \_\_filename:当前文件所在的绝对路径（含后面的文件名称）。
- exports
- module
- require()
