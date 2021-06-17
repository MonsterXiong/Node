# events

Node 中的核心 API 都是基于异步事件驱动的:

- 在这个体系中,某个对象(发射器(Emitters))发出某一个事件;
- 我们可以监听这个事件(监听器 Listeners),并且传入的回调函数,这个回调函数会在监听到事件时调用;

发出事件和监听事件都是通过 EventEmitter 类来完成的,他们都属于 events 对象.

- emitter.on(eventName,listener):监听事件,也可以使用 addListener;
- emitter.off(eventName,listener):移除事件监听,也可以使用 removeListener;
- emitter.emit(eventName[,...args]):发出事件,可以携带一些参数;

## events 的基础方法

```js
const EventEmitter = require("events");

// 1. 创建发射器
const emitter = new EventEmitter();

// 2. 监听某一个事件
// on:
// (出现得比较早)on alias addListener:
emitter.on("click", (params) => {
  console.log("click1", params);
});
const linstener = (params) => {
  console.log("click2", params);
};

emitter.on("click", linstener);

emitter.addListener("click", (params) => {
  console.log("click3", params);
});

// 3. 发出一个事件
setTimeout(() => {
  emitter.emit("click", { a: 1 });
  emitter.off("click", linstener);
  emitter.emit("click", { b: 1 });
}, 2000);
```

## events 获取信息

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("click", (params) => {
  console.log("click", params);
});

const listener = (params) => {
  console.log("click2", params);
};

emitter.on("click", listener);

emitter.on("add", (params) => {
  console.log("add", params);
});

emitter.on("tap", (params) => {
  console.log("tap", params);
});

// 1. 获取注册的事件
console.log(emitter.eventNames());

// 2. 获取函数个数
console.log(emitter.listenerCount("click"));

// 3.获取注册事件的函数
console.log(emitter.listeners("click"));
```

## events 不常用的方法

```js
// 只监听一次
emitter.once();
// 将本次监听放到最前面
emitter.prependListener();
//  放到最前面且只用一次
emitter.prependOnceListener();
// 不传参的话,移除所有监听器,传参的话,移除该类的所有监听器
emitter.removeAllListeners();
```
