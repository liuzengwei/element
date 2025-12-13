# 导航栏版本标识实现文档

## 概述

在导航栏（side-nav）中为组件添加了版本标识显示功能，用户可以在导航栏中直观地看到哪些组件是新增的或有更新的。

## 实现内容

### 1. 文档版本标识

#### Descriptions 组件
- **加载状态**功能标题添加了 `<version-badge version="2.15.5-xn.30" type="feature"/>`
- **API 表格**中为 `loading` 和 `animated` 属性添加了版本标识
  - `loading <version-badge version="2.15.5-xn.30" type="feature"/>` - 骨架屏加载状态
  - `animated <version-badge version="2.15.5-xn.30" type="feature"/>` - 骨架屏动画效果

#### Table 组件
- **API 表格**中为 `header-affixed-top` 属性添加了版本标识
  - `header-affixed-top <version-badge version="2.15.5-xn.30" type="feature"/>` - 表头吸顶功能

### 2. 导航栏版本标识

#### 配置文件修改 (nav.config.json)
为以下组件添加了 `badge` 字段配置：

```json
{
  "path": "/component-path",
  "title": "组件名称",
  "badge": {
    "version": "版本号",
    "type": "标识类型"
  }
}
```

##### 已添加标识的组件：

**新增组件 (type: "new"):**
- Text 文本 - v2.15.5-xn.29
- Affix 固钉 - v2.15.5-xn.29
- AreaLoading 区域加载 - v2.15.5-xn.28

**更新组件 (type: "update"):**
- Radio 单选框 - v2.15.5-xn.30 (新增 direction 和 overflow 属性)
- Checkbox 多选框 - v2.15.5-xn.30 (新增 direction 和 overflow 属性)
- Table 表格 - v2.15.5-xn.30 (新增 header-affixed-top 属性)
- Descriptions 描述列表 - v2.15.5-xn.30 (新增 loading 和 animated 属性)

#### 组件模板修改 (side-nav.vue)

**模板结构：**
```vue
<router-link
  active-class="active"
  :to="base + navItem.path"
  exact>
  <span>{{ navItem.title }}</span>
  <version-badge 
    v-if="navItem.badge"
    :version="navItem.badge.version"
    :type="navItem.badge.type"
  />
</router-link>
```

**样式优化：**
```scss
.nav-item {
  a {
    display: flex;
    align-items: center;
    height: 40px;

    > span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: 1;
      min-width: 0;
    }

    .version-badge {
      flex-shrink: 0;
      margin-left: 4px;
    }
  }
}
```

### 3. 标识类型说明

版本标识支持 4 种类型：

| 类型 | 说明 | 颜色 | 使用场景 |
|------|------|------|----------|
| new | 新组件 | 绿色 | 完全新增的组件 |
| feature | 新特性 | 蓝色 | 组件新增的功能特性 |
| update | 已更新 | 橙色 | 组件有重要更新 |
| deprecated | 已废弃 | 红色 | 不推荐使用的组件或特性 |

## 使用效果

### 文档页面
- 在组件文档中，新功能标题和 API 表格中的属性会显示版本标识
- 鼠标悬停在标识上时，会显示完整的版本号提示

### 导航栏
- 在左侧导航栏中，带有版本标识的组件会在标题右侧显示小标签
- 标签会根据类型显示不同的颜色和文本
- 支持多语言显示（zh-CN、en-US、es、fr-FR）

## 技术要点

### 布局处理
- 使用 `display: flex` 实现导航项内容布局
- 组件标题使用 `flex: 1` 和 `min-width: 0` 防止挤压标识
- 版本标识使用 `flex-shrink: 0` 保持固定宽度

### 文本溢出
- 组件标题包裹在 `<span>` 中，独立处理溢出
- 应用 `overflow: hidden; white-space: nowrap; text-overflow: ellipsis;`
- 确保长标题不会影响版本标识的显示

### 响应式
- 标识大小固定（12px 字体），适配各种屏幕尺寸
- 在小屏幕下依然能正常显示和交互

## 文件清单

### 修改的文件
1. `examples/docs/zh-CN/descriptions.md` - Descriptions 组件文档
2. `examples/docs/zh-CN/table.md` - Table 组件文档
3. `examples/nav.config.json` - 导航配置文件
4. `examples/components/side-nav.vue` - 导航栏组件

### 相关文件
- `examples/components/version-badge.vue` - 版本标识组件（已存在）
- `examples/entry.js` - 全局注册 version-badge 组件（已配置）

## 后续扩展

### 添加新标识
1. 在 `nav.config.json` 中找到对应组件
2. 添加 `badge` 配置：
   ```json
   {
     "path": "/component",
     "title": "Component 组件",
     "badge": {
       "version": "2.15.5-xn.XX",
       "type": "new|feature|update|deprecated"
     }
   }
   ```
3. 在组件文档中添加对应的 `<version-badge>` 标签

### 批量更新
- 可以编写脚本批量处理 nav.config.json
- 可以根据 CHANGELOG 自动生成版本标识配置

### 多语言支持
- 当前已支持 zh-CN 语言的导航栏标识
- 可扩展到 en-US、es、fr-FR 语言的导航配置

## 注意事项

1. **版本号格式**：统一使用 `2.15.5-xn.XX` 格式
2. **标识类型**：根据实际情况选择合适的类型（new/feature/update/deprecated）
3. **文档同步**：导航栏标识和文档标识应保持一致
4. **样式兼容**：确保在不同主题下标识都清晰可见

## 测试建议

1. 启动开发服务器：`npm run dev`
2. 访问导航栏，检查标识显示是否正确
3. 测试不同语言下的标识文本
4. 验证鼠标悬停提示功能
5. 测试响应式布局下的显示效果
6. 检查长标题组件的文本溢出处理

## 相关文档

- [VERSION_BADGE_GUIDE.md](./VERSION_BADGE_GUIDE.md) - 版本标识使用指南
- [VERSION_BADGE_IMPLEMENTATION.md](./VERSION_BADGE_IMPLEMENTATION.md) - 版本标识实现详情
- [RADIO_CHECKBOX_LAYOUT_FEATURE.md](./RADIO_CHECKBOX_LAYOUT_FEATURE.md) - Radio/Checkbox 布局功能文档
