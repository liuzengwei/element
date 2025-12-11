<template>
  <div class="el-area-loading" :class="{ 'is-loading': currentLoading }">
    <transition name="el-loading-fade">
      <div
        v-show="currentLoading"
        class="el-area-loading__mask"
        :style="{ backgroundColor: background }">
        <div class="el-area-loading__spinner" :class="[`el-area-loading__spinner--${size}`]">
          <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none"/>
          </svg>
          <i v-else :class="spinner"></i>
          <p v-if="text" class="el-area-loading__text">{{ text }}</p>
        </div>
      </div>
    </transition>
    <div class="el-area-loading__content" :class="{ 'is-blur': currentLoading && blur }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElAreaLoading',

  componentName: 'ElAreaLoading',

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    spinner: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: 'rgba(255, 255, 255, 0.9)'
    },
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1;
      }
    },
    blur: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      internalLoading: false
    };
  },

  computed: {
    currentLoading() {
      return this.loading !== undefined ? this.loading : this.internalLoading;
    }
  },

  methods: {
    /**
     * 显示加载状态
     */
    show() {
      this.internalLoading = true;
      this.$emit('update:loading', true);
    },

    /**
     * 隐藏加载状态
     */
    hide() {
      this.internalLoading = false;
      this.$emit('update:loading', false);
    },

    /**
     * 切换加载状态
     */
    toggle() {
      if (this.currentLoading) {
        this.hide();
      } else {
        this.show();
      }
    },

    /**
     * 设置加载状态
     * @param {Boolean} loading - 是否显示加载
     */
    setLoading(loading) {
      this.internalLoading = loading;
      this.$emit('update:loading', loading);
    }
  }
};
</script>
