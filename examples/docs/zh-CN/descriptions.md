## Descriptions 描述列表

列表形式展示多个字段。

### 基础用法

:::demo

```html
<el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
</el-descriptions>
```
:::

### 不同尺寸

:::demo

```html
<template>
  <el-radio-group v-model="size">
    <el-radio label="">默认</el-radio>
    <el-radio label="medium">中等</el-radio>
    <el-radio label="small">小型</el-radio>
    <el-radio label="mini">超小</el-radio>
  </el-radio-group>

  <el-descriptions class="margin-top" title="带边框列表" :column="3" :size="size" border>
    <template slot="extra">
      <el-button type="primary" size="small">操作</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>

  <el-descriptions class="margin-top" title="无边框列表" :column="3" :size="size">
    <template slot="extra">
      <el-button type="primary" size="small">操作</el-button>
    </template>
    <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
  </el-descriptions>
</template>

<script>
  export default {
    data () {
      return {
        size: ''
      };
    }
  }
</script>
```
:::

### 垂直列表

:::demo

```html
<el-descriptions title="垂直带边框列表" direction="vertical" :column="4" border>
  <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
  <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
  <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
  <el-descriptions-item label="备注">
    <el-tag size="small">学校</el-tag>
  </el-descriptions-item>
  <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
</el-descriptions>

<el-descriptions class="margin-top" title="垂直无边框列表" :column="4" direction="vertical">
  <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
  <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
  <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
  <el-descriptions-item label="备注">
    <el-tag size="small">学校</el-tag>
  </el-descriptions-item>
  <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
</el-descriptions>
```
:::

### 自定义样式

:::demo

```html
<el-descriptions title="自定义样式列表" :column="3" border>
  <el-descriptions-item label="用户名" label-class-name="my-label" content-class-name="my-content">kooriookami</el-descriptions-item>
  <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
  <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
  <el-descriptions-item label="备注">
    <el-tag size="small">学校</el-tag>
  </el-descriptions-item>
  <el-descriptions-item label="联系地址" :contentStyle="{'text-align': 'right'}">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
</el-descriptions>
<style>
  .my-label {
    background: #E1F3D8;
  }

  .my-content {
    background: #FDE2E2;
  }
</style>
```
:::

### 对齐方式

:::demo 通过设置 `justify` 属性，可以控制描述列表在容器中的对齐方式，支持 `left`（默认）、`center`、`right` 三种方式。常用于栅格布局中，让描述列表在指定列宽内居右或居中显示。

```html
<template>
  <div>
    <el-radio-group v-model="justify" style="margin-bottom: 20px;">
      <el-radio label="left">左对齐</el-radio>
      <el-radio label="center">居中</el-radio>
      <el-radio label="right">右对齐</el-radio>
    </el-radio-group>
    
    <el-descriptions title="基础示例" :column="2" :justify="justify" border>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <div class="margin-top" style="padding: 20px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">栅格布局应用场景</h4>
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="padding: 20px; background: white; border-radius: 4px; min-height: 200px;">
            <h3 style="margin-top: 0;">其他内容</h3>
            <p>这里是其他内容区域，占据 6 列宽度。</p>
            <el-button type="primary" size="small">操作按钮</el-button>
          </div>
        </el-col>
        <el-col :span="18">
          <el-descriptions :column="2" justify="right">
            <el-descriptions-item label="订单号">201607087777</el-descriptions-item>
            <el-descriptions-item label="创建时间" labelStyle="margin-left: 20px ">2026-01-27 14:30</el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        justify: 'left'
      };
    }
  }
</script>
```
:::

### 加载状态 <version-badge version="2.15.5-xn.30" type="feature"/>

:::demo 通过设置 `loading` 属性，可以让内容显示为骨架屏。设置 `animated` 属性可以让骨架屏产生动画效果。

```html
<template>
  <div>
    <el-switch v-model="loading" active-text="加载中"></el-switch>
    <el-switch v-model="animated" active-text="动画效果" style="margin-left: 20px;"></el-switch>
    
    <el-descriptions class="margin-top" title="用户信息" :column="3" :loading="loading" :animated="animated" border>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        animated: true
      };
    }
  }
</script>
```
:::

### Descriptions Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| border        | 是否带有边框         | boolean  |          —             |    false     |
| column        | 一行 `Descriptions Item` 的数量  | number | — |    3  |
| direction     | 排列的方向  | string | vertical / horizontal |    horizontal  |
| size          | 列表的尺寸    | string  |    medium / small / mini  |  — |
| title         | 标题文本，显示在左上方    | string  |    —  |  — |
| extra         | 操作区文本，显示在右上方    | string  |    —  |  — |
| colon         | 是否显示冒号    | boolean  |    —  |  true |
| labelClassName | 自定义标签类名    | string |    —  |  — |
| contentClassName | 自定义内容类名    | string |    —  | — |
| labelStyle | 自定义标签样式 | object |    —  | — |
| contentStyle | 自定义内容样式    | object |    —  | — |
| loading <version-badge version="2.15.5-xn.30" type="feature"/> | 是否显示加载状态（骨架屏）    | boolean |    —  | false |
| animated <version-badge version="2.15.5-xn.30" type="feature"/> | 骨架屏是否显示动画效果    | boolean |    —  | false |
| justify | 组件整体对齐方式    | string |  left / center / right  | left |

### Descriptions Slots

| Name | 说明 |
|------|--------|
| title | 自定义标题，显示在左上方  |
| extra | 自定义操作区，显示在右上方  |

### Descriptions Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| label          | 标签文本         | string  |          —             |    —     |
| span          | 列的数量         | number  |          —             |    1     |
| labelClassName | 自定义标签类名    | string |    —  |  — |
| contentClassName | 自定义内容类名    | string |    —  | — |
| labelStyle | 自定义标签样式 | object |    —  | — |
| contentStyle | 自定义内容样式    | object |    —  | — |

### Descriptions Item Slots

| Name | 说明 |
|------|--------|
| label | 自定义标签文本  |
