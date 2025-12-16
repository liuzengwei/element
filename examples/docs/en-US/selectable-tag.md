# SelectableTag

Selectable tags for marking and selection, supporting both single and multiple selection modes.

### Basic Usage

:::demo Use `v-model` to bind the selected value. Set the `multiple` attribute on `el-selectable-tag-group` to control multiple selection mode.

```html
<template>
  <el-selectable-tag-group v-model="selectedTags" :multiple="true">
    <el-selectable-tag label="Tag 1">Tag 1</el-selectable-tag>
    <el-selectable-tag label="Tag 2" type="success">Tag 2</el-selectable-tag>
    <el-selectable-tag label="Tag 3" type="warning">Tag 3</el-selectable-tag>
    <el-selectable-tag label="Tag 4" type="danger">Tag 4</el-selectable-tag>
    <el-selectable-tag label="Tag 5" type="info">Tag 5</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        selectedTags: ['Tag 1', 'Tag 3']
      };
    }
  };
</script>
```

:::

### Single Selection

Set `multiple` to `false` to enable single selection mode.

:::demo

```html
<template>
  <el-selectable-tag-group v-model="selectedTag" :multiple="false">
    <el-selectable-tag label="Option A">Option A</el-selectable-tag>
    <el-selectable-tag label="Option B">Option B</el-selectable-tag>
    <el-selectable-tag label="Option C">Option C</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        selectedTag: 'Option A'
      };
    }
  };
</script>
```

:::

### Different Effects

Supports `light`, `dark`, and `plain` effects.

:::demo Use the `effect` attribute to change the tag effect.

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h4>Light Effect (Default)</h4>
      <el-selectable-tag-group v-model="lightTags" effect="light" :multiple="true">
        <el-selectable-tag label="Option 1">Option 1</el-selectable-tag>
        <el-selectable-tag label="Option 2" type="primary">Option 2</el-selectable-tag>
        <el-selectable-tag label="Option 3" type="success">Option 3</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Dark Effect</h4>
      <el-selectable-tag-group v-model="darkTags" effect="dark" :multiple="true">
        <el-selectable-tag label="Option 1">Option 1</el-selectable-tag>
        <el-selectable-tag label="Option 2" type="primary">Option 2</el-selectable-tag>
        <el-selectable-tag label="Option 3" type="success">Option 3</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Plain Effect</h4>
      <el-selectable-tag-group v-model="plainTags" effect="plain" :multiple="true">
        <el-selectable-tag label="Option 1">Option 1</el-selectable-tag>
        <el-selectable-tag label="Option 2" type="primary">Option 2</el-selectable-tag>
        <el-selectable-tag label="Option 3" type="success">Option 3</el-selectable-tag>
      </el-selectable-tag-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lightTags: ['Option 1'],
        darkTags: [],
        plainTags: []
      };
    }
  };
</script>
```

:::

### Different Sizes

Supports `mini`, `small`, `medium`, and `large` sizes.

:::demo Use the `size` attribute to set the tag size.

```html
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h4>Mini</h4>
      <el-selectable-tag-group v-model="miniTags" size="mini" :multiple="true">
        <el-selectable-tag label="Mini">Mini</el-selectable-tag>
        <el-selectable-tag label="Small">Small</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Small</h4>
      <el-selectable-tag-group v-model="smallTags" size="small" :multiple="true">
        <el-selectable-tag label="Small">Small</el-selectable-tag>
        <el-selectable-tag label="Medium">Medium</el-selectable-tag>
      </el-selectable-tag-group>
    </div>

    <div style="margin-bottom: 20px;">
      <h4>Medium</h4>
      <el-selectable-tag-group v-model="mediumTags" size="medium" :multiple="true">
        <el-selectable-tag label="Medium">Medium</el-selectable-tag>
        <el-selectable-tag label="Large">Large</el-selectable-tag>
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

### With Icons

Set icons using the `icon` attribute.

:::demo

```html
<template>
  <el-selectable-tag-group v-model="iconTags" :multiple="true">
    <el-selectable-tag label="Favorite" icon="el-icon-star-off">Favorite</el-selectable-tag>
    <el-selectable-tag label="Like" icon="el-icon-thumb">Like</el-selectable-tag>
    <el-selectable-tag label="Share" icon="el-icon-share">Share</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        iconTags: ['Favorite']
      };
    }
  };
</script>
```

:::

### Disabled State

Disable tags using the `disabled` attribute.

:::demo

```html
<template>
  <el-selectable-tag-group v-model="disabledTags" :multiple="true">
    <el-selectable-tag label="Selectable">Selectable</el-selectable-tag>
    <el-selectable-tag label="Disabled" disabled>Disabled</el-selectable-tag>
  </el-selectable-tag-group>
</template>

<script>
  export default {
    data() {
      return {
        disabledTags: ['Selectable']
      };
    }
  };
</script>
```

:::

### SelectableTag Attributes

| Attribute | Description | Type | Accepted Values | Default |
|---------- |-------- |---------- |-------------------------------- |-------- |
| value / v-model | binding value | string / number / array | — | — |
| label | tag value | string / number | — | — |
| disabled | whether the tag is disabled | boolean | — | false |
| type | tag type | string | primary / success / warning / danger / info | — |
| size | tag size | string | mini / small / medium | — |
| icon | icon class name | string | — | — |
| effect | tag theme | string | light / dark / plain | light |

### SelectableTag Events

| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| click | triggers when a tag is clicked | (event: Event) |
| change | triggers when the selected state changes | (value: string | number | array, event: Event) |

### SelectableTagGroup Attributes

| Attribute | Description | Type | Accepted Values | Default |
|---------- |-------- |---------- |-------------------------------- |-------- |
| value / v-model | binding value | string / number / array | — | — |
| multiple | whether multiple selection is enabled | boolean | — | true |
| disabled | whether all tags are disabled | boolean | — | false |
| min | minimum number of selected tags (multiple mode) | number | — | — |
| max | maximum number of selected tags (multiple mode) | number | — | — |
| size | unified tag size | string | mini / small / medium | — |
| effect | unified tag theme | string | light / dark / plain | light |

### SelectableTagGroup Events

| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| change | triggers when the selected value changes | (value: string | number | array) |
