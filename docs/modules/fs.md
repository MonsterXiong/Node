# Fs

fs 是 File System 的缩写，表示文件系统

对于任何一个为服务器端服务的语言或者框架通常都会有自己的文件系统：

- 因为服务器需要将各种数据、文件等放置到不同的地方；
- 比如用户数据可能大多数都是放到数据库中的
- 比如某些配置文件或者用户资源（图片、音视频）都是以文件的形式存在于操作系统之上的；

Node 也有自己的文件系统操作模块，就是 fs:

- 借助于 Node 帮我们封装的文件系统，我们可以在任何的操作系统上面直接去操作文件；
- 这也是 Node 可以开发服务器的一大原因，也是它可以成为前端自动化脚本等热门工具的原因；

## 获取一个文件的状态

```js
const fs = require("fs");

// 案例：读取文件的信息
const filepath = "./1.txt";

// 方式一：同步操作
// const info = fs.statSync(filepath);
// console.log("后续需要执行的代码");
// console.log(info);

// 方式二：异步操作
// fs.stat(filepath, (err, info) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(info);
// });

// console.log("后续需要执行的代码");
// 内部原理，底层的异步IO，不会阻塞，线程池
// 回调容易出现回调地狱

// 方式三：Promises
// fs.promises
//   .stat(filepath)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log("后续需要执行的代码");
```

## 文件描述符

文件描述符（file descriptors）是什么呢？

- 在 （类 Unix 操作系统）POSIX 系统上，对于每个进程，内核都维护着一张当前打开着的文件和资源的表格。
- 每个打开的文件都分配了一个称为文件描述符的简单的数字标识符。
- 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件
- Windows 系统中使用了一个虽然不同但概念上类似的机制来跟踪资源

为了简化用户的工作，Node.js 抽象出操作系统之间特定差异，并未所有打开的文件分配一个数字型的文件描述符。

fs.open()方法用于分配新的文件描述符

- 一旦被分配，则文件描述符可用于文件读取数据、像文件写入数据、或请求关于文件的信息。

```js
// 文件描述符
const fs = require("fs");

const filepath = "./1.txt";

fs.open(filepath, (err, fd) => {
  if (err) return;

  // 通过文件描述符去获取文件的信息
  // 以f开头的基本可以传入文件描述符fd，stat和fstat
  // 从API层面来说，把很多文件描述符的操作隐藏起来了
  fs.fstat(fd, (err, info) => {
    console.log(info);
  });
});
```

## 文件的读写

- fs.readFile(path[,options],callback):读取文件的内容
- fs.writeFile(file,data[,options],callback):在文件中写入内容；

options 参数：

- flag：写入的方式
  - w 打开文件写入，默认值
  - w+打开文件进行读写，如果不存在则创建文件
  - r+打开文件进行读写，如果不存在那么抛出异常
  - r 打开文件读取，读取时的默认值；
  - a 打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
  - a+打开文件进行读写，将流放在文件末尾。如果不存在则创建文件
- encoding:[字符的编码](https://www.jianshu.com/p/899e749be47c)

```js
const fs = require("fs'");

// 文件写入
fs.writeFile("./1.txt", "hello fs", { flag: "a" }, (err) => {
  console.log(err);
});

// 文件的读取

// 如果不填写 encoding,返回的结果都属 Buffer;
fs.readFile("./1.txt/", { encoding: "utf8" }, (err, data) => {
  console.log(data);
});
```

## 文件夹操作

```js
const fs = require("fs");
const path = require("path");

// 1.创建文件夹
const dirname = "./why";

// if (!fs.existsSync(dirname)) {
//   fs.mkdir(dirname, (err) => {
//     console.log(err);
//   });
// } else {
// }

// 2.读取文件夹中的所有文件

// function getFiles(dirname) {
//   fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
//     files.forEach((file) => {
//       if (file.isDirectory()) {
//         const filepath = path.resolve(dirname, file.name);
//         getFiles(filepath);
//       }
//       console.log(file.name);
//       //   fs.stat(file, (err, info) => {});
//     });
//   });
// }

// getFiles(dirname);

// 3.文件夹的重命名
// fs.rename(dirname, "./lib", (err) => {
//   console.log(err);
// });
```

## 文件夹的复制

```js
const fs = require("fs");
const path = require("path");

const srcDir = process.argv[2];
const destDir = process.argv[3];

let i = 0;

while (i < 30) {
  i++;
  const num = "day" + (i + "").padStart(2, 0);
  const srcPath = path.resolve(srcDir, num);
  const destPath = path.resolve(destDir, num);
  if (fs.existsSync(destPath)) continue;
  fs.mkdir(destPath, (err) => {
    if (!err) console.log("文件创建成功开始拷贝:", num);
  });

  // 遍历目录下所有的文件
  const srcFiles = fs.readdirSync(srcPath);
  for (const file of srcFiles) {
    if (file.endsWith(".mp4")) {
      const srcFile = path.resolve(srcPath, file);
      const destFile = path.resolve((destPath, file));
      fs.copyFileSync(srcFile, destFile);
      console.log(file, "拷贝成功");
    }
  }

```
