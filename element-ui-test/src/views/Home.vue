<template>
  <div class="home">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="hover" class="feature-card">
              <div class="card-icon">
                <i class="el-icon-s-grid"></i>
              </div>
              <h2>组件库测试</h2>
              <p>测试 @liuzengwei/element-ui 所有常用组件</p>
              <el-button type="primary" @click="$router.push('/components')">
                查看组件 <i class="el-icon-arrow-right"></i>
              </el-button>
            </el-card>
          </el-col>
          
          <el-col :span="6">
            <el-card shadow="hover" class="feature-card">
              <div class="card-icon">
                <i class="el-icon-s-tools"></i>
              </div>
              <h2>工具库测试</h2>
              <p>测试常用工具库：Dayjs、Lodash、UUID 等</p>
              <el-button type="success" @click="$router.push('/utils')">
                查看工具 <i class="el-icon-arrow-right"></i>
              </el-button>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card shadow="hover" class="feature-card">
              <div class="card-icon">
                <i class="el-icon-setting"></i>
              </div>
              <h2>Utils 依赖测试</h2>
              <p>测试依赖 dom/popup/util 工具的组件</p>
              <el-button type="warning" @click="$router.push('/utils-test')">
                工具测试 <i class="el-icon-arrow-right"></i>
              </el-button>
            </el-card>
          </el-col>
          
          <el-col :span="6">
            <el-card shadow="hover" class="feature-card">
              <div class="card-icon">
                <i class="el-icon-data-line"></i>
              </div>
              <h2>Vuex 状态</h2>
              <p>当前计数: <strong>{{ count }}</strong></p>
              <el-button-group>
                <el-button icon="el-icon-minus" @click="decrement"></el-button>
                <el-button icon="el-icon-plus" @click="increment"></el-button>
              </el-button-group>
              <el-button type="warning" @click="incrementAsync" style="margin-left: 10px;">
                异步+1
              </el-button>
            </el-card>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <div slot="header">
                <span>项目依赖</span>
              </div>
              <el-table :data="dependencies" stripe style="width: 100%">
                <el-table-column prop="name" label="依赖包" width="250"></el-table-column>
                <el-table-column prop="version" label="版本"></el-table-column>
              </el-table>
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card>
              <div slot="header">
                <span>快速测试</span>
              </div>
              <div class="quick-test">
                <el-alert
                  title="提示信息"
                  type="info"
                  :closable="false"
                  show-icon>
                </el-alert>
                
                <el-input 
                  v-model="testInput" 
                  placeholder="输入测试内容" 
                  clearable
                  style="margin-top: 15px;">
                  <template slot="prepend">测试</template>
                </el-input>
                
                <div style="margin-top: 15px;">
                  <el-tag>Tag 1</el-tag>
                  <el-tag type="success">Tag 2</el-tag>
                  <el-tag type="warning">Tag 3</el-tag>
                  <el-tag type="danger">Tag 4</el-tag>
                </div>
                
                <div style="margin-top: 15px;">
                  <el-button @click="showMessage" size="small">显示消息</el-button>
                  <el-button @click="showNotify" type="success" size="small">显示通知</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-card>
          <div slot="header">
            <span>环境信息</span>
          </div>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="Vue 版本">{{ vueVersion }}</el-descriptions-item>
            <el-descriptions-item label="Element UI">^2.15.5-xn.13</el-descriptions-item>
            <el-descriptions-item label="Node 环境">{{ nodeEnv }}</el-descriptions-item>
            <el-descriptions-item label="构建工具">Vue CLI 4.4.4</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';

export default {
  name: 'Home',
  data() {
    return {
      testInput: '',
      vueVersion: Vue.version,
      nodeEnv: process.env.NODE_ENV || 'development',
      dependencies: [
        { name: '@liuzengwei/element-ui', version: '^2.15.5-xn.13' },
        { name: 'vue', version: '^2.7.14' },
        { name: 'vue-router', version: '^3.0.2' },
        { name: 'vuex', version: '3.1.0' },
        { name: 'axios', version: '0.18.1' },
        { name: 'dayjs', version: '^1.11.10' },
        { name: 'lodash', version: '^4.17.21' },
        { name: 'echarts', version: '^5.5.1' }
      ]
    };
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapActions(['increment', 'decrement', 'incrementAsync']),
    showMessage() {
      this.$message.success('这是一条成功消息！');
    },
    showNotify() {
      this.$notify({
        title: '通知',
        message: 'Element UI 组件运行正常！',
        type: 'success'
      });
    }
  }
};
</script>

<style scoped>
.home {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 20px 10px;
  min-height: 280px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 20px;
}

.feature-card h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #303133;
}

.feature-card p {
  color: #909399;
  margin-bottom: 20px;
  min-height: 40px;
}

.feature-card strong {
  font-size: 24px;
  color: #409eff;
}

.quick-test .el-tag {
  margin-right: 10px;
}
</style>
