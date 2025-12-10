## 表头吸顶

当表格内容较长需要滚动页面时，可以使用 `header-affixed-top` 属性让表头固定在页面顶部。

### 基础用法

设置 `header-affixed-top` 为 `true` 即可开启表头吸顶功能。

:::demo 向下滚动页面查看效果。
```html
<el-table
  :data="tableData"
  :header-affixed-top="true"
  border
  style="width: 100%">
  <el-table-column
    prop="date"
    label="日期"
    width="180">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名"
    width="180">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地址">
  </el-table-column>
</el-table>

<script>
  export default {
    data() {
      return {
        tableData: Array(50).fill(null).map((_, index) => ({
          date: '2016-05-0' + (index % 9 + 1),
          name: '王小虎 ' + index,
          address: '上海市普陀区金沙江路 ' + (1518 + index) + ' 弄'
        }))
      }
    }
  }
</script>
```
:::

### 设置偏移量

可以通过对象配置 `offsetTop` 来设置吸顶时距离页面顶部的距离。

:::demo 适用于页面顶部有固定导航栏的场景。
```html
<div style="height: 60px; background: #409EFF; color: white; line-height: 60px; text-align: center; position: fixed; top: 0; left: 0; right: 0; z-index: 1000;">
  固定导航栏 (高度 60px)
</div>
<div style="margin-top: 80px;">
  <el-table
    :data="tableData"
    :header-affixed-top="{ offsetTop: 60 }"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</div>

<script>
  export default {
    data() {
      return {
        tableData: Array(50).fill(null).map((_, index) => ({
          date: '2016-05-0' + (index % 9 + 1),
          name: '王小虎 ' + index,
          address: '上海市普陀区金沙江路 ' + (1518 + index) + ' 弄'
        }))
      }
    }
  }
</script>
```
:::

### 带固定列的表头吸顶

表头吸顶功能支持固定列，吸顶时固定列也会一起吸顶。

:::demo
```html
<el-table
  :data="tableData"
  :header-affixed-top="true"
  border
  style="width: 100%">
  <el-table-column
    fixed
    prop="date"
    label="日期"
    width="150">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名"
    width="120">
  </el-table-column>
  <el-table-column
    prop="province"
    label="省份"
    width="120">
  </el-table-column>
  <el-table-column
    prop="city"
    label="市区"
    width="120">
  </el-table-column>
  <el-table-column
    prop="address"
    label="地址"
    width="300">
  </el-table-column>
  <el-table-column
    prop="zip"
    label="邮编"
    width="120">
  </el-table-column>
  <el-table-column
    fixed="right"
    label="操作"
    width="120">
    <template slot-scope="scope">
      <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      <el-button type="text" size="small">编辑</el-button>
    </template>
  </el-table-column>
</el-table>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        tableData: Array(50).fill(null).map((_, index) => ({
          date: '2016-05-0' + (index % 9 + 1),
          name: '王小虎 ' + index,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 ' + (1518 + index) + ' 弄',
          zip: 200333
        }))
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| header-affixed-top | 表头是否吸顶，可以传 `true` 或传入对象配置 `{ offsetTop: 60 }` | boolean / object | — | false |

### header-affixed-top 对象配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| offsetTop | 吸顶时距离页面顶部的距离（单位：px） | number | — | 0 |
