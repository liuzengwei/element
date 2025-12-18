<template>
  <component :is="tag" ref="container" class="el-lazy-load">
    <slot v-if="isLoaded" />
    <div v-else class="el-lazy-load__placeholder">
      <slot name="placeholder">
        <div v-if="showSkeleton" class="el-lazy-load__skeleton"></div>
      </slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'ElLazyLoad',

  componentName: 'ElLazyLoad',

  props: {
    // 容器标签名
    tag: {
      type: String,
      default: 'div'
    },
    // 触发阈值，0-1 之间，表示目标元素可见比例
    threshold: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0 && val <= 1;
      }
    },
    // 提前加载距离（像素）
    offset: {
      type: String,
      default: '0px'
    },
    // 是否只加载一次
    once: {
      type: Boolean,
      default: true
    },
    // 是否显示骨架屏
    showSkeleton: {
      type: Boolean,
      default: false
    },
    // 滚动容器（CSS 选择器）
    scrollContainer: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isLoaded: false,
      observer: null
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.initObserver();
    });
  },

  beforeDestroy() {
    this.destroyObserver();
  },

  methods: {
    initObserver() {
      // 检测 IntersectionObserver 支持
      if (typeof IntersectionObserver === 'undefined') {
        // 不支持则直接加载
        this.loadContent();
        return;
      }

      const options = {
        threshold: this.threshold,
        rootMargin: this.offset
      };

      // 设置滚动容器
      if (this.scrollContainer) {
        const root = document.querySelector(this.scrollContainer);
        if (root) {
          options.root = root;
        }
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadContent();
            if (this.once) {
              this.destroyObserver();
            }
          } else if (!this.once && this.isLoaded) {
            // 如果不是只加载一次，离开视口时可以卸载
            this.isLoaded = false;
            this.$emit('unload');
          }
        });
      }, options);

      if (this.$refs.container) {
        this.observer.observe(this.$refs.container);
      }
    },

    loadContent() {
      if (!this.isLoaded) {
        this.isLoaded = true;
        this.$emit('load');
      }
    },

    destroyObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },

    // 手动重新加载
    reload() {
      this.isLoaded = false;
      this.$nextTick(() => {
        this.initObserver();
      });
    }
  }
};
</script>
