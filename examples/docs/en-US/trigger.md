## Trigger

Add hover, click, focus and other events to elements, and popup dropdown box. This is a low-level component, usually used to build other popup components.

### Basic Usage

The simplest usage.

:::demo Use the `trigger` attribute to set the trigger method, supporting four methods: `hover`, `click`, `focus`, and `contextMenu`.

```html
<div>
  <el-trigger trigger="hover" :show-arrow="true">
    <el-button>Hover Trigger</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>This is popup content</p>
        <p>Any content can be placed</p>
      </div>
    </template>
  </el-trigger>

  <el-trigger trigger="click" :show-arrow="true" style="margin-left: 10px;">
    <el-button>Click Trigger</el-button>
    <template slot="content">
      <div style="padding: 12px;">
        <p>Click to trigger popup</p>
      </div>
    </template>
  </el-trigger>
</div>
```
:::

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
|------|------|------|--------|--------|
| popup-visible / v-model | Whether the popup is visible | boolean | — | — |
| default-popup-visible | Whether the popup is visible by default (uncontrolled mode) | boolean | — | false |
| trigger | Trigger method | string | hover / click / focus / contextMenu | hover |
| position | Popup position | string | top / tl / tr / bottom / bl / br / left / lt / lb / right / rt / rb | bottom |
| disabled | Whether the trigger is disabled | boolean | — | false |
| popup-offset | Popup offset | number | — | 0 |
| show-arrow | Whether to show arrow | boolean | — | false |
| popup-hover-stay | Whether to keep the popup visible when moving to it | boolean | — | true |
| blur-to-close | Whether to close on blur | boolean | — | true |
| click-to-close | Whether to close on click | boolean | — | true |
| click-outside-to-close | Whether to close on outside click | boolean | — | true |
| content-class | Content class name | string / array / object | — | — |
| content-style | Content style | object | — | — |
| arrow-class | Arrow class name | string / array / object | — | — |
| arrow-style | Arrow style | object | — | — |
| popup-style | Popup style | object | — | — |
| animation-name | Animation name | string | — | fade-in-linear |
| mouse-enter-delay | Mouse enter delay (ms) | number | — | 100 |
| mouse-leave-delay | Mouse leave delay (ms) | number | — | 100 |
| auto-fit-popup-width | Whether to auto fit popup width | boolean | — | false |
| auto-fit-popup-min-width | Whether to auto fit popup min width | boolean | — | false |
| render-to-body | Whether to render to body | boolean | — | true |
| scroll-to-close | Whether to close on scroll | boolean | — | false |

### Events

| Event Name | Description | Parameters |
|--------|------|----------|
| popup-visible-change | Triggered when popup visibility changes | (visible: boolean) |
| show | Triggered after popup is shown (animation ends) | — |
| hide | Triggered after popup is hidden (animation ends) | — |

### Slots

| Name | Description |
|------|------|
| — | Trigger content |
| content | Popup content |

