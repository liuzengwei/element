<template>
  <div class="el-amount">
    <!-- 标题 -->
    <div v-if="title || $slots.title" class="el-amount__title">
      <slot name="title">{{ title }}</slot>
    </div>
    
    <div class="el-amount__content">
      <!-- 默认插槽优先 -->
      <slot v-if="$slots.default" 
        :formattedValue="formattedValue" 
        :rawValue="value" 
        :currency="currency" 
        :unit="displayUnit" 
        :isEmpty="isEmpty">
      </slot>
      
      <!-- 缺省状态 -->
      <template v-else-if="isEmpty">
        <slot name="placeholder">
          <span 
            :class="['el-amount__placeholder', placeholderClass]" 
            :style="mergedPlaceholderStyle">
            <span 
              v-if="placeholderShowCurrency" 
              :class="['el-amount__currency', currencyClass]" 
              :style="currencyStyle">{{ currency }}</span>{{ placeholder }}
          </span>
        </slot>
      </template>
      
      <!-- 正常显示 -->
      <template v-else>
        <!-- 前缀 -->
        <span 
          v-if="prefix || $slots.prefix" 
          :class="['el-amount__prefix', prefixClass]" 
          :style="prefixStyle">
          <slot name="prefix">{{ prefix }}</slot>
        </span>
        
        <!-- 货币符号（前置） -->
        <span 
          v-if="showCurrency && currencyPosition === 'prefix'" 
          :class="['el-amount__currency', currencyClass]" 
          :style="currencyStyle">
          {{ currency }}
        </span>
        
        <!-- 符号 +/- -->
        <span v-if="signSymbol" class="el-amount__sign">{{ signSymbol }}</span>
        
        <!-- 金额主体 -->
        <span 
          :class="['el-amount__value', valueClass, colorClass]" 
          :style="mergedValueStyle">
          {{ animatedValue || formattedValue }}
        </span>
        
        <!-- 单位（万/亿） -->
        <span 
          v-if="displayUnit" 
          :class="['el-amount__unit', unitClass]" 
          :style="unitStyle">
          {{ displayUnit }}
        </span>
        
        <!-- 货币符号（后置） -->
        <span 
          v-if="showCurrency && currencyPosition === 'suffix'" 
          :class="['el-amount__currency', currencyClass]" 
          :style="currencyStyle">
          {{ currency }}
        </span>
        
        <!-- 后缀 -->
        <span 
          v-if="suffix || $slots.suffix" 
          :class="['el-amount__suffix', suffixClass]" 
          :style="suffixStyle">
          <slot name="suffix">{{ suffix }}</slot>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElAmount',

  componentName: 'ElAmount',

  props: {
    // 基础属性
    value: {
      type: [Number, String],
      default: undefined
    },
    title: {
      type: String,
      default: ''
    },
    precision: {
      type: Number,
      default: 2
    },

    // 缺省状态
    placeholder: {
      type: String,
      default: '-'
    },
    placeholderShowCurrency: {
      type: Boolean,
      default: true
    },

    // 货币相关
    currency: {
      type: String,
      default: '¥'
    },
    showCurrency: {
      type: Boolean,
      default: true
    },
    currencyPosition: {
      type: String,
      default: 'prefix',
      validator: function(val) {
        return ['prefix', 'suffix'].indexOf(val) !== -1;
      }
    },

    // 万元换算
    convertToWan: {
      type: Boolean,
      default: false
    },
    wanThreshold: {
      type: Number,
      default: 10000
    },
    wanUnit: {
      type: String,
      default: '万'
    },
    wanPrecision: {
      type: Number,
      default: 2
    },
    convertToYi: {
      type: Boolean,
      default: false
    },
    yiThreshold: {
      type: Number,
      default: 100000000
    },
    yiUnit: {
      type: String,
      default: '亿'
    },
    yiPrecision: {
      type: Number,
      default: 2
    },

    // 格式化选项
    groupSeparator: {
      type: String,
      default: ','
    },
    decimalSeparator: {
      type: String,
      default: '.'
    },
    showGroupSeparator: {
      type: Boolean,
      default: true
    },
    padDecimal: {
      type: Boolean,
      default: true
    },

    // 显示控制
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    showPlus: {
      type: Boolean,
      default: false
    },
    colorful: {
      type: Boolean,
      default: false
    },
    positiveColor: {
      type: String,
      default: '#67C23A'
    },
    negativeColor: {
      type: String,
      default: '#F56C6C'
    },
    zeroColor: {
      type: String,
      default: '#606266'
    },

    // 样式定制
    prefixStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    prefixClass: {
      type: String,
      default: ''
    },
    currencyStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    currencyClass: {
      type: String,
      default: ''
    },
    valueStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    valueClass: {
      type: String,
      default: ''
    },
    unitStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    unitClass: {
      type: String,
      default: ''
    },
    suffixStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    suffixClass: {
      type: String,
      default: ''
    },
    placeholderStyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    placeholderClass: {
      type: String,
      default: ''
    },

    // 动画
    animated: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2000
    }
  },

  data: function() {
    return {
      animatedValue: '',
      animationTimer: null,
      animationStart: 0,
      animationEnd: 0
    };
  },

  computed: {
    // 判断是否为空值
    isEmpty: function() {
      return this.value === '' ||
             this.value === null ||
             this.value === undefined;
    },

    // 判断是否为有效数值
    isValidNumber: function() {
      if (this.isEmpty) return false;
      var num = Number(this.value);
      return !isNaN(num);
    },

    // 数值
    numericValue: function() {
      if (!this.isValidNumber) return 0;
      return Number(this.value);
    },

    // 绝对值
    absValue: function() {
      return Math.abs(this.numericValue);
    },

    // 符号
    signSymbol: function() {
      if (this.numericValue > 0 && this.showPlus) return '+';
      if (this.numericValue < 0) return '-';
      return '';
    },

    // 单位和转换后的值
    convertedData: function() {
      var value = this.absValue;
      var unit = '';
      var currentPrecision = this.precision;

      if (this.convertToYi && value >= this.yiThreshold) {
        value = value / 100000000;
        unit = this.yiUnit;
        currentPrecision = this.yiPrecision;
      } else if (this.convertToWan && value >= this.wanThreshold) {
        value = value / 10000;
        unit = this.wanUnit;
        currentPrecision = this.wanPrecision;
      }

      return {
        value: value,
        unit: unit,
        precision: currentPrecision
      };
    },

    // 显示单位
    displayUnit: function() {
      return this.convertedData.unit;
    },

    // 格式化数值
    formattedValue: function() {
      if (!this.isValidNumber) return '';

      var data = this.convertedData;
      var value = data.value;
      var precision = data.precision;

      // 处理精度
      var fixed = value.toFixed(precision);
      if (!this.padDecimal) {
        fixed = parseFloat(fixed).toString();
      }

      var parts = fixed.split('.');
      var integerPart = parts[0];
      var decimalPart = parts[1];

      // 千分位分隔
      if (this.showGroupSeparator && this.groupSeparator) {
        integerPart = this.addGroupSeparator(integerPart);
      }

      // 组合结果
      var result = integerPart;
      if (decimalPart !== undefined) {
        result += this.decimalSeparator + decimalPart;
      }

      return result;
    },

    // 颜色类
    colorClass: function() {
      if (!this.colorful) return '';

      if (this.numericValue > 0) return 'is-positive';
      if (this.numericValue < 0) return 'is-negative';
      return 'is-zero';
    },

    // 合并值样式
    mergedValueStyle: function() {
      var style = Object.assign({}, this.valueStyle);

      if (this.colorful) {
        if (this.numericValue > 0) {
          style.color = this.positiveColor;
        } else if (this.numericValue < 0) {
          style.color = this.negativeColor;
        } else {
          style.color = this.zeroColor;
        }
      }

      return style;
    },

    // 合并缺省样式
    mergedPlaceholderStyle: function() {
      return Object.assign({}, this.placeholderStyle);
    }
  },

  watch: {
    value: function(newVal, oldVal) {
      if (this.animated && this.isValidNumber) {
        this.startAnimation(oldVal, newVal);
      }
      this.$emit('change', newVal);
    }
  },

  methods: {
    // 添加千分位分隔符
    addGroupSeparator: function(str) {
      var reg = /(\d)(?=(\d{3})+$)/g;
      return str.replace(reg, '$1' + this.groupSeparator);
    },

    // 格式化金额（公开方法）
    format: function() {
      return this.formattedValue;
    },

    // 启动动画
    startAnimation: function(from, to) {
      var _this = this;
      if (this.animationTimer) {
        clearInterval(this.animationTimer);
      }

      var fromNum = Number(from) || 0;
      var toNum = Number(to) || 0;
      var startTime = Date.now();
      var duration = this.duration;

      this.animationTimer = setInterval(function() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min(elapsed / duration, 1);

        var currentValue = fromNum + (toNum - fromNum) * progress;

        // 格式化当前值
        var data = _this.getConvertedData(Math.abs(currentValue));
        var formatted = _this.formatNumber(data.value, data.precision);
        _this.animatedValue = formatted;

        if (progress >= 1) {
          clearInterval(_this.animationTimer);
          _this.animationTimer = null;
          _this.animatedValue = '';
          _this.$emit('animation-end');
        }
      }, 16);
    },

    // 获取转换数据（辅助方法）
    getConvertedData: function(value) {
      var unit = '';
      var currentPrecision = this.precision;

      if (this.convertToYi && value >= this.yiThreshold) {
        value = value / 100000000;
        unit = this.yiUnit;
        currentPrecision = this.yiPrecision;
      } else if (this.convertToWan && value >= this.wanThreshold) {
        value = value / 10000;
        unit = this.wanUnit;
        currentPrecision = this.wanPrecision;
      }

      return {
        value: value,
        unit: unit,
        precision: currentPrecision
      };
    },

    // 格式化数字（辅助方法）
    formatNumber: function(value, precision) {
      var fixed = value.toFixed(precision);
      if (!this.padDecimal) {
        fixed = parseFloat(fixed).toString();
      }

      var parts = fixed.split('.');
      var integerPart = parts[0];
      var decimalPart = parts[1];

      if (this.showGroupSeparator && this.groupSeparator) {
        integerPart = this.addGroupSeparator(integerPart);
      }

      var result = integerPart;
      if (decimalPart !== undefined) {
        result += this.decimalSeparator + decimalPart;
      }

      return result;
    },

    // 重置动画
    resetAnimation: function() {
      if (this.animationTimer) {
        clearInterval(this.animationTimer);
        this.animationTimer = null;
      }
      this.animatedValue = '';
    }
  },

  beforeDestroy: function() {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }
  }
};
</script>
