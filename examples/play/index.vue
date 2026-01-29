<template>
  <div id="app">
    <h2>Select 复合型选择框示例</h2>
    
    <!-- 基础示例 -->
    <div style="margin: 20px 0;">
      <h3>1. 基本后置按钮</h3>
      <el-select v-model="value1" placeholder="请选择">
        <el-option label="选项1" value="1"></el-option>
        <el-option label="选项2" value="2"></el-option>
        <el-option label="选项3" value="3"></el-option>
        <el-option label="选项4" value="4"></el-option>
        <el-option label="选项5" value="5"></el-option>
      </el-select>
    </div>

    <!-- 前置文本示例 -->
    <div style="margin: 20px 0;">
      <h3>2. 前置文本</h3>
      <el-select v-model="value2" placeholder="请选择">
        <template slot="prepend">类型</template>
        <el-option label="选项1" value="1"></el-option>
        <el-option label="选项2" value="2"></el-option>
        <el-option label="选项3" value="3"></el-option>
      </el-select>
    </div>

    <!-- 后置文本示例 -->
    <div style="margin: 20px 0;">
      <h3>3. 后置文本</h3>
      <el-select v-model="value3" placeholder="请选择">
        <template slot="append">.com</template>
        <el-option label="google" value="google"></el-option>
        <el-option label="baidu" value="baidu"></el-option>
        <el-option label="github" value="github"></el-option>
      </el-select>
    </div>

    <!-- 前后置组合示例 -->
    <div style="margin: 20px 0;">
      <h3>4. 前后置组合</h3>
      <el-select v-model="value4" placeholder="请选择">
        <template slot="prepend">Http://</template>
        <template slot="append">.com</template>
        <el-option label="www" value="www"></el-option>
        <el-option label="api" value="api"></el-option>
        <el-option label="admin" value="admin"></el-option>
      </el-select>
    </div>

    <!-- 按钮组合示例 -->
    <div style="margin: 20px 0;">
      <h3>5. 后置按钮 - 带操作</h3>
      <el-select v-model="value5" placeholder="请选择" style="width: 300px">
        <template slot="append">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </template>
        <el-option label="北京" value="beijing"></el-option>
        <el-option label="上海" value="shanghai"></el-option>
        <el-option label="广州" value="guangzhou"></el-option>
        <el-option label="深圳" value="shenzhen"></el-option>
      </el-select>
    </div>

    <!-- 多选模式 -->
    <div style="margin: 20px 0;">
      <h3>6. 多选模式 + 后置按钮</h3>
      <el-select v-model="value6" multiple placeholder="请选择" style="width: 400px">
        <template slot="append">
          <el-button icon="el-icon-check"></el-button>
        </template>
        <el-option label="选项1" value="1"></el-option>
        <el-option label="选项2" value="2"></el-option>
        <el-option label="选项3" value="3"></el-option>
        <el-option label="选项4" value="4"></el-option>
      </el-select>
    </div>

    <!-- 可搜索模式 -->
    <div style="margin: 20px 0;">
      <h3>7. 可搜索 + 后置按钮</h3>
      <el-select v-model="value7" filterable placeholder="请选择" style="width: 300px">
        <template slot="append">
          <el-button icon="el-icon-plus">添加</el-button>
        </template>
        <el-option label="JavaScript" value="js"></el-option>
        <el-option label="Python" value="py"></el-option>
        <el-option label="Java" value="java"></el-option>
        <el-option label="Go" value="go"></el-option>
      </el-select>
    </div>

    <!-- 尺寸示例 -->
    <div style="margin: 20px 0;">
      <h3>8. 不同尺寸</h3>
      <div style="margin-bottom: 10px;">
        <el-select v-model="value8" size="medium" placeholder="Medium">
          <template slot="append">
            <el-button size="medium" icon="el-icon-search"></el-button>
          </template>
          <el-option label="选项1" value="1"></el-option>
          <el-option label="选项2" value="2"></el-option>
        </el-select>
      </div>
      <div style="margin-bottom: 10px;">
        <el-select v-model="value8" size="small" placeholder="Small">
          <template slot="append">
            <el-button size="small" icon="el-icon-search"></el-button>
          </template>
          <el-option label="选项1" value="1"></el-option>
          <el-option label="选项2" value="2"></el-option>
        </el-select>
      </div>
      <div>
        <el-select v-model="value8" size="mini" placeholder="Mini">
          <template slot="append">
            <el-button size="mini" icon="el-icon-search"></el-button>
          </template>
          <el-option label="选项1" value="1"></el-option>
          <el-option label="选项2" value="2"></el-option>
        </el-select>
      </div>
    </div>

    <!-- 当前选择值 -->
    <div style="margin-top: 40px; padding: 20px; background: #f5f7fa; border-radius: 4px;">
      <h3>当前选择值：</h3>
      <p>value1: {{ value1 }}</p>
      <p>value2: {{ value2 }}</p>
      <p>value3: {{ value3 }}</p>
      <p>value4: {{ value4 }}</p>
      <p>value5: {{ value5 }}</p>
      <p>value6: {{ value6 }}</p>
      <p>value7: {{ value7 }}</p>
      <p>value8: {{ value8 }}</p>
    </div>
  </div>
</template>

<style scoped>
#app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #409EFF;
  border-bottom: 2px solid #409EFF;
  padding-bottom: 10px;
}

h3 {
  color: #666;
  margin: 20px 0 10px;
}
</style>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: [],
      value7: '',
      value8: ''
    };
  },
  methods: {
    handleSearch() {
      this.$message({
        message: `搜索: ${this.value5}`,
        type: 'success'
      });
    }
  }
};
</script>
