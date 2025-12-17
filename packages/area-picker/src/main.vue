<template>
  <el-cascader
    ref="cascader"
    v-model="selectedValue"
    :options="areaOptions"
    :props="cascaderProps"
    v-bind="$attrs"
    v-on="$listeners"
    @change="handleChange">
  </el-cascader>
</template>

<script>
import ElCascader from 'element-ui/packages/cascader';
import { useCascaderAreaData } from 'element-ui/src/area';

export default {
  name: 'ElAreaPicker',

  components: {
    ElCascader
  },

  props: {
    // v-model 绑定值
    value: {
      type: [Array, String, Number],
      default: () => []
    },
    // 级联选择器的级别，1-省，2-省市，3-省市区
    level: {
      type: Number,
      default: 3,
      validator: value => [1, 2, 3].includes(value)
    },
    // 自定义 cascader 的 props 配置
    props: {
      type: Object,
      default: () => ({})
    },
    // 指定选项的值字段名
    valueKey: {
      type: String,
      default: 'value'
    },
    // 指定选项的标签字段名
    labelKey: {
      type: String,
      default: 'text'
    },
    // 指定选项的子选项字段名
    childrenKey: {
      type: String,
      default: 'children'
    }
  },

  data() {
    return {
      areaOptions: [],
      selectedValue: this.value || []
    };
  },

  computed: {
    cascaderProps() {
      // 获取外部传入的props配置
      const externalProps = this.props || {};
      console.log('🚀 ~ externalProps:', externalProps);
      const res = {
        // 从组件属性中获取checkStrictly和multiple
        emitPath: false,
        expandTrigger: 'hover',
        value: this.valueKey,
        label: this.labelKey,
        children: this.childrenKey,
        // 合并外部传入的props配置，这会覆盖上面的默认值
        ...externalProps
      };
      console.log(res);

      // 构建cascader的props配置
      return res;
    }
  },

  watch: {
    value: {
      handler(val) {
        this.selectedValue = val;
      },
      deep: true
    }
  },

  created() {
    this.initAreaData();
  },

  methods: {
    // 初始化省市区数据
    initAreaData() {
      const allAreaData = useCascaderAreaData();

      // 递归转换数据结构，使用配置的字段名
      const convertData = (data, level) => {
        return data.map(item => {
          const result = {
            [this.valueKey]: item.value,
            [this.labelKey]: item.text
          };

          // 根据level参数决定是否包含子级
          if (level < this.level && item.children && item.children.length > 0) {
            result[this.childrenKey] = convertData(item.children, level + 1);
          }

          return result;
        });
      };

      // 转换数据
      this.areaOptions = convertData(allAreaData, 1);
    },

    // 处理选择变化
    handleChange(value) {
      this.$emit('input', value);
      this.$emit('change', value, this.getCheckedNodes());
    },

    // 处理展开变化
    handleExpandChange(value) {
      this.$emit('expand-change', value);
    },

    // 处理显示/隐藏变化
    handleVisibleChange(visible) {
      this.$emit('visible-change', visible);
    },

    // 处理移除标签
    handleRemoveTag(value) {
      this.$emit('remove-tag', value);
    },

    // 获取选中的节点
    getCheckedNodes() {
      if (this.$refs.cascader) {
        return this.$refs.cascader.getCheckedNodes();
      }
      return [];
    },

    // 获取选中的路径
    getCheckedPaths() {
      if (this.$refs.cascader) {
        return this.$refs.cascader.getCheckedNodes().map(node => node.path);
      }
      return [];
    },

    // 根据code获取完整路径
    getPathByCode(code) {
      const nodes = this.getCheckedNodes();
      const node = nodes.find(n => n[this.valueKey] === code);
      return node ? node.pathNodes.map(n => n[this.labelKey]).join(this.separator) : '';
    },

    // 清空已选项
    clear() {
      if (this.$refs.cascader) {
        this.$refs.cascader.clear();
      }
    },

    // 暴露cascader的方法
    toggleDropDownVisible(visible) {
      if (this.$refs.cascader) {
        this.$refs.cascader.toggleDropDownVisible(visible);
      }
    }
  }
};
</script>
