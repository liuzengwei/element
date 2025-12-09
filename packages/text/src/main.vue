<template>
  <component
    :is="tag"
    :class="[
      'el-text',
      type ? `el-text--${type}` : '',
      size ? `el-text--${size}` : '',
      {
        'is-truncated': truncated,
        'is-line-clamp': lineClamp
      }
    ]"
    :style="lineClampStyle"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'ElText',

  props: {
    type: {
      type: String,
      validator(value) {
        return ['primary', 'success', 'warning', 'danger', 'info'].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      validator(value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1;
      }
    },
    truncated: {
      type: Boolean,
      default: false
    },
    lineClamp: {
      type: [String, Number]
    },
    tag: {
      type: String,
      default: 'span'
    }
  },

  computed: {
    lineClampStyle() {
      if (this.lineClamp) {
        return {
          '-webkit-line-clamp': this.lineClamp
        };
      }
      return null;
    }
  }
};
</script>
