# vue.js 仿饿了么webapp

> sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

1. stylus文件引入报错是因为base.style文件空格错误，在vue2.0中不需要在webpack.base.config.js文件中写入配置css和styl文件的loader代码