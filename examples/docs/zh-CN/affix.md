## Affix 固钉

将元素固定在特定可见区域。

### 基础用法

固钉默认固定在页面顶部。

:::demo 设置 `offset` 属性来改变吸顶距离，默认值为 0。

```html
<el-affix :offset="120">
  <el-button type="primary">距离顶部 120px</el-button>
</el-affix>
```
:::

### 指定容器

通过设置 `target` 属性，让固钉始终保持在容器内，超过范围则隐藏。

:::demo 请注意容器避免出现滚动条。

```html
<div id="affix-container" style="height: 400px; overflow: auto; background: #f5f7fa; padding: 20px;">
  <div style="height: 100px; background: #e4e7ed;"></div>
  <el-affix target="#affix-container" :offset="80">
    <el-button type="primary">固定在容器内</el-button>
  </el-affix>
  <div style="height: 600px; background: #d3dce6; margin-top: 20px;"></div>
</div>
```
:::

### 固定位置

提供了两个固定位置：`top` 和 `bottom`。

:::demo 通过设置 `position` 属性来改变固定位置，默认值为 `top`。

```html
<el-affix position="bottom" :offset="20">
  <el-button type="primary">距离底部 20px</el-button>
</el-affix>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| offset | 偏移距离 | number | — | 0 |
| position | 固定位置 | string | top / bottom | top |
| target | 指定容器（CSS 选择器） | string | — | — |
| z-index | 固钉层级 | number | — | 100 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 固定状态改变时触发 | (fixed: boolean) |
| scroll | 滚动时触发 | (value: { scrollTop: number, fixed: boolean }) |

### Slots
| 名称 | 说明 |
|------|--------|
| default | 自定义内容 |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| update | 手动更新固钉状态 | — |
| updateRoot | 更新根元素信息 | — |
