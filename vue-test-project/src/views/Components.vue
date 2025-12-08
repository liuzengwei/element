<template>
  <div class="components-demo">
    <h1>Element UI 组件示例</h1>
    
    <el-button type="text" @click="$router.push('/')">← 返回首页</el-button>

    <el-divider content-position="left">表单组件</el-divider>
    <el-card>
      <el-form :model="form" :rules="rules" ref="demoForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区">
          <el-select v-model="form.region" placeholder="请选择地区">
            <el-option label="北京" value="beijing"></el-option>
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="深圳" value="shenzhen"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开关">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-divider content-position="left">数据展示</el-divider>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
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
    </el-card>

    <el-divider content-position="left">通知提示</el-divider>
    <el-card>
      <el-button @click="showMessage">消息提示</el-button>
      <el-button @click="showNotification">通知</el-button>
      <el-button @click="showAlert">Alert</el-button>
      <el-button type="danger" @click="showConfirm">确认框</el-button>
    </el-card>

    <el-divider content-position="left">其他组件</el-divider>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-tag>标签一</el-tag>
          <el-tag type="success">标签二</el-tag>
          <el-tag type="info">标签三</el-tag>
          <el-tag type="warning">标签四</el-tag>
          <el-tag type="danger">标签五</el-tag>
        </el-col>
        <el-col :span="8">
          <el-progress :percentage="50"></el-progress>
          <el-progress :percentage="70" status="success"></el-progress>
          <el-progress :percentage="100" status="warning"></el-progress>
        </el-col>
        <el-col :span="8">
          <el-badge :value="12" class="item">
            <el-button size="small">评论</el-button>
          </el-badge>
          <el-badge :value="3" class="item">
            <el-button size="small">回复</el-button>
          </el-badge>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Components',
  data() {
    return {
      form: {
        username: '',
        password: '',
        date: '',
        region: '',
        delivery: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          date: '2025-12-01',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2025-12-02',
          name: '李四',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2025-12-03',
          name: '王五',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2025-12-04',
          name: '赵六',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  methods: {
    submitForm() {
      this.$refs.demoForm.validate((valid) => {
        if (valid) {
          this.$message.success('提交成功！');
          console.log('表单数据:', this.form);
        } else {
          this.$message.error('请检查表单！');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.demoForm.resetFields();
    },
    handleEdit(index, row) {
      this.$message.info(`编辑第 ${index + 1} 行: ${row.name}`);
    },
    handleDelete(index, row) {
      this.$confirm(`确定要删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1);
        this.$message.success('删除成功!');
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    showMessage() {
      this.$message({
        message: '这是一条消息提示',
        type: 'success'
      });
    },
    showNotification() {
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      });
    },
    showAlert() {
      this.$alert('这是一段内容', '标题', {
        confirmButtonText: '确定'
      });
    },
    showConfirm() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!');
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
  }
};
</script>

<style scoped>
.components-demo {
  padding: 20px;
}

h1 {
  color: #409eff;
  margin-bottom: 20px;
}

.el-card {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.el-tag {
  margin-right: 10px;
}

.el-progress {
  margin-bottom: 10px;
}

.item {
  margin-right: 20px;
}
</style>
