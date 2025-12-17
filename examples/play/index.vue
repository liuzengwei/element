<template>
  <div style="margin: 20px; padding: 100px;">
    <h2>Trigger 触发器测试</h2>
    
    <div style="margin: 20px 0;">
      <h3>基础用法 - Hover</h3>
      <el-trigger trigger="hover" :show-arrow="true">
        <el-button>Hover 触发</el-button>
        <template slot="content">
          <div style="padding: 12px;">
            <p>这是弹出内容</p>
            <p>鼠标悬浮显示</p>
          </div>
        </template>
      </el-trigger>
    </div>

    <div style="margin: 20px 0;">
      <h3>Click 触发</h3>
      <el-trigger trigger="click" :show-arrow="true">
        <el-button type="primary">Click 触发</el-button>
        <template slot="content">
          <div style="padding: 12px;">
            <p>点击按钮显示</p>
            <p>再次点击隐藏</p>
          </div>
        </template>
      </el-trigger>
    </div>

    <div style="margin: 20px 0;">
      <h3>不同位置</h3>
      <el-trigger position="top" :show-arrow="true" style="margin-right: 10px;">
        <el-button>Top</el-button>
        <template slot="content">
          <div style="padding: 12px;">顶部显示</div>
        </template>
      </el-trigger>
      
      <el-trigger position="right" :show-arrow="true" style="margin-right: 10px;">
        <el-button>Right</el-button>
        <template slot="content">
          <div style="padding: 12px;">右侧显示</div>
        </template>
      </el-trigger>
      
      <el-trigger position="bottom" :show-arrow="true" style="margin-right: 10px;">
        <el-button>Bottom</el-button>
        <template slot="content">
          <div style="padding: 12px;">底部显示</div>
        </template>
      </el-trigger>
      
      <el-trigger position="left" :show-arrow="true">
        <el-button>Left</el-button>
        <template slot="content">
          <div style="padding: 12px;">左侧显示</div>
        </template>
      </el-trigger>
    </div>

    <div style="margin: 20px 0;">
      <h3>受控模式</h3>
      <el-trigger v-model="visible" trigger="click" :show-arrow="true">
        <el-button type="success">受控触发器</el-button>
        <template slot="content">
          <div style="padding: 12px;">
            <p>这是受控模式</p>
            <el-button size="small" @click="visible = false">关闭</el-button>
          </div>
        </template>
      </el-trigger>
      <el-button style="margin-left: 10px;" @click="visible = !visible">
        {{ visible ? '关闭' : '打开' }}
      </el-button>
    </div>

    <div style="margin: 20px 0;">
      <h3>自定义样式</h3>
      <el-trigger 
        trigger="hover" 
        :show-arrow="true"
        :content-style="{ background: '#303133', color: '#fff', border: 'none' }"
        :arrow-style="{ borderBottomColor: '#303133' }">
        <el-button type="warning">自定义样式</el-button>
        <template slot="content">
          <div style="padding: 12px;">
            深色主题弹出框
          </div>
        </template>
      </el-trigger>
    </div>

    <div style="margin: 20px 0;">
      <h3>延时触发</h3>
      <el-trigger 
        trigger="hover" 
        :show-arrow="true"
        :mouse-enter-delay="500"
        :mouse-leave-delay="500">
        <el-button>延时 500ms</el-button>
        <template slot="content">
          <div style="padding: 12px;">
            <p>移入延时 500ms</p>
            <p>移出延时 500ms</p>
          </div>
        </template>
      </el-trigger>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
h3 {
  margin: 15px 0;
  font-size: 16px;
  color: #606266;
}
</style>

