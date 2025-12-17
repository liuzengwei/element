<script>
  export default {
    name: 'ElTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String,
      icon: String, // 图标类名
      round: Boolean,
      status: String, // 状态类型：success/pending/cancel
      effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].indexOf(val) !== -1;
        }
      }
    },
    data() {
      return {
        // 内置状态配置
        statusConfig: {
          success: {
            type: 'success',
            icon: 'el-icon-check',
            text: '已处理'
          },
          warning: {
            type: 'warning',
            icon: 'el-icon-point',
            text: '待处理'
          },
          danger: {
            type: 'danger',
            icon: 'el-icon-status-error',
            text: '已取消'
          }
        }
      };
    },
    methods: {
      handleClose(event) {
        event.stopPropagation();
        this.$emit('close', event);
      },
      handleClick(event) {
        this.$emit('click', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      },
      // 获取当前状态配置
      currentStatus() {
        return this.status ? this.statusConfig[this.status] : null;
      },
      // 计算最终的类型
      finalType() {
        return this.currentStatus ? this.currentStatus.type : this.type;
      },
      // 计算最终的图标
      finalIcon() {
        return this.currentStatus ? this.currentStatus.icon : this.icon;
      },
      // 计算最终的文本
      finalText() {
        if (this.$slots.default) {
          return null; // 如果有插槽内容，优先使用插槽
        }
        return this.currentStatus ? this.currentStatus.text : this.text;
      }
    },
    render(h) {
      const { finalType, tagSize, hit, effect, round, finalIcon } = this;
      const classes = [
        'el-tag',
        finalType ? `el-tag--${finalType}` : '',
        tagSize ? `el-tag--${tagSize}` : '',
        effect ? `el-tag--${effect}` : '',
        round && 'is-round',
        hit && 'is-hit'
      ];
  
      // 构建图标元素
      let iconEl = null;
      if (this.$slots.icon) {
        // 优先使用插槽
        iconEl = (
          <span class="el-tag__icon">
            { this.$slots.icon }
          </span>
        );
      } else if (finalIcon) {
        // 使用计算后的图标（状态图标或自定义图标）
        iconEl = (
          <span class="el-tag__icon">
            <i class={ finalIcon }></i>
          </span>
        );
      }

      const tagEl = (
        <span
          class={ classes }
          style={{ backgroundColor: this.color }}
          on-click={ this.handleClick }>
          { iconEl }
          { this.$slots.default || this.finalText }
          {
            this.closable && <i class="el-tag__close el-icon-close" on-click={ this.handleClose }></i>
          }
        </span>
      );

      return this.disableTransitions ? tagEl : <transition name="el-zoom-in-center">{ tagEl }</transition>;
    }
  };
</script>
