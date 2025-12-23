<template>
  <div
    :class="[
      'el-segmented',
      {
        'el-segmented--block': block,
        'el-segmented--stretch': stretch,
        'el-segmented--vertical': direction === 'vertical',
        'is-disabled': segmentedDisabled
      },
      segmentedSize ? `el-segmented--${segmentedSize}` : ''
    ]"
    role="radiogroup"
    :aria-label="ariaLabel"
    :id="id"
  >
    <div
      v-for="(item, index) in normalizedOptions"
      :key="getItemKey(item, index)"
      :class="[
        'el-segmented__item',
        {
          'is-selected': isItemSelected(item),
          'is-disabled': isItemDisabled(item)
        }
      ]"
      @click="handleItemClick(item)"
    >
      <input
        :name="name"
        :value="getItemValue(item)"
        :disabled="isItemDisabled(item)"
        :checked="isItemSelected(item)"
        type="radio"
        class="el-segmented__item-input"
        @change="handleChange(item)"
      >
      <div class="el-segmented__item-label">
        <slot :item="item">
          {{ getItemLabel(item) }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { isObject } from 'element-ui/src/utils/types';
import emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElSegmented',

  componentName: 'ElSegmented',

  mixins: [emitter],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    props: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
          disabled: 'disabled'
        };
      }
    },
    size: String,
    block: {
      type: Boolean,
      default: false
    },
    stretch: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    name: String,
    id: String,
    ariaLabel: String,
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    }
  },

  computed: {
    normalizedOptions() {
      return this.options.map(option => {
        if (isObject(option)) {
          return option;
        }
        return {
          [this.props.value]: option,
          [this.props.label]: option
        };
      });
    },

    segmentedSize() {
      return this.size || (this.elFormItem || {}).elFormItemSize || (this.$ELEMENT || {}).size;
    },

    segmentedDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },

  methods: {
    getItemKey(item, index) {
      return this.getItemValue(item) || index;
    },

    getItemValue(item) {
      return isObject(item) ? item[this.props.value] : item;
    },

    getItemLabel(item) {
      return isObject(item) ? item[this.props.label] : item;
    },

    isItemSelected(item) {
      return this.getItemValue(item) === this.value;
    },

    isItemDisabled(item) {
      if (this.segmentedDisabled) return true;
      return isObject(item) ? item[this.props.disabled] : false;
    },

    handleItemClick(item) {
      if (this.isItemDisabled(item)) return;

      const value = this.getItemValue(item);
      if (value !== this.value) {
        this.$emit('input', value);
        this.$nextTick(() => {
          this.$emit('change', value);
        });
      }
    },

    handleChange(item) {
      // 处理 input change 事件，确保表单验证等功能正常
      if (this.validateEvent) {
        this.$nextTick(() => {
          this.dispatch('ElFormItem', 'el.form.change', [this.value]);
        });
      }
    }
  }
};
</script>
