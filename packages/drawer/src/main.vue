<template>
  <transition
    name="el-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      :class="referenceMode ? 'el-drawer__wrapper-reference' : 'el-drawer__wrapper'"
      :style="wrapperStyle"
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
import PopupManager from 'element-ui/src/utils/popup/popup-manager';
import { getStyle } from 'element-ui/src/utils/dom';
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
      type: [String, Object, typeof window !== 'undefined' ? window.HTMLElement : Object],
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
    wrapperStyle() {
      // 在 reference 模式下，将 z-index 设置在 wrapper 上，与全局模式保持一致
      if (this.referenceMode && this.drawerZIndex) {
        return { zIndex: this.drawerZIndex };
      }
      return null;
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
      position: {},
      drawerZIndex: null,
      modalZIndex: null
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        if (this.referenceMode) {
          // z-index 已经通过 drawerStyle computed 属性设置
          const referenceEl = this.getReferenceElement();
          if (referenceEl) {
            referenceEl.appendChild(this.$el);
          }
          // 在 drawer 挂载后创建 modal
          this.$nextTick(() => {
            // drawer 的 z-index 已经在 appendChild 前设置

            // 创建/显示 modal（使用预分配的较低值）
            if (this.modal) {
              this.createReferenceModal({
                modalClass: this.modalClass,
                modalFade: this.modalFade
              });
            }

            // 更新位置
            this.updatePosition();

            // 清理可能被 PopupManager 创建的全局 modal
            // 延迟执行，确保全局 modal 已经被创建后再移除
            setTimeout(() => {
              this.removeGlobalModal();
            }, 300);
          });
        } else if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.prevActiveElement = document.activeElement;
      } else {
        if (!this.closed) {
          this.$emit('close');
          if (this.destroyOnClose === true) {
            this.rendered = false;
          }
        }
        // 关闭 reference 模式的 modal
        if (this.referenceMode) {
          this.closeReferenceModal();
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
    doOpen(props) {
      // 在 reference 模式下，需要让遮罩层挂载到参考元素而不是 body
      if (this.referenceMode) {
        // 手动实现 doOpen 的逻辑，但将 modal 挂载到 reference 元素
        if (this.$isServer) return;
        if (this.willOpen && !this.willOpen()) return;
        if (this.opened) return;

        this._opening = true;

        const dom = this.$el;
        const zIndex = props.zIndex;

        if (zIndex) {
          PopupManager.zIndex = zIndex;
        }

        // modal 的创建已经移到 watch visible 中，在 drawer 挂载后执行
        // 这里预先分配 z-index，确保 modal 和 drawer 的层级关系正确
        // 每次打开都重新分配，避免复用时的 z-index 错乱
        this.modalZIndex = PopupManager.nextZIndex();
        this.drawerZIndex = PopupManager.nextZIndex();

        if (getStyle(dom, 'position') === 'static') {
          dom.style.position = 'absolute';
        }

        // z-index 的设置已经移到 watch visible 中，在 modal 创建后设置
        this.opened = true;

        this.onOpen && this.onOpen();

        this.doAfterOpen();
      } else {
        // 非 reference 模式，使用原始的 doOpen
        this.$options.mixins[0].methods.doOpen.call(this, props);
      }
    },
    createReferenceModal(props) {
      // 创建并挂载 modal 到 reference 元素
      const referenceEl = this.getReferenceElement();
      if (!referenceEl) return;

      // 创建或复用 modal DOM
      let modalDom = this._referenceModalDom;
      if (!modalDom) {
        modalDom = document.createElement('div');
        modalDom.className = 'v-modal';
        modalDom.tabIndex = 0;

        // 使用预先分配的 modal z-index，确保 drawer 已经有更高的 z-index
        const modalZIndex = this.modalZIndex || PopupManager.nextZIndex();
        modalDom.style.zIndex = modalZIndex;

        // 关键：在 reference 模式下使用 absolute 定位，而不是 fixed
        modalDom.style.position = 'absolute';
        modalDom.style.left = '0';
        modalDom.style.top = '0';
        modalDom.style.width = '100%';
        modalDom.style.height = '100%';

        if (props.modalClass) {
          const classArr = props.modalClass.trim().split(/\s+/);
          classArr.forEach(cls => modalDom.classList.add(cls));
        }

        // 添加淡入动画
        if (props.modalFade) {
          modalDom.classList.add('v-modal-enter');
          setTimeout(() => {
            modalDom.classList.remove('v-modal-enter');
          }, 200);
        }

        // 直接挂载到 reference 元素内部
        referenceEl.appendChild(modalDom);

        // 点击 modal 时的处理
        modalDom.addEventListener('click', () => {
          if (this.closeOnClickModal) {
            this.closeDrawer();
          }
        });

        // 保存引用以便后续清理
        this._referenceModalDom = modalDom;
      } else {
        // 复用 modal 时，使用预分配的 z-index
        modalDom.style.display = '';
        modalDom.style.zIndex = this.modalZIndex || PopupManager.nextZIndex();
      }
    },
    closeReferenceModal() {
      // 关闭 reference 模式的 modal
      if (this._referenceModalDom) {
        this._referenceModalDom.style.display = 'none';
      }
    },
    removeGlobalModal() {
      // 移除 PopupManager 可能创建的全局 modal（在 body 下的）
      // 只在 reference 模式下调用此方法
      if (this.referenceMode) {
        // 查找并移除 body 下与此 drawer 关联的 modal
        const globalModals = document.body.querySelectorAll('.v-modal');
        globalModals.forEach(modal => {
          // 移除 body 下的所有 modal（它们不应该存在）
          if (modal.parentNode === document.body) {
            document.body.removeChild(modal);
          }
        });
      }
    },
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
  beforeMount() {
    // 在 reference 模式下，我们不使用 PopupManager 的 modal
    // 设置一个内部标志来阻止 PopupManager 创建 modal
    if (this.referenceMode) {
      // 保存原始的 modal 属性
      this._originalModal = this.modal;
      // 临时将 modal 设为 false，这样 Popup mixin 的逻辑不会调用 PopupManager.openModal
      // 注意：这个技巧可能不work，因为 modal 是 prop
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
  }, beforeDestroy() {
    // 在 reference 模式下，不使用 PopupManager 管理 modal
    // 所以需要阻止 Popup mixin 的 beforeDestroy 调用 PopupManager.closeModal
    if (!this.referenceMode) {
      // 非 reference 模式，调用 mixin 的 beforeDestroy
      if (this.$options.mixins && this.$options.mixins[0].beforeDestroy) {
        this.$options.mixins[0].beforeDestroy.call(this);
      }
    } else {
      // reference 模式，只执行必要的清理
      if (this._popupId) {
        PopupManager.deregister(this._popupId);
        // 不调用 PopupManager.closeModal，因为我们用的是自定义 modal
      }
      this.restoreBodyStyle();
    }
  }, destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.referenceMode && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    // 清理 reference modal
    if (this.referenceMode && this._referenceModalDom && this._referenceModalDom.parentNode) {
      this._referenceModalDom.parentNode.removeChild(this._referenceModalDom);
      this._referenceModalDom = null;
    }
    if (this.referenceMode) {
      window.removeEventListener('scroll', this.handleScroll, true);
      window.removeEventListener('resize', this.handleResize);
    }
  }
};
</script>
