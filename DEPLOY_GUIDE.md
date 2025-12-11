# GitHub Pages 部署指南

本项目支持部署文档站点到 GitHub Pages。

## 仓库配置

- **仓库地址**: https://github.com/liuzengwei/element
- **GitHub Pages 地址**: https://liuzengwei.github.io/element/

## 部署方式

### 1. 自动部署（推荐）

使用 GitHub Actions 自动部署：

1. **确保 GitHub Actions 已启用**
   - 进入仓库的 Settings > Actions > General
   - 确保 "Allow all actions and reusable workflows" 已选中

2. **配置 GitHub Pages**
   - 进入仓库的 Settings > Pages
   - Source 选择: `Deploy from a branch`
   - Branch 选择: `gh-pages` / `(root)`
   - 点击 Save

3. **触发部署**
   - 推送代码到 `master` 分支
   - 或者推送标签（如 `v2.15.5`）
   - GitHub Actions 会自动构建并部署

### 2. 手动部署

#### Windows 用户

```bash
# 方式1: 使用 npm 脚本
npm run deploy:gh-pages

# 方式2: 直接运行批处理文件
.\build\deploy-gh-pages.bat
```

#### Linux/Mac 用户

```bash
# 方式1: 使用 npm 脚本
npm run deploy:gh-pages

# 方式2: 直接运行 shell 脚本
bash build/deploy-gh-pages.sh

# 如果没有执行权限，先添加权限
chmod +x build/deploy-gh-pages.sh
```

### 3. Travis CI 部署（需要配置 Token）

如果使用 Travis CI，需要配置环境变量：

1. 在 GitHub 生成 Personal Access Token
   - 进入 Settings > Developer settings > Personal access tokens
   - 生成 token，权限选择 `repo`

2. 在 Travis CI 配置环境变量
   - 添加环境变量 `ROT_TOKEN`，值为上面生成的 token

3. 推送代码或标签触发 Travis CI 构建

## 部署流程说明

### 构建步骤

1. **生成文件**: `npm run build:file`
   - 生成组件入口文件
   - 生成国际化文件
   - 生成版本文件

2. **构建文档**: `NODE_ENV=production webpack --config build/webpack.demo.js`
   - 编译文档站点
   - 输出到 `examples/element-ui/` 目录

3. **推送到 gh-pages 分支**
   - 初始化 git 仓库（如需要）
   - 提交所有文件
   - 强制推送到 `gh-pages` 分支

### 目录结构

```
examples/element-ui/          # 构建输出目录
├── index.html                # 文档首页
├── *.js                      # JavaScript 文件
├── *.css                     # CSS 文件
└── static/                   # 静态资源
```

## 相关文件说明

- `.github/workflows/deploy.yml` - GitHub Actions 自动部署配置
- `build/deploy-gh-pages.sh` - Linux/Mac 部署脚本
- `build/deploy-gh-pages.bat` - Windows 部署脚本
- `build/deploy-ci.sh` - Travis CI 部署脚本
- `build/deploy-faas.sh` - FaaS 平台部署脚本（可选）

## 常见问题

### 1. 部署后无法访问

- 检查 GitHub Pages 设置是否正确
- 确认 `gh-pages` 分支已创建并有内容
- 等待几分钟，GitHub Pages 需要时间构建

### 2. 样式或资源加载失败

- 检查 `publicPath` 配置
- 如果使用自定义域名，需要在 `examples/element-ui/` 添加 `CNAME` 文件

### 3. 自动部署失败

- 查看 GitHub Actions 日志
- 确认依赖安装成功
- 检查构建命令是否正确

### 4. 手动部署 Git 推送失败

- 确认有仓库的写权限
- 检查 SSH 密钥或 HTTPS 凭证是否配置正确
- 尝试使用 HTTPS 方式：修改脚本中的 `git@github.com:` 为 `https://github.com/`

## 自定义域名（可选）

如果要使用自定义域名：

1. 在域名注册商处添加 CNAME 记录
   - 记录类型: CNAME
   - 主机记录: www (或其他子域名)
   - 记录值: liuzengwei.github.io

2. 在 `package.json` 的 `deploy:build` 脚本添加 CNAME 文件生成：
   ```json
   "deploy:build": "npm run build:file && cross-env NODE_ENV=production webpack --config build/webpack.demo.js && echo your-domain.com>>examples/element-ui/CNAME"
   ```

3. 在 GitHub Pages 设置中添加自定义域名

## 开发模式

开发时无需部署，可以使用本地开发服务器：

```bash
# 启动开发服务器
npm run dev

# 或者使用 play 模式快速开发
npm run dev:play
```

访问 http://localhost:8085 查看效果。
