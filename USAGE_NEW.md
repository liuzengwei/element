# @liuzengwei/element-ui 配置指南

## 📋 路径问题说明

安装 `@liuzengwei/element-ui` 后可能遇到模块解析错误：

```
Module not found: Error: Can't resolve 'element-ui/src/utils/...'
```

**原因**：组件源码使用了 `element-ui/src/...` 路径，需要配置路径映射。

---

## ✅ 解决方案（选择其一）

### 🏆 方案 1：Webpack Alias（推荐）

**适用于：** Webpack / Vue CLI 项目  
**优点：** 无需额外插件，性能最优

#### Webpack 项目

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'element-ui/src': path.resolve(__dirname, 'node_modules/@liuzengwei/element-ui/lib')
    }
  }
}
```

#### Vue CLI 项目

```javascript
// vue.config.js
const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      'element-ui/src',
      path.resolve(__dirname, 'node_modules/@liuzengwei/element-ui/lib')
    );
  }
}
```

---

### ⚡ 方案 2：Vite 项目

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'element-ui/src': path.resolve(__dirname, 'node_modules/@liuzengwei/element-ui/lib')
    }
  }
})
```

---

### 🔧 方案 3：Babel Module Resolver

**适用于：** 纯 Babel 项目（无 Webpack）

#### 1. 安装依赖

```bash
npm install --save-dev babel-plugin-module-resolver
```

#### 2. 配置 Babel

```javascript
// babel.config.js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['module-resolver', {
      'alias': {
        'element-ui/src': '@liuzengwei/element-ui/lib'
      }
    }]
  ]
}
```

或 `.babelrc`:

```json
{
  "plugins": [
    ["module-resolver", {
      "alias": {
        "element-ui/src": "@liuzengwei/element-ui/lib"
      }
    }]
  ]
}
```

---

## 🎯 按需引入配置（可选）

### 使用 babel-plugin-component

```bash
npm install babel-plugin-component -D
```

```javascript
// babel.config.js
{
  "plugins": [
    ["component", {
      "libraryName": "@liuzengwei/element-ui",
      "styleLibraryName": "theme-chalk"
    }]
  ]
}
```

### 使用示例

```javascript
import { Button, Select } from '@liuzengwei/element-ui';
```

自动转换为：

```javascript
import Button from '@liuzengwei/element-ui/lib/button';
import '@liuzengwei/element-ui/lib/theme-chalk/button.css';
```

---

## 📦 完整引入

```javascript
import Vue from 'vue';
import ElementUI from '@liuzengwei/element-ui';
import '@liuzengwei/element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```

---

## 🛠️ 本地开发指南

如果你需要修改组件库并实时测试，无需频繁发布版本：

### 方法 1：npm link（推荐）

```bash
# 在组件库目录
cd /path/to/element
npm link

# 在你的项目目录
npm link @liuzengwei/element-ui

# 启动 watch 模式（组件库）
npm run dev:watch

# 启动项目（另一个终端）
npm run dev
```

### 方法 2：本地路径

```json
// package.json
{
  "dependencies": {
    "@liuzengwei/element-ui": "file:../element"
  }
}
```

### 方法 3：源码 Alias（仅开发）

```javascript
// webpack.config.js
resolve: {
  alias: {
    '@liuzengwei/element-ui': path.resolve(__dirname, '../element/src/index.js'),
    'element-ui/src': path.resolve(__dirname, '../element/src')
  }
}
```

更多详情见 [LOCAL_DEV.md](./LOCAL_DEV.md)

---

## ❓ 常见问题

### Q1: 为什么需要配置路径映射？

A: 组件源码保留了 `element-ui/src` 路径以便调试和查看源码。用户项目需要将这些路径映射到编译后的 `lib` 目录。

### Q2: 哪种方案最好？

A: 
- **Webpack/Vue CLI 项目**：推荐方案 1（Webpack Alias）
- **Vite 项目**：使用方案 2
- **纯 Babel 项目**：使用方案 3

### Q3: 可以不配置吗？

A: 目前需要配置。未来版本可能在构建时自动处理路径，届时将无需配置。

### Q4: 配置后仍然报错？

A: 
1. 检查路径是否正确
2. 清除缓存：`rm -rf node_modules/.cache`
3. 重启开发服务器

---

## 📚 相关文档

- [安装文档](./README.md)
- [本地开发指南](./LOCAL_DEV.md)
- [解决方案对比](./SOLUTIONS.md)

---

## 💬 技术支持

遇到问题？提交 [Issue](https://github.com/liuzengwei/element/issues)
