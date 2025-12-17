## Tag 标签

用于标记和选择。

### 基础用法

:::demo 由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。

```html
<el-tag>标签一</el-tag>
<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag>
```
:::

### 可移除标签

:::demo 设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，true 为关闭。

```html
<el-tag
  v-for="tag in tags"
  :key="tag.name"
  closable
  :type="tag.type">
  {{tag.name}}
</el-tag>

<script>
  export default {
    data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      };
    }
  }
</script>
```
:::

### 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现

:::demo
```html
<el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
```
:::

### 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<el-tag closable>默认标签</el-tag>
<el-tag size="medium" closable>中等标签</el-tag>
<el-tag size="small" closable>小型标签</el-tag>
<el-tag size="mini" closable>超小标签</el-tag>
```
:::

### 不同主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`

:::demo 通过设置`effect`属性来改变主题，默认为 `light`
```html
<div class="tag-group">
  <span class="tag-group__title">Dark</span>
  <el-tag
    v-for="item in items"
    :key="item.label"
    :type="item.type"
    effect="dark">
    {{ item.label }}
  </el-tag>
</div>
<div class="tag-group">
  <span class="tag-group__title">Plain</span>
  <el-tag
    v-for="item in items"
    :key="item.label"
    :type="item.type"
    effect="plain">
    {{ item.label }}
  </el-tag>
</div>

<script>
  export default {
    data() {
      return {
        items: [
          { type: '', label: '标签一' },
          { type: 'success', label: '标签二' },
          { type: 'info', label: '标签三' },
          { type: 'danger', label: '标签四' },
          { type: 'warning', label: '标签五' }
        ]
      }
    }
  }
</script>
```
:::

### 状态标签

:::demo 通过 `status` 属性可以快速使用内置的状态标签，包括 `success`（已处理）、`warning`（待处理）、`danger`（已取消）三种状态。

```html
<div>
  <h4>基础状态标签</h4>
  <el-tag status="success"></el-tag>
  <el-tag status="warning"></el-tag>
  <el-tag status="danger"></el-tag>
</div>

<div style="margin-top: 20px;">
  <h4>自定义文本的状态标签</h4>
  <el-tag status="success" round size="small">订单已完成</el-tag>
  <el-tag status="warning" round size="small">等待审核</el-tag>
  <el-tag status="danger" round size="small">订单已取消</el-tag>
</div>

<div style="margin-top: 20px;">
  <h4>不同尺寸</h4>
  <el-tag status="success" size="medium"></el-tag>
  <el-tag status="warning" size="mini"></el-tag>
  <el-tag status="danger" size="mini"></el-tag>
</div>

<div style="margin-top: 20px;">
  <h4>不同主题效果</h4>
  <div style="margin-bottom: 10px;">
    <span>Light: </span>
    <el-tag status="success" effect="light"></el-tag>
    <el-tag status="warning" effect="light"></el-tag>
    <el-tag status="danger" effect="light"></el-tag>
  </div>
  <div style="margin-bottom: 10px;">
    <span>Dark: </span>
    <el-tag status="success" effect="dark"></el-tag>
    <el-tag status="warning" effect="dark"></el-tag>
    <el-tag status="danger" effect="dark"></el-tag>
  </div>
  <div>
    <span>Plain: </span>
    <el-tag status="success" effect="plain"></el-tag>
    <el-tag status="warning" effect="plain"></el-tag>
    <el-tag status="danger" effect="plain"></el-tag>
  </div>
</div>
```
:::

### 带图标的标签

:::demo 可以通过 `icon` 属性设置图标类名，或使用 `icon` 插槽自定义图标内容。

```html
<div>
  <h4>使用 icon 属性</h4>
  <el-tag icon="el-icon-check" round size="small">已完成</el-tag>
  <el-tag type="success" icon="el-icon-check" round size="small">收藏</el-tag>
  <el-tag type="info" icon="el-icon-message" round size="small">消息</el-tag>
  <el-tag type="warning" icon="el-icon-warning" round size="small">警告</el-tag>
  <el-tag type="danger" icon="el-icon-close" round size="small">删除</el-tag>
</div>

<div style="margin-top: 20px;">
  <h4>使用 icon 插槽</h4>
  <el-tag type="primary">
    <template slot="icon">
      <i class="el-icon-check"></i>
    </template>
    自定义图标
  </el-tag>
  
  <el-tag type="success" round closable>
    <template slot="icon">
      <i class="el-icon-star-off"></i>
    </template>
    圆形带图标
  </el-tag>
</div>

<div style="margin-top: 20px;">
  <h4>不同尺寸的图标标签</h4>
  <el-tag icon="el-icon-check" size="medium">中等</el-tag>
  <el-tag icon="el-icon-check" size="small">小型</el-tag>
  <el-tag icon="el-icon-check" size="mini">迷你</el-tag>
</div>
```
:::

### 圆形标签

:::demo 通过设置 `round` 属性可以将标签设置为圆形样式。

```html
<el-tag type="primary" round>主要标签</el-tag>
<el-tag type="success" round>成功标签</el-tag>
<el-tag type="info" round>信息标签</el-tag>
<el-tag type="warning" round>警告标签</el-tag>
<el-tag type="danger" round>危险标签</el-tag>

<div style="margin-top: 20px;">
  <el-tag type="success" size="medium" round>中等标签</el-tag>
  <el-tag type="warning" size="small" round>小型标签</el-tag>
  <el-tag type="info" size="mini" round>迷你标签</el-tag>
</div>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 类型 | string | success/info/warning/danger | — |
| closable | 是否可关闭 | boolean | — | false |
| disable-transitions | 是否禁用渐变动画 | boolean | — | false |
| hit | 是否有边框描边 | boolean | — | false |
| color | 背景色 | string | — | — |
| size | 尺寸 | string | medium / small / mini | — |
| effect | 主题 | string | dark / light / plain | light |
| round | 是否为圆形 | boolean | — | false |
| icon | 图标类名 | string | — | — |
| status | 内置状态类型 | string | success / pending / cancel | — |


### Slots
| name | 说明 |
|------|--------|
| — | 自定义默认内容 |
| icon | 自定义图标 |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 点击 Tag 时触发的事件 | — |
| close | 关闭 Tag 时触发的事件 | — |
