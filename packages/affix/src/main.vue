<template>
  <div ref="root" class="el-affix" :style="rootStyle">
    <div :class="{ 'el-affix--fixed': fixed }" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

export default {
  name: 'ElAffix',

  props: {
    offset: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom'].indexOf(value) !== -1;
      }
    },
    target: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      fixed: false,
      height: 0,
      width: 0,
      scrollTop: 0,
      clientHeight: 0,
      transform: 0
    };
  },

  computed: {
    offsetType() {
      return this.position === 'top' ? 'top' : 'bottom';
    },
    affixStyle() {
      if (!this.fixed) return null;

      const offset = this.offset ? `${this.offset}px` : 0;
      const transform = this.transform ? `translateY(${this.transform}px)` : '';

      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
        [this.offsetType]: offset,
        transform,
        zIndex: this.zIndex
      };
    },
    rootStyle() {
      return this.fixed ? {
        height: `${this.height}px`,
        width: `${this.width}px`
      } : null;
    }
  },

  mounted() {
    this.updateRoot();
    this.scrollContainer = this.getScrollContainer();
    this.scrollContainer.addEventListener('scroll', this.onScroll);
    addResizeListener(this.$refs.root, this.updateRoot);
  },

  beforeDestroy() {
    this.scrollContainer.removeEventListener('scroll', this.onScroll);
    removeResizeListener(this.$refs.root, this.updateRoot);
  },

  methods: {
    getScrollContainer() {
      if (this.target) {
        return document.querySelector(this.target) || window;
      }
      return window;
    },

    onScroll() {
      this.update();

      this.$emit('scroll', {
        scrollTop: this.scrollTop,
        fixed: this.fixed
      });
    },

    update() {
      if (!this.$refs.root) return;

      const rootRect = this.$refs.root.getBoundingClientRect();
      const targetRect = this.getTargetRect();

      this.height = rootRect.height;
      this.width = rootRect.width;
      this.scrollTop = this.getScrollTop();
      this.clientHeight = document.documentElement.clientHeight;

      if (this.position === 'top') {
        if (this.target) {
          const difference = targetRect.bottom - this.offset - this.height;
          this.fixed = this.offset > rootRect.top && targetRect.bottom > 0;
          this.transform = difference < 0 ? difference : 0;
        } else {
          this.fixed = this.offset > rootRect.top;
        }
      } else {
        if (this.target) {
          const difference = this.clientHeight - targetRect.top - this.offset - this.height;
          this.fixed = this.clientHeight - this.offset < rootRect.bottom && this.clientHeight > targetRect.top;
          this.transform = difference < 0 ? -difference : 0;
        } else {
          this.fixed = this.clientHeight - this.offset < rootRect.bottom;
        }
      }

      const fixed = this.fixed;
      this.$emit('change', fixed);
    },

    updateRoot() {
      if (!this.$refs.root) return;
      const rootRect = this.$refs.root.getBoundingClientRect();
      this.height = rootRect.height;
      this.width = rootRect.width;
    },

    getTargetRect() {
      if (this.scrollContainer === window) {
        return {
          top: 0,
          bottom: this.clientHeight
        };
      }
      return this.scrollContainer.getBoundingClientRect();
    },

    getScrollTop() {
      if (this.scrollContainer === window) {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }
      return this.scrollContainer.scrollTop;
    }
  }
};
</script>
