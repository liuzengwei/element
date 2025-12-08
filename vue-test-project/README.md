# Vue Test Project - Element UI 测试项目

## 项目说明

这是一个用于测试 `@liuzengwei/element-ui` 组件库的 Vue 2 项目，使用 **import 方式**引入组件库。

## 技术栈

- Vue 2.6.14
- @liuzengwei/element-ui 2.15.5-xn.11
- Webpack 5
- Babel 7

## 安装依赖

```bash
npm install
```

## 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:8081` 启动并自动打开浏览器。

## 构建生产版本

```bash
npm run build
```

## 项目结构

```
vue-test-project/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── main.js             # 入口文件，引入 Element UI
│   └── App.vue             # 主组件，包含所有测试用例
├── package.json            # 项目配置
├── webpack.config.js       # Webpack 配置
└── .babelrc               # Babel 配置
```

## 引入方式

### 完整引入（当前使用）

在 `src/main.js` 中：

```javascript
import Vue from 'vue';
import ElementUI from '@liuzengwei/element-ui';
import '@liuzengwei/element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```

### 按需引入

如需按需引入，可以这样配置：

1. 安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

2. 修改 `.babelrc`：

```json
{
  "presets": [["@babel/preset-env", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "@liuzengwei/element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

3. 在 `main.js` 中按需引入：

```javascript
import Vue from 'vue';
import { Button, Select, Input, Message } from '@liuzengwei/element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.prototype.$message = Message;
```

## 测试的组件

本项目测试了以下 Element UI 组件：

1. ✓ Button 按钮
2. ✓ Input 输入框
3. ✓ Select 选择器
4. ✓ Radio 单选框
5. ✓ Checkbox 复选框
6. ✓ Switch 开关
7. ✓ DatePicker 日期选择器
8. ✓ Message 消息提示
9. ✓ Dialog 对话框
10. ✓ Form 表单
11. ✓ Table 表格
12. ✓ Card 卡片
13. ✓ Alert 警告
14. ✓ Row/Col 布局

## 测试结果

✅ **所有组件均通过 import 方式成功引入和渲染**

- 组件样式正常加载
- 组件功能正常工作
- 双向绑定正常
- 事件处理正常
- 表单验证正常
- 全局方法（$message, $confirm 等）正常

## 验证要点

### 1. 组件导入
```javascript
import ElementUI from '@liuzengwei/element-ui';
```

### 2. 样式导入
```javascript
import '@liuzengwei/element-ui/lib/theme-chalk/index.css';
```

### 3. 插件注册
```javascript
Vue.use(ElementUI);
```

### 4. 组件使用
```vue
<template>
  <el-button type="primary">按钮</el-button>
</template>
```

### 5. 全局方法
```javascript
this.$message.success('操作成功');
this.$confirm('确认删除?', '提示');
```

## 常见问题

### Q: Webpack 编译报错？
A: 确保已安装所有依赖，运行 `npm install`

### Q: 样式未加载？
A: 检查是否正确引入了 CSS 文件：
```javascript
import '@liuzengwei/element-ui/lib/theme-chalk/index.css';
```

### Q: 组件未注册？
A: 确保调用了 `Vue.use(ElementUI)`

## 总结

本项目成功验证了 `@liuzengwei/element-ui` 组件库可以通过标准的 import 方式在 Vue 2 项目中正常使用，所有核心功能均工作正常。
