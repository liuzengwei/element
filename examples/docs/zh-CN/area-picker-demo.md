<template>
  <div>
    <h3>基础用法</h3>
    <el-area-picker v-model="value" placeholder="请选择省/市/区"></el-area-picker>
    <p>选中的值: {{ value }}</p>
    
    <h3>只选择省份</h3>
    <el-area-picker v-model="provinceValue" :level="1" placeholder="请选择省份"></el-area-picker>
    <p>选中的值: {{ provinceValue }}</p>
    
    <h3>选择省市</h3>
    <el-area-picker v-model="cityValue" :level="2" placeholder="请选择省市"></el-area-picker>
    <p>选中的值: {{ cityValue }}</p>
    
    <h3>多选</h3>
    <el-area-picker v-model="multipleValue" :multiple="true" placeholder="请选择多个城市"></el-area-picker>
    <p>选中的值: {{ multipleValue }}</p>
    
    <h3>可选择任意级别</h3>
    <el-area-picker v-model="strictValue" :check-strictly="true" placeholder="请选择"></el-area-picker>
    <p>选中的值: {{ strictValue }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      provinceValue: '',
      cityValue: '',
      multipleValue: [],
      strictValue: ''
    };
  }
};
</script>