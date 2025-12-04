<template>
  <div>
    <h3>Round Tag 示例</h3>
    <el-tag round>默认圆形标签</el-tag>
    <el-tag round type="success">成功圆形标签</el-tag>
    <el-tag round type="warning">警告圆形标签</el-tag>
    <el-tag round type="danger">危险圆形标签</el-tag>
    <el-tag round type="info">信息圆形标签</el-tag>
    
    <h3>不同尺寸的圆形标签</h3>
    <el-tag round size="large">大型圆形标签</el-tag>
    <el-tag round>默认圆形标签</el-tag>
    <el-tag round size="small">小型圆形标签</el-tag>
    <el-tag round size="mini">迷你圆形标签</el-tag>
    
    <h3>带图标的标签</h3>
    <el-tag>
      <template #icon>
        <i class="el-icon-star-on"></i>
      </template>
      带图标的标签
    </el-tag>
    
    <el-tag round type="success">
      <template #icon>
        <i class="el-icon-check"></i>
      </template>
      带图标的圆形标签
    </el-tag>
    
    <el-tag type="warning" closable>
      <template #icon>
        <i class="el-icon-warning"></i>
      </template>
      可关闭的带图标标签
    </el-tag>
    
    <h3>不同效果的带图标标签</h3>
    <el-tag effect="dark">
      <template #icon>
        <i class="el-icon-user"></i>
      </template>
      深色效果
    </el-tag>
    
    <el-tag effect="plain">
      <template #icon>
        <i class="el-icon-setting"></i>
      </template>
      朴素效果
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'TagTest'
}
</script>