## Amount 金额显示

用于显示金额数据，支持货币符号、千分位分隔、万元/亿元换算等功能。

### 基础用法

基本的金额显示，默认显示人民币符号和千分位分隔。

:::demo
```html
<div>
  <el-amount :value="12345.67"></el-amount>
</div>
```
:::

### 缺省状态

当数值为空时显示缺省状态。

:::demo 默认显示 `¥-`，可以自定义缺省文本。
```html
<div>
  <el-amount :value="null"></el-amount>
  <el-amount :value="undefined" placeholder="--"></el-amount>
  <el-amount :value="''" placeholder="暂无" :placeholder-show-currency="false"></el-amount>
</div>
```
:::

### 万元换算

支持自动换算为万元、亿元显示。

:::demo 当数值大于等于阈值时自动转换。
```html
<div>
  <el-amount :value="10000" convert-to-wan></el-amount>
  <el-amount :value="12345" convert-to-wan></el-amount>
  <el-amount :value="150000000" convert-to-wan convert-to-yi></el-amount>
  <el-amount :value="9999" convert-to-wan></el-amount>
</div>
```
:::

### 正负值显示

支持区分正负值的颜色显示。

:::demo
```html
<div>
  <el-amount :value="12345.67" colorful show-plus></el-amount>
  <el-amount :value="-1234.56" colorful></el-amount>
  <el-amount :value="0" colorful></el-amount>
</div>
```
:::

### 自定义前缀和后缀

支持添加前缀和后缀文本。

:::demo
```html
<div>
  <el-amount :value="88888.88" prefix="余额："></el-amount>
  <el-amount :value="12345.67" suffix="元"></el-amount>
  <el-amount :value="50000" convert-to-wan suffix="元"></el-amount>
</div>
```
:::

### 货币符号配置

支持自定义货币符号和位置。

:::demo
```html
<div>
  <el-amount :value="1234.56" currency="$"></el-amount>
  <el-amount :value="1234.56" currency="€" currency-position="suffix"></el-amount>
  <el-amount :value="1234.56" :show-currency="false"></el-amount>
</div>
```
:::

### 格式化选项

支持自定义千分位分隔符、小数点分隔符等。

:::demo
```html
<div>
  <el-amount :value="12345.67" group-separator=" "></el-amount>
  <el-amount :value="12345.67" decimal-separator=","></el-amount>
  <el-amount :value="100" :pad-decimal="false"></el-amount>
  <el-amount :value="12345.678" :precision="3"></el-amount>
</div>
```
:::

### 样式定制

支持对各个部分进行样式定制。

:::demo
```html
<div>
  <el-amount 
    :value="88888.88"
    prefix="总额："
    suffix="元"
    :prefix-style="{ color: '#909399', fontSize: '14px' }"
    :currency-style="{ fontSize: '20px', fontWeight: 'bold', color: '#FF6600' }"
    :value-style="{ fontSize: '28px', fontWeight: 'bold', color: '#FF6600' }"
    :suffix-style="{ color: '#606266', fontSize: '14px' }">
  </el-amount>
</div>

<style>
.custom-amount .el-amount__value {
  color: #409EFF;
  font-size: 24px;
}
</style>

<div class="custom-amount" style="margin-top: 20px;">
  <el-amount :value="12345.67" value-class="custom-value"></el-amount>
</div>
```
:::

### 带标题

显示标题信息。

:::demo
```html
<div>
  <el-amount title="账户余额" :value="88888.88"></el-amount>
</div>
```
:::

### 默认插槽

使用默认插槽完全自定义显示内容。

:::demo
```html
<div>
  <el-amount :value="12345.67">
    <template slot-scope="{ formattedValue, currency, rawValue }">
      <span style="color: #FF6600; font-weight: bold;">
        {{ currency }}{{ formattedValue }} 元整
      </span>
    </template>
  </el-amount>
</div>
```
:::

### 动画效果

支持数字滚动动画。

:::demo
```html
<div>
  <el-button @click="randomAmount">随机金额</el-button>
  <div style="margin-top: 10px;">
    <el-amount :value="amount" animated :duration="2000"></el-amount>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        amount: 12345.67
      };
    },
    methods: {
      randomAmount() {
        this.amount = Math.floor(Math.random() * 1000000) / 100;
      }
    }
  };
</script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value | 金额数值 | number / string | — | undefined |
| title | 标题 | string | — | — |
| precision | 小数精度 | number | — | 2 |
| placeholder | 缺省状态显示文本 | string | — | - |
| placeholder-show-currency | 缺省状态是否显示货币符号 | boolean | — | true |
| currency | 货币符号 | string | — | ¥ |
| show-currency | 是否显示货币符号 | boolean | — | true |
| currency-position | 货币符号位置 | string | prefix / suffix | prefix |
| convert-to-wan | 是否启用万元换算 | boolean | — | false |
| wan-threshold | 万元换算阈值 | number | — | 10000 |
| wan-unit | 万元单位文本 | string | — | 万 |
| wan-precision | 万元转换后的精度 | number | — | 2 |
| convert-to-yi | 是否启用亿元换算 | boolean | — | false |
| yi-threshold | 亿元换算阈值 | number | — | 100000000 |
| yi-unit | 亿元单位文本 | string | — | 亿 |
| yi-precision | 亿元转换后的精度 | number | — | 2 |
| group-separator | 千分位分隔符 | string | — | , |
| decimal-separator | 小数点分隔符 | string | — | . |
| show-group-separator | 是否显示千分位分隔符 | boolean | — | true |
| pad-decimal | 是否补齐小数位 | boolean | — | true |
| prefix | 前缀文本 | string | — | — |
| suffix | 后缀文本 | string | — | — |
| show-plus | 是否显示正号 + | boolean | — | false |
| colorful | 是否使用颜色区分正负值 | boolean | — | false |
| positive-color | 正值颜色 | string | — | #67C23A |
| negative-color | 负值颜色 | string | — | #F56C6C |
| zero-color | 零值颜色 | string | — | #606266 |
| prefix-style | 前缀样式 | object | — | — |
| prefix-class | 前缀类名 | string | — | — |
| currency-style | 货币符号样式 | object | — | — |
| currency-class | 货币符号类名 | string | — | — |
| value-style | 金额主体样式 | object | — | — |
| value-class | 金额主体类名 | string | — | — |
| unit-style | 单位样式 | object | — | — |
| unit-class | 单位类名 | string | — | — |
| suffix-style | 后缀样式 | object | — | — |
| suffix-class | 后缀类名 | string | — | — |
| placeholder-style | 缺省状态样式 | object | — | { color: '#C0C4CC' } |
| placeholder-class | 缺省状态类名 | string | — | — |
| animated | 是否启用数字滚动动画 | boolean | — | false |
| duration | 动画持续时间（毫秒） | number | — | 2000 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|------|----------|
| change | 数值变化时触发 | (value: number) |
| animation-end | 动画结束时触发 | — |

### Slots
| name | 说明 |
|------|------|
| — | 默认插槽，自定义显示内容，参数为 { formattedValue, rawValue, currency, unit, isEmpty } |
| title | 自定义标题 |
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |
| placeholder | 自定义缺省状态显示 |

### Methods
| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| format | 获取格式化后的金额字符串 | — | string |
| resetAnimation | 重置动画 | — | — |
