# NPM Scripts 命令说明文档

本文档详细说明了 `package.json` 中定义的所有 npm scripts 命令及其用途。

## 📦 依赖管理

### `npm run bootstrap`
**命令**: `yarn || npm i`

**用途**: 安装项目所有依赖包

**说明**: 优先使用 yarn 安装，如果 yarn 不可用则使用 npm install

---

## 🔨 构建命令

### `npm run build:file`
**命令**: `node build/bin/iconInit.js & node build/bin/build-entry.js & node build/bin/i18n.js & node build/bin/version.js`

**用途**: 生成项目必需的自动生成文件

**说明**: 并行执行以下任务：
- `iconInit.js`: 初始化图标文件
- `build-entry.js`: 生成入口文件 `src/index.js`
- `i18n.js`: 生成国际化相关文件
- `version.js`: 生成版本信息文件

**注意**: 每次构建前必须运行此命令

### `npm run build:theme`
**命令**: `node build/bin/gen-cssfile && gulp build --gulpfile packages/theme-chalk/gulpfile.js && cp-cli packages/theme-chalk/lib lib/theme-chalk`

**用途**: 编译主题样式文件

**说明**: 
1. 生成 CSS 文件列表
2. 使用 Gulp 编译 SCSS → CSS (包含 autoprefixer 和 cssmin)
3. 将编译后的主题文件复制到 `lib/theme-chalk/`

### `npm run build:utils`
**命令**: `cross-env BABEL_ENV=utils babel src --out-dir lib --ignore src/index.js`

**用途**: 编译工具函数

**说明**: 使用 Babel 将 `src/` 下的工具函数编译到 `lib/` 目录（排除 `src/index.js`）

### `npm run build:umd`
**命令**: `node build/bin/build-locale.js`

**用途**: 构建 UMD 格式的国际化语言包

**说明**: 生成可在浏览器直接使用的多语言包

### `npm run dist`
**命令**: `npm run clean && npm run build:file && webpack --config build/webpack.conf.js && webpack --config build/webpack.common.js && webpack --config build/webpack.component.js && npm run build:utils && npm run build:umd && npm run build:theme`

**用途**: 完整的生产环境打包

**说明**: 执行完整的构建流程：
1. 清理旧的构建文件
2. 生成必需文件
3. Webpack UMD 打包
4. Webpack CommonJS 打包
5. Webpack 按组件打包
6. 编译工具函数
7. 构建国际化包
8. 编译主题样式

**输出**: `lib/` 目录下的所有发布文件

---

## 🧹 清理命令

### `npm run clean`
**命令**: `rimraf lib && rimraf packages/*/lib && rimraf test/**/coverage`

**用途**: 清理构建产物和测试覆盖率报告

**说明**: 删除以下目录：
- `lib/`: 主构建输出目录
- `packages/*/lib`: 各组件的构建输出
- `test/**/coverage`: 测试覆盖率报告

---

## 🚀 开发命令

### `npm run dev`
**命令**: `npm run bootstrap && npm run build:file && cross-env NODE_ENV=development webpack-dev-server --config build/webpack.demo.js & node build/bin/template.js`

**用途**: 启动完整的开发服务器

**说明**: 
- 安装依赖 → 生成文件 → 启动开发服务器
- 启动示例文档网站（访问 http://localhost:8085）
- 同时运行模板监听服务
- 支持热更新

**适用场景**: 开发组件并查看文档示例

### `npm run dev:play`
**命令**: `npm run build:file && cross-env NODE_ENV=development PLAY_ENV=true webpack-dev-server --config build/webpack.demo.js`

**用途**: 快速开发模式（Playground）

**说明**: 
- 启动简化的开发服务器
- 编辑 `examples/play/index.vue` 快速测试组件
- 无需完整文档，启动更快

**适用场景**: 快速测试和调试单个组件

### `npm run dev:watch`
**命令**: `npm run build:file && webpack --config build/webpack.component.js --watch`

**用途**: 监听组件变化并自动重新构建

**说明**: 以组件形式打包，文件变化时自动重新编译

### `npm run dev:extension`
**命令**: `rimraf examples/extension/dist && cross-env NODE_ENV=development webpack --watch --config build/webpack.extension.js`

**用途**: 开发浏览器扩展（Chrome Extension）

**说明**: 清理并监听浏览器扩展代码的变化

---

## 🌐 部署命令

### `npm run deploy:build`
**命令**: `npm run build:file && cross-env NODE_ENV=production webpack --config build/webpack.demo.js && echo element.eleme.io>>examples/element-ui/CNAME`

**用途**: 构建文档站点用于部署

**说明**: 
- 生成生产环境的文档网站
- 添加 CNAME 文件（用于 GitHub Pages 自定义域名）

### `npm run deploy:extension`
**命令**: `cross-env NODE_ENV=production webpack --config build/webpack.extension.js`

**用途**: 构建生产环境的浏览器扩展

---

## 🧪 测试命令

### `npm run test`
**命令**: `npm run lint && npm run build:theme && cross-env CI_ENV=/dev/ BABEL_ENV=test karma start test/unit/karma.conf.js --single-run`

**用途**: 运行完整的单元测试（一次性）

**说明**: 
- 先执行代码检查
- 编译主题样式
- 使用 Karma + Mocha + Chai 运行测试
- 适用于 CI/CD 环境

**测试框架**: Mocha + Chai + Sinon

### `npm run test:watch`
**命令**: `npm run build:theme && cross-env BABEL_ENV=test karma start test/unit/karma.conf.js`

**用途**: 监听模式运行测试

**说明**: 文件变化时自动重新运行测试，适合开发时使用

---

## 🔍 代码质量

### `npm run lint`
**命令**: `eslint src/**/* test/**/* packages/**/* build/**/* --quiet`

**用途**: 检查代码风格和语法错误

**说明**: 
- 使用 ESLint 检查所有源代码
- `--quiet` 仅显示错误，不显示警告

**检查范围**: `src/`, `test/`, `packages/`, `build/`

---

## 🌍 国际化

### `npm run i18n`
**命令**: `node build/bin/i18n.js`

**用途**: 单独生成国际化相关文件

**说明**: 生成多语言翻译文件，通常由 `build:file` 自动调用

---

## 📤 发布命令

### `npm run pub`
**命令**: `npm run bootstrap && sh build/git-release.sh && sh build/release.sh`

**用途**: 发布新版本到 npm

**说明**: 
1. 安装依赖
2. 执行 Git 发布流程（创建 tag、推送代码）
3. 执行 npm 发布流程

**注意**: 
- 仅维护者使用
- 需要有 npm 发布权限
- 会自动处理版本号、changelog、Git tag 等

---

## 📋 命令使用频率参考

### 高频使用
- `npm run dev` - 日常开发
- `npm run dev:play` - 快速测试
- `npm run build:file` - 修改组件后
- `npm run test` - 提交代码前

### 中频使用
- `npm run build:theme` - 修改样式后
- `npm run lint` - 代码检查
- `npm run clean` - 清理构建产物

### 低频使用
- `npm run dist` - 发布前完整构建
- `npm run pub` - 发布版本
- `npm run deploy:build` - 部署文档

---

## 🔧 常见开发场景

### 场景 1：开发新组件
```bash
# 1. 使用 Make 创建组件
make new button 按钮

# 2. 启动开发服务器
npm run dev:play

# 3. 编辑 examples/play/index.vue 测试组件
```

### 场景 2：修改现有组件
```bash
# 1. 启动开发服务器
npm run dev

# 2. 修改组件代码
# 3. 浏览器自动刷新查看效果
```

### 场景 3：修改主题样式
```bash
# 1. 编辑 packages/theme-chalk/src/*.scss
# 2. 重新编译主题
npm run build:theme

# 3. 如果开发服务器已启动，刷新浏览器
```

### 场景 4：提交代码前
```bash
# 1. 代码检查
npm run lint

# 2. 运行测试
npm run test

# 3. 提交代码
git add .
git commit -m "Button: fix disabled state bug"
```

### 场景 5：发布新版本
```bash
# 1. 更新版本号（package.json）
# 2. 更新 CHANGELOG
# 3. 运行发布命令
npm run pub
```

---

## ⚙️ 环境变量说明

| 变量 | 值 | 用途 |
|------|-----|------|
| `NODE_ENV` | `development` / `production` | 区分开发/生产环境 |
| `BABEL_ENV` | `utils` / `test` | 指定 Babel 配置 |
| `PLAY_ENV` | `true` | 启用 Playground 模式 |
| `CI_ENV` | `/dev/` | CI 环境标识 |

---

## 📚 相关文档

- [开发指南](/.github/copilot-instructions.md) - 详细的组件开发规范
- [发布流程](PUBLISH.md) - 版本发布说明
- [测试报告](TEST_REPORT.md) - 测试相关文档
- [常见问题](FAQ.md) - 常见问题解答

---

## 🛠️ 工具链

- **包管理器**: Yarn (推荐) / npm
- **构建工具**: Webpack 4.x
- **样式编译**: Gulp + node-sass
- **代码检查**: ESLint
- **测试框架**: Karma + Mocha + Chai + Sinon
- **Babel 版本**: babel 6.x (preset-2015)

---

**最后更新**: 2025年12月9日
