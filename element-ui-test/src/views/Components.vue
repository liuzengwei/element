<template>
  <div class="components-page">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeSection" @select="handleMenuSelect">
          <el-menu-item index="form">
            <i class="el-icon-edit"></i>
            <span>表单组件</span>
          </el-menu-item>
          <el-menu-item index="data">
            <i class="el-icon-s-grid"></i>
            <span>数据展示</span>
          </el-menu-item>
          <el-menu-item index="feedback">
            <i class="el-icon-bell"></i>
            <span>反馈组件</span>
          </el-menu-item>
          <el-menu-item index="navigation">
            <i class="el-icon-menu"></i>
            <span>导航组件</span>
          </el-menu-item>
          <el-menu-item index="others">
            <i class="el-icon-more"></i>
            <span>其他组件</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <div class="back-button">
          <el-button type="text" icon="el-icon-back" @click="$router.push('/')">返回首页</el-button>
        </div>

        <!-- 表单组件 -->
        <section id="form" class="component-section">
          <h2><i class="el-icon-edit"></i> 表单组件</h2>
          <el-card>
            <el-form :model="form" :rules="rules" ref="demoForm" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="日期">
                    <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地区">
                    <el-select v-model="form.region" placeholder="请选择地区" style="width: 100%;">
                      <el-option label="北京" value="beijing"></el-option>
                      <el-option label="上海" value="shanghai"></el-option>
                      <el-option label="深圳" value="shenzhen"></el-option>
                      <el-option label="广州" value="guangzhou"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item label="开关">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              
              <el-form-item label="单选">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌"></el-radio>
                  <el-radio label="线下品牌"></el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="多选">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="美食"></el-checkbox>
                  <el-checkbox label="地推活动"></el-checkbox>
                  <el-checkbox label="线下主题活动"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </section>

        <!-- 数据展示 -->
        <section id="data" class="component-section">
          <h2><i class="el-icon-s-grid"></i> 数据展示</h2>
          <el-card>
            <el-table :data="tableData" border stripe style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="date" label="日期" width="120"></el-table-column>
              <el-table-column prop="name" label="姓名" width="100"></el-table-column>
              <el-table-column prop="province" label="省份" width="100"></el-table-column>
              <el-table-column prop="city" label="城市" width="100"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
              style="margin-top: 20px; text-align: right;">
            </el-pagination>
          </el-card>
        </section>

        <!-- 反馈组件 -->
        <section id="feedback" class="component-section">
          <h2><i class="el-icon-bell"></i> 反馈组件</h2>
          <el-card>
            <el-row :gutter="20">
              <el-col :span="12">
                <h3>消息提示</h3>
                <el-button @click="showMessage('success')">成功</el-button>
                <el-button @click="showMessage('warning')">警告</el-button>
                <el-button @click="showMessage('info')">信息</el-button>
                <el-button @click="showMessage('error')">错误</el-button>
              </el-col>
              <el-col :span="12">
                <h3>通知</h3>
                <el-button @click="showNotification('success')">成功通知</el-button>
                <el-button @click="showNotification('warning')">警告通知</el-button>
                <el-button @click="showNotification('error')">错误通知</el-button>
              </el-col>
            </el-row>
            
            <el-divider></el-divider>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <h3>对话框</h3>
                <el-button type="primary" @click="dialogVisible = true">打开对话框</el-button>
                <el-button type="warning" @click="drawerVisible = true">打开抽屉</el-button>
              </el-col>
              <el-col :span="12">
                <h3>确认框</h3>
                <el-button type="danger" @click="showConfirm">删除确认</el-button>
                <el-button type="info" @click="showPrompt">输入框</el-button>
              </el-col>
            </el-row>
            
            <el-divider></el-divider>
            
            <el-row :gutter="20">
              <el-col :span="24">
                <h3>Alert 警告</h3>
                <el-alert title="成功提示" type="success" show-icon></el-alert>
                <el-alert title="消息提示" type="info" show-icon style="margin-top: 10px;"></el-alert>
                <el-alert title="警告提示" type="warning" show-icon style="margin-top: 10px;"></el-alert>
                <el-alert title="错误提示" type="error" show-icon style="margin-top: 10px;"></el-alert>
              </el-col>
            </el-row>
          </el-card>
        </section>

        <!-- 导航组件 -->
        <section id="navigation" class="component-section">
          <h2><i class="el-icon-menu"></i> 导航组件</h2>
          <el-card>
            <h3>标签页</h3>
            <el-tabs v-model="activeName" type="border-card">
              <el-tab-pane label="用户管理" name="first">
                <p>用户管理内容</p>
              </el-tab-pane>
              <el-tab-pane label="配置管理" name="second">
                <p>配置管理内容</p>
              </el-tab-pane>
              <el-tab-pane label="角色管理" name="third">
                <p>角色管理内容</p>
              </el-tab-pane>
            </el-tabs>
            
            <el-divider></el-divider>
            
            <h3>步骤条</h3>
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="步骤 1" description="这是一段很长的描述性文字"></el-step>
              <el-step title="步骤 2" description="这是一段很长的描述性文字"></el-step>
              <el-step title="步骤 3" description="这是一段很长的描述性文字"></el-step>
            </el-steps>
            <el-button-group style="margin-top: 20px;">
              <el-button @click="activeStep--" :disabled="activeStep === 0">上一步</el-button>
              <el-button @click="activeStep++" :disabled="activeStep === 3">下一步</el-button>
            </el-button-group>
          </el-card>
        </section>

        <!-- 其他组件 -->
        <section id="others" class="component-section">
          <h2><i class="el-icon-more"></i> 其他组件</h2>
          <el-card>
            <el-row :gutter="20">
              <el-col :span="8">
                <h3>标签 Tag</h3>
                <el-tag>标签一</el-tag>
                <el-tag type="success">标签二</el-tag>
                <el-tag type="info">标签三</el-tag>
                <el-tag type="warning">标签四</el-tag>
                <el-tag type="danger">标签五</el-tag>
              </el-col>
              <el-col :span="8">
                <h3>进度条</h3>
                <el-progress :percentage="50"></el-progress>
                <el-progress :percentage="70" status="success" style="margin-top: 10px;"></el-progress>
                <el-progress :percentage="100" status="warning" style="margin-top: 10px;"></el-progress>
              </el-col>
              <el-col :span="8">
                <h3>徽章</h3>
                <el-badge :value="12" class="item">
                  <el-button size="small">评论</el-button>
                </el-badge>
                <el-badge :value="3" class="item">
                  <el-button size="small">回复</el-button>
                </el-badge>
                <el-badge is-dot class="item">
                  <el-button size="small">消息</el-button>
                </el-badge>
              </el-col>
            </el-row>
          </el-card>
        </section>

        <!-- 对话框 -->
        <el-dialog title="测试对话框" :visible.sync="dialogVisible" width="30%">
          <span>这是一段测试内容</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 抽屉 -->
        <el-drawer title="测试抽屉" :visible.sync="drawerVisible" direction="rtl">
          <div style="padding: 20px;">
            <p>这是抽屉内容</p>
          </div>
        </el-drawer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Components',
  data() {
    return {
      activeSection: 'form',
      form: {
        username: '',
        password: '',
        date: '',
        region: '',
        delivery: false,
        resource: '',
        type: []
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
        { date: '2025-12-01', name: '张三', province: '上海', city: '普陀区', address: '金沙江路 1518 弄' },
        { date: '2025-12-02', name: '李四', province: '上海', city: '普陀区', address: '金沙江路 1517 弄' },
        { date: '2025-12-03', name: '王五', province: '上海', city: '普陀区', address: '金沙江路 1519 弄' },
        { date: '2025-12-04', name: '赵六', province: '上海', city: '普陀区', address: '金沙江路 1516 弄' },
        { date: '2025-12-05', name: '钱七', province: '北京', city: '朝阳区', address: '朝阳路 888 号' }
      ],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      drawerVisible: false,
      activeName: 'first',
      activeStep: 0
    };
  },
  methods: {
    handleMenuSelect(key) {
      const section = document.getElementById(key);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    submitForm() {
      this.$refs.demoForm.validate((valid) => {
        if (valid) {
          this.$message.success('提交成功！');
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
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    showMessage(type) {
      this.$message({ type, message: `这是一条${type}消息` });
    },
    showNotification(type) {
      this.$notify({ type, title: '通知', message: `这是一条${type}通知` });
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
    },
    showPrompt() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message.success(`你的邮箱是: ${value}`);
      }).catch(() => {
        this.$message.info('取消输入');
      });
    }
  }
};
</script>

<style scoped>
.components-page {
  background-color: #f5f7fa;
  min-height: calc(100vh - 120px);
}

.el-aside {
  background-color: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
}

.el-menu {
  border-right: none;
}

.el-main {
  padding: 20px;
}

.back-button {
  margin-bottom: 20px;
}

.component-section {
  margin-bottom: 30px;
}

.component-section h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #303133;
  padding-left: 10px;
  border-left: 4px solid #409eff;
}

.component-section h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #606266;
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

.item {
  margin-right: 20px;
}
</style>
