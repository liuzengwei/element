<template>
  <div
    class="el-switch"
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked, 'is-loading': loading }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click.prevent="switchValue"
  >
    <input
      class="el-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    >
    <span
      :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span class="el-switch__core" ref="core" :style="coreStyle">
      <span class="el-switch__inner" v-if="inactiveInnerText || activeInnerText">
        <span v-if="checked && activeInnerText" class="el-switch__inner-text">{{ activeInnerText }}</span>
        <span v-if="!checked && inactiveInnerText" class="el-switch__inner-text">{{ inactiveInnerText }}</span>
      </span>
    </span>
    <span
      :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>
<script>
  import emitter from 'element-ui/src/mixins/emitter';
  import Focus from 'element-ui/src/mixins/focus';
  import Migrating from 'element-ui/src/mixins/migrating';

  export default {
    name: 'ElSwitch',
    mixins: [Focus('input'), Migrating, emitter],
    inject: {
      elForm: {
        default: ''
      }
    },
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 40
      },
      activeIconClass: {
        type: String,
        default: ''
      },
      inactiveIconClass: {
        type: String,
        default: ''
      },
      activeText: String,
      inactiveText: String,
      activeInnerText: String,
      inactiveInnerText: String,
      activeColor: {
        type: String,
        default: ''
      },
      inactiveColor: {
        type: String,
        default: ''
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      id: String,
      beforeChange: Function
    },
    data() {
      return {
        coreWidth: this.width,
        loading: false,
        actualWidth: 0
      };
    },
    created() {
      if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
        this.$emit('input', this.inactiveValue);
      }
    },
    computed: {
      checked() {
        return this.value === this.activeValue;
      },
      switchDisabled() {
        return this.disabled || (this.elForm || {}).disabled || this.loading;
      },
      coreStyle() {
        const hasInnerText = this.activeInnerText || this.inactiveInnerText;
        if (hasInnerText && !this.width) {
          return this.actualWidth ? { width: this.actualWidth + 'px' } : {};
        }
        return { width: this.coreWidth + 'px' };
      }
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBackgroundColor();
        }
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [this.value]);
        }
      }
    },
    mounted() {
      /* istanbul ignore if */
      this.coreWidth = this.width || 40;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
      this.calculateWidth();
    },
    updated() {
      this.$nextTick(() => {
        this.calculateWidth();
      });
    },
    methods: {
      calculateWidth() {
        if (this.activeInnerText || this.inactiveInnerText) {
          if (this.width) {
            this.actualWidth = this.width;
          } else {
            const innerEl = this.$refs.core.querySelector('.el-switch__inner');
            if (innerEl) {
              const textWidth = innerEl.scrollWidth;
              // 左右各留 6px padding + 按钮宽度 16px + 4px 间距
              this.actualWidth = Math.max(textWidth + 32, 40);
            } else {
              this.actualWidth = 40;
            }
          }
        }
      },
      handleChange(event) {
        const val = this.checked ? this.inactiveValue : this.activeValue;

        if (!this.beforeChange) {
          this.$emit('input', val);
          this.$emit('change', val);
          this.$nextTick(() => {
            if (this.$refs.input) {
              this.$refs.input.checked = this.checked;
            }
          });
          return;
        }

        this.loading = true;
        const shouldProceed = this.beforeChange();

        const handleResult = (isConfirm) => {
          this.loading = false;
          if (isConfirm !== false) {
            this.$emit('input', val);
            this.$emit('change', val);
            this.$nextTick(() => {
              if (this.$refs.input) {
                this.$refs.input.checked = this.checked;
              }
            });
          } else {
            // 恢复原状态
            this.$nextTick(() => {
              if (this.$refs.input) {
                this.$refs.input.checked = this.checked;
              }
            });
          }
        };

        if (shouldProceed && shouldProceed.then) {
          shouldProceed.then(
            (res) => handleResult(res),
            () => handleResult(false)
          );
        } else {
          handleResult(shouldProceed);
        }
      },
      setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      switchValue() {
        !this.switchDisabled && this.handleChange();
      },
      getMigratingConfig() {
        return {
          props: {
            'on-color': 'on-color is renamed to active-color.',
            'off-color': 'off-color is renamed to inactive-color.',
            'on-text': 'on-text is renamed to active-text.',
            'off-text': 'off-text is renamed to inactive-text.',
            'on-value': 'on-value is renamed to active-value.',
            'off-value': 'off-value is renamed to inactive-value.',
            'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
            'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
          }
        };
      }
    }
  };
</script>
