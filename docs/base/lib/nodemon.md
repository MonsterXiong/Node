# nodemon

`nodemon` 是一种工具，可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于 `node.js` 的应用程序。

```sh
# 启动node服务
nodemon ./index.js

# 在本地3000端口启动node服务
nodemon ./index.js localhost 3000

# 延迟重启,类似于js函数中的函数节流,只在最后一次更改的文件往后延迟重启.避免了短时间多次重启的局面.
nodemon --delay 2500ms server.js

```

## 配置文件

`nodemon`支持本地和全局配置文件。这些通常是命名的`nodemon.json`，可以位于当前工作目录或主目录中。可以使用该`--config <file>`选项指定备用本地配置文件。

```json
{
  "verbose": true,
  "ignore": ["*.test.js", "fixtures/*"],
  "execMap": {
    "rb": "ruby",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
```
