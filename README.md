

koa自动加载路由

## Installation

```sh
$ npm install koa-autoload-router
```

## Use with koa

```js
var app = require('koa')();
var koaAutoloadRouter = require('koa-autoload-router');
app.use(koaAutoloadRouter(app, {
    root: './app/controller',
    suffix: '.js',
    prefix: '/v1'
}));

```
作者官网:
http://www.wemallshop.com