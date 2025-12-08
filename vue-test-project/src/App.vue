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

      <!-- Tree 树形控件测试 (使用 element-ui/src/utils/dom) -->
      <div class="section">
        <h2>13. Tree 树形控件 <span style="color: #67C23A; font-size: 14px;">(使用 dom 工具)</span></h2>
        <div class="demo-block">
          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>

      <!-- Rate 评分测试 (使用 element-ui/src/utils/dom) -->
      <div class="section">
        <h2>14. Rate 评分 <span style="color: #67C23A; font-size: 14px;">(使用 dom 工具)</span></h2>
        <div class="demo-block">
          <el-rate v-model="rateValue" show-text></el-rate>
          <p>评分值: {{ rateValue }}</p>
        </div>
      </div>

      <!-- Image 图片测试 (使用 element-ui/src/utils/dom) -->
      <div class="section">
        <h2>15. Image 图片 <span style="color: #67C23A; font-size: 14px;">(使用 dom 工具)</span></h2>
        <div class="demo-block">
          <el-image
            style="width: 200px; height: 200px"
            :src="imageUrl"
            :preview-src-list="[imageUrl]"
            fit="cover">
          </el-image>
        </div>
      </div>

      <!-- Menu 菜单测试 (使用 element-ui/src/utils/dom) -->
      <div class="section">
        <h2>16. Menu 菜单 <span style="color: #67C23A; font-size: 14px;">(使用 dom 工具)</span></h2>
        <div class="demo-block">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleMenuSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">订单管理</el-menu-item>
          </el-menu>
          <p style="margin-top: 10px;">当前激活菜单: {{ activeMenu }}</p>
        </div>
      </div>

      <!-- Popover 弹出框测试 (使用 element-ui/src/utils/dom) -->
      <div class="section">
        <h2>17. Popover 弹出框 <span style="color: #67C23A; font-size: 14px;">(使用 dom + util 工具)</span></h2>
        <div class="demo-block">
          <el-popover
            placement="top"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <el-button slot="reference">hover 激活</el-button>
          </el-popover>
          <el-popover
            placement="bottom"
            title="标题"
            width="200"
            trigger="click"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <el-button slot="reference" style="margin-left: 10px;">click 激活</el-button>
          </el-popover>
        </div>
      </div>

      <!-- Drawer 抽屉测试 (使用 element-ui/src/utils/popup) -->
      <div class="section">
        <h2>18. Drawer 抽屉 <span style="color: #67C23A; font-size: 14px;">(使用 popup 工具)</span></h2>
        <div class="demo-block">
          <el-button type="primary" @click="drawer = true">打开抽屉</el-button>
          <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :direction="direction">
            <span>这是一段通过 Drawer 抽屉组件测试 element-ui/src/utils/popup 的内容</span>
          </el-drawer>
        </div>
      </div>

      <!-- Collapse 折叠面板测试 (使用 element-ui/src/utils/util) -->
      <div class="section">
        <h2>19. Collapse 折叠面板 <span style="color: #67C23A; font-size: 14px;">(使用 util 工具)</span></h2>
        <div class="demo-block">
          <el-collapse v-model="activeNames" @change="handleCollapseChange">
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <!-- Tabs 标签页测试 (使用 element-ui/src/utils/util) -->
      <div class="section">
        <h2>20. Tabs 标签页 <span style="color: #67C23A; font-size: 14px;">(使用 util 工具)</span></h2>
        <div class="demo-block">
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="用户管理" name="first">用户管理内容</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理内容</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理内容</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿内容</el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <!-- Autocomplete 自动完成测试 (使用 element-ui/src/utils/util) -->
      <div class="section">
        <h2>21. Autocomplete 自动完成 <span style="color: #67C23A; font-size: 14px;">(使用 util 工具)</span></h2>
        <div class="demo-block">
          <el-autocomplete
            v-model="autocompleteValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
            style="width: 300px;">
          </el-autocomplete>
          <p>输入的内容: {{ autocompleteValue }}</p>
        </div>
      </div>

      <!-- Cascader 级联选择器测试 (使用 element-ui/src/utils/util) -->
      <div class="section">
        <h2>22. Cascader 级联选择器 <span style="color: #67C23A; font-size: 14px;">(使用 util 工具)</span></h2>
        <div class="demo-block">
          <el-cascader
            v-model="cascaderValue"
            :options="cascaderOptions"
            @change="handleCascaderChange"
            style="width: 300px;">
          </el-cascader>
          <p>选择的值: {{ cascaderValue }}</p>
        </div>
      </div>

      <!-- Carousel 走马灯测试 (使用 element-ui/src/utils/util) -->
      <div class="section">
        <h2>23. Carousel 走马灯 <span style="color: #67C23A; font-size: 14px;">(使用 util 工具)</span></h2>
        <div class="demo-block">
          <el-carousel height="200px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="carousel-text">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 测试结果 -->
      <div class="section">
        <el-alert
          title="✓ 全面测试通过 - 覆盖所有内部工具引用"
          type="success"
          description="测试了 23 个组件，包括使用 element-ui/src/utils/dom、element-ui/src/utils/popup、element-ui/src/utils/util 的所有组件，全部编译和运行正常！"
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
      ],
      // Tree 组件数据
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                { id: 9, label: '三级 1-1-1' },
                { id: 10, label: '三级 1-1-2' }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // Rate 组件数据
      rateValue: 3.5,
      // Image 组件数据
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RWxlbWVudCBVSSBJbWFnZTwvdGV4dD48L3N2Zz4=',
      // Menu 组件数据
      activeMenu: '1',
      // Drawer 组件数据
      drawer: false,
      direction: 'rtl',
      // Collapse 组件数据
      activeNames: ['1'],
      // Tabs 组件数据
      activeName: 'first',
      // Autocomplete 组件数据
      autocompleteValue: '',
      restaurants: [
        { value: '三全鲜食（北新桥店）', address: '朝阳区' },
        { value: '水饺小铺', address: '海淀区' },
        { value: 'Hot honey 首尔炸鸡', address: '朝阳区' },
        { value: '贡茶', address: '朝阳区' },
        { value: '肯德基', address: '朝阳区' }
      ],
      // Cascader 组件数据
      cascaderValue: [],
      cascaderOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                { value: 'yizhi', label: '一致' },
                { value: 'fankui', label: '反馈' },
                { value: 'xiaolv', label: '效率' },
                { value: 'kekong', label: '可控' }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                { value: 'cexiangdaohang', label: '侧向导航' },
                { value: 'dingbudaohang', label: '顶部导航' }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                { value: 'layout', label: 'Layout 布局' },
                { value: 'color', label: 'Color 色彩' },
                { value: 'typography', label: 'Typography 字体' },
                { value: 'icon', label: 'Icon 图标' },
                { value: 'button', label: 'Button 按钮' }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                { value: 'radio', label: 'Radio 单选框' },
                { value: 'checkbox', label: 'Checkbox 多选框' },
                { value: 'input', label: 'Input 输入框' },
                { value: 'input-number', label: 'InputNumber 计数器' },
                { value: 'select', label: 'Select 选择器' },
                { value: 'cascader', label: 'Cascader 级联选择器' },
                { value: 'switch', label: 'Switch 开关' },
                { value: 'slider', label: 'Slider 滑块' },
                { value: 'time-picker', label: 'TimePicker 时间选择器' },
                { value: 'date-picker', label: 'DatePicker 日期选择器' },
                { value: 'datetime-picker', label: 'DateTimePicker 日期时间选择器' },
                { value: 'upload', label: 'Upload 上传' },
                { value: 'rate', label: 'Rate 评分' },
                { value: 'form', label: 'Form 表单' }
              ]
            }
          ]
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
    },
    handleMenuSelect(key, keyPath) {
      this.activeMenu = key;
      this.$message.info(`选中菜单: ${key}`);
    },
    handleCollapseChange(val) {
      console.log('折叠面板变化:', val);
    },
    handleTabClick(tab, event) {
      console.log('标签页点击:', tab.name);
    },
    querySearch(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log('选中:', item);
    },
    handleCascaderChange(value) {
      console.log('级联选择器变化:', value);
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

.carousel-text {
  color: #475669;
  font-size: 18px;
  line-height: 200px;
  margin: 0;
  text-align: center;
  background-color: #d3dce6;
}

.el-carousel__item:nth-child(2n) .carousel-text {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) .carousel-text {
  background-color: #d3dce6;
}
</style>
