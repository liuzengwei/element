<template>
  <span 
    :class="['version-badge', `version-badge--${type}`]"
    :title="tooltipText"
  >
    {{ displayText }}
  </span>
</template>

<script>
const TYPE_CONFIG = {
  'new': {
    'zh-CN': '新组件',
    'en-US': 'NEW',
    'es': 'NUEVO',
    'fr-FR': 'NOUVEAU'
  },
  'feature': {
    'zh-CN': '新特性',
    'en-US': 'NEW',
    'es': 'NUEVO',
    'fr-FR': 'NOUVEAU'
  },
  'update': {
    'zh-CN': '有更新',
    'en-US': 'UPDATED',
    'es': 'ACTUALIZADO',
    'fr-FR': 'MIS À JOUR'
  },
  'deprecated': {
    'zh-CN': '已废弃',
    'en-US': 'DEPRECATED',
    'es': 'OBSOLETO',
    'fr-FR': 'DÉPRÉCIÉ'
  }
};

const TOOLTIP_PREFIX = {
  'zh-CN': '在版本',
  'en-US': 'Added in',
  'es': 'Añadido en',
  'fr-FR': 'Ajouté dans'
};

export default {
  name: 'VersionBadge',
  props: {
    // 版本号，如 "2.15.5" 或 "2.15.5-xn.30"
    version: {
      type: String,
      default: ''
    },
    // 类型: new(新组件) / feature(新特性) / update(更新) / deprecated(废弃)
    type: {
      type: String,
      default: 'feature',
      validator: v => ['new', 'feature', 'update', 'deprecated'].includes(v)
    },
    // 自定义显示文本，如果提供则覆盖默认文本
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 当前语言
    currentLang() {
      // 从路由或全局配置获取当前语言
      const path = this.$route.path || '';
      if (path.includes('/en-US/')) return 'en-US';
      if (path.includes('/es/')) return 'es';
      if (path.includes('/fr-FR/')) return 'fr-FR';
      return 'zh-CN';
    },
    // 显示的文本
    displayText() {
      if (this.text) {
        return this.text;
      }
      const config = TYPE_CONFIG[this.type];
      return config ? config[this.currentLang] : this.type.toUpperCase();
    },
    // 悬浮提示文本
    tooltipText() {
      if (!this.version) return '';
      const prefix = TOOLTIP_PREFIX[this.currentLang] || TOOLTIP_PREFIX['zh-CN'];
      return `${prefix} ${this.version}`;
    }
  }
};
</script>

<style scoped>
.version-badge {
  display: inline-block;
  padding: 1px 4px;
  margin-left: 6px;
  font-size: 11px;
  line-height: 1.4;
  font-weight: 500;
  border-radius: 2px;
  vertical-align: middle;
  white-space: nowrap;
  cursor: help;
  transform: scale(0.95);
}

/* 新组件 - 绿色 */
.version-badge--new {
  background-color: #f0f9ff;
  color: #67C23A;
  border: 1px solid #c2e7b0;
}

/* 新特性 - 蓝色 */
.version-badge--feature {
  background-color: #ecf5ff;
  color: #409EFF;
  border: 1px solid #b3d8ff;
}

/* 更新 - 橙色 */
.version-badge--update {
  background-color: #fdf6ec;
  color: #E6A23C;
  border: 1px solid #f5dab1;
}

/* 已废弃 - 红色 */
.version-badge--deprecated {
  background-color: #fef0f0;
  color: #F56C6C;
  border: 1px solid #fbc4c4;
}

/* 深色主题支持（可选） */
@media (prefers-color-scheme: dark) {
  .version-badge--new {
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.3);
  }
  
  .version-badge--feature {
    background-color: rgba(64, 158, 255, 0.1);
    border-color: rgba(64, 158, 255, 0.3);
  }
  
  .version-badge--update {
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.3);
  }
  
  .version-badge--deprecated {
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.3);
  }
}
</style>
