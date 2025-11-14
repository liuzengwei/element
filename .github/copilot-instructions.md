# Element UI 开发指南 (AI Coding Agent Instructions)

## 项目概述
Element UI 是基于 Vue 2.x 的组件库。这是一个 **组件驱动** 的项目，包含 90+ UI 组件，每个组件独立开发、打包和测试。

## 核心架构

### 单组件结构模式
每个组件遵循标准化目录结构（参考 `packages/button/`）：
```
packages/<component-name>/
  ├── index.js           # 组件入口，导出并添加 install 方法
  └── src/
      └── <main>.vue     # 组件实现（可能有多个子组件）
```

### 关键文件的作用
- **`components.json`**: 组件注册表，定义所有组件的入口路径
- **`src/index.js`**: 自动生成的主入口文件（由 `build/bin/build-entry.js` 生成）
- **`packages/theme-chalk/src/`**: SCSS 样式源文件，每个组件对应一个 `.scss` 文件
- **`build/bin/new.js`**: 组件脚手架生成器，创建新组件的所有必需文件

## 开发工作流

### 创建新组件（使用 Make）
```bash
make new <component-name> [中文名]
# 示例: make new button 按钮
```
这会自动创建：
- 组件包结构 (`packages/<name>/`)
- 样式文件 (`packages/theme-chalk/src/<name>.scss`)
- 测试文件 (`test/unit/specs/<name>.spec.js`)
- 多语言文档 (`examples/docs/{zh-CN,en-US,es,fr-FR}/<name>.md`)
- TypeScript 类型定义 (`types/<name>.d.ts`)
- 更新 `components.json` 和 `nav.config.json`

### 核心开发命令
```bash
npm run dev              # 启动开发服务器 (http://localhost:8085)
npm run dev:play         # 快速开发模式，编辑 examples/play/index.vue
npm run build:file       # 生成入口文件、i18n、版本等
npm run build:theme      # 编译 SCSS → CSS
npm run dist             # 完整打包（清理 + 构建所有目标）
npm run test             # 运行 Karma 单元测试
```

### 构建系统说明
- **多目标打包**: `webpack.conf.js` (UMD), `webpack.common.js` (CommonJS), `webpack.component.js` (按需加载)
- **样式编译**: Gulp 处理 SCSS → CSS (autoprefixer + cssmin)
- **自动生成**: 每次构建前必须运行 `npm run build:file` 更新 `src/index.js`

## 编码规范

### 组件命名约定
- **组件名**: `ElXxx` (PascalCase with 'El' prefix)，例如 `ElButton`
- **文件名**: `<component-name>` (kebab-case)，例如 `button`
- **样式类**: `.el-<component-name>` (BEM 风格)，例如 `.el-button`

### 组件间通信模式
1. **Provide/Inject 模式**: 
   - Form 组件通过 `provide` 向下传递 `elForm` 实例
   - 子组件通过 `inject: { elForm: { default: '' } }` 接收
   - 示例见 `packages/form/src/form.vue` 和 `packages/button/src/button.vue`

2. **Emitter Mixin 模式**:
   - 使用 `src/mixins/emitter.js` 的 `dispatch` 和 `broadcast` 方法
   - `dispatch(componentName, eventName, params)`: 向上查找父组件并触发事件
   - `broadcast(componentName, eventName, params)`: 向下递归触发子组件事件
   - 用于跨越多层级的组件通信，无需逐层传递事件

3. **ComponentName 标识符**:
   - 组件必须设置 `componentName` 选项（用于 dispatch/broadcast 定位）
   - 示例: `componentName: 'ElFormItem'`

### 国际化 (i18n)
- 使用 `src/locale/t` 方法翻译文本: `this.t('el.table.emptyText')`
- 支持 vue-i18n 集成: `Vue.use(Element, { i18n: (key, value) => i18n.t(key, value) })`
- 语言包位于 `src/locale/lang/`

### 样式开发
- 使用 BEM 命名规范的 Mixins: `@include b(button) { ... }`
- 主题变量定义在 `packages/theme-chalk/src/common/var.scss`
- 新增组件样式必须在 `packages/theme-chalk/src/index.scss` 中 `@import`

## 测试规范
- 框架: Mocha + Chai + Sinon
- 测试工具: `test/unit/util.js` 提供 `createTest`, `destroyVM`, `createVue` 等辅助函数
- 测试文件命名: `test/unit/specs/<component-name>.spec.js`
- 基本测试模板: 参考 `build/bin/new.js` 自动生成的测试代码

## 兼容性要求
- **Vue 版本**: 2.5.17+（peerDependencies）
- **浏览器**: IE 10+ 及现代浏览器
- **Babel 配置**: 仅使用 `preset-2015`，避免 ES2015+ API（如 `Array.find`、`Object.assign`），需要时引入 polyfill

## 代码提交规范
- **格式**: `[组件名]: 描述信息`，例如 `Button: fix disabled state bug`
- **目标分支**: 提交 PR 到 `dev` 分支（不是 `master`）
- **禁止提交**: `lib/` 目录下的构建产物
- **依赖管理**: 使用 `yarn` 而非 `npm install`

## 关键依赖说明
- `async-validator`: 表单验证引擎
- `normalize-wheel`: 滚轮事件标准化
- `resize-observer-polyfill`: 监听元素尺寸变化
- `throttle-debounce`: 防抖/节流工具

## 快速定位
- 组件入口: 查看 `components.json`
- 样式源码: `packages/theme-chalk/src/`
- 工具函数: `src/utils/`
- 构建脚本: `build/bin/`
- 示例代码: `examples/docs/zh-CN/`
