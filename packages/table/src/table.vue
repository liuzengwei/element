<template>
  <div class="el-table"
    :class="[{
      'el-table--fit': fit,
      'el-table--striped': stripe,
      'el-table--border': border || isGroup,
      'el-table--hidden': isHidden,
      'el-table--group': isGroup,
      'el-table--fluid-height': maxHeight,
      'el-table--scrollable-x': layout.scrollX,
      'el-table--scrollable-y': layout.scrollY,
      'el-table--enable-row-hover': !store.states.isComplex,
      'el-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100,
      'el-table--header-affixed': showAffixHeader
    }, tableSize ? `el-table--${ tableSize }` : '']"
    @mouseleave="handleMouseLeave($event)">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div
      v-if="showHeader"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__header-wrapper"
      ref="headerWrapper">
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-header>
    </div>
    <div
      class="el-table__body-wrapper"
      ref="bodyWrapper"
      :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
      :style="[bodyHeight]">
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
           width: bodyWidth
        }">
      </table-body>
      <div
        v-if="!data || data.length === 0"
        class="el-table__empty-block"
        ref="emptyBlock"
        :style="emptyBlockStyle">
        <span class="el-table__empty-text" >
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        class="el-table__append-wrapper"
        ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__footer-wrapper"
      ref="footerWrapper">
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-footer>
    </div>
    <div
      v-if="fixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed"
      ref="fixedWrapper"
      :style="[{
        width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
      },
      fixedHeight]">
      <div
        v-if="showHeader"
        class="el-table__fixed-header-wrapper"
        ref="fixedHeaderWrapper" >
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="el-table__fixed-body-wrapper"
        ref="fixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{
            width: bodyWidth
          }">
        </table-body>
        <div
          v-if="$slots.append"
          class="el-table__append-gutter"
          :style="{ height: layout.appendHeight + 'px'}"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="fixedFooterWrapper">
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="el-table__fixed-right"
      ref="rightFixedWrapper"
      :style="[{
        width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
        right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
      },
      fixedHeight]">
      <div v-if="showHeader"
        class="el-table__fixed-header-wrapper"
        ref="rightFixedHeaderWrapper">
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="el-table__fixed-body-wrapper"
        ref="rightFixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{
            width: bodyWidth
          }">
        </table-body>
         <div
          v-if="$slots.append"
          class="el-table__append-gutter"
          :style="{ height: layout.appendHeight + 'px' }"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="el-table__fixed-footer-wrapper"
        ref="rightFixedFooterWrapper">
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      class="el-table__fixed-right-patch"
      ref="rightFixedPatch"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"></div>
    <div class="el-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
    <!-- 吸顶表头 -->
    <div
      v-if="isHeaderAffixed && showAffixHeader && showHeader"
      class="el-table__affix-header-wrapper"
      :style="affixHeaderStyle">
      <!-- 主表头 -->
      <div
        v-mousewheel="handleHeaderFooterMousewheel"
        class="el-table__header-wrapper"
        ref="affixHeaderWrapper">
        <table-header
          ref="affixTableHeader"
          :store="store"
          :border="border"
          :default-sort="defaultSort"
          :style="{
            width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
          }">
        </table-header>
      </div>
      <!-- 左固定列表头 -->
      <div
        v-if="fixedColumns.length > 0"
        class="el-table__fixed"
        :style="{
          width: layout.fixedWidth ? layout.fixedWidth + 'px' : '',
          height: layout.headerHeight ? layout.headerHeight + 'px' : '',
          left: '0'
        }">
        <div
          class="el-table__fixed-header-wrapper"
          ref="affixFixedHeaderWrapper">
          <table-header
            ref="affixFixedTableHeader"
            fixed="left"
            :border="border"
            :store="store"
            :style="{
              width: bodyWidth
            }">
          </table-header>
        </div>
      </div>
      <!-- 右固定列表头 -->
      <div
        v-if="rightFixedColumns.length > 0"
        class="el-table__fixed-right"
        :style="{
          width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
          height: layout.headerHeight ? layout.headerHeight + 'px' : '',
          right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : '0'
        }">
        <div
          class="el-table__fixed-header-wrapper"
          ref="affixRightFixedHeaderWrapper">
          <table-header
            ref="affixRightFixedTableHeader"
            fixed="right"
            :border="border"
            :store="store"
            :style="{
              width: bodyWidth
            }">
          </table-header>
        </div>
      </div>
      <!-- 右侧滚动条补丁 -->
      <div
        v-if="rightFixedColumns.length > 0 && layout.scrollY"
        class="el-table__fixed-right-patch"
        :style="{
          width: layout.gutterWidth + 'px',
          height: layout.headerHeight + 'px'
        }">
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import ElCheckbox from 'element-ui/packages/checkbox';
  import { debounce, throttle } from 'throttle-debounce';
  import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
  import Mousewheel from 'element-ui/src/directives/mousewheel';
  import Locale from 'element-ui/src/mixins/locale';
  import Migrating from 'element-ui/src/mixins/migrating';
  import { createStore, mapStates } from './store/helper';
  import TableLayout from './table-layout';
  import TableBody from './table-body';
  import TableHeader from './table-header';
  import TableFooter from './table-footer';
  import { parseHeight } from './util';

  let tableIdSeed = 1;

  export default {
    name: 'ElTable',

    mixins: [Locale, Migrating],

    directives: {
      Mousewheel
    },

    props: {
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },

      size: String,

      width: [String, Number],

      height: [String, Number],

      maxHeight: [String, Number],

      fit: {
        type: Boolean,
        default: true
      },

      stripe: Boolean,

      border: Boolean,

      rowKey: [String, Function],

      context: {},

      showHeader: {
        type: Boolean,
        default: true
      },

      showSummary: Boolean,

      sumText: String,

      summaryMethod: Function,

      rowClassName: [String, Function],

      rowStyle: [Object, Function],

      cellClassName: [String, Function],

      cellStyle: [Object, Function],

      headerRowClassName: [String, Function],

      headerRowStyle: [Object, Function],

      headerCellClassName: [String, Function],

      headerCellStyle: [Object, Function],

      highlightCurrentRow: Boolean,

      highlightSelectionRow: {
        type: Boolean,
        default: false
      },

      currentRowKey: [String, Number],

      emptyText: String,

      expandRowKeys: Array,

      defaultExpandAll: Boolean,

      defaultSort: Object,

      tooltipEffect: String,

      spanMethod: Function,

      selectOnIndeterminate: {
        type: Boolean,
        default: true
      },

      indent: {
        type: Number,
        default: 16
      },

      treeProps: {
        type: Object,
        default() {
          return {
            hasChildren: 'hasChildren',
            children: 'children'
          };
        }
      },

      lazy: Boolean,

      load: Function,

      headerAffixedTop: {
        type: [Boolean, Object],
        default: false
      }
    },

    components: {
      TableHeader,
      TableFooter,
      TableBody,
      ElCheckbox
    },

    methods: {
      getMigratingConfig() {
        return {
          events: {
            expand: 'expand is renamed to expand-change'
          }
        };
      },

      setCurrentRow(row) {
        this.store.commit('setCurrentRow', row);
      },

      toggleRowSelection(row, selected) {
        this.store.toggleRowSelection(row, selected, false);
        this.store.updateAllSelected();
      },

      toggleRowExpansion(row, expanded) {
        this.store.toggleRowExpansionAdapter(row, expanded);
      },

      clearSelection() {
        this.store.clearSelection();
      },

      clearFilter(columnKeys) {
        this.store.clearFilter(columnKeys);
      },

      clearSort() {
        this.store.clearSort();
      },

      handleMouseLeave() {
        this.store.commit('setHoverRow', null);
        if (this.hoverState) this.hoverState = null;
      },

      updateScrollY() {
        const changed = this.layout.updateScrollY();
        if (changed) {
          this.layout.notifyObservers('scrollable');
          this.layout.updateColumnsWidth();
        }
      },

      handleFixedMousewheel(event, data) {
        const bodyWrapper = this.bodyWrapper;
        if (Math.abs(data.spinY) > 0) {
          const currentScrollTop = bodyWrapper.scrollTop;
          if (data.pixelY < 0 && currentScrollTop !== 0) {
            event.preventDefault();
          }
          if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
            event.preventDefault();
          }
          bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
        } else {
          bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
        }
      },

      handleHeaderFooterMousewheel(event, data) {
        const { pixelX, pixelY } = data;
        if (Math.abs(pixelX) >= Math.abs(pixelY)) {
          this.bodyWrapper.scrollLeft += data.pixelX / 5;
        }
      },

      // TODO 使用 CSS transform
      syncPostion() {
        const { scrollLeft, scrollTop, offsetWidth, scrollWidth } = this.bodyWrapper;
        const { headerWrapper, footerWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this.$refs;
        if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
        if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
        if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
        if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
        const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
        if (scrollLeft >= maxScrollLeftPosition) {
          this.scrollPosition = 'right';
        } else if (scrollLeft === 0) {
          this.scrollPosition = 'left';
        } else {
          this.scrollPosition = 'middle';
        }
      },

      throttleSyncPostion: throttle(16, function() {
        this.syncPostion();
      }),

      throttleUpdateAffixHeader: throttle(16, function() {
        this.updateAffixHeader();
      }),

      onScroll(evt) {
        let raf = window.requestAnimationFrame;
        if (!raf) {
          this.throttleSyncPostion();
        } else {
          raf(this.syncPostion);
        }
        // 同步吸顶表头的滚动
        this.syncAffixHeaderScroll();
      },

      bindEvents() {
        this.bodyWrapper.addEventListener('scroll', this.onScroll, { passive: true });
        if (this.fit) {
          addResizeListener(this.$el, this.resizeListener);
        }
        if (this.isHeaderAffixed) {
          window.addEventListener('scroll', this.onDocumentScroll, { passive: true });
          window.addEventListener('resize', this.throttleUpdateAffixHeader);
        }
      },

      unbindEvents() {
        this.bodyWrapper.removeEventListener('scroll', this.onScroll, { passive: true });
        if (this.fit) {
          removeResizeListener(this.$el, this.resizeListener);
        }
        if (this.isHeaderAffixed) {
          window.removeEventListener('scroll', this.onDocumentScroll, { passive: true });
          window.removeEventListener('resize', this.throttleUpdateAffixHeader);
        }
      },

      resizeListener() {
        if (!this.$ready) return;
        let shouldUpdateLayout = false;
        const el = this.$el;
        const { width: oldWidth, height: oldHeight } = this.resizeState;

        const width = el.offsetWidth;
        if (oldWidth !== width) {
          shouldUpdateLayout = true;
        }

        const height = el.offsetHeight;
        if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
          shouldUpdateLayout = true;
        }

        if (shouldUpdateLayout) {
          this.resizeState.width = width;
          this.resizeState.height = height;
          this.doLayout();
        }
      },

      doLayout() {
        if (this.shouldUpdateHeight) {
          this.layout.updateElsHeight();
        }
        this.layout.updateColumnsWidth();
      },

      sort(prop, order) {
        this.store.commit('sort', { prop, order });
      },

      toggleAllSelection() {
        this.store.commit('toggleAllSelection');
      },

      updateAffixHeader() {
        if (!this.isHeaderAffixed || !this.$el) return;

        const tableRect = this.$el.getBoundingClientRect();
        const headerHeight = this.layout.headerHeight || 0;
        const offsetTop = this.affixHeaderOffsetTop;

        // 保存 tableRect 到组件数据中，供模板使用
        this.tableRect = {
          top: tableRect.top,
          left: tableRect.left,
          width: tableRect.width,
          height: tableRect.height
        };

        // 判断表头是否应该吸顶
        // 当表格顶部滚动到视口上方，且表格底部仍在视口内时，显示吸顶表头
        const shouldShow = tableRect.top < offsetTop &&
                          tableRect.bottom > offsetTop + headerHeight;

        this.showAffixHeader = shouldShow;

        if (shouldShow) {
          // 吸顶容器的宽度应该等于表格的宽度
          // 注意：固定列是绝对定位，会覆盖在主表格上，所以不影响容器宽度
          this.affixHeaderStyle = {
            top: offsetTop + 'px',
            width: tableRect.width + 'px',
            left: tableRect.left + 'px'
          };
        }
      },

      onDocumentScroll() {
        if (this.isHeaderAffixed) {
          this.updateAffixHeader();
        }
      },

      syncAffixHeaderScroll() {
        // 同步吸顶表头与主表格的横向滚动
        if (!this.isHeaderAffixed) return;

        const scrollLeft = this.bodyWrapper.scrollLeft;
        const affixHeaderWrapper = this.$refs.affixHeaderWrapper;

        if (affixHeaderWrapper) {
          affixHeaderWrapper.scrollLeft = scrollLeft;
        }
        // 固定列不需要同步横向滚动
      }

    },

    computed: {
      tableSize() {
        return this.size || (this.$ELEMENT || {}).size;
      },

      bodyWrapper() {
        return this.$refs.bodyWrapper;
      },

      shouldUpdateHeight() {
        return this.height ||
          this.maxHeight ||
          this.fixedColumns.length > 0 ||
          this.rightFixedColumns.length > 0;
      },

      bodyWidth() {
        const { bodyWidth, scrollY, gutterWidth } = this.layout;
        return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
      },

      bodyHeight() {
        const { headerHeight = 0, bodyHeight, footerHeight = 0} = this.layout;
        if (this.height) {
          return {
            height: bodyHeight ? bodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          const maxHeight = parseHeight(this.maxHeight);
          if (typeof maxHeight === 'number') {
            return {
              'max-height': (maxHeight - footerHeight - (this.showHeader ? headerHeight : 0)) + 'px'
            };
          }
        }
        return {};
      },

      fixedBodyHeight() {
        if (this.height) {
          return {
            height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          let maxHeight = parseHeight(this.maxHeight);
          if (typeof maxHeight === 'number') {
            maxHeight = this.layout.scrollX ? maxHeight - this.layout.gutterWidth : maxHeight;
            if (this.showHeader) {
              maxHeight -= this.layout.headerHeight;
            }
            maxHeight -= this.layout.footerHeight;
            return {
              'max-height': maxHeight + 'px'
            };
          }
        }
        return {};
      },

      fixedHeight() {
        if (this.maxHeight) {
          if (this.showSummary) {
            return {
              bottom: 0
            };
          }
          return {
            bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
          };
        } else {
          if (this.showSummary) {
            return {
              height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
            };
          }
          return {
            height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
          };
        }
      },

      emptyBlockStyle() {
        if (this.data && this.data.length) return null;
        let height = '100%';
        if (this.layout.appendHeight) {
          height = `calc(100% - ${this.layout.appendHeight}px)`;
        }
        return {
          width: this.bodyWidth,
          height
        };
      },

      isHeaderAffixed() {
        return !!(this.headerAffixedTop);
      },

      affixHeaderOffsetTop() {
        if (typeof this.headerAffixedTop === 'object') {
          return this.headerAffixedTop.offsetTop || 0;
        }
        return 0;
      },

      ...mapStates({
        selection: 'selection',
        columns: 'columns',
        tableData: 'data',
        fixedColumns: 'fixedColumns',
        rightFixedColumns: 'rightFixedColumns'
      })
    },

    watch: {
      height: {
        immediate: true,
        handler(value) {
          this.layout.setHeight(value);
        }
      },

      maxHeight: {
        immediate: true,
        handler(value) {
          this.layout.setMaxHeight(value);
        }
      },

      currentRowKey: {
        immediate: true,
        handler(value) {
          if (!this.rowKey) return;
          this.store.setCurrentRowKey(value);
        }
      },

      data: {
        immediate: true,
        handler(value) {
          this.store.commit('setData', value);
        }
      },

      expandRowKeys: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.store.setExpandRowKeysAdapter(newVal);
          }
        }
      }
    },

    created() {
      this.tableId = 'el-table_' + tableIdSeed++;
      this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
    },

    mounted() {
      this.bindEvents();
      this.store.updateColumns();
      this.doLayout();

      this.resizeState = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };

      // init filters
      this.store.states.columns.forEach(column => {
        if (column.filteredValue && column.filteredValue.length) {
          this.store.commit('filterChange', {
            column,
            values: column.filteredValue,
            silent: true
          });
        }
      });

      this.$ready = true;

      // 初始化吸顶表头位置
      if (this.isHeaderAffixed) {
        this.$nextTick(() => {
          this.updateAffixHeader();
        });
      }
    },

    destroyed() {
      this.unbindEvents();
    },

    data() {
      const { hasChildren = 'hasChildren', children = 'children' } = this.treeProps;
      this.store = createStore(this, {
        rowKey: this.rowKey,
        defaultExpandAll: this.defaultExpandAll,
        selectOnIndeterminate: this.selectOnIndeterminate,
        // TreeTable 的相关配置
        indent: this.indent,
        lazy: this.lazy,
        lazyColumnIdentifier: hasChildren,
        childrenColumnName: children
      });
      const layout = new TableLayout({
        store: this.store,
        table: this,
        fit: this.fit,
        showHeader: this.showHeader
      });
      return {
        layout,
        isHidden: false,
        renderExpanded: null,
        resizeProxyVisible: false,
        resizeState: {
          width: null,
          height: null
        },
        // 是否拥有多级表头
        isGroup: false,
        scrollPosition: 'left',
        // 表头吸顶相关
        showAffixHeader: false,
        affixHeaderStyle: {
          top: '0px',
          width: '100%'
        },
        tableRect: {
          top: 0,
          left: 0,
          width: 0,
          height: 0
        }
      };
    }
  };
</script>
