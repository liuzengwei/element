# 发布流程说明

## 📋 当前发布流程概述

项目包含自动化发布脚本 `npm run pub`，但该脚本依赖 bash 环境和特定的分支结构。

---

## 🔄 官方发布流程（基于 bash 脚本）

### 前置要求
- 需要 `dev` 和 `master` 两个分支
- 需要 bash 环境（Linux/Mac 或 Windows Git Bash）
- 工作区必须干净（无未提交的更改）
- 本地分支需要与远程同步

### 执行命令
```bash
npm run pub
```

### 流程步骤详解

#### 1. **git-release.sh** - Git 状态检查
```bash
# 切换到 dev 分支
git checkout dev

# 检查工作区是否干净
# 如果有未提交的更改，脚本会退出

# 检查远程分支
# 确保本地分支与远程同步
git fetch

# 检查是否有未 pull 的远程更改
# 如果远程有新提交，脚本会退出
```

#### 2. **release.sh** - 构建与发布
```bash
# 1. 切换到 master 分支并合并 dev
git checkout master
git merge dev

# 2. 选择版本号（交互式）
VERSION=`npx select-version-cli`
# 会提示选择版本类型：patch/minor/major/prerelease

# 3. 确认发布
read -p "Releasing $VERSION - are you sure? (y/n)"

# 4. 构建项目
VERSION=$VERSION npm run dist

# 5. SSR 测试
node test/ssr/require.test.js

# 6. 提交构建产物
git add -A
git commit -m "[build] $VERSION"

# 7. 更新 package.json 版本号
node -e "const fs=require('fs'); const pkg=JSON.parse(fs.readFileSync('package.json')); pkg.version='$VERSION'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');"
git add package.json
git commit -m "[release] $VERSION"

# 8. 推送到远程仓库
git push origin master
git push origin refs/tags/v$VERSION

# 9. 同步回 dev 分支
git checkout dev
git rebase master
git push origin dev

# 10. 发布到 npm（带 --access public 用于 scoped package）
# 如果是 beta 版本
npm publish --tag beta --access public
# 如果是正式版本
npm publish --access public
```

---

## 🪟 Windows PowerShell 手动发布流程（推荐）

由于项目使用了 bash 脚本，在 Windows 环境下建议使用以下手动流程：

### 步骤 1: 检查状态
```powershell
# 确保工作区干净
git status

# 确保已同步远程更改
git pull
```

### 步骤 2: 更新版本号
```powershell
# 自动升级版本号（选择一种）
npm version patch     # 2.15.5-xn.8 -> 2.15.5-xn.9
npm version minor     # 2.15.5-xn.8 -> 2.15.6-xn.0
npm version major     # 2.15.5-xn.8 -> 2.16.0-xn.0

# 或手动指定版本号
npm version 2.15.5-xn.9 --no-git-tag-version
```

### 步骤 3: 构建项目
```powershell
npm run dist
```

### 步骤 4: 提交更改
```powershell
# 查看版本号
$version = (Get-Content package.json | ConvertFrom-Json).version

# 提交
git add -A
git commit -m "[release] $version"
git tag "v$version"
```

### 步骤 5: 推送到 GitHub
```powershell
git push origin master
git push origin --tags
```

### 步骤 6: 发布到 npm
```powershell
# 发布正式版本（必须加 --access public，因为是 scoped package）
npm publish --access public

# 或发布 beta 版本
npm publish --tag beta --access public
```

---

## 📝 版本号规则

当前版本格式：`2.15.5-xn.8`

- `2.15.5` - 基于的 Element UI 版本
- `xn` - 定制版本标识
- `8` - 定制版本的迭代次数

### 版本升级建议：
- **补丁更新**（bug 修复）：`2.15.5-xn.9`
- **小版本更新**（新功能）：`2.15.6-xn.0` 或 `2.15.5-xn-1.0.0`
- **跟随官方版本**：`2.15.6-xn.1`

---

## ⚠️ 注意事项

### 发布前检查清单
- [ ] 确保 `npm run dist` 构建成功
- [ ] 确保测试通过 `npm run test`（如有）
- [ ] 确认版本号符合规范
- [ ] 确认 CHANGELOG 已更新（如需要）
- [ ] 确认所有代码已提交到 Git

### npm 发布权限
- 确保已登录 npm：`npm whoami`
- 如未登录，执行：`npm login`
- 确保有 `@liuzengwei` scope 的发布权限

### 发布后验证
```powershell
# 检查发布是否成功
npm view @liuzengwei/element-ui version

# 在测试项目中安装验证
npm install @liuzengwei/element-ui@latest
```

---

## � NPM 双因素认证 (2FA) 配置

### 问题：403 Forbidden - 需要双因素认证

如果遇到以下错误：
```
npm ERR! 403 403 Forbidden - Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

这是因为 npm 要求启用双因素认证来发布包。

### 解决方案 1：启用 2FA 并使用 OTP（推荐）

#### 1. 启用双因素认证
1. 访问 npm 账号设置: https://www.npmjs.com/settings/YOUR_USERNAME/twofa
2. 点击 "Enable Two-Factor Authentication"
3. 选择 "Authorization and Publishing"（发布时需要验证）
4. 使用 Authenticator 应用（如 Google Authenticator）扫描二维码
5. 输入验证码完成设置

#### 2. 发布时使用 OTP
```bash
# 设置 OTP 环境变量（从 Authenticator 应用获取）
export NPM_OTP=123456

# 运行发布脚本
npm run pub
```

或手动发布：
```bash
npm publish --otp=123456 --access public
```

**注意**: OTP 代码每 30 秒更新一次，需要使用最新的代码。

### 解决方案 2：使用 Automation Token（适合 CI/CD）

#### 1. 创建 Automation Token
1. 访问: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. 点击 "Generate New Token"
3. 选择 "Automation" 类型（可绕过 2FA）
4. 复制生成的 token

#### 2. 配置 Token

**方式 A: 直接配置**
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
```

**方式 B: 使用环境变量（推荐）**

创建或编辑 `.npmrc` 文件：
```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

然后设置环境变量：
```bash
# Linux/Mac
export NPM_TOKEN=your_automation_token

# Windows PowerShell
$env:NPM_TOKEN="your_automation_token"

# Windows CMD
set NPM_TOKEN=your_automation_token
```

#### 3. 发布
```bash
npm run pub
```

### 快速发布命令（带 2FA）

```bash
# 方式 1: 使用 OTP
export NPM_OTP=123456 && npm run pub

# 方式 2: 手动发布（每一步）
npm run dist
npm publish --otp=123456 --access public
git push origin master --tags
```

---

## 🔧 快捷发布脚本（可选）

可以在 `package.json` 中添加 PowerShell 友好的发布脚本：

```json
"scripts": {
  "version:patch": "npm version patch",
  "version:minor": "npm version minor",
  "publish:npm": "npm publish --access public",
  "publish:beta": "npm publish --tag beta --access public"
}
```

使用方式：
```powershell
npm run version:patch    # 升级版本
npm run dist             # 构建
git push origin master --tags  # 推送代码和标签
npm run publish:npm      # 发布（需要 OTP 时会提示）
```

---

## 🚀 快速发布命令组合

```powershell
# 一键发布流程（需要手动确认每一步）
npm version patch; npm run dist; git push origin master --tags; npm publish --access public
```
