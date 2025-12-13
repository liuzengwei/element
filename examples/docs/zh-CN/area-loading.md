## AreaLoading 区域加载 <version-badge version="2.15.5-xn.28" type="new"/>

区域加载组件，用于在特定区域显示加载状态，适用于局部内容加载场景。

### 基础用法

通过 `loading` 属性控制加载状态。

:::demo
```html
<template>
  <div>
    <el-area-loading :loading="loading">
      <div style="padding: 40px; background: #f5f7fa; text-align: center;">
        <p>这是一段需要加载的内容</p>
        <p>当loading为true时，会显示加载状态</p>
      </div>
    </el-area-loading>
    <el-button @click="loading = !loading" style="margin-top: 10px;">
      切换加载状态
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false
      }
    }
  }
</script>
```
:::

### 自定义文本

通过 `text` 属性设置加载提示文本。

:::demo
```html
<template>
  <div>
    <el-area-loading :loading="loading" text="加载中，请稍候...">
      <div style="padding: 40px; background: #f5f7fa; text-align: center;">
        <p>带有自定义文本的加载提示</p>
      </div>
    </el-area-loading>
    <el-button @click="loading = !loading" style="margin-top: 10px;">
      切换加载状态
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false
      }
    }
  }
</script>
```
:::

### 不同尺寸

通过 `size` 属性设置加载图标的大小，支持 `small`、`default`、`large` 三种尺寸。

:::demo
```html
<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <h4>小尺寸</h4>
      <el-area-loading :loading="true" text="小尺寸" size="small">
        <div style="padding: 30px; background: #f5f7fa; text-align: center;">
          <p>Small</p>
        </div>
      </el-area-loading>
    </el-col>
    <el-col :span="8">
      <h4>默认尺寸</h4>
      <el-area-loading :loading="true" text="默认尺寸">
        <div style="padding: 30px; background: #f5f7fa; text-align: center;">
          <p>Default</p>
        </div>
      </el-area-loading>
    </el-col>
    <el-col :span="8">
      <h4>大尺寸</h4>
      <el-area-loading :loading="true" text="大尺寸" size="large">
        <div style="padding: 30px; background: #f5f7fa; text-align: center;">
          <p>Large</p>
        </div>
      </el-area-loading>
    </el-col>
  </el-row>
</template>
```
:::

### 自定义样式

可以自定义背景色和加载图标。

:::demo
```html
<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <h4>自定义背景色</h4>
      <el-area-loading 
        :loading="loading1" 
        text="深色背景" 
        background="rgba(0, 0, 0, 0.8)">
        <div style="padding: 40px; background: #f5f7fa; text-align: center;">
          <p>深色背景的加载效果</p>
        </div>
      </el-area-loading>
      <el-button @click="loading1 = !loading1" style="margin-top: 10px;">
        切换加载状态
      </el-button>
    </el-col>
    <el-col :span="12">
      <h4>自定义图标</h4>
      <el-area-loading 
        :loading="loading2" 
        text="自定义图标" 
        spinner="el-icon-loading">
        <div style="padding: 40px; background: #f5f7fa; text-align: center;">
          <p>使用自定义图标</p>
        </div>
      </el-area-loading>
      <el-button @click="loading2 = !loading2" style="margin-top: 10px;">
        切换加载状态
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        loading1: false,
        loading2: false
      }
    }
  }
</script>
```
:::

### 内容模糊效果

通过 `blur` 属性开启内容模糊效果。

:::demo
```html
<template>
  <div>
    <el-area-loading 
      :loading="loading" 
      text="加载中，请稍候..." 
      :blur="true">
      <div style="padding: 40px; background: #f5f7fa;">
        <h5>文章标题</h5>
        <p>这是一段示例文本。当开启blur属性时，加载期间内容会变模糊。</p>
        <p>这提供了更好的视觉反馈效果，让用户知道当前内容不可交互。</p>
      </div>
    </el-area-loading>
    <el-button @click="loading = !loading" style="margin-top: 10px;">
      切换加载状态
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false
      }
    }
  }
</script>
```
:::

### 使用 ref 方法控制

通过 `ref` 调用组件的方法来控制加载状态。

:::demo
```html
<template>
  <div>
    <el-area-loading ref="areaLoading">
      <div style="padding: 40px; background: #f5f7fa; text-align: center;">
        <p>使用方法控制加载状态</p>
        <p>可以通过 ref 调用 show()、hide()、toggle() 等方法</p>
      </div>
    </el-area-loading>
    <div style="margin-top: 10px;">
      <el-button @click="$refs.areaLoading.show()">显示加载</el-button>
      <el-button @click="$refs.areaLoading.hide()">隐藏加载</el-button>
      <el-button @click="$refs.areaLoading.toggle()">切换状态</el-button>
      <el-button @click="$refs.areaLoading.setLoading(true)">设置为true</el-button>
    </div>
  </div>
</template>
```
:::

### 表格加载示例

在实际应用中，常用于表格数据加载。

:::demo
```html
<template>
  <div>
    <el-area-loading :loading="tableLoading" text="正在加载表格数据...">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-area-loading>
    <el-button @click="loadTableData" style="margin-top: 10px;">
      重新加载
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableLoading: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '李小龙',
          address: '上海市普陀区金沙江路 1517 弄'
        }]
      }
    },
    methods: {
      loadTableData() {
        this.tableLoading = true;
        setTimeout(() => {
          this.tableLoading = false;
        }, 2000);
      }
    }
  }
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| loading | 是否显示加载状态 | boolean | — | false |
| text | 加载文本提示 | string | — | — |
| spinner | 自定义spinner图标类名 | string | — | — |
| background | 遮罩背景色 | string | — | rgba(255, 255, 255, 0.9) |
| size | spinner大小 | string | small / default / large | default |
| blur | 加载时是否模糊内容 | boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| update:loading | loading 状态改变时触发 | 新的 loading 状态值 |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| show | 显示加载状态 | — |
| hide | 隐藏加载状态 | — |
| toggle | 切换加载状态 | — |
| setLoading | 设置加载状态 | (loading: boolean) |

### Slots
| name | 说明 |
|------|------|
| default | 需要显示loading的内容 |
