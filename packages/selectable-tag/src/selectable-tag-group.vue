<template>
  <div
    class="el-selectable-tag-group"
    role="group"
    :aria-label="
      multiple ? 'selectable-tag-group' : 'selectable-tag-group-single'
    "
  >
    <slot></slot>
  </div>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElSelectableTagGroup',

  componentName: 'ElSelectableTagGroup',

  mixins: [Emitter],

  inject: {
    elFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    disabled: Boolean,
    multiple: {
      type: Boolean,
      default: true
    },
    min: Number,
    max: Number,
    size: String,
    effect: {
      type: String,
      default: 'dark',
      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      }
    }
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    selectableTagGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  watch: {
    value(value) {
      this.dispatch('ElFormItem', 'el.form.change', [value]);
    }
  },

  provide() {
    return {
      selectableTagGroup: this
    };
  }
};
</script>
