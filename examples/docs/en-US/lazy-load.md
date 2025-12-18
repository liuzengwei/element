## LazyLoad

Load content only when it enters the viewport, used for performance optimization and lazy loading of heavy components.

### Basic usage

By default, content is loaded when entering the viewport, only once.

:::demo Wrap the content you want to lazy load with `el-lazy-load`.

```html
<el-lazy-load>
  <div style="height: 200px; background: #409EFF; color: white; display: flex; align-items: center; justify-content: center;">
    <h3>I am lazy loaded content!</h3>
  </div>
</el-lazy-load>
```
:::

### Skeleton placeholder

Use `show-skeleton` prop to display a skeleton screen before loading.

:::demo 

```html
<el-lazy-load show-skeleton>
  <el-card>
    <div style="padding: 14px;">
      <h3>Lazy loaded card</h3>
      <p>This card content will be rendered after entering the viewport.</p>
    </div>
  </el-card>
</el-lazy-load>
```
:::

### Custom placeholder

Customize the loading placeholder using the `placeholder` slot.

:::demo

```html
<el-lazy-load>
  <template #placeholder>
    <div style="height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
      <i class="el-icon-loading" style="font-size: 30px; color: #409EFF;"></i>
    </div>
  </template>
  <el-image 
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    fit="cover"
    style="width: 100%; height: 200px;">
  </el-image>
</el-lazy-load>
```
:::

### Preload offset

Use the `offset` prop to set the preload distance.

:::demo Setting `offset="200px"` will start loading when 200px away from the viewport.

```html
<el-lazy-load offset="200px">
  <el-card>
    <h4>Preload 200px ahead</h4>
    <p>Content will start loading when 200px away from the viewport</p>
  </el-card>
</el-lazy-load>
```
:::

### Repeated loading

Set `once` to false to enable repeated loading and unloading when entering/leaving the viewport.

:::demo

```html
<template>
  <el-lazy-load :once="false" @load="handleLoad" @unload="handleUnload">
    <el-alert
      title="Repeatable loading"
      type="success"
      description="Will unload when leaving viewport and reload when coming back"
      :closable="false">
    </el-alert>
  </el-lazy-load>
</template>

<script>
  export default {
    methods: {
      handleLoad() {
        console.log('Content loaded');
      },
      handleUnload() {
        console.log('Content unloaded');
      }
    }
  }
</script>
```
:::

### List lazy loading

Use lazy loading in lists to optimize performance for long lists.

:::demo

```html
<div style="max-height: 400px; overflow-y: auto;">
  <el-lazy-load 
    v-for="i in 20" 
    :key="i" 
    offset="100px"
    show-skeleton
    style="margin-bottom: 10px;">
    <el-card>
      <h4>List Item {{ i }}</h4>
      <p>Content of list item {{ i }}</p>
    </el-card>
  </el-lazy-load>
</div>
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values                           | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| tag | container element tag name | string | — | div |
| threshold | visibility ratio threshold for triggering load (0-1) | number | — | 0 |
| offset | preload distance | string | — | 0px |
| once | whether to load only once | boolean | — | true |
| show-skeleton | whether to show skeleton placeholder | boolean | — | false |
| scroll-container | scroll container selector | string | — | — |

### Slots
| Name | Description |
|------|--------|
| — | lazy loaded content |
| placeholder | custom placeholder content |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| load | triggers when content is loaded | — |
| unload | triggers when content is unloaded (only when once is false) | — |

### Methods
| Method | Description | Parameters |
| ---- | ---- | ---- |
| reload | manually reload content | — |
