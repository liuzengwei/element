# 本地开发快速测试指南

## 问题
每次修改代码都要发布新版本很麻烦，如何快速测试？

---

## 🚀 方案 1：npm link（推荐）

### 步骤 1：在组件库根目录创建全局链接
```powershell
cd e:\work\xn-element
npm link
```

### 步骤 2：在测试项目中链接组件库
```powershell
cd e:\work\xn-element\vue-test-project
npm link @liuzengwei/element-ui
```

### 步骤 3：修改代码后重新构建
```powershell
cd e:\work\xn-element
npm run dist
# 测试项目会自动使用最新构建
```

### 优点
- ✅ 无需发布版本
- ✅ 实时同步更新
- ✅ 可以同时在多个测试项目中使用

### 缺点
- ❌ 每次修改后需要重新构建
- ❌ 需要手动执行 npm run dist

### 解除链接
```powershell
# 测试项目中
cd vue-test-project
npm unlink @liuzengwei/element-ui
npm install

# 组件库中
cd e:\work\xn-element
npm unlink
```

---

## 🔥 方案 2：直接引用本地路径（最快）

### 修改测试项目的 package.json
```json
{
  "dependencies": {
    "@liuzengwei/element-ui": "file:../",
    "vue": "^2.6.14"
  }
}
```

### 重新安装
```powershell
cd vue-test-project
npm install
```

### 优点
- ✅ 最简单直接
- ✅ 修改后自动同步（某些情况）

### 缺点
- ❌ 仍需重新构建
- ❌ node_modules 会复制整个目录

---

## 🛠️ 方案 3：Webpack alias 直接指向源码（开发模式）

### 修改 vue-test-project/webpack.config.js
```javascript
resolve: {
  alias: {
    '@liuzengwei/element-ui': path.resolve(__dirname, '../src/index.js'),
    'element-ui/src': path.resolve(__dirname, '../src')
  }
}
```

### 优点
- ✅ **无需构建**，直接使用源码
- ✅ 修改立即生效（HMR）
- ✅ 最快的开发体验

### 缺点
- ❌ 仅用于开发环境
- ❌ 需要配置样式路径

---

## 🎯 方案 4：Watch 模式自动构建（最佳开发体验）

### 创建 watch 脚本

在 `package.json` 中添加：
```json
{
  "scripts": {
    "dev:watch": "webpack --config build/webpack.component.js --watch"
  }
}
```

### 使用方式
```powershell
# 终端 1：启动组件库 watch 模式
cd e:\work\xn-element
npm link
npm run dev:watch

# 终端 2：启动测试项目
cd vue-test-project
npm link @liuzengwei/element-ui
npm run dev
```

### 优点
- ✅ 修改后自动构建
- ✅ 无需手动执行构建命令
- ✅ 测试项目自动更新

---

## 📊 方案对比

| 方案 | 速度 | 配置复杂度 | 推荐场景 |
|------|------|------------|----------|
| npm link | ⭐⭐⭐ | ⭐⭐ | 常规开发 |
| 本地路径 | ⭐⭐⭐ | ⭐ | 快速测试 |
| Webpack alias | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 源码调试 |
| Watch 模式 | ⭐⭐⭐⭐ | ⭐⭐⭐ | **推荐** |

---

## 🎖️ 推荐工作流

### 日常开发
```powershell
# 一次性设置
cd e:\work\xn-element
npm link

cd vue-test-project
npm link @liuzengwei/element-ui

# 开发时（开两个终端）
# 终端 1
npm run dev:watch  # 自动构建

# 终端 2
cd vue-test-project
npm run dev  # 测试项目
```

### 发布前测试
```powershell
# 完整构建
npm run dist

# 测试项目验证
cd vue-test-project
npm run build
```

### 正式发布
```powershell
# 确认版本号
npm version patch  # 或 minor/major

# 发布
npm publish --access public
```

---

## 🔧 快捷命令脚本

### 创建 dev-link.sh (PowerShell)
```powershell
# dev-link.ps1
Write-Host "Setting up dev environment..." -ForegroundColor Green

# Link 组件库
Set-Location "e:\work\xn-element"
npm link

# Link 到测试项目
Set-Location "e:\work\xn-element\vue-test-project"
npm link "@liuzengwei/element-ui"

Write-Host "✓ Dev environment ready!" -ForegroundColor Green
```

### 使用
```powershell
.\dev-link.ps1
```
