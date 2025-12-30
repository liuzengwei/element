<template>
  <div id="app">
    <h2>Drawer Reference Mode Test</h2>
    
    <!-- 基础示例 -->
    <div style="margin: 20px 0;">
      <h3>1. 基本容器内弹出</h3>
      <div class="test-container" ref="container1">
        <p>这是一个容器，点击按钮在容器内打开抽屉</p>
        <el-button @click="openDrawer1">打开抽屉</el-button>
        
        <el-drawer
          title="容器内抽屉"
          :visible.sync="drawer1"
          :reference="containerRef1"
          placement="right"
          size="300px">
          <div style="padding: 20px;">
            <p>这个抽屉应该在容器内打开，遮罩层也应该限制在容器内。</p>
            <el-button @click="drawer1 = false">关闭</el-button>
          </div>
        </el-drawer>
      </div>
    </div>

    <!-- 多方向示例 -->
    <div style="margin: 20px 0;">
      <h3>2. 四个方向测试</h3>
      <div class="test-container" ref="container2">
        <div style="text-align: center; padding: 20px;">
          <el-button @click="openTop">从上方</el-button>
          <el-button @click="openBottom">从下方</el-button>
          <el-button @click="openLeft">从左侧</el-button>
          <el-button @click="openRight">从右侧</el-button>
        </div>
        
        <el-drawer
          title="上方抽屉"
          :visible.sync="drawerTop"
          :reference="containerRef2"
          placement="top"
          size="150px">
          <div style="padding: 20px;">从上方弹出</div>
        </el-drawer>
        
        <el-drawer
          title="下方抽屉"
          :visible.sync="drawerBottom"
          :reference="containerRef2"
          placement="bottom"
          size="150px">
          <div style="padding: 20px;">从下方弹出</div>
        </el-drawer>
        
        <el-drawer
          title="左侧抽屉"
          :visible.sync="drawerLeft"
          :reference="containerRef2"
          placement="left"
          size="250px">
          <div style="padding: 20px;">从左侧弹出</div>
        </el-drawer>
        
        <el-drawer
          title="右侧抽屉"
          :visible.sync="drawerRight"
          :reference="containerRef2"
          placement="right"
          size="250px">
          <div style="padding: 20px;">从右侧弹出</div>
        </el-drawer>
      </div>
    </div>

    <!-- 表单示例 -->
    <div style="margin: 20px 0;">
      <h3>3. 表格编辑场景</h3>
      <div class="test-container" ref="container3">
        <el-table :data="tableData" size="small">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <el-drawer
          title="编辑信息"
          :visible.sync="drawerForm"
          :reference="containerRef3"
          placement="right"
          size="300px">
          <div style="padding: 20px;">
            <el-form :model="form" label-width="60px" size="small">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input-number v-model="form.age" :min="1"></el-input-number>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="drawerForm = false">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
      </div>
    </div>

    <!-- 全局模式对比 -->
    <div style="margin: 20px 0;">
      <h3>4. 全局模式对比（不设置 reference）</h3>
      <el-button @click="drawerGlobal = true">打开全局抽屉</el-button>
      
      <el-drawer
        title="全局抽屉"
        :visible.sync="drawerGlobal"
        size="300px">
        <div style="padding: 20px;">
          <p>这是传统的全局抽屉，遮罩层覆盖整个页面。</p>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<style scoped>
.test-container {
  position: relative;
  border: 2px dashed #409EFF;
  background: #f5f7fa;
  padding: 20px;
  margin: 10px 0;
  min-height: 300px;
  overflow: hidden;
}

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
      drawer1: false,
      containerRef1: null,
      
      drawerTop: false,
      drawerBottom: false,
      drawerLeft: false,
      drawerRight: false,
      containerRef2: null,
      
      drawerForm: false,
      containerRef3: null,
      tableData: [
        { name: '张三', age: 25 },
        { name: '李四', age: 30 },
        { name: '王五', age: 28 }
      ],
      form: {
        name: '',
        age: 0
      },
      
      drawerGlobal: false
    };
  },
  mounted() {
    this.containerRef1 = this.$refs.container1;
    this.containerRef2 = this.$refs.container2;
    this.containerRef3 = this.$refs.container3;
    
    console.log('Container refs:', {
      container1: this.containerRef1,
      container2: this.containerRef2,
      container3: this.containerRef3
    });
  },
  methods: {
    openDrawer1() {
      this.drawer1 = true;
    },
    openTop() {
      this.drawerTop = true;
    },
    openBottom() {
      this.drawerBottom = true;
    },
    openLeft() {
      this.drawerLeft = true;
    },
    openRight() {
      this.drawerRight = true;
    },
    handleEdit(row) {
      this.form = { ...row };
      this.drawerForm = true;
    }
  }
};
</script>
