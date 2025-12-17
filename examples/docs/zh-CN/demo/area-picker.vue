<template>
  <div class="demo-area-picker">
    <h2>城市选择器示例</h2>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>基础用法</h3>
          <el-area-picker v-model="value1" placeholder="请选择省/市/区"></el-area-picker>
          <p>选中的值: {{ value1 }}</p>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="demo-block">
          <h3>只选择省份</h3>
          <el-area-picker v-model="value2" :level="1" placeholder="请选择省份"></el-area-picker>
          <p>选中的值: {{ value2 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>选择省市</h3>
          <el-area-picker v-model="value3" :level="2" placeholder="请选择省市"></el-area-picker>
          <p>选中的值: {{ value3 }}</p>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="demo-block">
          <h3>可选择任意级别</h3>
          <el-area-picker v-model="value4" :check-strictly="true" placeholder="请选择"></el-area-picker>
          <p>选中的值: {{ value4 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>多选</h3>
          <el-area-picker v-model="value5" :multiple="true" placeholder="请选择多个城市"></el-area-picker>
          <p>选中的值: {{ value5 }}</p>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="demo-block">
          <h3>可搜索</h3>
          <el-area-picker v-model="value6" :filterable="true" placeholder="可搜索"></el-area-picker>
          <p>选中的值: {{ value6 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>禁用状态</h3>
          <el-area-picker v-model="value7" :disabled="true" placeholder="禁用状态"></el-area-picker>
          <p>选中的值: {{ value7 }}</p>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="demo-block">
          <h3>可清空</h3>
          <el-area-picker v-model="value8" :clearable="true" placeholder="可清空"></el-area-picker>
          <p>选中的值: {{ value8 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="24">
        <div class="demo-block">
          <h3>事件监听</h3>
          <el-area-picker 
            v-model="value9" 
            placeholder="事件监听"
            @change="handleChange"
            @expand-change="handleExpandChange"
            @visible-change="handleVisibleChange">
          </el-area-picker>
          <p>选中的值: {{ value9 }}</p>
          <p>事件日志:</p>
          <ul>
            <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: [],
      value6: '',
      value7: '110000',
      value8: '110101',
      value9: '',
      logs: []
    };
  },
  methods: {
    handleChange(value) {
      this.logs.push(`change事件: ${value}`);
    },
    handleExpandChange(value) {
      this.logs.push(`expand-change事件: ${JSON.stringify(value)}`);
    },
    handleVisibleChange(visible) {
      this.logs.push(`visible-change事件: ${visible}`);
    }
  }
};
</script>

<style scoped>
.demo-area-picker {
  padding: 20px;
}

.demo-block {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
}

.demo-block p {
  margin-top: 10px;
  color: #666;
}

.demo-block ul {
  margin-top: 10px;
  padding-left: 20px;
}

.demo-block li {
  margin-bottom: 5px;
  color: #666;
}
</style>