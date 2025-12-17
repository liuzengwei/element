<template>
  <span class="el-trigger">
    <transition
      :name="animationName"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave">
      <div
        v-show="!disabled && showPopper"
        ref="popper"
        :class="['el-trigger__popup', contentClass]"
        :style="[popupStyleComputed, contentStyle]"
        role="tooltip">
        <div
          v-if="showArrow"
          :class="['el-trigger__arrow', arrowClass]"
          :style="arrowStyle"
          x-arrow></div>
        <slot name="content"></slot>
      </div>
    </transition>
    <span class="el-trigger__reference" ref="reference">
      <slot></slot>
    </span>
  </span>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper';
import { on, off } from 'element-ui/src/utils/dom';

export default {
  name: 'ElTrigger',

  mixins: [Popper],

  props: {
    // 弹出框是否可见 (受控模式，可使用 .sync 修饰符)
    popupVisible: {
      type: Boolean,
      default: undefined
    },
    // 默认是否可见（非受控）
    defaultPopupVisible: {
      type: Boolean,
      default: false
    },
    // 触发方式
    trigger: {
      type: String,
      default: 'hover',
      validator: value => ['hover', 'click', 'focus', 'contextMenu'].indexOf(value) > -1
    },
    // 弹出位置
    position: {
      type: String,
      default: 'bottom',
      validator: value => ['top', 'tl', 'tr', 'bottom', 'bl', 'br', 'left', 'lt', 'lb', 'right', 'rt', 'rb'].indexOf(value) > -1
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 弹出框偏移量
    popupOffset: {
      type: Number,
      default: 0
    },
    // 弹出框移动距离
    popupTranslate: {
      type: [Array, Object]
    },
    // 是否显示箭头
    showArrow: {
      type: Boolean,
      default: false
    },
    // 是否跟随鼠标
    alignPoint: {
      type: Boolean,
      default: false
    },
    // 移入弹出框时保持显示
    popupHoverStay: {
      type: Boolean,
      default: true
    },
    // 失焦时关闭
    blurToClose: {
      type: Boolean,
      default: true
    },
    // 点击时关闭
    clickToClose: {
      type: Boolean,
      default: true
    },
    // 点击外部关闭
    clickOutsideToClose: {
      type: Boolean,
      default: true
    },
    // 关闭时卸载
    unmountOnClose: {
      type: Boolean,
      default: true
    },
    // 内容类名
    contentClass: [String, Array, Object],
    // 内容样式
    contentStyle: Object,
    // 箭头类名
    arrowClass: [String, Array, Object],
    // 箭头样式
    arrowStyle: Object,
    // 弹出框样式
    popupStyle: Object,
    // 动画名称
    animationName: {
      type: String,
      default: 'fade-in-linear'
    },
    // 动画持续时间
    duration: [Number, Object],
    // mouseenter 延时
    mouseEnterDelay: {
      type: Number,
      default: 100
    },
    // mouseleave 延时
    mouseLeaveDelay: {
      type: Number,
      default: 100
    },
    // focus 延时
    focusDelay: {
      type: Number,
      default: 0
    },
    // 自动适配弹出框宽度
    autoFitPopupWidth: {
      type: Boolean,
      default: false
    },
    // 自动适配弹出框最小宽度
    autoFitPopupMinWidth: {
      type: Boolean,
      default: false
    },
    // 自动修正位置
    autoFixPosition: {
      type: Boolean,
      default: true
    },
    // 弹出框容器
    popupContainer: [String, HTMLElement],
    // 滚动时更新位置
    updateAtScroll: {
      type: Boolean,
      default: false
    },
    // 自动适配位置
    autoFitPosition: {
      type: Boolean,
      default: true
    },
    // 是否渲染到 body
    renderToBody: {
      type: Boolean,
      default: true
    },
    // 阻止获取焦点
    preventFocus: {
      type: Boolean,
      default: false
    },
    // 滚动时关闭
    scrollToClose: {
      type: Boolean,
      default: false
    },
    // 滚动阈值
    scrollToCloseDistance: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      enterTimer: null,
      leaveTimer: null,
      scrollParent: null,
      initialScrollTop: 0,
      // 内部属性，映射到 mixin 期望的值
      currentPlacement: '',
      internalAppendToBody: true,
      internalOffset: 0,
      internalVisibleArrow: false
    };
  },

  created() {
    // 映射 position 到 popper placement
    const positionMap = {
      'top': 'top',
      'tl': 'top-start',
      'tr': 'top-end',
      'bottom': 'bottom',
      'bl': 'bottom-start',
      'br': 'bottom-end',
      'left': 'left',
      'lt': 'left-start',
      'lb': 'left-end',
      'right': 'right',
      'rt': 'right-start',
      'rb': 'right-end'
    };
    this.currentPlacement = positionMap[this.position] || 'bottom';
    this.internalAppendToBody = this.renderToBody;
    this.internalOffset = this.popupOffset;
    this.internalVisibleArrow = this.showArrow;

    // 初始化 showPopper
    if (this.value === undefined) {
      const initialValue = this.popupVisible !== undefined ? this.popupVisible : this.defaultPopupVisible;
      this.$nextTick(() => {
        this.showPopper = initialValue;
      });
    }
  },

  computed: {
    popupStyleComputed() {
      const style = { ...this.popupStyle };

      if (this.autoFitPopupWidth && this.referenceElm) {
        style.width = this.referenceElm.offsetWidth + 'px';
      }

      if (this.autoFitPopupMinWidth && this.referenceElm) {
        style.minWidth = this.referenceElm.offsetWidth + 'px';
      }

      if (this.duration) {
        if (typeof this.duration === 'number') {
          style.transitionDuration = this.duration + 'ms';
        } else {
          style.transitionDuration = `${this.duration.enter || 0}ms`;
        }
      }

      return style;
    }
  },

  watch: {
    // popupVisible prop 改变时同步到 showPopper
    popupVisible(val) {
      if (val !== undefined) {
        this.showPopper = val;
      }
    },

    // showPopper 改变时发出事件 (value 的 watch 由 mixin 处理)
    showPopper(val) {
      // 注意：不要在这里检查 disabled，因为需要emit事件同步状态
      // mixin 已经 emit 'input'，这里只需要 emit 其他事件
      this.$emit('update:popupVisible', val);
      this.$emit('popup-visible-change', val);

      if (val) {
        this.$nextTick(() => {
          this.updatePopper();
          if (this.scrollToClose) {
            this.addScrollListener();
          }
        });
      } else {
        if (this.scrollToClose) {
          this.removeScrollListener();
        }
      }
    }
  },

  mounted() {
    const reference = this.referenceElm = this.$refs.reference.children[0] || this.$refs.reference;
    const popper = this.popperElm = this.$refs.popper;

    if (this.trigger === 'hover') {
      on(reference, 'mouseenter', this.handleMouseEnter);
      on(reference, 'mouseleave', this.handleMouseLeave);

      if (this.popupHoverStay) {
        on(popper, 'mouseenter', this.handlePopperMouseEnter);
        on(popper, 'mouseleave', this.handlePopperMouseLeave);
      }
    } else if (this.trigger === 'click') {
      on(reference, 'click', this.handleClick);
    } else if (this.trigger === 'focus') {
      if (reference.querySelector('input, textarea')) {
        on(reference, 'focusin', this.handleFocus);
        on(reference, 'focusout', this.handleBlur);
      } else {
        on(reference, 'mousedown', this.handleMouseDown);
        on(reference, 'mouseup', this.handleMouseUp);
      }
    } else if (this.trigger === 'contextMenu') {
      on(reference, 'contextmenu', this.handleContextMenu);
    }

    if (this.clickOutsideToClose) {
      on(document, 'click', this.handleDocumentClick);
    }

    if (this.preventFocus) {
      on(popper, 'mousedown', e => e.preventDefault());
    }
  },

  beforeDestroy() {
    const reference = this.referenceElm;
    const popper = this.popperElm;

    off(reference, 'mouseenter', this.handleMouseEnter);
    off(reference, 'mouseleave', this.handleMouseLeave);
    off(reference, 'click', this.handleClick);
    off(reference, 'focusin', this.handleFocus);
    off(reference, 'focusout', this.handleBlur);
    off(reference, 'mousedown', this.handleMouseDown);
    off(reference, 'mouseup', this.handleMouseUp);
    off(reference, 'contextmenu', this.handleContextMenu);
    off(document, 'click', this.handleDocumentClick);

    if (popper) {
      off(popper, 'mouseenter', this.handlePopperMouseEnter);
      off(popper, 'mouseleave', this.handlePopperMouseLeave);
    }

    this.removeScrollListener();
    this.clearTimer();
  },

  methods: {
    // 覆盖 mixin 的 createPopper，使用我们的内部属性
    createPopper() {
      if (this.$isServer) return;
      this.currentPlacement = this.currentPlacement || this.placement;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return;
      }

      const options = this.popperOptions;
      const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
      let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

      if (!reference &&
        this.$slots.reference &&
        this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }

      if (!popper || !reference) return;

      // 使用我们的内部属性而不是 props
      if (this.internalVisibleArrow) this.appendArrow(popper);
      if (this.internalAppendToBody) document.body.appendChild(this.popperElm);

      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }

      options.placement = this.currentPlacement;
      options.offset = this.internalOffset;
      options.arrowOffset = this.arrowOffset;

      const PopperJS = require('element-ui/src/utils/popper');
      const PopupManager = require('element-ui/src/utils/popup').PopupManager;

      this.popperJS = new PopperJS(reference, popper, options);
      this.popperJS.onCreate(_ => {
        this.$emit('created', this);
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate);
      }
      this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
      this.popperElm.addEventListener('click', e => e.stopPropagation());
    },

    show() {
      if (this.disabled) return;
      this.clearTimer();
      this.showPopper = true;
    },

    hide() {
      if (this.disabled) return;
      this.clearTimer();
      this.showPopper = false;
    },

    handleMouseEnter() {
      this.clearTimer();
      if (this.mouseEnterDelay) {
        this.enterTimer = setTimeout(() => {
          this.show();
        }, this.mouseEnterDelay);
      } else {
        this.show();
      }
    },

    handleMouseLeave() {
      this.clearTimer();
      if (this.mouseLeaveDelay) {
        this.leaveTimer = setTimeout(() => {
          this.hide();
        }, this.mouseLeaveDelay);
      } else {
        this.hide();
      }
    },

    handlePopperMouseEnter() {
      this.clearTimer();
    },

    handlePopperMouseLeave() {
      this.handleMouseLeave();
    },

    handleClick() {
      if (this.disabled) return;
      if (this.showPopper && this.clickToClose) {
        this.hide();
      } else {
        this.show();
      }
    },

    handleFocus() {
      if (this.disabled) return;
      this.clearTimer();
      if (this.focusDelay) {
        this.enterTimer = setTimeout(() => {
          this.show();
        }, this.focusDelay);
      } else {
        this.show();
      }
    },

    handleBlur() {
      if (this.disabled) return;
      if (this.blurToClose) {
        this.hide();
      }
    },

    handleMouseDown() {
      if (this.disabled) return;
      this.show();
    },

    handleMouseUp() {
      if (this.disabled) return;
      if (this.blurToClose) {
        setTimeout(() => {
          if (!this.$refs.reference.contains(document.activeElement)) {
            this.hide();
          }
        }, 0);
      }
    },

    handleContextMenu(e) {
      if (this.disabled) return;
      e.preventDefault();
      this.show();
    },

    handleDocumentClick(e) {
      if (!this.showPopper) return;
      const reference = this.referenceElm;
      const popper = this.popper;
      if (!reference || !popper) return;

      if (!reference.contains(e.target) && !popper.contains(e.target)) {
        this.hide();
      }
    },

    handleAfterEnter() {
      this.$emit('show');
    },

    handleAfterLeave() {
      this.$emit('hide');
    },

    clearTimer() {
      if (this.enterTimer) {
        clearTimeout(this.enterTimer);
        this.enterTimer = null;
      }
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
    },

    addScrollListener() {
      if (!this.updateAtScroll && !this.scrollToClose) return;

      this.scrollParent = this.getScrollParent(this.referenceElm);
      if (this.scrollParent) {
        this.initialScrollTop = this.scrollParent.scrollTop || 0;
        on(this.scrollParent, 'scroll', this.handleScroll);
      }
      on(window, 'scroll', this.handleScroll);
    },

    removeScrollListener() {
      if (this.scrollParent) {
        off(this.scrollParent, 'scroll', this.handleScroll);
      }
      off(window, 'scroll', this.handleScroll);
    },

    handleScroll() {
      if (this.scrollToClose) {
        const currentScrollTop = this.scrollParent ? this.scrollParent.scrollTop : window.pageYOffset;
        const distance = Math.abs(currentScrollTop - this.initialScrollTop);

        if (distance > this.scrollToCloseDistance) {
          this.hide();
        }
      }

      if (this.updateAtScroll) {
        this.updatePopper();
      }
    },

    getScrollParent(element) {
      if (!element || element === document.body) return null;

      const overflowY = window.getComputedStyle(element).overflowY;
      const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

      if (isScrollable && element.scrollHeight > element.clientHeight) {
        return element;
      }

      return this.getScrollParent(element.parentElement);
    }
  }
};
</script>
