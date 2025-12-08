<template>
  <div class="home">
    <h1>Element UI 测试项目</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <h2>欢迎使用</h2>
          <p>这是基于 xianniu-delivery-cloud-web 依赖配置的测试项目</p>
          <p>当前计数: {{ count }}</p>
          <el-button type="primary" @click="increment">增加</el-button>
          <el-button @click="incrementAsync">异步增加</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <h2>功能特性</h2>
          <ul>
            <li>Vue 2.7.14</li>
            <li>@liuzengwei/element-ui ^2.15.5-xn.13</li>
            <li>Vue Router 3.0.2</li>
            <li>Vuex 3.1.0</li>
            <li>Axios 0.18.1</li>
            <li>Dayjs 1.11.10</li>
            <li>Lodash 4.17.21</li>
          </ul>
          <el-button type="success" @click="goComponents">查看组件示例</el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <h3>日期格式化</h3>
          <p>{{ formattedDate }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h3>UUID 生成</h3>
          <p>{{ uuid }}</p>
          <el-button size="small" @click="generateUuid">重新生成</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h3>MD5 加密</h3>
          <el-input v-model="inputText" placeholder="输入文本"></el-input>
          <p>MD5: {{ md5Hash }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';

export default {
  name: 'Home',
  data() {
    return {
      inputText: 'Hello World',
      uuid: uuidv4()
    };
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount']),
    formattedDate() {
      return dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    md5Hash() {
      return this.inputText ? md5(this.inputText) : '';
    }
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['incrementAsync']),
    goComponents() {
      this.$router.push('/components');
    },
    generateUuid() {
      this.uuid = uuidv4();
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  color: #409eff;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding-left: 0;
}

ul li {
  padding: 5px 0;
  color: #606266;
}

ul li:before {
  content: "✓ ";
  color: #67c23a;
  font-weight: bold;
  margin-right: 5px;
}

.el-card {
  margin-bottom: 20px;
}

.el-button {
  margin-top: 10px;
  margin-right: 10px;
}

p {
  margin: 10px 0;
  color: #606266;
  word-break: break-all;
}
</style>
