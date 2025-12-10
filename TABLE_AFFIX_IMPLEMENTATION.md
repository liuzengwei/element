# Table 表头吸顶功能实现说明

## 功能概述

为 Element UI 的 Table 组件添加了表头吸顶（Header Affix）功能。当页面向下滚动，表格表头滚动到视口顶部时，表头会固定在页面顶部，方便用户查看列标题。

## 主要特性

1. **支持普通表格表头吸顶**：表头会在滚动时固定在页面顶部
2. **支持固定列**：左右固定列的表头也会一起吸顶，并保持固定位置
3. **支持偏移量配置**：可以设置吸顶时距离页面顶部的距离，适配固定导航栏等场景
4. **自动显示/隐藏**：当表格完全滚出视口时，吸顶表头会自动隐藏
5. **横向滚动同步**：吸顶表头的横向滚动与主表格保持同步

## 核心实现

### 1. 新增属性

在 `packages/table/src/table.vue` 中添加了 `headerAffixedTop` 属性：

```javascript
headerAffixedTop: {
  type: [Boolean, Object],
  default: false
}
```

**用法：**
- 布尔值：`header-affixed-top="true"` 开启吸顶功能
- 对象配置：`header-affixed-top="{ offsetTop: 60 }"` 设置吸顶偏移量

### 2. 核心逻辑

#### 2.1 位置计算方法 `updateAffixHeader()`

```javascript
updateAffixHeader() {
  if (!this.isHeaderAffixed || !this.$el) return;
  
  const tableRect = this.$el.getBoundingClientRect();
  const headerHeight = this.layout.headerHeight || 0;
  const offsetTop = this.affixHeaderOffsetTop;
  
  // 判断表头是否应该吸顶
  const shouldShow = tableRect.top < offsetTop && 
                    tableRect.bottom > offsetTop + headerHeight;
  
  this.showAffixHeader = shouldShow;
  
  if (shouldShow) {
    this.affixHeaderStyle = {
      top: offsetTop + 'px',
      width: tableRect.width + 'px',
      left: tableRect.left + 'px'
    };
  }
}
```

**逻辑说明：**
- 当表格顶部滚动到视口上方（`tableRect.top < offsetTop`）
- 且表格底部仍在视口内（`tableRect.bottom > offsetTop + headerHeight`）
- 显示吸顶表头，并计算其位置和宽度

#### 2.2 滚动同步 `syncAffixHeaderScroll()`

```javascript
syncAffixHeaderScroll() {
  if (!this.isHeaderAffixed) return;
  
  const scrollLeft = this.bodyWrapper.scrollLeft;
  const affixHeaderWrapper = this.$refs.affixHeaderWrapper;
  
  if (affixHeaderWrapper) {
    affixHeaderWrapper.scrollLeft = scrollLeft;
  }
}
```

**逻辑说明：**
- 监听主表格的横向滚动
- 同步更新吸顶表头的滚动位置
- 固定列不需要同步（保持固定）

### 3. 事件监听

在 `bindEvents()` 和 `unbindEvents()` 中添加了必要的事件监听：

```javascript
bindEvents() {
  // ... 原有代码
  if (this.isHeaderAffixed) {
    window.addEventListener('scroll', this.onDocumentScroll, { passive: true });
    window.addEventListener('resize', this.updateAffixHeader);
  }
}

unbindEvents() {
  // ... 原有代码
  if (this.isHeaderAffixed) {
    window.removeEventListener('scroll', this.onDocumentScroll, { passive: true });
    window.removeEventListener('resize', this.updateAffixHeader);
  }
}
```

### 4. 模板结构

在表格主容器末尾添加了吸顶表头的 DOM 结构：

```vue
<div
  v-if="isHeaderAffixed && showAffixHeader && showHeader"
  class="el-table__affix-header-wrapper"
  :style="affixHeaderStyle">
  <!-- 主表头 -->
  <div class="el-table__header-wrapper" ref="affixHeaderWrapper">
    <table-header ...></table-header>
  </div>
  <!-- 左固定列表头 -->
  <div v-if="fixedColumns.length > 0" class="el-table__fixed">
    <table-header fixed="left" ...></table-header>
  </div>
  <!-- 右固定列表头 -->
  <div v-if="rightFixedColumns.length > 0" class="el-table__fixed-right">
    <table-header fixed="right" ...></table-header>
  </div>
</div>
```

### 5. 样式实现

在 `packages/theme-chalk/src/table.scss` 中添加了样式：

```scss
@include e(affix-header-wrapper) {
  position: fixed;
  z-index: 100;
  background-color: $--color-white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .el-table__fixed,
  .el-table__fixed-right {
    position: absolute;
    top: 0;
    bottom: auto;
    height: auto;
    box-shadow: none;
  }
}
```

## 使用示例

### 基础用法

```vue
<el-table
  :data="tableData"
  :header-affixed-top="true"
  border>
  <el-table-column prop="date" label="日期"></el-table-column>
  <el-table-column prop="name" label="姓名"></el-table-column>
  <el-table-column prop="address" label="地址"></el-table-column>
</el-table>
```

### 设置偏移量

```vue
<el-table
  :data="tableData"
  :header-affixed-top="{ offsetTop: 60 }"
  border>
  <el-table-column prop="date" label="日期"></el-table-column>
  <el-table-column prop="name" label="姓名"></el-table-column>
  <el-table-column prop="address" label="地址"></el-table-column>
</el-table>
```

### 带固定列

```vue
<el-table
  :data="tableData"
  :header-affixed-top="true"
  border>
  <el-table-column fixed prop="date" label="日期"></el-table-column>
  <el-table-column prop="name" label="姓名"></el-table-column>
  <el-table-column fixed="right" label="操作"></el-table-column>
</el-table>
```

## 测试

已创建测试文件：
- `examples/play/table-affix-test.vue` - 交互式测试页面
- `examples/docs/zh-CN/table-affix-header.md` - 文档示例

运行测试：
```bash
npm run dev:play
```

然后修改 `examples/play/index.vue` 引入测试组件：
```vue
<template>
  <table-affix-test />
</template>

<script>
import TableAffixTest from './table-affix-test.vue';
export default {
  components: { TableAffixTest }
};
</script>
```

## 注意事项

1. **性能优化**：使用了 `{ passive: true }` 标志来优化滚动性能
2. **内存管理**：在组件销毁时正确移除了所有事件监听器
3. **兼容性**：支持固定列、边框、分组表头等现有功能
4. **响应式**：支持窗口大小变化时重新计算位置

## 技术参考

实现思路参考了 TDesign Table 的 affix 实现，主要采用：
- `position: fixed` 定位吸顶表头
- `getBoundingClientRect()` 计算元素位置
- 监听 `window.scroll` 和 `window.resize` 事件
- 通过 `scrollLeft` 属性同步横向滚动

## 后续优化建议

1. 支持表尾吸底功能
2. 支持横向滚动条吸底
3. 添加虚拟滚动场景下的吸顶支持
4. 优化移动端触摸滚动体验
5. 添加动画过渡效果
