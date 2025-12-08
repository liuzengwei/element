<template>
  <div class="utils-page">
    <el-container>
      <el-main>
        <div class="back-button">
          <el-button type="text" icon="el-icon-back" @click="$router.push('/')">返回首页</el-button>
        </div>

        <h1>工具库测试</h1>

        <!-- Dayjs -->
        <el-card class="util-card">
          <div slot="header">
            <i class="el-icon-time"></i> Dayjs 日期处理
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>当前时间</h3>
              <p>{{ currentTime }}</p>
              <el-button size="small" @click="updateTime">刷新时间</el-button>
            </el-col>
            <el-col :span="12">
              <h3>格式化</h3>
              <p>YYYY-MM-DD: {{ formatDate('YYYY-MM-DD') }}</p>
              <p>YYYY年MM月DD日: {{ formatDate('YYYY年MM月DD日') }}</p>
              <p>HH:mm:ss: {{ formatDate('HH:mm:ss') }}</p>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <h3>相对时间</h3>
              <p>3天前: {{ getDaysBefore(3) }}</p>
              <p>7天前: {{ getDaysBefore(7) }}</p>
              <p>30天前: {{ getDaysBefore(30) }}</p>
            </el-col>
            <el-col :span="8">
              <h3>日期计算</h3>
              <p>明天: {{ getTomorrow() }}</p>
              <p>下周: {{ getNextWeek() }}</p>
              <p>下个月: {{ getNextMonth() }}</p>
            </el-col>
            <el-col :span="8">
              <h3>时间差</h3>
              <el-date-picker v-model="compareDate" type="date" placeholder="选择日期" size="small"></el-date-picker>
              <p v-if="compareDate">距离: {{ getDaysDiff() }} 天</p>
            </el-col>
          </el-row>
        </el-card>

        <!-- Lodash -->
        <el-card class="util-card">
          <div slot="header">
            <i class="el-icon-s-operation"></i> Lodash 工具函数
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>数组操作</h3>
              <p>原数组: {{ testArray }}</p>
              <p>去重: {{ uniqueArray }}</p>
              <p>分块(2): {{ chunkedArray }}</p>
              <p>压缩: {{ compactArray }}</p>
            </el-col>
            <el-col :span="12">
              <h3>对象操作</h3>
              <p>原对象: {{ JSON.stringify(testObject) }}</p>
              <p>键: {{ objectKeys }}</p>
              <p>值: {{ objectValues }}</p>
              <p>深克隆: {{ JSON.stringify(clonedObject) }}</p>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>字符串操作</h3>
              <el-input v-model="testString" placeholder="输入文本" size="small"></el-input>
              <p style="margin-top: 10px;">驼峰: {{ camelCaseStr }}</p>
              <p>大写: {{ upperCaseStr }}</p>
              <p>首字母大写: {{ capitalizeStr }}</p>
            </el-col>
            <el-col :span="12">
              <h3>数值操作</h3>
              <p>求和: {{ sum([1, 2, 3, 4, 5]) }}</p>
              <p>平均值: {{ mean([10, 20, 30, 40, 50]) }}</p>
              <p>最大值: {{ max([5, 10, 15, 20]) }}</p>
              <p>最小值: {{ min([5, 10, 15, 20]) }}</p>
            </el-col>
          </el-row>
        </el-card>

        <!-- UUID -->
        <el-card class="util-card">
          <div slot="header">
            <i class="el-icon-document"></i> UUID 生成
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>UUID v4</h3>
              <p style="word-break: break-all;">{{ uuid1 }}</p>
              <el-button size="small" @click="generateUUID1">重新生成</el-button>
            </el-col>
            <el-col :span="12">
              <h3>UUID 列表</h3>
              <el-button size="small" @click="generateUUIDs">生成5个UUID</el-button>
              <ul style="margin-top: 10px;">
                <li v-for="(id, index) in uuidList" :key="index" style="font-size: 12px; margin: 5px 0;">{{ id }}</li>
              </ul>
            </el-col>
          </el-row>
        </el-card>

        <!-- MD5 -->
        <el-card class="util-card">
          <div slot="header">
            <i class="el-icon-lock"></i> MD5 加密
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <h3>MD5 哈希</h3>
              <el-input v-model="md5Input" placeholder="输入要加密的文本" clearable>
                <template slot="prepend">原文</template>
              </el-input>
              <el-input :value="md5Hash" readonly style="margin-top: 10px;">
                <template slot="prepend">MD5</template>
                <el-button slot="append" icon="el-icon-document-copy" @click="copyMD5"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <p><strong>密码:</strong> 123456</p>
              <p>MD5: {{ md5('123456') }}</p>
            </el-col>
            <el-col :span="8">
              <p><strong>邮箱:</strong> test@example.com</p>
              <p>MD5: {{ md5('test@example.com') }}</p>
            </el-col>
            <el-col :span="8">
              <p><strong>用户名:</strong> admin</p>
              <p>MD5: {{ md5('admin') }}</p>
            </el-col>
          </el-row>
        </el-card>

        <!-- QRCode -->
        <el-card class="util-card">
          <div slot="header">
            <i class="el-icon-picture"></i> QRCode 二维码
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>生成二维码</h3>
              <el-input v-model="qrcodeText" placeholder="输入要生成二维码的内容" clearable>
                <el-button slot="append" @click="generateQRCode">生成</el-button>
              </el-input>
              <div v-if="qrcodeUrl" style="margin-top: 20px; text-align: center;">
                <img :src="qrcodeUrl" alt="QR Code" style="max-width: 200px;">
              </div>
            </el-col>
            <el-col :span="12">
              <h3>常用二维码示例</h3>
              <el-button size="small" @click="generateQRCodeFor('https://element.eleme.io')">Element UI 官网</el-button>
              <el-button size="small" @click="generateQRCodeFor('https://github.com')">GitHub</el-button>
              <el-button size="small" @click="generateQRCodeFor('测试文本内容')">测试文本</el-button>
            </el-col>
          </el-row>
        </el-card>

        <!-- Decimal.js -->
        <el-card class="util-card">
          <div slot="header">
            <i class="el-icon-s-data"></i> Decimal.js 精确计算
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>浮点数精确计算</h3>
              <el-form label-width="80px" size="small">
                <el-form-item label="数值1">
                  <el-input-number v-model="num1" :precision="2" :step="0.1"></el-input-number>
                </el-form-item>
                <el-form-item label="数值2">
                  <el-input-number v-model="num2" :precision="2" :step="0.1"></el-input-number>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <h3>计算结果</h3>
              <p>加法: {{ decimalAdd }}</p>
              <p>减法: {{ decimalSubtract }}</p>
              <p>乘法: {{ decimalMultiply }}</p>
              <p>除法: {{ decimalDivide }}</p>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-alert
            title="提示"
            type="info"
            :closable="false"
            show-icon>
            <template>
              JavaScript 浮点数计算可能不精确，例如 0.1 + 0.2 = {{ 0.1 + 0.2 }}<br>
              使用 Decimal.js 可以得到精确结果: {{ decimalExample }}
            </template>
          </el-alert>
        </el-card>

        <!-- Axios -->
        <el-card class="util-card">
          <div slot="header">
            <i class="el-icon-connection"></i> Axios HTTP 请求
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>API 测试</h3>
              <el-button @click="testAxiosGet" :loading="axiosLoading">GET 请求测试</el-button>
              <el-button type="success" @click="testAxiosPost" :loading="axiosLoading">POST 请求测试</el-button>
            </el-col>
            <el-col :span="12">
              <h3>响应数据</h3>
              <div v-if="axiosResponse" style="max-height: 200px; overflow-y: auto; background: #f5f7fa; padding: 10px; border-radius: 4px;">
                <pre style="margin: 0; font-size: 12px;">{{ JSON.stringify(axiosResponse, null, 2) }}</pre>
              </div>
              <p v-else style="color: #909399;">暂无数据</p>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import QRCode from 'qrcode';
import Decimal from 'decimal.js';
import axios from 'axios';

export default {
  name: 'Utils',
  data() {
    return {
      // Dayjs
      currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      compareDate: null,
      
      // Lodash
      testArray: [1, 2, 2, 3, 4, 4, 5, null, undefined, 0],
      testObject: { name: '张三', age: 25, city: '北京' },
      testString: 'hello world',
      
      // UUID
      uuid1: uuidv4(),
      uuidList: [],
      
      // MD5
      md5Input: 'Hello World',
      
      // QRCode
      qrcodeText: 'https://element.eleme.io',
      qrcodeUrl: '',
      
      // Decimal
      num1: 0.1,
      num2: 0.2,
      
      // Axios
      axiosLoading: false,
      axiosResponse: null
    };
  },
  computed: {
    // Lodash
    uniqueArray() {
      return _.uniq(this.testArray);
    },
    chunkedArray() {
      return _.chunk(this.testArray, 2);
    },
    compactArray() {
      return _.compact(this.testArray);
    },
    objectKeys() {
      return _.keys(this.testObject);
    },
    objectValues() {
      return _.values(this.testObject);
    },
    clonedObject() {
      return _.cloneDeep(this.testObject);
    },
    camelCaseStr() {
      return _.camelCase(this.testString);
    },
    upperCaseStr() {
      return _.upperCase(this.testString);
    },
    capitalizeStr() {
      return _.capitalize(this.testString);
    },
    
    // MD5
    md5Hash() {
      return md5(this.md5Input);
    },
    
    // Decimal
    decimalAdd() {
      return new Decimal(this.num1).plus(this.num2).toString();
    },
    decimalSubtract() {
      return new Decimal(this.num1).minus(this.num2).toString();
    },
    decimalMultiply() {
      return new Decimal(this.num1).times(this.num2).toString();
    },
    decimalDivide() {
      return this.num2 !== 0 ? new Decimal(this.num1).dividedBy(this.num2).toString() : '不能除以0';
    },
    decimalExample() {
      return new Decimal(0.1).plus(0.2).toString();
    }
  },
  mounted() {
    this.generateQRCode();
  },
  methods: {
    // Dayjs
    updateTime() {
      this.currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    formatDate(format) {
      return dayjs().format(format);
    },
    getDaysBefore(days) {
      return dayjs().subtract(days, 'day').format('YYYY-MM-DD');
    },
    getTomorrow() {
      return dayjs().add(1, 'day').format('YYYY-MM-DD');
    },
    getNextWeek() {
      return dayjs().add(1, 'week').format('YYYY-MM-DD');
    },
    getNextMonth() {
      return dayjs().add(1, 'month').format('YYYY-MM-DD');
    },
    getDaysDiff() {
      if (!this.compareDate) return 0;
      return dayjs(this.compareDate).diff(dayjs(), 'day');
    },
    
    // Lodash
    sum(arr) {
      return _.sum(arr);
    },
    mean(arr) {
      return _.mean(arr);
    },
    max(arr) {
      return _.max(arr);
    },
    min(arr) {
      return _.min(arr);
    },
    
    // UUID
    generateUUID1() {
      this.uuid1 = uuidv4();
    },
    generateUUIDs() {
      this.uuidList = Array.from({ length: 5 }, () => uuidv4());
    },
    
    // MD5
    md5(str) {
      return md5(str).substring(0, 16) + '...';
    },
    copyMD5() {
      const input = document.createElement('textarea');
      input.value = this.md5Hash;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      this.$message.success('已复制到剪贴板');
    },
    
    // QRCode
    async generateQRCode() {
      try {
        this.qrcodeUrl = await QRCode.toDataURL(this.qrcodeText);
      } catch (err) {
        this.$message.error('生成二维码失败');
      }
    },
    async generateQRCodeFor(text) {
      this.qrcodeText = text;
      await this.generateQRCode();
    },
    
    // Axios
    async testAxiosGet() {
      this.axiosLoading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        this.axiosResponse = response.data;
        this.$message.success('GET 请求成功');
      } catch (error) {
        this.$message.error('请求失败: ' + error.message);
        this.axiosResponse = { error: error.message };
      } finally {
        this.axiosLoading = false;
      }
    },
    async testAxiosPost() {
      this.axiosLoading = true;
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          title: '测试标题',
          body: '测试内容',
          userId: 1
        });
        this.axiosResponse = response.data;
        this.$message.success('POST 请求成功');
      } catch (error) {
        this.$message.error('请求失败: ' + error.message);
        this.axiosResponse = { error: error.message };
      } finally {
        this.axiosLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.utils-page {
  background-color: #f5f7fa;
  min-height: calc(100vh - 120px);
}

.el-main {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #303133;
}

.util-card {
  margin-bottom: 20px;
}

.util-card h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #606266;
}

.util-card p {
  margin: 8px 0;
  color: #909399;
  font-size: 14px;
  word-break: break-all;
}

.util-card p strong {
  color: #303133;
}

.util-card ul {
  padding-left: 0;
  list-style: none;
}
</style>
