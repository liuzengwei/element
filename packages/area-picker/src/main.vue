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

      // 触发 on-city 事件，返回城市详细信息
      const cityInfo = this.getCityInfo(value);
      this.$emit('on-city', cityInfo);
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

    // 获取城市详细信息
    getCityInfo(value) {
      const nodes = this.getCheckedNodes();
      if (!nodes || nodes.length === 0) {
        return {
          city: [],
          cityCode: [],
          cityName: [],
          cityCodeLast: '',
          cityNameLast: ''
        };
      }

      // 获取选中节点的路径
      const pathNodes = nodes[0].pathNodes || [];
      
      // 构建城市信息数组
      const city = pathNodes.map(node => {
        // 尝试多种方式获取标签
        let label = '';
        if (node[this.labelKey]) {
          label = node[this.labelKey];
        } else if (node.text) {
          label = node.text;
        } else if (node.label) {
          label = node.label;
        } else if (node.data && node.data[this.labelKey]) {
          label = node.data[this.labelKey];
        } else if (node.data && node.data.text) {
          label = node.data.text;
        } else if (node.data && node.data.label) {
          label = node.data.label;
        }
        
        return {
          code: node[this.valueKey] || node.value || node.code || '',
          label: label
        };
      });

      // 提取代码和名称数组
      const cityCode = city.map(item => item.code);
      const cityName = city.map(item => item.label);

      // 获取最后一级的代码和名称
      const cityCodeLast = cityCode.length > 0 ? cityCode[cityCode.length - 1] : '';
      const cityNameLast = cityName.length > 0 ? cityName[cityName.length - 1] : '';

      return {
        city,
        cityCode,
        cityName,
        cityCodeLast,
        cityNameLast
      };
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
    },

    // 根据地址字符串解析并回显城市信息
    str2Code(addressStr) {
      if (!addressStr || typeof addressStr !== 'string') {
        console.warn('str2Code: 地址字符串无效');
        return null;
      }

      // 清理地址字符串，移除空格
      const cleanAddress = addressStr.trim();
      
      // 尝试匹配省市区
      const result = this.parseAddress(cleanAddress);
      
      if (result && result.codes.length > 0) {
        // 根据 level 确定应该设置的代码
        const targetCodes = result.codes.slice(0, this.level);
        const lastCode = targetCodes[targetCodes.length - 1];
        
        // 设置选中值
        this.selectedValue = lastCode;
        this.$emit('input', lastCode);
        
        // 触发 change 事件
        this.$nextTick(() => {
          const cityInfo = this.getCityInfo(lastCode);
          this.$emit('change', lastCode, this.getCheckedNodes());
          this.$emit('on-city', cityInfo);
        });
        
        return result;
      }
      
      console.warn('str2Code: 未能解析出有效的城市信息');
      return null;
    },

    // 解析地址字符串，提取省市区信息
    parseAddress(addressStr) {
      const result = {
        province: '',
        city: '',
        district: '',
        codes: [],
        names: []
      };

      let bestMatch = null;
      let bestMatchDepth = 0;

      // 深度优先搜索所有可能的匹配路径
      const searchAllPaths = (text, options, level, parentCodes = [], parentNames = []) => {
        for (let i = 0; i < options.length; i++) {
          const option = options[i];
          const name = option[this.labelKey] || option.text || option.label || '';
          const code = option[this.valueKey] || option.value || option.code || '';
          
          if (!name) continue;
          
          // 创建多个匹配模式
          const matchPatterns = [
            name,
            name.replace(/(市|省|自治区|特别行政区|壮族|回族|维吾尔|苗族|彝族|土家族|藏族|区|县|旗)$/g, ''),
          ];
          
          let matchIndex = -1;
          let matchedPattern = '';
          
          // 尝试匹配
          for (const pattern of matchPatterns) {
            if (pattern && pattern.length >= 2) {
              const idx = text.indexOf(pattern);
              if (idx !== -1) {
                matchIndex = idx;
                matchedPattern = pattern;
                break;
              }
            }
          }
          
          if (matchIndex !== -1) {
            const currentCodes = [...parentCodes, code];
            const currentNames = [...parentNames, name];
            const depth = currentCodes.length;
            
            // 保存当前匹配
            const currentMatch = {
              codes: currentCodes,
              names: currentNames,
              depth: depth
            };
            
            // 如果当前匹配深度更深，更新最佳匹配
            if (depth > bestMatchDepth) {
              bestMatch = currentMatch;
              bestMatchDepth = depth;
            }
            
            // 继续在子级中搜索
            const children = option[this.childrenKey] || option.children || [];
            if (children && children.length > 0 && level < 3) {
              // 从匹配位置之后继续搜索
              const remainingText = text.substring(matchIndex + matchedPattern.length);
              if (remainingText.trim()) {
                searchAllPaths(remainingText, children, level + 1, currentCodes, currentNames);
              }
              
              // 重要：也在原始文本中搜索子级，支持跳过中间层级
              // 例如："天津市河东区" 可以跳过中间的"天津市"（市级）
              searchAllPaths(text, children, level + 1, currentCodes, currentNames);
            }
          }
        }
      };

      // 从省级开始搜索
      searchAllPaths(addressStr, this.areaOptions, 1);
      
      if (bestMatch) {
        // 根据匹配的层级填充结果
        if (bestMatch.names.length >= 1) result.province = bestMatch.names[0];
        if (bestMatch.names.length >= 2) result.city = bestMatch.names[1];
        if (bestMatch.names.length >= 3) result.district = bestMatch.names[2];
        
        result.codes = bestMatch.codes;
        result.names = bestMatch.names;
        return result;
      }
      
      return null;
    }
  }
};
</script>
