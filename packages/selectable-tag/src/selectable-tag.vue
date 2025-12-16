<template>
  <span
    class='el-selectable-tag'
    :class='[
      type ? "el-selectable-tag--" + type : "",
      tagSize ? "el-selectable-tag--" + tagSize : "",
      currentEffect ? "el-selectable-tag--" + currentEffect : "",
      {
        "is-disabled": isDisabled,
        "is-checked": isChecked
      }
    ]'
    role='button'
    :aria-checked='isChecked'
    :aria-disabled='isDisabled'
    :tabindex='isDisabled ? -1 : 0'
    @click='handleClick'
    @keydown.space.prevent='handleClick'
    @keydown.enter.prevent='handleClick'
  >
    <span class='el-selectable-tag__inner'>
      <i :class='icon' v-if='icon'></i>
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElSelectableTag',

  componentName: 'ElSelectableTag',

  mixins: [Emitter],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    },
    selectableTagGroup: {
      default: ''
    }
  },

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    type: {
      type: String,
      default: ''
    },
    size: String,
    icon: String,
    effect: {
      type: String,
      default: 'dark',
      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1;
      }
    }
  },

  data() {
    return {
      isLimitExceeded: false
    };
  },

  computed: {
    model() {
      return this.selectableTagGroup ? this.selectableTagGroup.value : this.value;
    },

    isChecked() {
      if (this.selectableTagGroup) {
        // 在 Group 中，根据是否多选判断
        if (this.selectableTagGroup.multiple) {
          return Array.isArray(this.model) && this.model.indexOf(this.label) > -1;
        } else {
          return this.model === this.label;
        }
      } else {
        // 单独使用时
        if (Array.isArray(this.value)) {
          return this.value.indexOf(this.label) > -1;
        } else {
          return this.value === this.label;
        }
      }
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    tagSize() {
      return this.size ||
             (this.selectableTagGroup && this.selectableTagGroup.selectableTagGroupSize) ||
             this._elFormItemSize ||
             (this.$ELEMENT || {}).size;
    },

    isDisabled() {
      return this.disabled ||
             (this.selectableTagGroup && this.selectableTagGroup.disabled) ||
             (this.elForm || {}).disabled;
    },

    currentEffect() {
      return (this.selectableTagGroup && this.selectableTagGroup.effect) || this.effect || 'dark';
    }
  },

  methods: {
    handleClick(evt) {
      if (this.isDisabled) return;

      this.$emit('click', evt);

      if (this.selectableTagGroup) {
        // 在 Group 中
        const group = this.selectableTagGroup;
        let newValue;

        if (group.multiple) {
          // 多选模式
          newValue = Array.isArray(this.model) ? [...this.model] : [];
          const index = newValue.indexOf(this.label);

          if (index > -1) {
            // 取消选中
            if (group.min !== undefined && newValue.length <= group.min) {
              this.isLimitExceeded = true;
              return;
            }
            newValue.splice(index, 1);
          } else {
            // 选中
            if (group.max !== undefined && newValue.length >= group.max) {
              this.isLimitExceeded = true;
              return;
            }
            newValue.push(this.label);
          }
        } else {
          // 单选模式
          newValue = this.isChecked ? null : this.label;
        }

        this.isLimitExceeded = false;
        this.dispatch('ElSelectableTagGroup', 'input', [newValue]);
        this.$nextTick(() => {
          this.dispatch('ElSelectableTagGroup', 'change', [newValue]);
        });
      } else {
        // 单独使用
        let newValue;
        if (Array.isArray(this.value)) {
          newValue = [...this.value];
          const index = newValue.indexOf(this.label);
          if (index > -1) {
            newValue.splice(index, 1);
          } else {
            newValue.push(this.label);
          }
        } else {
          newValue = this.isChecked ? null : this.label;
        }
        this.$emit('input', newValue);
        this.$emit('change', newValue, evt);
      }
    }
  }
};
</script>