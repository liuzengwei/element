# Radio 和 Checkbox 组件布局功能增强

## 功能概述

为 Element UI 的 Radio 和 Checkbox 组件添加了竖向排列和文本溢出处理功能，使得这两个组件在复杂布局场景下更加灵活易用。

## 新增功能

### 1. 竖向排列（direction 属性）

#### 功能说明
- 支持 `horizontal`（横向，默认）和 `vertical`（竖向）两种排列方式
- 通过 `direction` 属性控制 radio-group 和 checkbox-group 的排列方向

#### 使用示例

**Radio 竖向排列：**
```vue
<el-radio-group v-model="value" direction="vertical">
  <el-radio :label="1">选项一</el-radio>
  <el-radio :label="2">选项二</el-radio>
  <el-radio :label="3">选项三</el-radio>
</el-radio-group>
```

**Checkbox 竖向排列：**
```vue
<el-checkbox-group v-model="checkList" direction="vertical">
  <el-checkbox label="选项一"></el-checkbox>
  <el-checkbox label="选项二"></el-checkbox>
  <el-checkbox label="选项三"></el-checkbox>
</el-checkbox-group>
```

### 2. 文本溢出处理（overflow 属性）

#### 功能说明
- 支持 `wrap`（换行，默认）和 `ellipsis`（省略号）两种溢出处理方式
- 当选项文本过长时，可以选择自动换行或显示省略号
- `ellipsis` 模式下，鼠标悬停可显示完整文本（通过 title 属性）

#### 使用示例

**显示省略号：**
```vue
<el-radio-group v-model="value" overflow="ellipsis">
  <el-radio :label="1">这是一个非常非常长的文本内容</el-radio>
  <el-radio :label="2">短文本</el-radio>
</el-radio-group>
```

**组合使用（竖向 + 省略号）：**
```vue
<el-checkbox-group 
  v-model="checkList" 
  direction="vertical" 
  overflow="ellipsis"
>
  <el-checkbox label="长文本选项一"></el-checkbox>
  <el-checkbox label="长文本选项二"></el-checkbox>
</el-checkbox-group>
```

## API 文档

### Radio-group 新增属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| direction  | 排列方向    | string   | horizontal / vertical | horizontal   |
| overflow  | 文本溢出处理方式    | string   | wrap / ellipsis | wrap   |

### Checkbox-group 新增属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| direction  | 排列方向    | string   | horizontal / vertical | horizontal   |
| overflow  | 文本溢出处理方式    | string   | wrap / ellipsis | wrap   |

## 实现细节

### 文件修改清单

1. **组件逻辑**
   - `packages/radio/src/radio-group.vue` - 添加 direction 和 overflow 属性
   - `packages/checkbox/src/checkbox-group.vue` - 添加 direction 和 overflow 属性

2. **样式文件**
   - `packages/theme-chalk/src/radio.scss` - 添加 `.el-radio-group.is-vertical` 和 `.el-radio-group.is-ellipsis` 样式
   - `packages/theme-chalk/src/checkbox.scss` - 添加 `.el-checkbox-group.is-vertical` 和 `.el-checkbox-group.is-ellipsis` 样式

3. **文档**
   - `examples/docs/zh-CN/radio.md` - 添加竖向排列和文本溢出示例
   - `examples/docs/zh-CN/checkbox.md` - 添加竖向排列和文本溢出示例

4. **测试示例**
   - `examples/play/index.vue` - 添加完整的功能演示

### 样式实现

**竖向排列样式：**
```scss
.el-radio-group.is-vertical {
  display: flex;
  flex-direction: column;
  
  .el-radio {
    margin-right: 0;
    margin-bottom: 10px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
```

**文本省略样式：**
```scss
.el-radio-group.is-ellipsis {
  .el-radio {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    
    .el-radio__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      max-width: calc(100% - 30px);
      vertical-align: middle;
    }
  }
}
```

## 使用场景

### 1. 表单布局
在垂直表单布局中，使用竖向排列的 radio 或 checkbox 能更好地与其他表单元素对齐。

### 2. 侧边栏筛选
在侧边栏等狭窄区域，竖向排列可以更好地利用空间。

### 3. 长文本选项
当选项文本较长时，使用 ellipsis 模式可以保持界面整洁，同时通过 title 属性提供完整信息。

### 4. 响应式布局
可以配合媒体查询，在不同屏幕尺寸下切换排列方向。

## 兼容性说明

- 向后兼容：新增属性均有默认值，不影响现有代码
- 默认行为保持不变：`direction="horizontal"` 和 `overflow="wrap"`
- 浏览器支持：与 Element UI 主库保持一致（IE 10+）

## 测试方法

1. 编译样式：
   ```bash
   npm run build:theme
   ```

2. 启动开发服务器：
   ```bash
   npm run dev:play
   ```

3. 访问 `http://localhost:8085`，查看 Radio 和 Checkbox 新功能演示

4. 或者访问文档页面：
   - Radio: `http://localhost:8085/#/zh-CN/component/radio`
   - Checkbox: `http://localhost:8085/#/zh-CN/component/checkbox`

## 后续改进建议

1. **国际化支持**：考虑为英文、西班牙语、法语等其他语言文档添加相应示例
2. **单元测试**：为新功能添加单元测试用例
3. **TypeScript 类型定义**：更新 `types/radio-group.d.ts` 和 `types/checkbox-group.d.ts`
4. **可访问性**：确保在使用省略号时，屏幕阅读器能正确读取完整文本

## 参考资料

- [Element UI 开发指南](/.github/copilot-instructions.md)
- [BEM 命名规范](http://getbem.com/)
- [CSS Flexbox 布局](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
