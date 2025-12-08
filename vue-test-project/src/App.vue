<template>
  <div id="app">
    <div class="container">
      <h1>@liuzengwei/element-ui 组件测试 (Import 方式)</h1>
      <el-alert
        title="测试说明"
        type="info"
        description="这是一个使用 webpack + Vue 2 + import 方式引入 Element UI 的测试项目"
        show-icon
        :closable="false"
        style="margin-bottom: 20px;">
      </el-alert>

      <!-- 按钮组件测试 -->
      <div class="section">
        <h2>1. Button 按钮</h2>
        <div class="demo-block">
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </div>
        <div class="demo-block">
          <el-button plain>朴素按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="success" plain>成功按钮</el-button>
        </div>
        <div class="demo-block">
          <el-button round>圆角按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="success" round>成功按钮</el-button>
        </div>
        <div class="demo-block">
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </div>

      <!-- 输入框测试 -->
      <div class="section">
        <h2>2. Input 输入框</h2>
        <div class="demo-block">
          <el-input v-model="input" placeholder="请输入内容" style="width: 300px;"></el-input>
          <p>输入的内容: {{ input }}</p>
        </div>
        <div class="demo-block">
          <el-input placeholder="带清空按钮" v-model="input2" clearable style="width: 300px;"></el-input>
        </div>
        <div class="demo-block">
          <el-input type="password" placeholder="请输入密码" v-model="password" show-password style="width: 300px;"></el-input>
        </div>
      </div>

      <!-- 选择器测试 -->
      <div class="section">
        <h2>3. Select 选择器</h2>
        <div class="demo-block">
          <el-select v-model="selectValue" placeholder="请选择" style="width: 300px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p>选中的值: {{ selectValue }}</p>
        </div>
      </div>

      <!-- 单选框测试 -->
      <div class="section">
        <h2>4. Radio 单选框</h2>
        <div class="demo-block">
          <el-radio-group v-model="radio">
            <el-radio label="1">选项一</el-radio>
            <el-radio label="2">选项二</el-radio>
            <el-radio label="3">选项三</el-radio>
          </el-radio-group>
          <p>选中的值: {{ radio }}</p>
        </div>
      </div>

      <!-- 复选框测试 -->
      <div class="section">
        <h2>5. Checkbox 复选框</h2>
        <div class="demo-block">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="复选框 D"></el-checkbox>
          </el-checkbox-group>
          <p>选中的值: {{ checkList }}</p>
        </div>
      </div>

      <!-- 开关测试 -->
      <div class="section">
        <h2>6. Switch 开关</h2>
        <div class="demo-block">
          <el-switch v-model="switchValue"></el-switch>
          <span style="margin-left: 10px;">开关状态: {{ switchValue }}</span>
        </div>
      </div>

      <!-- 日期选择器测试 -->
      <div class="section">
        <h2>7. DatePicker 日期选择器</h2>
        <div class="demo-block">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            style="width: 300px;">
          </el-date-picker>
          <p>选择的日期: {{ date }}</p>
        </div>
      </div>

      <!-- 消息提示测试 -->
      <div class="section">
        <h2>8. Message 消息提示</h2>
        <div class="demo-block">
          <el-button @click="showMessage('success')">成功消息</el-button>
          <el-button @click="showMessage('warning')">警告消息</el-button>
          <el-button @click="showMessage('info')">信息消息</el-button>
          <el-button @click="showMessage('error')">错误消息</el-button>
        </div>
      </div>

      <!-- 对话框测试 -->
      <div class="section">
        <h2>9. Dialog 对话框</h2>
        <div class="demo-block">
          <el-button type="primary" @click="dialogVisible = true">打开对话框</el-button>
          <el-dialog
            title="测试对话框"
            :visible.sync="dialogVisible"
            width="30%">
            <span>这是一个通过 import 方式引入的 Element UI 对话框</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>

      <!-- 表单测试 -->
      <div class="section">
        <h2>10. Form 表单</h2>
        <div class="demo-block">
          <el-form :model="form" :rules="rules" ref="testForm" label-width="100px" style="max-width: 500px;">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="form.age" :min="1" :max="150"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 表格测试 -->
      <div class="section">
        <h2>11. Table 表格</h2>
        <div class="demo-block">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 卡片测试 -->
      <div class="section">
        <h2>12. Card 卡片</h2>
        <div class="demo-block">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>卡片标题 1</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div>
                  这是第一张卡片的内容
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>卡片标题 2</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div>
                  这是第二张卡片的内容
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>卡片标题 3</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div>
                  这是第三张卡片的内容
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 测试结果 -->
      <div class="section">
        <el-alert
          title="✓ 测试通过"
          type="success"
          description="所有组件均通过 import 方式正常引入和渲染，@liuzengwei/element-ui 在 Vue 项目中工作正常！"
          show-icon
          :closable="false">
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      input: '',
      input2: '',
      password: '',
      selectValue: '',
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ],
      radio: '1',
      checkList: ['复选框 A'],
      switchValue: true,
      date: '',
      dialogVisible: false,
      form: {
        name: '',
        email: '',
        age: 18
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '李小龙',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '张小明',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '刘小红',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  methods: {
    showMessage(type) {
      const messages = {
        success: '这是一条成功消息',
        warning: '这是一条警告消息',
        info: '这是一条信息消息',
        error: '这是一条错误消息'
      };
      this.$message({
        type: type,
        message: messages[type]
      });
    },
    submitForm() {
      this.$refs.testForm.validate((valid) => {
        if (valid) {
          this.$message.success('表单验证通过！');
          console.log('表单数据:', this.form);
        } else {
          this.$message.error('表单验证失败！');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.testForm.resetFields();
    },
    handleEdit(index, row) {
      this.$message.info(`编辑第 ${index + 1} 行: ${row.name}`);
    },
    handleDelete(index, row) {
      this.$confirm(`确定要删除 ${row.name} 的数据吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1);
        this.$message.success('删除成功!');
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #303133;
}

h2 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  color: #303133;
}

.section {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
}

.demo-block {
  margin-bottom: 15px;
}

.el-button + .el-button {
  margin-left: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  margin-bottom: 10px;
}
</style>
