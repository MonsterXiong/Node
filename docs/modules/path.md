# path

- path 模块用于对路径和文件进行处理，提供了很多好用的方法。
- 并且我们知道在 Mac OS、Linux 和 window 上的路径是不一样的
  - window 上会使用\或\\\来作为文件路径的分隔符，当然目前也支持/；
  - 在 Mac OS、Linux 的 Unix 操作系统上使用/来作为文件路径的分隔符；

如果我们在 window 上使用\来作为分隔符开发了一个应用程序，那么部署到 linux 上面的时候

- 显示路径会出现一些问题
- 为了屏蔽他们之间的差异，在开发中对于路径的操作我们可以使用 path 模块；

可移植操作系统接口（Portable Operating System Interface ,缩写为 POSIX）

- Linux 和 Mac OS 都是先了 POSIX 接口；
- Window 部分操作系统实现了 POSIX 接口；

```js
const path = require("path");

const baseurl = "/src/lib";
// const baseurl = "\\src\\lib";
const filename = "index.js";

// const result = basepath + "/" +filename

const filepath = path.resolve(basePath, filename);

console.log(filepath);
```

## path 的 API

```js
const path = require("path");

const filepath = "/src/lib/index.js";

// 1. 获取路径的信息
console.log(path.dirname(filepath)); // /src/lib
console.log(path.basename(filepath)); // index.js
console.log(path.extname(filepath)); // .js

// 2.join路径拼接
const basepath = "/src/lib";
const filename = "index.js";

console.log(path.join(basepath, filename)); // /src/lib/index.js

// 3. relove路径拼接
// resoolve会判断拼接的路径字符串中是否有以/或./或../开头的路径,如果没有这些的话，会将当前文件所在的路径做一个拼接
console.log(path.resolve(basepath, filename)); // C:\src\lib\index.js
```

在 webpack 中获取路径或者起别名的地方也可以使用
