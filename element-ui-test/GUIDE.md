# Element UI 测试项目使用指南

## 项目简介

这是一个使用 **Vue CLI** 创建的测试项目，完全基于 `xianniu-delivery-cloud-web` 项目的依赖配置。

## 技术栈

### 核心框架
- Vue 2.7.14
- Vue Router 3.0.2
- Vuex 3.1.0

### UI 组件库
- @liuzengwei/element-ui ^2.15.5-xn.13

### 工具库
- **Axios** 0.18.1 - HTTP 请求
- **Dayjs** 1.11.10 - 日期处理
- **Lodash** 4.17.21 - 工具函数
- **Decimal.js** 10.3.1 - 精确数值计算
- **UUID** 9.0.1 - 唯一标识符生成
- **MD5** 2.3.0 - 哈希加密
- **QRCode** 1.5.0 - 二维码生成
- **ECharts** 5.5.1 - 图表库
- **QS** 6.10.3 - URL 参数处理
- **normalize.css** 7.0.0 - CSS 重置

### 构建工具
- Vue CLI 4.4.4
- Babel 7.x
- Webpack (内置于 Vue CLI)
- Sass/SCSS

## 项目结构

```
element-ui-test/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── assets/             # 静态资源
│   ├── router/             # 路由配置
│   │   └── index.js
│   ├── store/              # Vuex 状态管理
│   │   └── index.js
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页
│   │   ├── Components.vue  # 组件测试页
│   │   └── Utils.vue       # 工具库测试页
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── babel.config.js         # Babel 配置
├── vue.config.js           # Vue CLI 配置
├── .eslintrc.js            # ESLint 配置
└── package.json            # 项目依赖

```

## 快速开始

### 1. 安装依赖（已完成）

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
# 或
npm run serve
```

访问 http://localhost:8080

### 3. 构建生产版本

```bash
npm run build
```

## 功能模块

### 1. 首页 (/)
- 项目依赖展示
- Vuex 状态管理演示
- 快速测试功能
- 环境信息展示

### 2. 组件测试 (/components)
包含以下 Element UI 组件测试：

#### 表单组件
- Input 输入框
- Select 选择器
- DatePicker 日期选择器
- Switch 开关
- Radio 单选框
- Checkbox 复选框
- Form 表单验证

#### 数据展示
- Table 表格
- Pagination 分页
- Tag 标签
- Progress 进度条
- Badge 徽章

#### 反馈组件
- Message 消息提示
- Notification 通知
- Dialog 对话框
- Drawer 抽屉
- Alert 警告
- MessageBox 确认框

#### 导航组件
- Tabs 标签页
- Steps 步骤条
- Menu 菜单

### 3. 工具库测试 (/utils)

#### Dayjs 日期处理
- 当前时间显示
- 多种格式化方式
- 相对时间计算
- 日期差值计算

#### Lodash 工具函数
- 数组操作（去重、分块、压缩）
- 对象操作（键值、深克隆）
- 字符串操作（驼峰、大写、首字母大写）
- 数值操作（求和、平均值、最大最小值）

#### UUID 生成
- UUID v4 生成
- 批量生成

#### MD5 加密
- 文本加密
- 哈希值复制

#### QRCode 二维码
- 动态生成二维码
- 预设示例

#### Decimal.js 精确计算
- 浮点数精确运算
- 避免 JavaScript 浮点数精度问题

#### Axios HTTP 请求
- GET 请求测试
- POST 请求测试
- 响应数据展示

## 配置说明

### Babel 配置
支持以下特性：
- ES6+ 语法转换
- 可选链操作符 (?.)
- 空值合并操作符 (??)
- Element UI 按需加载
- 动态 import

### Vue CLI 配置
- 公共路径: ./
- 输出目录: dist
- 静态资源目录: static
- 开发端口: 8080
- 生产环境关闭 SourceMap
- Gzip 压缩

### ESLint 配置
- Vue 推荐规则
- Babel 解析器
- 生产环境警告 console 和 debugger

## 开发建议

### 1. 组件按需加载
已配置 `babel-plugin-component`，可以按需引入 Element UI 组件：

```javascript
import { Button, Input } from '@liuzengwei/element-ui';
```

### 2. 路由懒加载
推荐使用动态 import 进行路由懒加载：

```javascript
component: () => import('./views/SomePage.vue')
```

### 3. Vuex 模块化
建议按功能模块拆分 Vuex store：

```
store/
  ├── index.js
  ├── modules/
  │   ├── user.js
  │   └── app.js
```

### 4. 精确数值计算
涉及金额、比例等精确计算时，使用 Decimal.js：

```javascript
import Decimal from 'decimal.js';
const result = new Decimal(0.1).plus(0.2).toString(); // "0.3"
```

## 常见问题

### Q: 如何修改开发端口？
A: 修改 `vue.config.js` 中的 `devServer.port`

### Q: 如何添加代理解决跨域？
A: 在 `vue.config.js` 的 `devServer` 中添加 `proxy` 配置

### Q: 如何配置环境变量？
A: 创建 `.env.development`、`.env.production` 等文件

### Q: 构建后资源路径错误？
A: 检查 `vue.config.js` 中的 `publicPath` 配置

## 依赖更新

查看过期依赖：
```bash
npm outdated
```

更新依赖：
```bash
npm update
```

## 许可证

MIT
