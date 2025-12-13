## Text 文本 <version-badge version="2.15.5-xn.29" type="new"/>

用于文本展示。

### 基础用法

基础的文本用法。

:::demo 使用 `type` 属性定义文本的类型。

```html
<div>
  <el-text>默认文本</el-text>
  <el-text type="primary">主要文本</el-text>
  <el-text type="success">成功文本</el-text>
  <el-text type="warning">警告文本</el-text>
  <el-text type="danger">危险文本</el-text>
  <el-text type="info">信息文本</el-text>
</div>
```

:::

### 文本尺寸

:::demo 使用 `size` 属性设置额外尺寸，可选值包括 `large`、`default` 或 `small`。

```html
<div>
  <el-text size="large">大型文本</el-text>
  <el-text>默认文本</el-text>
  <el-text size="small">小型文本</el-text>
</div>
```

:::

### 省略

:::demo 通过 `truncated` 属性，在文本超过视图或最大宽度设置时展示省略号。

```html
<div style="max-width: 200px">
  <el-text truncated>
    这是一段很长的文本，超出容器宽度后会自动省略，只显示一行内容
  </el-text>
</div>
```

:::

### 多行省略

:::demo 通过 `line-clamp` 属性控制多行省略，指定最大显示行数。

```html
<div style="max-width: 200px">
  <el-text :line-clamp="2">
    这是一段很长的文本，可以显示多行内容。当内容超过设定的行数时，会在末尾显示省略号。这个功能对于展示摘要信息非常有用。
  </el-text>
</div>
```

:::

### 覆盖元素标签

:::demo 使用 `tag` 属性覆盖默认的元素标签。

```html
<div>
  <el-text tag="p">段落文本 (p标签)</el-text>
  <el-text tag="div">块级文本 (div标签)</el-text>
  <el-text tag="b">粗体文本 (b标签)</el-text>
  <el-text tag="i">斜体文本 (i标签)</el-text>
</div>
```

:::

### 混合使用

:::demo 文本组件的混合使用示例。

```html
<div>
  <div style="margin-bottom: 10px">
    <el-text type="primary" size="large">主要大文本</el-text>
    <el-text type="success">成功文本</el-text>
  </div>
  <div style="max-width: 300px">
    <el-text type="warning" :line-clamp="2">
      这是一段警告类型的多行文本，最多显示两行内容，超出部分会被省略。这个功能在卡片组件中展示摘要信息时非常实用。
    </el-text>
  </div>
  <div style="margin-top: 10px">
    <el-text type="danger" tag="strong" size="small">
      危险小文本 (strong标签)
    </el-text>
  </div>
</div>
```

:::

### Attributes

| 参数        | 说明           | 类型                                                               | 可选值                              | 默认值  |
| ----------- | -------------- | ------------------------------------------------------------------ | ----------------------------------- | ------- |
| type        | 文本类型       | string                                                             | primary/success/warning/danger/info | —       |
| size        | 文本尺寸       | string                                                             | large/default/small                 | default |
| truncated   | 显示省略号     | boolean                                                            | —                                   | false   |
| line-clamp  | 最大行数       | string / number                                                    | —                                   | —       |
| tag         | 自定义元素标签 | string                                                             | —                                   | span    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
