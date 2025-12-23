## Segmented 分段控制器

显示多个选项，允许用户选择单个选项。

### 基础用法

设置 `v-model` 绑定选中的选项值。

:::demo

```html
<template>
  <div>
    <p>选中的值：{{ value1 }}</p>
    <el-segmented v-model="value1" :options="['每日', '每周', '每月', '每年']" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '每日'
    };
  }
};
</script>
```

:::

### 垂直方向

设置 `direction` 为 `vertical` 可以改变排列方向。

:::demo

```html
<template>
  <div>
    <p>选中的值：{{ value2 }}</p>
    <el-segmented 
      v-model="value2" 
      :options="['每日', '每周', '每月']"
      direction="vertical" 
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: '每日'
    };
  }
};
</script>
```

:::

### 禁用状态

设置 `disabled` 属性或者设置选项的 `disabled` 属性为 `true` 来禁用组件或选项。

:::demo

```html
<template>
  <div>
    <p>整体禁用：</p>
    <el-segmented v-model="value3" :options="['选项一', '选项二', '选项三']" disabled />
    
    <p style="margin-top: 20px;">部分选项禁用：</p>
    <el-segmented v-model="value4" :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value3: '选项一',
      value4: '选项一',
      options: [
        { label: '选项一', value: '选项一' },
        { label: '选项二', value: '选项二', disabled: true },
        { label: '选项三', value: '选项三' }
      ]
    };
  }
};
</script>
```

:::

### 自定义选项格式

当你的 `options` 格式与默认格式不同时，可以通过 `props` 属性自定义 `options` 的别名。

:::demo

```html
<template>
  <div>
    <p>选中的值：{{ value5 }}</p>
    <el-segmented 
      v-model="value5" 
      :options="customOptions"
      :props="{ value: 'id', label: 'name', disabled: 'isDisabled' }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value5: 1,
      customOptions: [
        { id: 1, name: '苹果' },
        { id: 2, name: '香蕉' },
        { id: 3, name: '橙子', isDisabled: true },
        { id: 4, name: '葡萄' }
      ]
    };
  }
};
</script>
```

:::

### 块级元素

设置 `block` 为 `true` 可以让分段控制器适应父元素的宽度。

:::demo

```html
<template>
  <div>
    <p>选中的值：{{ value6 }}</p>
    <el-segmented v-model="value6" :options="['选项一', '选项二', '选项三']" block />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value6: '选项一'
    };
  }
};
</script>
```

:::

### 自定义内容

使用默认插槽来渲染自定义内容。

:::demo

```html
<template>
  <div>
    <p>选中的值：{{ value7 }}</p>
    <el-segmented v-model="value7" :options="iconOptions">
      <template slot-scope="{ item }">
        <i :class="item.icon"></i>
        {{ item.label }}
      </template>
    </el-segmented>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value7: 'home',
      iconOptions: [
        { value: 'home', label: '首页', icon: 'el-icon-house' },
        { value: 'user', label: '用户', icon: 'el-icon-user' },
        { value: 'setting', label: '设置', icon: 'el-icon-setting' }
      ]
    };
  }
};
</script>
```

:::

### 横向撑满

设置 `stretch` 为 `true` 可以让容器横向撑满，但保持选项固定宽度。

:::demo

```html
<template>
  <div>
    <p>选中的值：{{ value11 }}</p>
    <el-segmented v-model="value11" :options="['选项一', '选项二', '选项三']" stretch />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value11: '选项一'
    };
  }
};
</script>
```

:::

### 不同尺寸

提供三种尺寸：大、默认、小。

:::demo

```html
<template>
  <div>
    <p>大尺寸：</p>
    <el-segmented v-model="value8" :options="['选项一', '选项二', '选项三']" size="large" />
    
    <p style="margin-top: 20px;">默认尺寸：</p>
    <el-segmented v-model="value9" :options="['选项一', '选项二', '选项三']" />
    
    <p style="margin-top: 20px;">小尺寸：</p>
    <el-segmented v-model="value10" :options="['选项一', '选项二', '选项三']" size="small" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value8: '选项一',
      value9: '选项一',
      value10: '选项一'
    };
  }
};
</script>
```

:::

### API

#### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| options | 选项数据 | array | — | [] |
| props | 配置选项，具体参见下表 | object | — | — |
| size | 尺寸 | string | large / default / small | — |
| block | 是否适应父元素宽度 | boolean | — | false |
| stretch | 是否横向撑满容器但保持选项固定宽度 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| validate-event | 是否触发表单验证 | boolean | — | true |
| name | 原生 name 属性 | string | — | — |
| id | 原生 id 属性 | string | — | — |
| aria-label | 原生 aria-label 属性 | string | — | — |
| direction | 显示方向 | string | horizontal / vertical | horizontal |

#### props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 指定选项值为选项对象的某个属性值 | string | value |
| label | 指定选项标签为选项对象的某个属性值 | string | label |
| disabled | 指定选项的禁用为选项对象的某个属性值 | string | disabled |

#### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | 选中的值 |

#### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 选项渲染器 | { item } |
