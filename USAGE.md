# @liuzengwei/element-ui 使用指南

## 问题说明

如果在项目中安装 `@liuzengwei/element-ui` 后遇到以下错误：

```
Module not found: Error: Can't resolve 'element-ui/src/utils/...'
```

这是因为组件库的源码（`packages/` 目录）中使用了 `element-ui/src/...` 的导入路径，需要在您的项目中配置路径映射。

## 解决方案

### 方案1：使用 babel-plugin-module-resolver（推荐）

1. 安装依赖：

```bash
npm install --save-dev babel-plugin-module-resolver
```

2. 在项目根目录的 `babel.config.js` 或 `.babelrc` 中添加配置：

```javascript
// babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['module-resolver', {
      'alias': {
        'element-ui/src': '@liuzengwei/element-ui/lib'
      }
    }]
  ]
}
```

或者在 `.babelrc` 中：

```json
{
  "presets": ["@vue/cli-plugin-babel/preset"],
  "plugins": [
    ["module-resolver", {
      "alias": {
        "element-ui/src": "@liuzengwei/element-ui/lib"
      }
    }]
  ]
}
```

### 方案2：使用 Webpack alias

如果您的项目使用 webpack，可以在 `webpack.config.js` 或 `vue.config.js` 中配置：

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'element-ui/src': '@liuzengwei/element-ui/lib'
    }
  }
}
```

或者在 Vue CLI 项目的 `vue.config.js` 中：

```javascript
// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'element-ui/src': require('path').resolve(__dirname, 'node_modules/@liuzengwei/element-ui/lib')
      }
    }
  }
}
```

### 方案3：只使用编译后的文件（最简单）

如果不需要访问源码，可以确保只导入编译后的文件：

```javascript
// 完整引入
import ElementUI from '@liuzengwei/element-ui'
import '@liuzengwei/element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

```javascript
// 按需引入
import { Button, Select } from '@liuzengwei/element-ui'
import '@liuzengwei/element-ui/lib/theme-chalk/button.css'
import '@liuzengwei/element-ui/lib/theme-chalk/select.css'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
```

## 完整示例配置

### Vue CLI 项目配置示例

**package.json**:
```json
{
  "dependencies": {
    "@liuzengwei/element-ui": "^2.15.5-xn.11",
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^5.0.8",
    "babel-plugin-module-resolver": "^5.0.0"
  }
}
```

**babel.config.js**:
```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['module-resolver', {
      'alias': {
        'element-ui/src': '@liuzengwei/element-ui/lib'
      }
    }]
  ]
}
```

**main.js**:
```javascript
import Vue from 'vue'
import ElementUI from '@liuzengwei/element-ui'
import '@liuzengwei/element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 自定义 Webpack 项目配置示例

**package.json**:
```json
{
  "dependencies": {
    "@liuzengwei/element-ui": "^2.15.5-xn.11",
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "babel-plugin-module-resolver": "^5.0.0",
    "webpack": "^5.89.0",
    "vue-loader": "^15.10.1"
  }
}
```

**webpack.config.js**:
```javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'element-ui/src': path.resolve(__dirname, 'node_modules/@liuzengwei/element-ui/lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
```

**babel.config.js**:
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false
    }]
  ],
  plugins: [
    ['module-resolver', {
      'alias': {
        'element-ui/src': '@liuzengwei/element-ui/lib'
      }
    }]
  ]
}
```

## 为什么需要这个配置？

`@liuzengwei/element-ui` 的组件源码中使用了如下导入方式：

```javascript
import { on, off } from 'element-ui/src/utils/dom';
```

这种路径在组件库内部开发时通过 webpack alias 和 babel 配置可以正确解析，但在用户项目中需要映射到实际的编译后文件路径：

```
element-ui/src/utils/dom → @liuzengwei/element-ui/lib/utils/dom
```

## 按需引入配置（可选）

如果需要按需引入以减小打包体积，推荐使用 `babel-plugin-component`：

1. 安装依赖：

```bash
npm install --save-dev babel-plugin-component
```

2. 配置 babel：

```javascript
// babel.config.js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['module-resolver', {
      'alias': {
        'element-ui/src': '@liuzengwei/element-ui/lib'
      }
    }],
    ['component', {
      'libraryName': 'element-ui',
      'styleLibraryName': 'theme-chalk'
    }]
  ]
}
```

3. 使用：

```javascript
import { Button, Select } from '@liuzengwei/element-ui'
// 样式会自动引入
```

## 常见问题

### Q: 为什么不在组件库内部就解决这个问题？

A: 这是历史遗留问题，Element UI 原始设计就是这样。如果要彻底解决，需要：
- 将所有源码中的 `element-ui/src/...` 改为相对路径
- 或者在构建时通过 babel 插件转换路径

但这样会导致与原 Element UI 不兼容，影响现有用户。

### Q: 能否只发布编译后的文件？

A: 可以，但会失去以下功能：
- 用户无法查看源码进行调试
- 无法支持某些高级按需引入场景
- 失去 TypeScript 类型提示中的源码跳转

## 推荐配置模板

对于大多数项目，推荐使用以下最小化配置：

```bash
npm install --save-dev babel-plugin-module-resolver
```

```javascript
// babel.config.js
module.exports = {
  plugins: [
    ['module-resolver', {
      'alias': {
        'element-ui/src': '@liuzengwei/element-ui/lib'
      }
    }]
  ]
}
```

这样就可以正常使用所有功能了！
