# 模块化

**什么是模块化呢？**

- 模块化开发的最终的目的是将程序分成一个个小的模块
- 这个模块中编写属于自己的逻辑代码，有自己的作用域，不会影响到其他的模块；
- 这个模块可以将自己希望的变量、函数、对象等导出给其它模块使用
- 也可以通过某种方式，导入另外模块的变量、函数、对象等；

按照这种模块划分开发程序的过程，就是模块化开发的过程；

JS 的缺陷：

- var 定义的变量作用域问题；
- JS 的面向对象并不能像常规面向对象语言一样使用 class；(借鉴 Self 语言的)
- JS 没有模块化的问题等等；

::: tip 题外话
JS 被称之为是披着 C 语言外衣的 Lisp（这门语言被应用在人工智能领域），Lisp 被称为天才程序员使用的语言。《黑客与画家》
:::

## 早期的 JS

- JS 仅仅作为一门脚本语言，做一些简单的表单验证或动画实现
- 随着前端和 JS 的快速发展，JS 代码变得越来越复杂了
  - ajax 的出现，前后端开发分离，意味着后端返回数据，我们需要通过 JS 进行前端页面的渲染
  - SPA 的出现，前端页面变得更加复杂：包括前端路由、状态管理等等一些列复杂的需求需要通过 JS 来实现
  - 包括 Node 的实现，JS 编写复杂的后端程序，没有模块化是致命的硬伤。
- 模块化是一个迫切的需求：

  - 但是 JS 本身直到 ES6 才推出自己的模块化方案
  - 在此之前，为了让 JS 支持模块化，涌现出了很多不同的模块化规范：AMD、CMD、CommonJS 等

## 没有模块化带来的问题

- 命名冲突

可以用 IIFE（立即函数调用表达式）解决,函数是有作用域的。立即执行函数，但是其它就访问不到了，所以需要在立即执行函数中 return 出来

```js
var module = (function() {
  var name = "Moonster";
  var age = 18;

  return {
    name,
    age,
  };
})();
```

- 带来了新的问题

  1. 我们必须记得每一个模块中返回对象的命名，才能在其它模块中正确的使用
  2. 代码写起来混乱不堪，每个文件中的代码都需要包裹在一个匿名函数中来编写
  3. 在没有合适的规范情况下，可能会出现任意命名甚至出现模块名称相同的情况

- 虽然实现了模块化，但是实现过于简单，并且是没有规范的
  1. 制定规范约束每个人都按照这个规范去编写模块化的代码；
  2. 这个规范包括的核心功能：**模块本身可以导出暴露的属性，模块又可以导入自己需要的属性**；

JS 社区涌出了很多规范，例如 AMD、CMD、CommonJS 都是代表性的一些规范。

## CommonJS

CommonJS 是一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为 ServerJS,后来为了体现它的广泛性，修改为 CommonJS,平时我们会简称为 CJS。

- Node 是 CommonJS 在服务器端一个具有代表性的实现；
- Browserify 是 CommonJS 在浏览器中的一种实现
- Webpack 打包工具具备对 CommonJS 的支持和转换；

所以 Node 中对 CommonJS 进行了支持和实现，让我们在开发 node 的过程中可以方便的进行模块化开发；

- 在 Node 中每一个 JS 文件都是一个单独的模块；
- 在这个模块中包括 CommonJS 规范的核心变量：exports、module.exports、require

模块化的核心是导出和导入，Node 对其进行了实现：

- exports 和 module.exports 可以负责对模块中的内容进行导出；
- require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容

### 案例

```js
// bar.js
const name = "Monster";
const age = 18;
exports.name = name;
exports.age = age;
```

```js
// main.js
// require本质就是返回exports对象
const bar = require("./bar");
```

### 理解对象的引用赋值

```js
const obj = {
  name: "why",
  age: 18,
};

const info = obj;
```

首先呢，在内存分配一块空间，基础类型的话就直接保存了，但是对象是一个引用类型，会在堆内存开辟一块空间

```js
// 这块堆内存会有一个自己的内存地址，例如0x100
{
    name:"why",
    age:18
}

// 当我们把对象赋值给obj的,在内存中保存obj=0x100,obj保存的是内存地址,也就是我的这个引用指向这个内存地址
// info = obj实际上就是把内存地址赋给了info,也就是,info = 0x100,内存地址的引用
```

### 画图解析赋值的过程

```js
// bar.js
// 每个模块都有一个exports对象,它默认指向空对象,只要是个对象就会在内存里面开辟一块空间
console.log(exports);
```

```js
// main.js
const bar = require("./bar.js");

// 想办法拿到bar.js的那块内存空间,也就代表bar指向的是bar.js的那个内存地址
```

所以 Node 中 CommonJS 的本质就是对象的引用赋值.

**它们实际上是一个浅层拷贝**

bar 和 exports 是同一个对象

- 所以 bar 对象是 exports 对象的浅拷贝(引用赋值)
- 浅拷贝的本质就是一种引用的赋值而已

### exports 导出

- 注意 exports 是一个对象,我们可以在这个对象中添加很多个属性,添加的属性会导出
- 另外一个文件可以通过 require 导入

意味着 main 中的 bar 变量等于 exports 对象

也就是 require 通过各种查找方式,最终找到了 exports 这个对象

并且将这个 exports 对象赋值给了 bar 变量

bar 变量就是 exports 对象了

### module.exports 是什么?

module.exports 和 exportsu 有什么关系或者区别呢?

追根溯源,维基百科对 CommonJS 规范的解析:

- CommonJS 中是没有 module.exports 的概念的
- 但是为了实现模块的导出,Node 中使用的是 Module 的类,每一个模块都是 Module 的一个实例,也就是 module;
- 所以在 Node 中真正用于导出的其实根本不是 exports,而是 module.exports;
- 因为 module 才是导出的真正实现者

```js
// 因为源码中做了一件事情
module.exports = exports;
// module.exports = exports 是在顶层
// exports = "123"
// 导出的就还是{}
```

为什么 exports 也可以导出呢?

是因为 module 对象的 exports 属性是 exports 对象的一个引用;

**最终的目的都是让他们两个指向同一个对象**

也就是说 module.exports=exports=main 中的 bar

本质上,是 module.exports 在导出,实质上 module.exportsexports、和 require 指向的是同一个内存地址

module.exports 不在引用 exports 的时候,exports 就没有任何意义了

exports 的意义是 commonjs 中要求有一个 exports 作为导出(接口和实现类的区别)

的

**理解值拷贝和引用拷贝的时候,内存的关系**

### require 细节

require 是一个函数,可以帮助我们引入一个文件(模块)中导入的对象.

[require 的查找规则](https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together)

**总结:**

导入的语法为 require(X)

- 情况一:X 是一个核心模块,比如 path、http
  - 直接返回核心模块,并且停止查找
- 情况二:X 是以./或../或/(根目录)开头的
  - 第一步将 X 当作一个文件在对应的目录下查找
    - 如果有后缀名,按照后缀名的格式查找对应的文件
    - 如果没有后缀名,就会按照如下顺序:
      1. 直接查找文件 X
      2. 查找 X.js 文件
      3. 查找 X.json 文件
      4. 查找 X.node 文件
  - 第二步:没有找到对应的文件,将 X 作为一个目录
    - 查找目录下面的 index 文件
      1. 查找 X/index.js 文件
      2. 查找 X/index.json 文件
      3. 查找 X/index.node 文件
  - 如果没有找到,那么报错:not found
- 情况三:直接是一个 X(没有路径),并且 X 不是一个核心模块
  - 会去当前文件所在的目录的 node_modules 去查找,没有的话就回去上一层目录的 node_modules 查找,一直找到根目录的 node_modules,如果没找到,那就会报错:not found

> 在每一个模块都有一个 module 对象,当前就是 id 就是一个`.`,如果是其它的就不是一个`.`了,loader,parent,chileren,exports,paths(paths 查找顺序)

### 模块的加载过程

```js
// es module 与commonjs的区别
// 加载过程是同步加载的
require("./bar");
// 阻塞了,不会浪费特别多的性能,是开发服务器的,文件都是在本地的,所以读取效率很快
console.log("main被执行了");

// 但是那么放到浏览器上就比较麻烦了,因为它要先从服务器上面下载下来,所以会很明显的有阻塞
// 如果模块被多次加载是会被缓存的
```

1. 结论一:模块在被第一次引入时,模块中的 JS 代码会被运行一次
2. 结论二:模块被多次引入时,会缓存,最终只加载(运行)一次
   - 为什么只会被加载运行一次呢?
   - 这是因为每个模块对象 module 都有一个 loaded 属性
   - 为 false 表示还没有加载,为 true 表示已经加载.
3. 结论三:如果有循环引入,那么加载顺序是什么?
   - main=>(aaa)=>ccc=>ddd=>eee
   - main=>(bbb)=>ccc
   - bbb=>eee
   - 这是一种数据结构:图结构
   - 图结构在遍历的过程中,有深度优先搜索(DFS,depth first search)和广度优先搜索(BFS,breadth first search);
   - Node 采用的是深度优先算法:main->aaa->ccc->ddd->eee->bbb

图结构(互联网也是图结构,把每个节点访问的过程叫图的遍历) 数组 链表 树结构 哈希表

### CommonJS 的加载过程

CommonJS 模块加载 js 文件的过程是运行时加载的，并且是同步的：

- 运行时加载意味着是 JS 引擎在执行 js 代码的过程中加载模块；
- 同步就意味着一个文件没有加载结束之前，后面的代码都不会执行；

```js
const flag = true;

if (flag) {
  const foo = require("./foo");
  console.log("if语句继续执行");
}
```

CommonJS 通过 module.exports 导出的是一个对象

- 导出的一个对象意味着可以将这个对象的引用在其他模块中赋值给其他变量；
- 但是最终他们指向的都是同一个对象，那么一个变量修改了对象的属性，所有的地方都会被修改。

### Node 源码解析

源码在`lib/internal/modules/cjs`

是把对应的代码放到一个沙盒去执行的,类似于 IIFE,因为函数是有自己的作用域的

### CommonJS 规范缺点

CommonJS 加载模块是同步的:

- 同步意味着只有等到对应模块加载完毕,当前模块中的内容才能被运行;
- 这个在服务器不会有什么问题,因为服务器加载的 js 文件都是本地文件,加载速度非常快

如果将它应用于浏览器呢?

- 浏览器加载 js 文件需要先从服务器将文件下载下来,之后再加载运行;
- 那么采用同步就意味着后续的 js 代码都无法正常运行,即使是一些简单的 DOM 操作;

所以再浏览器中,我们通常不使用 CommonJS 规范

- 当然再 webpack 中使用 CommonJS 是另外一回事
- 因为它会将我们的代码转成浏览器可以直接执行的代码;

在早期为了可以再浏览器中使用模块化,通常会采用 AMD 或 CMD;

- 但是目前一方面现代的浏览器已经支持 ES Modules,另一方面借助于 webpack 等工具可以对 CommonJS 或者 ES Module 代码的转换;
- ADM 和 CMD 已经使用非常少了

vite 编译速度非常快,因为压根就不编译,而是直接浏览器去加载,但是在打包的时候还是需要去转换成为浏览器能够识别的 ES5 的语法

## AMD 规范

AMD 是应用于浏览器的一种模块化规范:

- AMD 是 Asynchronous Module Definition(异步模块)的缩写
- 它采用的是异步加载模块;
- 事实上 AMD 的规范还要早已 CommonJS,但是 CommonJS 目前仍然在被使用,而 AMD 使用的较少了

规范只是定义代码的时候应该如何去编写,只有有了具体的实现才能被应用:

- AMD 实现的比较常用的库是 [require.js](https://github.com/requirejs/requirejs) 和 curl.js

```sh
# 第一步:下载require.js
# 下载地址:https//github.com/requirejs/requirejs
# 找到其中的require.js文件
# 第二步:定义HTML的script标签引入require.js和定义入口文件
# data-main属性的作用就是在加载完src的文件后会加载执行该文件,作为入口文件
```

```html
<script src="./lib/require.js" data-main="./index.js"></script>
```

```js
// index.js
(function() {
  // require做一个配置
  require.config({
    paths: {
      // 模块的映射关系,不要加后缀名
      foo: "./foo",
    },
  });
  // 导入模块
  require(["foo"], function(foo) {
    console.log(foo);
  });
})();
```

```js
// foo.js
define(function() {
  const name = "monster";

  return {
    name,
  };
});
```

## CMD 规范

CMD 是应用于浏览器的一种模块化规范

- CMD 是 Common Module Definition(通用模块定义)的编写;
- 它也是采用了异步加载模块,但是它将 CommonJS 的优点吸收了过来

CMD 比较优秀的实现方案:

- [SeaJS](https://github.com/seajs/seajs)

```sh
# 第一步下载SeaJS
# 下载地址:https://github.com/seajs/seajs
# 找到dist文件夹下的sea.js
# 第二步:引入sea.js和使用主入口文件
# seajs是指定主入口文件的
```

```js
// foo.js
define(function(require, exports, module) {
  const name = "Monster hello";
  exports.name = name;
});
```

```js
// index.js
define(function(require, exports, module) {
  const foo = require("./foo");
  console.log(foo.name);
});
```

```html
<script src="./lib/sea.js"></script>
<script>
  seajs.use("./src/index.js");
</script>
```

## ES Module

JS 没有模块化一直是它的痛点，所以才会产生我们前面学习的社区规范：CommonJS、AMD、CMD 等，后来 ES 推出了自己的模块化系统。

ES Module 和 CommonJS 的模块化有一些不同之处：

- 一方面它使用了 import 和 export 关键字
- 另一方面它采用编译期的静态分析，并且也加入了动态引用的方式：

ES Module 模块采用 export 和 import 关键字来实现模块化：

- export 负责将模块内的内容导出；
- import 负责从其他模块导入内容；

采用 ES Module 将自动采用严格模式：use strict

在浏览器中使用 ESM 时，它不支持 file 格式，可以起一个 live server 服务，去使用

```sh
# 导出方式有三种

# 导出方式一：在前面加入export

# 导出方式二：export {} 这个{放置我们要导出的引用列表}是大括号不是一个对象，是一个语法

# 导出方式三：export {name as fName},导出时，可以给变量起名


# 导入方式有三种

# 方式一：{}不是对象,js必须要加，脚手架帮我们做了
# import {} from './foo.js'
# 方式二：导出变量之后可以起别名

# import {name as fName } from './foo.js'
# 方式三：* as foo,统一放到foo对象，作为它的属性

```

### export 和 import 结合使用

```js
// import { name, age } from "./foo.js";
// export { name, age };

// 上面两步转为下面这一步
// export {name,age} from "./foo.js";
```

为什么要这样做呢？

- 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中
- 这样方便指定统一的接口规范，也方便阅读
- 这个时候就可以使用 export 和 import 结合使用

```js
// 例如utils.js里面有三个工具函数，format有两个工具函数

// 我们可以创建index.js文件直接export { } from '' 导出
```

### default 用法

前面学习的导出功能都是有名字的导出（name exports）

- 在导出 export 时指定了名字
- 导入 import 时需要知道具体的名字

缺陷：必须知道名字

还有一种导出叫做默认导出（default export）

- 默认导出 export 时可以不需要指定名字。
- 在导入时不需要使用{}，并且可以自己来指定名字。
- 它也方便我们和现有的 CommonJS 等规范相互操作。

注意：在一个模块中，只能有一个默认导出（default export）

### import 函数

通过 import 加载一个模块，是不可以在其放到逻辑代码中的。

为什么会出现这个情况呢？

- 这是因为 ES Module 在被 JS 引擎解析时，就必须知道它的依赖关系；（parsing 只是解析没有执行的，会转成 ast,但是在解析就会语法分析出来语法错误，parsing 时就已经确定了依赖关系，cjs 的 require 是执行一个函数，它可以直接使用动态加载，但是纯 ESM 是不行的，所以解析阶段就会报出问题，所以只能使用 import()函数，import 函数是一种异步加载的，返回的是一个 promise,promise 是一个契约，承诺）
- 由于这个时候 js 代码没有任何的运行，所以无法在进行类似于 if 判断中根据代码的执行情况

但是在某些情况下我们确实希望给动态的加载一个模块：

- 如果根据不同的条件，动态的选择加载模块的路径；
- 这个时候需要使用 import()函数来动态加载;

大部分的脚手架都是基于 webpack，会对 import()单独打包到一个 js 文件，到时候就不需要加载一个特别大的 js 文件了，需要用到的时候再去加载 js 文件。

### ES Module 加载过程

ES Module 加载 js 文件的过程是编译（解析）时加载的，并且是异步的：

- 编译时（解析）加载，意味着 import 不能和运行时相关的内容放在一起使用：
- 比如 from 后面的路径需要动态获取；
- 比如不能将 import 放到 if 等语句块中
- 所以有时候我们也称 ES Module 是静态解析的，而不是动态或者运行时解析的；

可以在 html 中的 script 标签进行测试异步的，相当于有个 async 属性

异步意味着：JS 引擎在遇到 import 时会去获取这个 js 文件，但是这个获取的过程是异步的，并不会阻塞主线程继续执行；

- 也就是说我们设置了 type=module 的代码，相当于在 script 标签上也加上了 async 属性
- 如果我们后面有普通的 script 标签以及对应的代码，那么 ES Module 对应的 js 文件和代码不会阻塞他们的执行。

ES Module 通过 export 导出的是变量本身的引用：

- export 在导出一个变量时，JS 引擎会解析这个语法，并且创建模块环境记录（module environment record）;
- 模块环境记录会和变量进行绑定（bindings）,并且这个绑定是实时的；
- 而在导入的地方，我们是可以实时的获取到绑定的最新值的；

所以，如果在导出的模块中修改了变化，那么导入的地方可以实时获取最新的变量；

注意：在导入的地方不可以修改该变量，他只是被绑定到了这个变量上（其实是一个常量）

思考： 如果 bar.js 导出的是一个对象，那么 main.js 中是否可以修改对象中的属性呢？

- 答案是可以的，因为他们指向同一块内存空间。

```sh
export 导出的不是一个对象，导出这个值是变量的引用，可以跟CJS的exports做对比，设置一两秒后的打印,在import处修改的话，也就是反过来，就会报语法错误，如果是对象的话那就没问题，因为是对象的引用赋值
```

## Node 对 ES Module 的支持

- 在最新的 Current（v14.13.1）中，支持 ES Module，我们需要进行如下操作：

  - 方式一：在 package.json 中配置 type:module
  - 方式二：文件以.mjs 结尾，表示使用的是 ES Module；

- 在最新的 LTS 版本（12.19.0）中，我们也是可以正常运行的，但是会报一个警告。

```sh
# 异步使用时，可以在顶级作用域内直接使用 await

# 没有了关键字 require，module.exports,exports,__dirname,__filename

# 可以使用 import.meta 获取信息

# 在 esm 下调用 cjs 的方法： 可以使用 cjs 后缀文件

# 翻过来不能使用这种方式在cjs下调用esm的方法
```

### CommanJS 和 ES Module 交互

结论一：通常给情况下，CommonJS 不能加载 ES Module

- 因为 CommonJS 是同步加载的，但是 ES Module 必须经过静态分析等，无法在这个时候执行 JS 代码
- 但是这个并非绝对的，某些平台在实现的时候可以对代码进行针对性的解析，可能也会支持。
- Node 当中是不支持的

结论二：多数情况下，ES Module 是可以加载 CommonJS 的

- ES Module 在加载 CommonJS 时，会将其 module.exports 导出的内容作为 default 导出方式来使用；
- 这个也依然需要看具体的实现，比如 webpack 中是支持的，Node 最新的 Current 版本也是支持的
- 但是在最新的 LTS 版本中就不支持；
