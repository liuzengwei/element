<template>
  <transition
    name="el-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      :class="referenceMode ? 'el-drawer__wrapper-reference' : 'el-drawer__wrapper'"
      tabindex="-1"
      v-show="visible">
      <div
        class="el-drawer__container"
        :class="[visible && 'el-drawer__open', referenceMode && 'el-drawer__reference-mode']"
        @click.self="handleWrapperClick"
        role="document"
        tabindex="-1">
        <div
          aria-modal="true"
          aria-labelledby="el-drawer__title"
          :aria-label="title"
          class="el-drawer"
          :class="[effectiveDirection, customClass, referenceMode && 'is-reference']"
          :style="drawerStyle"
          ref="drawer"
          role="dialog"
          tabindex="-1"
          >
          <header class="el-drawer__header" id="el-drawer__title" v-if="withHeader">
            <slot name="title">
              <span role="heading" :title="title">{{ title }}</span>
            </slot>
            <button
              :aria-label="`close ${title || 'drawer'}`"
              class="el-drawer__close-btn"
              type="button"
              v-if="showClose"
              @click="closeDrawer">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </header>
          <section class="el-drawer__body" v-if="rendered">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup';
import emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElDrawer',
  mixins: [Popup, emitter],
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ''
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'rtl',
      validator(val) {
        return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1;
      }
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    },
    reference: {
      type: [String, Object],
      default: null
    },
    placement: {
      type: String,
      default: 'right',
      validator(val) {
        return ['top', 'bottom', 'left', 'right'].indexOf(val) !== -1;
      }
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isHorizontal() {
      return this.direction === 'rtl' || this.direction === 'ltr';
    },
    drawerSize() {
      return typeof this.size === 'number' ? `${this.size}px` : this.size;
    },
    referenceMode() {
      return !!this.reference;
    },
    effectiveDirection() {
      // 在 reference 模式下，根据 placement 映射到对应的 direction
      if (this.referenceMode) {
        const placementToDirection = {
          'top': 'btt',
          'bottom': 'ttb',
          'left': 'ltr',
          'right': 'rtl'
        };
        return placementToDirection[this.placement] || 'rtl';
      }
      return this.direction;
    },
    drawerStyle() {
      if (this.referenceMode) {
        const style = { ...this.position };
        if (this.placement === 'left' || this.placement === 'right') {
          style.width = this.drawerSize;
        } else {
          style.height = this.drawerSize;
        }
        return style;
      } else {
        return this.isHorizontal ? `width: ${this.drawerSize}` : `height: ${this.drawerSize}`;
      }
    }
  },
  data() {
    return {
      closed: false,
      prevActiveElement: null,
      position: {}
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        if (this.referenceMode) {
          const referenceEl = this.getReferenceElement();
          if (referenceEl) {
            referenceEl.appendChild(this.$el);
          }
        } else if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.prevActiveElement = document.activeElement;
        if (this.referenceMode) {
          this.$nextTick(() => {
            this.updatePosition();
          });
        }
      } else {
        if (!this.closed) {
          this.$emit('close');
          if (this.destroyOnClose === true) {
            this.rendered = false;
          }
        }
        this.$nextTick(() => {
          if (this.prevActiveElement) {
            this.prevActiveElement.focus();
          }
        });
      }
    }
  },
  methods: {
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        if (this.destroyOnClose === true) {
          this.rendered = false;
        }
        this.closed = true;
      }
    },
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer();
      }
    },
    closeDrawer() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    handleClose() {
      // This method here will be called by PopupManger, when the `closeOnPressEscape` was set to true
      // pressing `ESC` will call this method, and also close the drawer.
      // This method also calls `beforeClose` if there was one.
      this.closeDrawer();
    },
    getReferenceElement() {
      if (typeof this.reference === 'string') {
        return document.querySelector(this.reference);
      } else if (this.reference && this.reference.$el) {
        return this.reference.$el;
      } else {
        return this.reference;
      }
    },
    updatePosition() {
      if (!this.referenceMode) return;

      const referenceEl = this.getReferenceElement();
      if (!referenceEl) {
        console.warn('[ElDrawer] Reference element not found');
        return;
      }

      // 确保参考元素有 position 样式
      const computedStyle = window.getComputedStyle(referenceEl);
      if (computedStyle.position === 'static') {
        referenceEl.style.position = 'relative';
      }

      const { placement, offset } = this;
      const position = {};

      switch (placement) {
        case 'top':
          position.left = '0';
          position.bottom = `${offset}px`;
          position.top = 'auto';
          position.right = '0';
          break;
        case 'bottom':
          position.left = '0';
          position.top = `${offset}px`;
          position.bottom = 'auto';
          position.right = '0';
          break;
        case 'left':
          position.top = '0';
          position.right = 'auto';
          position.left = `${offset}px`;
          position.bottom = '0';
          break;
        case 'right':
          position.top = '0';
          position.left = 'auto';
          position.right = `${offset}px`;
          position.bottom = '0';
          break;
      }

      this.position = position;
    },
    handleScroll() {
      if (this.referenceMode && this.visible) {
        this.updatePosition();
      }
    },
    handleResize() {
      if (this.referenceMode && this.visible) {
        this.updatePosition();
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.referenceMode) {
        const referenceEl = this.getReferenceElement();
        if (referenceEl) {
          referenceEl.appendChild(this.$el);
        }
      } else if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
    if (this.referenceMode) {
      window.addEventListener('scroll', this.handleScroll, true);
      window.addEventListener('resize', this.handleResize);
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.referenceMode && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.referenceMode) {
      window.removeEventListener('scroll', this.handleScroll, true);
      window.removeEventListener('resize', this.handleResize);
    }
  }
};
</script>
