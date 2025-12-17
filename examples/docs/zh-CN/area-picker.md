## AreaPicker 城市选择器

基于 Cascader 级联选择器实现的城市选择组件，支持省市区三级联动选择。

### 基础用法

:::demo 基础的城市选择器用法，默认支持省市区三级选择。
```html
<template>
  <el-area-picker v-model="value" placeholder="请选择省/市/区"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    };
  }
};
</script>
```
:::

### 级别选择

:::demo 通过 `level` 属性可以设置选择的级别，1-只选择省份，2-选择省市，3-选择省市区。
```html
<template>
  <div>
    <div class="block">
      <span class="demonstration">只选择省份</span>
      <el-area-picker v-model="provinceValue" :level="1" placeholder="请选择省份"></el-area-picker>
    </div>
    <div class="block">
      <span class="demonstration">选择省市</span>
      <el-area-picker v-model="cityValue" :level="2" placeholder="请选择省市"></el-area-picker>
    </div>
    <div class="block">
      <span class="demonstration">选择省市区</span>
      <el-area-picker v-model="areaValue" :level="3" placeholder="请选择省市区"></el-area-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinceValue: '',
      cityValue: '',
      areaValue: ''
    };
  }
};
</script>
```
:::

### 多选

:::demo 通过 `props.multiple` 属性可以启用多选模式。
```html
<template>
  <el-area-picker v-model="multipleValue" :props="{ multiple: true }" placeholder="请选择多个城市"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      multipleValue: []
    };
  }
};
</script>
```
:::

### 可选择任意级别

:::demo 通过 `props.checkStrictly` 属性可以设置是否严格的遵守父子不互相关联，可以选择任意一级选项。
```html
<template>
  <el-area-picker v-model="strictValue" :props="{ checkStrictly: true }" placeholder="请选择"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      strictValue: ''
    };
  }
};
</script>
```
:::

### 禁用状态

:::demo 通过 `disabled` 属性可以禁用城市选择器。
```html
<template>
  <el-area-picker v-model="disabledValue" :disabled="true" placeholder="禁用状态"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      disabledValue: '110000'
    };
  }
};
</script>
```
:::

### 可清空

:::demo 通过 `clearable` 属性可以设置是否可清空。
```html
<template>
  <el-area-picker v-model="clearableValue" :clearable="true" placeholder="可清空"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      clearableValue: '110101'
    };
  }
};
</script>
```
:::

### 可搜索

:::demo 通过 `filterable` 属性可以启用搜索功能。
```html
<template>
  <el-area-picker v-model="filterableValue" :filterable="true" placeholder="可搜索"></el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      filterableValue: ''
    };
  }
};
</script>
```
:::

### 自定义字段名

:::demo 通过 `value-key`、`label-key` 和 `children-key` 属性可以自定义选项的字段名。
```html
<template>
  <el-area-picker 
    v-model="customKeyValue" 
    :value-key="'id'"
    :label-key="'name'"
    :children-key="'items'"
    placeholder="自定义字段名">
  </el-area-picker>
</template>

<script>
export default {
  data() {
    return {
      customKeyValue: ''
    };
  }
};
</script>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value / v-model | 绑定值 | string / number / array | — | — |
| level | 级联选择器的级别，1-省，2-省市，3-省市区 | number | 1 / 2 / 3 | 3 |
| check-strictly | 是否严格的遵守父子不互相关联 | boolean | — | false |
| multiple | 是否多选 | boolean | — | false |
| placeholder | 输入框占位文本 | string | — | 请选择省/市/区 |
| size | 输入框大小 | string | medium / small / mini | — |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否可清空 | boolean | — | true |
| filterable | 是否可搜索 | boolean | — | true |
| separator | 选项分隔符 | string | — | / |
| show-all-levels | 是否显示完整的路径 | boolean | — | true |
| collapse-tags | 多选模式下是否折叠Tag | boolean | — | false |
| debounce | 搜索关键词输入的去抖延迟，毫秒 | number | — | 300 |
| before-filter | 搜索前的回调函数 | function | — | — |
| popper-class | 自定义浮层类名 | string | — | — |
| value-key | 指定选项的值字段名 | string | — | value |
| label-key | 指定选项的标签字段名 | string | — | text |
| children-key | 指定选项的子选项字段名 | string | — | children |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当选中值变化时触发 | 选中的值 |
| expand-change | 当展开节点发生变化时触发 | 各父级选项值组成的数组 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 在多选模式下，移除Tag时触发 | 移除的Tag对应的节点的值 |

### Methods
| 方法名      | 说明    | 参数 |
|---------- |-------- |---------- |
| getCheckedNodes | 获取选中的节点 | — |
| clear | 清空已选项 | — |
| toggleDropDownVisible | 切换下拉菜单的显示/隐藏 | visible |

### Slots
| 名称 | 说明 |
|------|--------|
| — | 自定义选项内容，参数为 { node, data } |
| empty | 无匹配选项时的内容 |
