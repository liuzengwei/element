## LazyLoad 懒加载

当组件进入可视区域时才加载内容，用于性能优化和延迟加载重组件。

> **💡 演示说明**：为了让懒加载效果更加明显，以下示例都添加了模拟的加载延迟（1-3秒），实际使用中内容会立即加载。

### 基础用法

默认情况下，内容在进入视口时加载，只加载一次。

:::demo 使用 `el-lazy-load` 包裹需要懒加载的内容。这里模拟了 2 秒的加载延迟，让你能更清楚地看到懒加载效果。

```html
<template>
  <el-lazy-load @load="handleLoad">
    <template #default>
      <div v-if="loaded" style="height: 200px; background: #409EFF; color: white; display: flex; align-items: center; justify-content: center;">
        <h3>✅ 我已经懒加载完成了！</h3>
      </div>
      <div v-else style="height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        <div>
          <i class="el-icon-loading" style="font-size: 30px; color: #409EFF;"></i>
          <p>正在加载中...</p>
        </div>
      </div>
    </template>
  </el-lazy-load>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      handleLoad() {
        // 模拟 2 秒加载延迟
        setTimeout(() => {
          this.loaded = true;
          this.$message.success('内容加载完成！');
        }, 2000);
      }
    }
  }
</script>
```
:::

### 骨架屏占位

使用 `show-skeleton` 属性显示加载前的骨架屏占位。

:::demo 这里模拟了 3 秒的加载延迟，让你能更清楚地看到骨架屏效果。

```html
<template>
  <el-lazy-load show-skeleton @load="handleLoad">
    <template #default>
      <el-card v-if="loaded">
        <div style="padding: 14px;">
          <h3>✅ 延迟加载的卡片</h3>
          <p>这是卡片内容，进入视口后才会渲染。</p>
          <p>模拟了 3 秒的加载延迟。</p>
        </div>
      </el-card>
    </template>
  </el-lazy-load>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      handleLoad() {
        // 模拟 3 秒加载延迟
        setTimeout(() => {
          this.loaded = true;
          this.$message.success('卡片加载完成！');
        }, 3000);
      }
    }
  }
</script>
```
:::

### 自定义占位内容

通过 `placeholder` 插槽自定义加载前显示的内容。

:::demo 这里模拟了 1.5 秒的加载延迟，展示了自定义占位内容的效果。

```html
<template>
  <el-lazy-load @load="handleLoad">
    <template #placeholder>
      <div style="height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; border: 2px dashed #ddd;">
        <div>
          <i class="el-icon-loading" style="font-size: 30px; color: #409EFF;"></i>
          <p>正在加载图片...</p>
          <p style="font-size: 12px; color: #999;">自定义占位内容</p>
        </div>
      </div>
    </template>
    <template #default>
      <el-image 
        v-if="loaded"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="cover"
        style="width: 100%; height: 200px;">
      </el-image>
    </template>
  </el-lazy-load>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      handleLoad() {
        // 模拟 1.5 秒加载延迟
        setTimeout(() => {
          this.loaded = true;
          this.$message.success('图片加载完成！');
        }, 1500);
      }
    }
  }
</script>
```
:::

### 提前加载

使用 `offset` 属性设置提前加载的距离。

:::demo 设置 `offset="200px"` 可以在距离视口还有 200px 时就开始加载。这里模拟了 1 秒的加载延迟。

```html
<template>
  <el-lazy-load offset="200px" @load="handleLoad">
    <template #default>
      <el-card v-if="loaded">
        <h4>⚡ 提前 200px 加载</h4>
        <p>当距离视口还有 200px 时就会开始加载内容</p>
        <p>模拟了 1 秒的加载延迟，让你能感受到提前加载的效果。</p>
      </el-card>
      <el-card v-else>
        <div style="padding: 20px; background: #e6f7ff; border-left: 4px solid #409EFF;">
          <p>🚀 正在提前加载内容...</p>
        </div>
      </el-card>
    </template>
  </el-lazy-load>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      handleLoad() {
        // 模拟 1 秒加载延迟
        setTimeout(() => {
          this.loaded = true;
          this.$message.success('提前加载完成！');
        }, 1000);
      }
    }
  }
</script>
```
:::

### 重复加载

设置 `once` 为 false，组件在离开和进入视口时会重复加载和卸载。

:::demo 这里展示了重复加载的效果，每次进入视口都会重新加载。

```html
<template>
  <div>
    <p>加载次数: {{ loadCount }}</p>
    <el-lazy-load :once="false" @load="handleLoad" @unload="handleUnload">
      <template #default>
        <el-alert
          v-if="loadCount > 0"
          title="可重复加载"
          type="success"
          :description="`滚出视口后会卸载，滚回来会重新加载。当前是第 ${loadCount} 次加载`"
          :closable="false">
        </el-alert>
        <el-card v-else>
          <div style="padding: 20px; background: #fffbe6; border-left: 4px solid #faad14;">
            <p>🔄 等待加载...</p>
          </div>
        </el-card>
      </template>
    </el-lazy-load>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loadCount: 0
      }
    },
    methods: {
      handleLoad() {
        this.loadCount++;
        this.$message.info(`第 ${this.loadCount} 次加载`);
      },
      handleUnload() {
        this.$message.warning('内容已卸载');
      }
    }
  }
</script>
```
:::

### 列表懒加载

在列表中使用懒加载优化长列表性能。

:::demo 这里展示了列表懒加载效果，每个列表项都有独立的加载状态和 2 秒延迟。

```html
<template>
  <div>
    <p>已加载项目: {{ loadedItems.length }} / 20</p>
    <div style="max-height: 400px; overflow-y: auto;">
      <el-lazy-load 
        v-for="i in 20" 
        :key="i" 
        offset="100px"
        show-skeleton
        style="margin-bottom: 10px;"
        @load="handleLoad(i)">
        <template #default>
          <el-card v-if="loadedItems.includes(i)">
            <h4>列表项 {{ i }}</h4>
            <p>这是第 {{ i }} 个列表项的内容</p>
            <el-tag type="success">已加载</el-tag>
          </el-card>
        </template>
      </el-lazy-load>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loadedItems: []
      }
    },
    methods: {
      handleLoad(index) {
        // 模拟 2 秒加载延迟
        setTimeout(() => {
          this.loadedItems.push(index);
          this.$message.success(`列表项 ${index} 加载完成`);
        }, 2000);
      }
    }
  }
</script>
```
:::

### 自定义滚动容器

使用 `scroll-container` 属性指定自定义的滚动容器，而不是使用 window 作为滚动容器。

:::demo 这里演示了如何在自定义的滚动容器中使用懒加载。

```html
<template>
  <div>
    <h4>自定义滚动容器示例</h4>
    <p>下面的容器有固定高度和滚动条，懒加载会基于这个容器而不是整个页面</p>
    
    <div 
      id="custom-scroll-container" 
      style="height: 300px; overflow-y: auto; border: 2px solid #ddd; padding: 20px;">
      
      <!-- 占位内容，确保需要滚动 -->
      <div style="height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
        <h3>👇 向下滚动查看懒加载内容</h3>
      </div>
      
      <!-- 懒加载内容 -->
      <el-lazy-load 
        scroll-container="#custom-scroll-container"
        offset="50px"
        @load="handleLoad">
        <template #default>
          <el-card v-if="loaded" style="margin-bottom: 20px;">
            <h4>✅ 在自定义容器中懒加载的内容</h4>
            <p>这个内容是基于自定义滚动容器而不是整个页面进行懒加载的</p>
            <p>滚动容器选择器: #custom-scroll-container</p>
            <p>提前加载距离: 50px</p>
          </el-card>
          <el-card v-else style="margin-bottom: 20px;">
            <div style="padding: 40px; background: #e6f7ff; text-align: center;">
              <i class="el-icon-loading" style="font-size: 30px; color: #409EFF;"></i>
              <p>正在加载中...</p>
            </div>
          </el-card>
        </template>
      </el-lazy-load>
      
      <!-- 更多占位内容 -->
      <div style="height: 400px; background: #f9f9f9; display: flex; align-items: center; justify-content: center;">
        <h3>更多内容</h3>
      </div>
      
      <!-- 第二个懒加载内容 -->
      <el-lazy-load 
        scroll-container="#custom-scroll-container"
        offset="100px"
        @load="handleLoad2">
        <template #default>
          <el-card v-if="loaded2" style="margin-bottom: 20px;">
            <h4>✅ 第二个懒加载项目</h4>
            <p>每个懒加载项目都可以独立配置</p>
          </el-card>
          <el-card v-else style="margin-bottom: 20px;">
            <div style="padding: 40px; background: #fffbe6; text-align: center;">
              <i class="el-icon-loading" style="font-size: 30px; color: #faad14;"></i>
              <p>等待加载...</p>
            </div>
          </el-card>
        </template>
      </el-lazy-load>
      
      <!-- 底部内容 -->
      <div style="height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
        <h3>🎉 滚动到底部了！</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false,
        loaded2: false
      }
    },
    methods: {
      handleLoad() {
        // 模拟 2 秒加载延迟
        setTimeout(() => {
          this.loaded = true;
          this.$message.success('第一个内容加载完成！');
        }, 2000);
      },
      handleLoad2() {
        // 模拟 1.5 秒加载延迟
        setTimeout(() => {
          this.loaded2 = true;
          this.$message.success('第二个内容加载完成！');
        }, 1500);
      }
    }
  }
</script>

<style scoped>
#custom-scroll-container {
  /* 确保滚动容器有明确的定位上下文 */
  position: relative;
}
</style>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| tag | 容器元素标签名 | string | — | div |
| threshold | 触发加载的可见比例阈值（0-1） | number | — | 0 |
| offset | 提前加载距离 | string | — | 0px |
| once | 是否只加载一次 | boolean | — | true |
| show-skeleton | 是否显示骨架屏占位 | boolean | — | false |
| scroll-container | 滚动容器选择器 | string | — | — |

### Slots
| name | 说明 |
|------|--------|
| — | 懒加载的内容 |
| placeholder | 自定义占位内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| load | 内容加载时触发 | — |
| unload | 内容卸载时触发（仅当 once 为 false 时） | — |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| reload | 手动重新加载内容 | — |
