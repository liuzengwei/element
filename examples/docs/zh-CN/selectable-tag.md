# SelectableTag 可选择标签

用于标记和选择，支持单选和多选模式。

### 基础用法

:::demo 使用 `v-model` 绑定选中值，在 `el-selectable-tag-group` 中设置 `multiple` 属性控制多选模式。

```html
<template>
  <el-selectable-tag-group v-model="selectedTags" :multiple="true">
    <el-selectable-tag label="标签一">标签一</el-selectable-tag>
    <el-selectable-tag label="标签二" type="success">标签二</el-selectable-tag>
    <el-selectable-tag label="标签三" type="warning">标签三</el-selectable-tag>
    <el-selectable-tag label="标签四" type="danger">标签四</el-selectable-tag>
    <el-selectable-tag label="标签五" type="info">标签五</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        selectedTags: ['标签一', '标签三']
      };
    }
  };
</script>
```

:::

### 单选模式

设置 `multiple` 为 `false` 启用单选模式。

:::demo

```html
<template>
  <el-selectable-tag-group v-model="selectedTag" :multiple="false">
    <el-selectable-tag label="选项A">选项A</el-selectable-tag>
    <el-selectable-tag label="选项B">选项B</el-selectable-tag>
    <el-selectable-tag label="选项C">选项C</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        selectedTag: '选项A'
      };
    }
  };
</script>
```

:::

### 不同效果

支持 `light`、`dark`、`plain` 三种效果。

:::demo 通过 `effect` 属性改变标签效果。

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h4>Light 效果（默认）</h4>
      <el-selectable-tag-group v-model="lightTags" effect="light" :multiple="true">
        <el-selectable-tag label="选项1">选项1</el-selectable-tag>
        <el-selectable-tag label="选项2" type="primary">选项2</el-selectable-tag>
        <el-selectable-tag label="选项3" type="success">选项3</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Dark 效果</h4>
      <el-selectable-tag-group v-model="darkTags" effect="dark" :multiple="true">
        <el-selectable-tag label="选项1">选项1</el-selectable-tag>
        <el-selectable-tag label="选项2" type="primary">选项2</el-selectable-tag>
        <el-selectable-tag label="选项3" type="success">选项3</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Plain 效果</h4>
      <el-selectable-tag-group v-model="plainTags" effect="plain" :multiple="true">
        <el-selectable-tag label="选项1">选项1</el-selectable-tag>
        <el-selectable-tag label="选项2" type="primary">选项2</el-selectable-tag>
        <el-selectable-tag label="选项3" type="success">选项3</el-selectable-tag>
      </el-selectable-tag-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lightTags: ['选项1'],
        darkTags: [],
        plainTags: []
      };
    }
  };
</script>
```

:::

### 不同尺寸

支持 `mini`、`small`、`medium`、`large` 四种尺寸。

:::demo 通过 `size` 属性设置标签尺寸。

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h4>Mini</h4>
      <el-selectable-tag-group v-model="miniTags" size="mini" :multiple="true">
        <el-selectable-tag label="迷你">迷你</el-selectable-tag>
        <el-selectable-tag label="小型">小型</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Small</h4>
      <el-selectable-tag-group v-model="smallTags" size="small" :multiple="true">
        <el-selectable-tag label="小型">小型</el-selectable-tag>
        <el-selectable-tag label="中型">中型</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Medium</h4>
      <el-selectable-tag-group v-model="mediumTags" size="medium" :multiple="true">
        <el-selectable-tag label="中型">中型</el-selectable-tag>
        <el-selectable-tag label="大型">大型</el-selectable-tag>
      </el-selectable-tag-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        miniTags: [],
        smallTags: [],
        mediumTags: []
      };
    }
  };
</script>
```

:::

### 带图标

通过 `icon` 属性设置图标。

:::demo

```html
<template>
  <el-selectable-tag-group v-model="iconTags" :multiple="true">
    <el-selectable-tag label="收藏" icon="el-icon-star-off">收藏</el-selectable-tag>
    <el-selectable-tag label="点赞" icon="el-icon-thumb">点赞</el-selectable-tag>
    <el-selectable-tag label="分享" icon="el-icon-share">分享</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        iconTags: ['收藏']
      };
    }
  };
</script>
```

:::

### 禁用状态

通过 `disabled` 属性禁用标签。

:::demo

```html
<template>
  <el-selectable-tag-group v-model="disabledTags" :multiple="true">
    <el-selectable-tag label="可选">可选</el-selectable-tag>
    <el-selectable-tag label="禁用" disabled>禁用</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        disabledTags: ['可选']
      };
    }
  };
</script>
```

:::

### SelectableTag Attributes

| 参数      | 说明    | 类型      | 可选值                           | 默认值  |
|---------- |-------- |---------- |-------------------------------- |-------- |
| value / v-model | 绑定值 | string / number / array | — | — |
| label | 标签值 | string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| type | 类型 | string | primary / success / warning / danger / info | — |
| size | 尺寸 | string | mini / small / medium | — |
| icon | 图标类名 | string | — | — |
| effect | 主题 | string | light / dark / plain | light |

### SelectableTag Events

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 点击标签时触发 | (event: Event) |
| change | 选中状态改变时触发 | (value: string | number | array, event: Event) |

### SelectableTagGroup Attributes

| 参数      | 说明    | 类型      | 可选值                           | 默认值  |
|---------- |-------- |---------- |-------------------------------- |-------- |
| value / v-model | 绑定值 | string / number / array | — | — |
| multiple | 是否多选 | boolean | — | true |
| disabled | 是否禁用所有标签 | boolean | — | false |
| min | 最少选中数量（多选模式） | number | — | — |
| max | 最多选中数量（多选模式） | number | — | — |
| size | 统一设置标签尺寸 | string | mini / small / medium | — |
| effect | 统一设置标签主题 | string | light / dark / plain | light |

### SelectableTagGroup Events

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值改变时触发 | (value: string | number | array) |
