## Trigger 触发器

用于对元素添加 hover, click, focus 等事件，并且弹出下拉框。这是一个底层组件，通常用于构建其他弹出类组件。

### 基础用法

最简单的用法。

:::demo 通过 `trigger` 属性设置触发方式，支持 `hover`、`click`、`focus`、`contextMenu` 四种方式。

```html
<div>
  <el-trigger trigger="hover" :show-arrow="true">
    <el-button>Hover 触发</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>这是弹出内容</p>
        <p>可以放置任何内容</p>
      </div>
    </template>
  </el-trigger>

  <el-trigger trigger="click" :show-arrow="true" style="margin-left: 10px;">
    <el-button>Click 触发</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>点击触发弹出</p>
      </div>
    </template>
  </el-trigger>

  <el-trigger trigger="focus" :show-arrow="true" style="margin-left: 10px;">
    <el-button>Focus 触发</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>聚焦触发弹出</p>
      </div>
    </template>
  </el-trigger>

  <el-trigger trigger="contextMenu" :show-arrow="true" style="margin-left: 10px;">
    <el-button>右键触发</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>右键菜单</p>
        <p>可以用来实现自定义菜单</p>
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### 弹出位置

通过 `position` 属性设置弹出框的位置。

:::demo 支持 12 个方向：`top`、`tl`、`tr`、`bottom`、`bl`、`br`、`left`、`lt`、`lb`、`right`、`rt`、`rb`。

```html
<div style="padding: 100px;">
  <div style="margin-left: 70px; white-space: nowrap;">
    <el-trigger position="tl" :show-arrow="true">
      <el-button>TL</el-button>
      <template slot="content">
        <div style="padding: 12px;">Top Left</div>
      </template>
    </el-trigger>
    <el-trigger position="top" :show-arrow="true" style="margin-left: 10px;">
      <el-button>Top</el-button>
      <template slot="content">
        <div style="padding: 12px;">Top Center</div>
      </template>
    </el-trigger>
    <el-trigger position="tr" :show-arrow="true" style="margin-left: 10px;">
      <el-button>TR</el-button>
      <template slot="content">
        <div style="padding: 12px;">Top Right</div>
      </template>
    </el-trigger>
  </div>
  <div style="width: 70px; float: left;">
    <el-trigger position="lt" :show-arrow="true">
      <el-button>LT</el-button>
      <template slot="content">
        <div style="padding: 12px;">Left Top</div>
      </template>
    </el-trigger>
    <el-trigger position="left" :show-arrow="true" style="margin-top: 10px;">
      <el-button>Left</el-button>
      <template slot="content">
        <div style="padding: 12px;">Left Center</div>
      </template>
    </el-trigger>
    <el-trigger position="lb" :show-arrow="true" style="margin-top: 10px;">
      <el-button>LB</el-button>
      <template slot="content">
        <div style="padding: 12px;">Left Bottom</div>
      </template>
    </el-trigger>
  </div>
  <div style="margin-left: 280px; width: 70px;">
    <el-trigger position="rt" :show-arrow="true">
      <el-button>RT</el-button>
      <template slot="content">
        <div style="padding: 12px;">Right Top</div>
      </template>
    </el-trigger>
    <el-trigger position="right" :show-arrow="true" style="margin-top: 10px;">
      <el-button>Right</el-button>
      <template slot="content">
        <div style="padding: 12px;">Right Center</div>
      </template>
    </el-trigger>
    <el-trigger position="rb" :show-arrow="true" style="margin-top: 10px;">
      <el-button>RB</el-button>
      <template slot="content">
        <div style="padding: 12px;">Right Bottom</div>
      </template>
    </el-trigger>
  </div>
  <div style="margin-left: 70px; clear: both; white-space: nowrap; margin-top: 10px;">
    <el-trigger position="bl" :show-arrow="true">
      <el-button>BL</el-button>
      <template slot="content">
        <div style="padding: 12px;">Bottom Left</div>
      </template>
    </el-trigger>
    <el-trigger position="bottom" :show-arrow="true" style="margin-left: 10px;">
      <el-button>Bottom</el-button>
      <template slot="content">
        <div style="padding: 12px;">Bottom Center</div>
      </template>
    </el-trigger>
    <el-trigger position="br" :show-arrow="true" style="margin-left: 10px;">
      <el-button>BR</el-button>
      <template slot="content">
        <div style="padding: 12px;">Bottom Right</div>
      </template>
    </el-trigger>
  </div>
</div>
```
:::

### 受控模式

通过 `v-model` 或 `popup-visible` 控制弹出框的显示状态。

:::demo 使用 `v-model` 或 `popup-visible` 属性控制弹出框的显示状态。

```html
<div>
  <el-trigger v-model="visible1" trigger="click" :show-arrow="true">
    <el-button>受控模式</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>这是受控的弹出框</p>
        <el-button size="small" @click="visible1 = false">关闭</el-button>
      </div>
    </template>
  </el-trigger>
  <el-button style="margin-left: 10px;" @click="visible1 = !visible1">
    {{ visible1 ? '关闭' : '打开' }}弹出框
  </el-button>
</div>

<script>
export default {
  data() {
    return {
      visible1: false
    };
  }
};
</script>
```
:::

### Focus 触发交互

Focus 触发方式支持与弹出框内容交互，同时支持失焦或点击空白处关闭。

:::demo 当 `trigger` 为 `focus` 且 `popup-hover-stay` 为 `true` 时，失焦后鼠标移入弹出框可以保持显示状态，方便用户与弹出内容交互。失焦后会延迟关闭，如果不需要交互可设置 `popup-hover-stay` 为 `false` 立即关闭。点击空白处可立即关闭弹出框。

```html
<div>
  <el-trigger trigger="focus" :show-arrow="true" :popup-hover-stay="true">
    <el-input placeholder="支持与弹出框交互" style="width: 200px;"></el-input>
    <template slot="content">
      <div style="padding: 12px; width: 200px;">
        <p style="margin: 0 0 10px 0;">失焦后可点击按钮</p>
        <el-button size="small" type="primary">点击我</el-button>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #909399;">点击空白处关闭</p>
      </div>
    </template>
  </el-trigger>

  <el-trigger 
    trigger="focus" 
    :show-arrow="true" 
    :popup-hover-stay="false"
    style="margin-left: 10px;">
    <el-input placeholder="失焦立即关闭" style="width: 200px;"></el-input>
    <template slot="content">
      <div style="padding: 12px; width: 200px;">
        <p style="margin: 0;">失焦后立即关闭</p>
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### 右键菜单

ContextMenu 触发方式支持再次右键关闭。

:::demo 当 `trigger` 为 `contextMenu` 且 `click-to-close` 为 `true` 时，再次右键点击可以关闭弹出框。也支持点击外部关闭。

```html
<div>
  <el-trigger trigger="contextMenu" :show-arrow="true" :click-to-close="true">
    <el-button>右键打开菜单（再次右键可关闭）</el-button>
    <template slot="content">
      <div style="padding: 8px 0;">
        <div style="padding: 8px 16px; cursor: pointer;" @click="handleMenuClick('copy')">
          <i class="el-icon-document-copy"></i> 复制
        </div>
        <div style="padding: 8px 16px; cursor: pointer;" @click="handleMenuClick('paste')">
          <i class="el-icon-document"></i> 粘贴
        </div>
        <div style="padding: 8px 16px; cursor: pointer;" @click="handleMenuClick('delete')">
          <i class="el-icon-delete"></i> 删除
        </div>
      </div>
    </template>
  </el-trigger>

  <el-trigger 
    trigger="contextMenu" 
    :show-arrow="true" 
    :click-to-close="false"
    style="margin-left: 10px;">
    <el-button>右键打开（仅点击外部关闭）</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p style="margin: 0;">再次右键不会关闭</p>
      </div>
    </template>
  </el-trigger>
</div>

<script>
export default {
  methods: {
    handleMenuClick(action) {
      this.$message.info(`点击了：${action}`);
    }
  }
};
</script>
```
:::

### 延时触发

通过 `mouse-enter-delay` 和 `mouse-leave-delay` 设置延时。

:::demo 鼠标移入移出都可以设置延时时间（毫秒）。

```html
<div>
  <el-trigger 
    trigger="hover" 
    :show-arrow="true"
    :mouse-enter-delay="500"
    :mouse-leave-delay="500">
    <el-button>延时 500ms</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>鼠标移入延时 500ms 显示</p>
        <p>鼠标移出延时 500ms 隐藏</p>
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### 自适应宽度

通过 `auto-fit-popup-width` 或 `auto-fit-popup-min-width` 自动适配宽度。

:::demo 弹出框可以自动匹配触发器的宽度。

```html
<div>
  <el-trigger 
    trigger="click" 
    :show-arrow="true"
    :auto-fit-popup-width="true">
    <el-button style="width: 300px;">自动适配宽度</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        弹出框宽度与按钮相同
      </div>
    </template>
  </el-trigger>

  <el-trigger 
    trigger="click" 
    :show-arrow="true"
    :auto-fit-popup-min-width="true"
    style="margin-left: 10px;">
    <el-button style="width: 200px;">自动适配最小宽度</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        弹出框最小宽度与按钮相同，内容超出会自动扩展
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### 禁用状态

设置 `disabled` 属性可以禁用触发器。

:::demo 禁用后不会响应任何触发事件。

```html
<div>
  <el-trigger trigger="hover" :show-arrow="true" :disabled="true">
    <el-button disabled>禁用状态</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        这个不会显示
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### 自定义样式

通过 `content-class`、`content-style`、`arrow-class`、`arrow-style` 等属性自定义样式。

:::demo 可以为弹出框和箭头设置自定义样式。

```html
<div>
  <el-trigger 
    trigger="hover" 
    :show-arrow="true"
    content-class="custom-popup"
    :content-style="{ background: '#303133', color: '#fff', border: 'none' }"
    :arrow-style="{ borderTopColor: '#303133' }">
    <el-button>自定义样式</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        深色主题弹出框
      </div>
    </template>
  </el-trigger>
</div>

<style>
.custom-popup {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
}
</style>
```
:::

### 滚动时关闭

通过 `scroll-to-close` 属性设置滚动时关闭弹出框。

:::demo 当页面滚动时，自动关闭弹出框。

```html
<div>
  <el-trigger 
    trigger="click" 
    :show-arrow="true"
    :scroll-to-close="true">
    <el-button>滚动时关闭</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>尝试滚动页面</p>
        <p>弹出框会自动关闭</p>
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| popup-visible / v-model | 弹出框是否可见 | boolean | — | — |
| default-popup-visible | 弹出框默认是否可见（非受控模式） | boolean | — | false |
| trigger | 触发方式 | string | hover / click / focus / contextMenu | hover |
| position | 弹出位置 | string | top / tl / tr / bottom / bl / br / left / lt / lb / right / rt / rb | bottom |
| disabled | 触发器是否禁用 | boolean | — | false |
| popup-offset | 弹出框的偏移量 | number | — | 0 |
| popup-translate | 弹出框的移动距离 | Array / Object | — | — |
| show-arrow | 弹出框是否显示箭头 | boolean | — | false |
| align-point | 弹出框是否跟随鼠标 | boolean | — | false |
| popup-hover-stay | 是否在移出触发器，并移入弹出框时保持弹出框显示（hover 和 focus 模式有效） | boolean | — | true |
| blur-to-close | 是否在触发器失去焦点时关闭弹出框（focus 模式有效） | boolean | — | true |
| click-to-close | 是否在点击/右键触发器时关闭弹出框（click 和 contextMenu 模式有效） | boolean | — | true |
| click-outside-to-close | 是否在点击外部区域时关闭弹出框 | boolean | — | true |
| unmount-on-close | 是否在关闭时卸载弹出框节点 | boolean | — | true |
| content-class | 弹出框内容的类名 | string / array / object | — | — |
| content-style | 弹出框内容的样式 | object | — | — |
| arrow-class | 弹出框箭头的类名 | string / array / object | — | — |
| arrow-style | 弹出框箭头的样式 | object | — | — |
| popup-style | 弹出框的样式 | object | — | — |
| animation-name | 弹出动画的name | string | — | fade-in-linear |
| duration | 弹出动画的持续时间 | number / object | — | — |
| mouse-enter-delay | mouseenter事件延时触发的时间（毫秒） | number | — | 100 |
| mouse-leave-delay | mouseleave事件延时触发的时间（毫秒） | number | — | 100 |
| focus-delay | focus事件延时触发的时间（毫秒） | number | — | 0 |
| auto-fit-popup-width | 是否将弹出框宽度设置为触发器宽度 | boolean | — | false |
| auto-fit-popup-min-width | 是否将弹出框的最小宽度设置为触发器宽度 | boolean | — | false |
| auto-fix-position | 当触发器的尺寸发生变化时，是否重新计算弹出框位置 | boolean | — | true |
| popup-container | 弹出框的挂载容器 | string / HTMLElement | — | — |
| update-at-scroll | 是否在容器滚动时更新弹出框的位置 | boolean | — | false |
| auto-fit-position | 是否自动调整弹出框位置，以适应窗口大小 | boolean | — | true |
| render-to-body | 是否挂载在 `body` 元素下 | boolean | — | true |
| prevent-focus | 是否阻止弹出层中的元素点击时获取焦点 | boolean | — | false |
| scroll-to-close | 是否在滚动时关闭弹出框 | boolean | — | false |
| scroll-to-close-distance | 滚动阈值，当滚动距离超过该值时触发关闭 | number | — | 0 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| popup-visible-change | 弹出框显示状态改变时触发 | (visible: boolean) |
| show | 弹出框显示后（动画结束）触发 | — |
| hide | 弹出框隐藏后（动画结束）触发 | — |

### Slots

| 名称 | 说明 |
|------|------|
| — | 触发器的内容 |
| content | 弹出框内容 |

