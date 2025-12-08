# Element UI 路径问题解决方案

## 问题背景

packages 目录中的源码使用 `element-ui/src/...` 导入路径，在用户项目的 node_modules 中无法解析。

## 解决方案对比

### 方案 1：用户配置 Babel Module Resolver（当前方案）

**配置位置**：用户项目的 `babel.config.js`

```javascript
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

**优点**：
- ✅ 保留源码结构不变
- ✅ 用户可调试源码

**缺点**：
- ❌ 需要用户额外配置
- ❌ 需要安装 `babel-plugin-module-resolver`

---

### 方案 2：用户配置 Webpack Alias（推荐）

**配置位置**：用户项目的 `webpack.config.js`

```javascript
module.exports = {
  resolve: {
    alias: {
      'element-ui/src': path.resolve(__dirname, 'node_modules/@liuzengwei/element-ui/lib')
    }
  }
}
```

**优点**：
- ✅ 不需要额外插件
- ✅ Webpack 原生支持
- ✅ 性能更好

**缺点**：
- ❌ 仅适用于 Webpack 项目
- ❌ 需要用户配置

---

### 方案 3：构建时修复源码路径（最优方案）

**实施方式**：在组件库构建流程中自动替换

#### 步骤 1：添加路径修复脚本

已创建 `build/bin/fix-package-imports.js`

#### 步骤 2：修改 package.json

```json
{
  "scripts": {
    "build:utils": "node build/bin/fix-package-imports.js",
    "dist": "npm run clean && npm run build:file && npm run build:utils && npm run lint && webpack --config build/webpack.conf.js && webpack --config build/webpack.common.js && webpack --config build/webpack.component.js && npm run build:theme"
  }
}
```

**替换逻辑**：

```javascript
// 原始代码
import emitter from 'element-ui/src/mixins/emitter';

// 替换后（相对路径）
import emitter from '../../lib/mixins/emitter';
```

**优点**：
- ✅ 用户无需任何配置
- ✅ 开箱即用
- ✅ 完全兼容所有构建工具

**缺点**：
- ❌ 修改了 packages 源码
- ❌ 需要在构建流程中执行

---

### 方案 4：发布时只包含编译产物（激进方案）

**修改 package.json**：

```json
{
  "files": [
    "lib",
    "types",
    "web-types.json"
  ]
}
```

不发布 `packages` 和 `src` 目录。

**优点**：
- ✅ 用户无需配置
- ✅ 包体积更小

**缺点**：
- ❌ 用户无法查看源码
- ❌ 调试困难
- ❌ 失去 TypeScript 类型推断能力

---

## 推荐方案选择

### 短期方案（当前）
- **方案 1 + 方案 2**：在文档中说明两种用户配置方式

### 长期方案（推荐）
- **方案 3**：在构建流程中自动修复路径
  - 执行 `npm run build:utils` 自动替换所有 `element-ui/src` 为相对路径
  - 用户无需任何配置即可使用

### 实施建议

1. **立即**：更新 USAGE.md，添加 Webpack alias 配置方案
2. **下一版本**：集成方案 3 到构建流程
3. **废弃**：逐步移除对用户配置的依赖

---

## 测试验证

### Webpack 项目
```javascript
// webpack.config.js
resolve: {
  alias: {
    'element-ui/src': '@liuzengwei/element-ui/lib'
  }
}
```

### Vite 项目
```javascript
// vite.config.js
resolve: {
  alias: {
    'element-ui/src': '@liuzengwei/element-ui/lib'
  }
}
```

### Babel 项目（无 Webpack）
```javascript
// babel.config.js
plugins: [
  ['module-resolver', {
    'alias': {
      'element-ui/src': '@liuzengwei/element-ui/lib'
    }
  }]
]
```
