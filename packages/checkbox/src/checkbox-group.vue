<script>
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElCheckboxGroup',

    componentName: 'ElCheckboxGroup',

    mixins: [Emitter],

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String,
      // 排列方向：horizontal 横向，vertical 竖向
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return ['horizontal', 'vertical'].indexOf(value) !== -1;
        }
      },
      // 超出宽度处理：wrap 换行，ellipsis 省略号
      overflow: {
        type: String,
        default: 'wrap',
        validator(value) {
          return ['wrap', 'ellipsis'].indexOf(value) !== -1;
        }
      }
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div 
    :class="[
      'el-checkbox-group',
      direction === 'vertical' ? 'is-vertical' : '',
      overflow === 'ellipsis' ? 'is-ellipsis' : ''
    ]"
    role="group" 
    aria-label="checkbox-group"
  >
    <slot></slot>
  </div>
</template>
