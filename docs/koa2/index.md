# koa2

- 概览
- 快速开始
- async await
- koa2 简析
- 中间件开发与使用
- 单元测试
- 开发 debug
- koa2 使用 cookie
- koa2 使用 session

## 目的

- 了解 koa
- 实现一个精简版 koa
- 阅读 koa 源码

三个模块构成

Application => http server 的封装 => 基本的服务器框架

Context => 理解 koa 上下文 => 服务器框架基本数据结构的封装，用以 http 请求解析及响应

Middleware => 深入理解洋葱模型 => 中间件，也是洋葱模型的核心

## 洋葱模型

> 先从皮到心，再从心到皮
>
> koa 的洋葱模型：每一个中间件都像是洋葱的每一层，当从洋葱的中心穿过时，每一层都会一进一出穿过两次，最先传入的一层最后穿出。
>
> middleware：第一个中间件将会执行
>
> next：每一个中间件都会通过 next 来执行下一个中间件
>
> middleware(xtx,next)

```sh
# 使用koa-generator快速搭建Koa项目，-e使用ejs引擎
npx -p koa-generator koa2 -e project

# 连接数据库
npm i mysql2 sequelize --save
```

```js
// sequelize.js
const Sequelize = require("sequelize");

const options = {
  database:'monster'
  username:'root',
  password:'123456',
  port:3306,
  host:'localhost',
  dialect: "mysql",
};

const sequelize = new Sequelize(options);

module.exports = sequelize;

// 测试
sequelize
  .authenticate()
  .then(() => {
    console.log("auth ok");
  })
  .catch(() => {
    console.log("auth err");
  });
```
