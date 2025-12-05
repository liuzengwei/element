<template>
  <div style="margin: 20px;">
    <el-input v-model="input" placeholder="请输入内容" clearable></el-input>
    <el-button type="info" @click="">按钮</el-button>
    <el-button  @click="">按钮</el-button>
    
    <h3>Round Tag 测试</h3>
    <el-tag type="danger" size="normal" round>圆形标签</el-tag>
    <el-tag type="success" size="normal" round>成功圆形标签</el-tag>
    <el-tag type="warning" size="small" round>小型圆形标签</el-tag>
    <el-tag type="info" size="mini" round>迷你圆形标签</el-tag>
    
    <h3>带图标的标签测试</h3>
    <el-tag type="primary">
      <template slot="icon">
        <i class="el-icon-check"></i>
      </template>
      带图标的标签
    </el-tag>
    
    <el-tag type="success" round>
      <template slot="icon">
        <i class="el-icon-check"></i>
      </template>
      带图标的圆形标签
    </el-tag>
    
    <el-tag type="warning" closable>
      <template slot="icon">
        <i class="el-icon-warning"></i>
      </template>
      可关闭的带图标标签
    </el-tag>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello Element UI!'
      };
    }
  };
</script>
