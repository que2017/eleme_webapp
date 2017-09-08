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

## 项目结构

``` bash
.
├── build/                      # webpack 配置文件
│   └── ...
├── config/
│   ├── index.js                # main project 配置
│   └── ...
├── resource/
│   └── _MACOSX/
│   │   └── resource/
│   │       ├── 标注/
│   │       ├── img/
|   |       └── ._.DS_Store
│   └── resource/               # 项目相关的图片
│       ├── 标注/
│       ├── img/                # 项目图片
│       ├── PSD/                # PSD图
│       └── SVG/                # SVG图
├── src/
│   ├── main.js                 # app入口文件
│   ├── App.vue                 # main app 组件
│   ├── components/
|   |   ├── goods/              # goods components
|   |   ├── header/             # header components
|   |   ├── ratings/            # ratings components
│   │   └── seller/             # seller components
│   └── common/
|   |   ├── fonts/              # 字体图标库
│   |   └── stylus/             # 组件样式
│   └── router/                 # 路由配置
├── static/                     # pure static assets (directly copied)
├── .babelrc                    # babel config
├── .postcssrc.js               # postcss config
├── .eslintrc.js                # eslint config
├── .editorconfig               # editor config
├── index.html                  # index.html template
├── data.json                   # 模拟后台数据
└── package.json                # build scripts and dependencies
```

## 项目开发中遇到的问题

### 1. stylus文件引入报错
原因是base.style文件空格错误，在vue2.0中不需要在webpack.base.config.js文件中写入配置css和styl文件的loader代码，该配置在utils.js文件中已写好
### 2. vue过渡js钩子函数配合css实现
vue过渡的js钩子函数可以自己实现过渡，一般要引入其他动画插件，动画插件在enter函数调用。如果要用js钩子函数配合css实现，写法如下：
（1）在beforeEnter函数设置过渡元素的初始状态
（2）在enter函数设置过渡元素的最终状态，当执行enter函数时触发transition
（3）在css的.v-enter-active 设置transition属性

