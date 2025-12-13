# VersionBadge 使用指南

## 概述

VersionBadge 是一个用于在文档中标记版本信息的组件，帮助用户快速识别新组件、新特性或已更新的内容。

## 基本用法

在 Markdown 文档中直接使用 `<version-badge>` 标签：

```markdown
## 组件名称 <version-badge version="2.15.5" type="new"/>
```

## 组件属性

### version
- **类型**: `String`
- **必填**: 是
- **说明**: 版本号，如 "2.15.5" 或 "2.15.5-xn.30"

### type
- **类型**: `String`
- **默认值**: `'feature'`
- **可选值**: `'new'` | `'feature'` | `'update'` | `'deprecated'`
- **说明**: Badge 类型
  - `new`: 新组件（绿色）
  - `feature`: 新特性（蓝色）
  - `update`: 已更新（橙色）
  - `deprecated`: 已废弃（红色）

### text
- **类型**: `String`
- **可选**: 是
- **说明**: 自定义显示文本，不提供时使用默认文本

## 使用场景

### 1. 组件标题 - 新组件标记

```markdown
## Text 文本 <version-badge version="2.15.5-xn.29" type="new"/>

用于文本展示。
```

**效果**：组件标题后显示绿色 "新组件" Badge

---

### 2. 章节标题 - 新特性标记

```markdown
### 竖向排列 <version-badge version="2.15.5-xn.30" type="feature"/>

单选框组可以竖向排列。
```

**效果**：章节标题后显示蓝色 "新特性" Badge

---

### 3. API 表格 - 属性标记

```markdown
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| direction <version-badge version="2.15.5-xn.30" type="feature"/> | 排列方向 | string | horizontal / vertical | horizontal |
| overflow <version-badge version="2.15.5-xn.30" type="feature"/> | 溢出处理 | string | wrap / ellipsis | wrap |
```

**效果**：参数名后显示蓝色 "新特性" Badge

---

### 4. 行内标记 - 自定义文本

```markdown
新增了 <version-badge version="2.15.5" type="update" text="v2.15.5"/> 支持。
```

**效果**：行内显示橙色 "v2.15.5" Badge

---

## 样式规范

### 颜色体系

| 类型 | 背景色 | 文字色 | 边框色 | 用途 |
|------|--------|--------|--------|------|
| new | #f0f9ff | #67C23A | #c2e7b0 | 新组件 |
| feature | #ecf5ff | #409EFF | #b3d8ff | 新特性 |
| update | #fdf6ec | #E6A23C | #f5dab1 | 更新 |
| deprecated | #fef0f0 | #F56C6C | #fbc4c4 | 废弃 |

### 尺寸和间距

- **字号**: 12px
- **内边距**: 2px 6px
- **左边距**: 8px（与标题的间距）
- **圆角**: 3px

---

## 多语言支持

VersionBadge 自动根据当前文档语言显示对应文本：

| 类型 | 中文(zh-CN) | 英文(en-US) | 西班牙语(es) | 法语(fr-FR) |
|------|-------------|-------------|--------------|-------------|
| new | 新组件 | NEW | NUEVO | NOUVEAU |
| feature | 新特性 | NEW | NUEVO | NOUVEAU |
| update | 已更新 | UPDATED | ACTUALIZADO | MIS À JOUR |
| deprecated | 已废弃 | DEPRECATED | OBSOLETO | DÉPRÉCIÉ |

**Tooltip 提示**：
- 中文: "在版本 2.15.5"
- 英文: "Added in 2.15.5"
- 西班牙语: "Añadido en 2.15.5"
- 法语: "Ajouté dans 2.15.5"

---

## 最佳实践

### ✅ 推荐用法

1. **组件级标记**
   ```markdown
   ## Affix 固钉 <version-badge version="2.15.5-xn.29" type="new"/>
   ```

2. **功能级标记**
   ```markdown
   ### 竖向排列 <version-badge version="2.15.5-xn.30" type="feature"/>
   ```

3. **API 属性标记**
   ```markdown
   | direction <version-badge version="2.15.5" type="feature"/> | 排列方向 | ... |
   ```

### ❌ 避免使用

1. **不要在纯文本段落中使用**
   ```markdown
   <!-- 不推荐 -->
   该组件 <version-badge version="2.15.5" type="new"/> 提供了很多功能。
   ```

2. **不要重复标记**
   ```markdown
   <!-- 不推荐 -->
   ## Text 文本 <version-badge version="2.15.5" type="new"/> <version-badge version="2.15.5" type="feature"/>
   ```

3. **不要在代码块中使用**
   ```markdown
   <!-- 不推荐 -->
   ```html
   <el-text <version-badge version="2.15.5"/>></el-text>
   ```

---

## 版本号规范

### 标准格式

- **主版本**: `2.15.5`
- **扩展版本**: `2.15.5-xn.30`
- **预发版本**: `2.16.0-beta.1`

### 版本分类

- **xn.28**: AreaLoading 区域加载组件
- **xn.29**: Text 文本组件、Affix 固钉组件
- **xn.30**: Radio/Checkbox 竖向排列和溢出处理特性

---

## 技术实现

### 组件注册

在 `examples/entry.js` 中全局注册：

```javascript
import VersionBadge from './components/version-badge';
Vue.component('version-badge', VersionBadge);
```

### Markdown 渲染

Markdown 文件通过 `md-loader` 编译为 Vue 组件，`<version-badge>` 标签会被识别为已注册的 Vue 组件。

### 语言检测

组件通过 `this.$route.path` 检测当前文档语言：

```javascript
currentLang() {
  const path = this.$route.path || '';
  if (path.includes('/en-US/')) return 'en-US';
  if (path.includes('/es/')) return 'es';
  if (path.includes('/fr-FR/')) return 'fr-FR';
  return 'zh-CN';
}
```

---

## FAQ

### Q: Badge 不显示怎么办？

**A**: 检查以下几点：
1. 确认组件已在 `entry.js` 中注册
2. 检查 Markdown 语法是否正确（注意空格和闭合标签）
3. 重启开发服务器
4. 检查浏览器控制台是否有错误

### Q: 如何自定义 Badge 样式？

**A**: 修改 `examples/components/version-badge.vue` 中的 CSS：

```css
.version-badge--custom {
  background-color: #your-color;
  color: #your-text-color;
  border: 1px solid #your-border-color;
}
```

### Q: 可以添加点击事件吗？

**A**: 可以。在组件模板中添加 `@click` 事件：

```vue
<template>
  <span 
    :class="['version-badge', `version-badge--${type}`]"
    :title="tooltipText"
    @click="handleClick"
  >
    {{ displayText }}
  </span>
</template>

<script>
export default {
  methods: {
    handleClick() {
      // 跳转到 CHANGELOG 或其他页面
      window.open(`/changelog#${this.version}`);
    }
  }
}
</script>
```

---

## 维护指南

### 添加新版本标记

1. 在相关 Markdown 文档中添加 `<version-badge>` 标签
2. 使用正确的版本号和类型
3. 确保多语言文档同步更新

### 更新现有标记

1. 修改 `version` 属性更新版本号
2. 根据需要调整 `type` 属性
3. 提交时在 commit 信息中注明版本变更

### 移除过期标记

考虑在新版本发布后 3-6 个月移除旧版本的 Badge，保持文档简洁。

---

## 示例汇总

### Radio 组件示例

```markdown
## Radio 单选框

### 竖向排列 <version-badge version="2.15.5-xn.30" type="feature"/>

### Radio-group Attributes
| direction <version-badge version="2.15.5-xn.30" type="feature"/> | 排列方向 | string | ... |
| overflow <version-badge version="2.15.5-xn.30" type="feature"/> | 溢出处理 | string | ... |
```

### 新组件示例

```markdown
## Text 文本 <version-badge version="2.15.5-xn.29" type="new"/>
## Affix 固钉 <version-badge version="2.15.5-xn.29" type="new"/>
## AreaLoading 区域加载 <version-badge version="2.15.5-xn.28" type="new"/>
```

---

## 相关资源

- 组件源码: `examples/components/version-badge.vue`
- 注册配置: `examples/entry.js`
- 使用示例: 
  - `examples/docs/zh-CN/radio.md`
  - `examples/docs/zh-CN/checkbox.md`
  - `examples/docs/zh-CN/text.md`
  - `examples/docs/zh-CN/affix.md`
  - `examples/docs/zh-CN/area-loading.md`
