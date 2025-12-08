<template>
  <div class="utils-components-test">
    <el-container>
      <el-main>
        <div class="back-button">
          <el-button type="text" icon="el-icon-back" @click="$router.push('/')">返回首页</el-button>
        </div>

        <h1>工具函数依赖组件测试</h1>
        <el-alert
          title="测试说明"
          type="info"
          :closable="false"
          show-icon>
          <template>
            本页面测试依赖以下工具函数的组件：<br>
            • element-ui/src/utils/dom<br>
            • element-ui/src/utils/popup<br>
            • element-ui/src/utils/util<br>
            • element-ui/src/utils/vue-popper<br>
            • element-ui/src/utils/clickoutside
          </template>
        </el-alert>

        <!-- Dialog 组件 - 使用 Popup -->
        <section class="test-section">
          <h2><i class="el-icon-s-marketing"></i> Dialog 对话框 (使用 Popup)</h2>
          <el-card>
            <el-button type="primary" @click="dialogVisible = true">打开 Dialog</el-button>
            <el-button type="success" @click="nestedDialogVisible = true">嵌套 Dialog</el-button>
            
            <el-dialog
              title="测试对话框"
              :visible.sync="dialogVisible"
              width="30%"
              :modal="true"
              :lock-scroll="true"
              :close-on-click-modal="true"
              :close-on-press-escape="true">
              <p>这个 Dialog 组件使用了 element-ui/src/utils/popup</p>
              <p>测试功能：</p>
              <ul>
                <li>Modal 遮罩层</li>
                <li>锁定滚动</li>
                <li>按 ESC 关闭</li>
                <li>点击遮罩关闭</li>
                <li>z-index 管理</li>
              </ul>
              <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>

            <el-dialog
              title="嵌套对话框"
              :visible.sync="nestedDialogVisible"
              width="50%"
              :append-to-body="true">
              <p>测试嵌套 Dialog 的 z-index 管理</p>
              <el-button type="primary" @click="innerDialogVisible = true">打开内层对话框</el-button>
              
              <el-dialog
                title="内层对话框"
                :visible.sync="innerDialogVisible"
                width="30%"
                append-to-body>
                <p>这是内层对话框，z-index 应该更高</p>
              </el-dialog>
            </el-dialog>
          </el-card>
        </section>

        <!-- Drawer 组件 - 使用 Popup -->
        <section class="test-section">
          <h2><i class="el-icon-tickets"></i> Drawer 抽屉 (使用 Popup)</h2>
          <el-card>
            <el-button type="primary" @click="drawer = true">从右侧打开</el-button>
            <el-button @click="drawer2 = true">从左侧打开</el-button>
            <el-button @click="drawer3 = true">从上方打开</el-button>
            <el-button @click="drawer4 = true">从下方打开</el-button>
            
            <el-drawer
              title="右侧抽屉"
              :visible.sync="drawer"
              direction="rtl"
              :modal="true"
              :lock-scroll="true">
              <div style="padding: 20px;">
                <p>Drawer 组件使用 element-ui/src/utils/popup</p>
                <el-input v-model="drawerInput" placeholder="测试输入"></el-input>
              </div>
            </el-drawer>

            <el-drawer title="左侧抽屉" :visible.sync="drawer2" direction="ltr">
              <div style="padding: 20px;">左侧抽屉内容</div>
            </el-drawer>

            <el-drawer title="上方抽屉" :visible.sync="drawer3" direction="ttb">
              <div style="padding: 20px;">上方抽屉内容</div>
            </el-drawer>

            <el-drawer title="下方抽屉" :visible.sync="drawer4" direction="btt">
              <div style="padding: 20px;">下方抽屉内容</div>
            </el-drawer>
          </el-card>
        </section>

        <!-- Popover 组件 - 使用 vue-popper 和 dom -->
        <section class="test-section">
          <h2><i class="el-icon-info"></i> Popover 弹出框 (使用 vue-popper + dom)</h2>
          <el-card>
            <p>Popover 使用：vue-popper、dom (addClass/removeClass)、util (generateId)</p>
            <div style="margin: 20px 0;">
              <el-popover
                placement="top"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容">
                <el-button slot="reference">hover 触发</el-button>
              </el-popover>

              <el-popover
                placement="bottom"
                width="200"
                trigger="click">
                <p>点击触发的 Popover</p>
                <el-button slot="reference">click 触发</el-button>
              </el-popover>

              <el-popover
                placement="right"
                width="200"
                trigger="focus">
                <p>focus 触发的 Popover</p>
                <el-button slot="reference">focus 触发</el-button>
              </el-popover>

              <el-popover
                ref="popover"
                placement="left"
                width="200"
                trigger="manual"
                v-model="popoverVisible">
                <p>手动控制的 Popover</p>
                <el-button slot="reference" @click="popoverVisible = !popoverVisible">manual 触发</el-button>
              </el-popover>
            </div>

            <el-divider></el-divider>

            <h3>不同位置的 Popover</h3>
            <div class="popover-demo">
              <div class="top">
                <el-popover placement="top-start" width="150" trigger="hover" content="top-start">
                  <el-button slot="reference">top-start</el-button>
                </el-popover>
                <el-popover placement="top" width="150" trigger="hover" content="top">
                  <el-button slot="reference">top</el-button>
                </el-popover>
                <el-popover placement="top-end" width="150" trigger="hover" content="top-end">
                  <el-button slot="reference">top-end</el-button>
                </el-popover>
              </div>
              <div class="left">
                <el-popover placement="left-start" width="150" trigger="hover" content="left-start">
                  <el-button slot="reference">left-start</el-button>
                </el-popover>
                <el-popover placement="left" width="150" trigger="hover" content="left">
                  <el-button slot="reference">left</el-button>
                </el-popover>
                <el-popover placement="left-end" width="150" trigger="hover" content="left-end">
                  <el-button slot="reference">left-end</el-button>
                </el-popover>
              </div>
              <div class="right">
                <el-popover placement="right-start" width="150" trigger="hover" content="right-start">
                  <el-button slot="reference">right-start</el-button>
                </el-popover>
                <el-popover placement="right" width="150" trigger="hover" content="right">
                  <el-button slot="reference">right</el-button>
                </el-popover>
                <el-popover placement="right-end" width="150" trigger="hover" content="right-end">
                  <el-button slot="reference">right-end</el-button>
                </el-popover>
              </div>
              <div class="bottom">
                <el-popover placement="bottom-start" width="150" trigger="hover" content="bottom-start">
                  <el-button slot="reference">bottom-start</el-button>
                </el-popover>
                <el-popover placement="bottom" width="150" trigger="hover" content="bottom">
                  <el-button slot="reference">bottom</el-button>
                </el-popover>
                <el-popover placement="bottom-end" width="150" trigger="hover" content="bottom-end">
                  <el-button slot="reference">bottom-end</el-button>
                </el-popover>
              </div>
            </div>
          </el-card>
        </section>

        <!-- Tooltip 组件 - 使用 vue-popper -->
        <section class="test-section">
          <h2><i class="el-icon-question"></i> Tooltip 文字提示 (使用 vue-popper)</h2>
          <el-card>
            <div style="margin: 20px 0;">
              <el-tooltip content="Top Left 提示文字" placement="top-start">
                <el-button>上左</el-button>
              </el-tooltip>
              <el-tooltip content="Top Center 提示文字" placement="top">
                <el-button>上边</el-button>
              </el-tooltip>
              <el-tooltip content="Top Right 提示文字" placement="top-end">
                <el-button>上右</el-button>
              </el-tooltip>
            </div>
            <div style="margin: 20px 0;">
              <el-tooltip content="Left 提示文字" placement="left">
                <el-button>左边</el-button>
              </el-tooltip>
              <el-tooltip content="Right 提示文字" placement="right">
                <el-button>右边</el-button>
              </el-tooltip>
            </div>
            <div style="margin: 20px 0;">
              <el-tooltip content="Bottom 提示文字" placement="bottom">
                <el-button>下边</el-button>
              </el-tooltip>
              <el-tooltip effect="light" content="Light 效果" placement="bottom">
                <el-button>Light</el-button>
              </el-tooltip>
            </div>
          </el-card>
        </section>

        <!-- Dropdown 组件 - 使用 clickoutside 和 util -->
        <section class="test-section">
          <h2><i class="el-icon-arrow-down"></i> Dropdown 下拉菜单 (使用 clickoutside + util)</h2>
          <el-card>
            <p>Dropdown 使用：clickoutside (点击外部关闭)、util (generateId)</p>
            <div style="margin: 20px 0;">
              <el-dropdown @command="handleCommand">
                <el-button type="primary">
                  下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                  <el-dropdown-item command="b">狮子头</el-dropdown-item>
                  <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                  <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                  <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown split-button type="primary" @command="handleCommand">
                分裂按钮
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">选项1</el-dropdown-item>
                  <el-dropdown-item command="2">选项2</el-dropdown-item>
                  <el-dropdown-item command="3">选项3</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  click 触发<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus">新增</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <p v-if="dropdownCommand">选择的命令: {{ dropdownCommand }}</p>
          </el-card>
        </section>

        <!-- Select 组件 - 使用 clickoutside 和 util -->
        <section class="test-section">
          <h2><i class="el-icon-s-unfold"></i> Select 选择器 (使用 clickoutside + util)</h2>
          <el-card>
            <p>Select 使用：clickoutside、util (getValueByPath, valueEquals, isIE, isEdge)</p>
            <el-row :gutter="20">
              <el-col :span="8">
                <h3>基础选择器</h3>
                <el-select v-model="selectValue" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <p style="margin-top: 10px;">选中值: {{ selectValue }}</p>
              </el-col>

              <el-col :span="8">
                <h3>可搜索</h3>
                <el-select v-model="selectValue2" filterable placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :span="8">
                <h3>多选</h3>
                <el-select v-model="selectMultiple" multiple placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <p style="margin-top: 10px;">选中: {{ selectMultiple.join(', ') }}</p>
              </el-col>
            </el-row>
          </el-card>
        </section>

        <!-- DatePicker 组件 - 使用 clickoutside 和 vue-popper -->
        <section class="test-section">
          <h2><i class="el-icon-date"></i> DatePicker 日期选择器 (使用 clickoutside + vue-popper)</h2>
          <el-card>
            <el-row :gutter="20">
              <el-col :span="8">
                <h3>日期选择</h3>
                <el-date-picker
                  v-model="date1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <p style="margin-top: 10px;">{{ date1 }}</p>
              </el-col>

              <el-col :span="8">
                <h3>日期时间</h3>
                <el-date-picker
                  v-model="date2"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>

              <el-col :span="8">
                <h3>日期范围</h3>
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-card>
        </section>

        <!-- ColorPicker 组件 - 使用 clickoutside -->
        <section class="test-section">
          <h2><i class="el-icon-brush"></i> ColorPicker 颜色选择器 (使用 clickoutside)</h2>
          <el-card>
            <div style="display: flex; align-items: center; gap: 20px;">
              <div>
                <h3>基础颜色选择</h3>
                <el-color-picker v-model="color1"></el-color-picker>
                <p style="margin-top: 10px;">选中颜色: {{ color1 }}</p>
              </div>
              <div>
                <h3>带透明度</h3>
                <el-color-picker v-model="color2" show-alpha></el-color-picker>
                <p style="margin-top: 10px;">{{ color2 }}</p>
              </div>
              <div>
                <h3>预定义颜色</h3>
                <el-color-picker v-model="color3" :predefine="predefineColors"></el-color-picker>
              </div>
            </div>
          </el-card>
        </section>

        <!-- Table 过滤面板 - 使用 vue-popper, popup, clickoutside -->
        <section class="test-section">
          <h2><i class="el-icon-s-grid"></i> Table 过滤 (使用 vue-popper + popup + clickoutside)</h2>
          <el-card>
            <p>Table 的过滤面板使用了多个工具函数</p>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="150"></el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120"
                :filters="[{text: '张三', value: '张三'}, {text: '李四', value: '李四'}]"
                :filter-method="filterHandler">
              </el-table-column>
              <el-table-column
                prop="tag"
                label="标签"
                width="100"
                :filters="[{text: '家', value: '家'}, {text: '公司', value: '公司'}]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'">
                    {{ scope.row.tag }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </el-card>
        </section>

        <!-- Menu 组件 - 使用 dom -->
        <section class="test-section">
          <h2><i class="el-icon-menu"></i> Menu 导航菜单 (使用 dom + vue-popper)</h2>
          <el-card>
            <p>Menu 使用 dom (addClass/removeClass/hasClass)，Submenu 使用 vue-popper</p>
            <el-row :gutter="20">
              <el-col :span="12">
                <h3>垂直菜单</h3>
                <el-menu
                  :default-active="activeMenu"
                  @select="handleMenuSelect">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>导航一</span>
                    </template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-submenu index="1-3">
                      <template slot="title">选项3</template>
                      <el-menu-item index="1-3-1">选项3-1</el-menu-item>
                      <el-menu-item index="1-3-2">选项3-2</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                  </el-menu-item>
                </el-menu>
              </el-col>

              <el-col :span="12">
                <h3>水平菜单</h3>
                <el-menu :default-active="activeMenu2" mode="horizontal" @select="handleMenuSelect2">
                  <el-menu-item index="1">处理中心</el-menu-item>
                  <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="3">订单管理</el-menu-item>
                </el-menu>
                <p style="margin-top: 10px;">选中: {{ activeMenu2 }}</p>
              </el-col>
            </el-row>
          </el-card>
        </section>

        <!-- Image 组件 - 使用 dom 和 popup -->
        <section class="test-section">
          <h2><i class="el-icon-picture"></i> Image 图片 (使用 dom + popup)</h2>
          <el-card>
            <p>Image 使用 dom (on/off, getScrollContainer, isInContainer)，ImageViewer 使用 popup</p>
            <div style="display: flex; gap: 20px;">
              <el-image
                style="width: 200px; height: 200px"
                :src="imageUrl"
                :preview-src-list="imageSrcList"
                fit="cover">
              </el-image>
              <el-image
                style="width: 200px; height: 200px"
                :src="imageUrl2"
                :preview-src-list="imageSrcList"
                fit="contain">
              </el-image>
            </div>
            <p style="margin-top: 10px;">点击图片预览，预览器使用 popup 和 dom 工具</p>
            
            <el-divider></el-divider>
            
            <h3>直接使用 ImageViewer 组件</h3>
            <el-button type="primary" @click="showViewer = true">打开图片查看器</el-button>
            <el-image-viewer
              v-if="showViewer"
              :url-list="imageSrcList"
              :on-close="closeViewer"
              :initial-index="0">
            </el-image-viewer>
          </el-card>
        </section>

        <!-- Form 组件 - 使用 util -->
        <section class="test-section">
          <h2><i class="el-icon-edit"></i> Form 表单 (使用 util)</h2>
          <el-card>
            <p>FormItem 使用 util (noop, getPropByPath) 进行表单验证</p>
            <el-form :model="formData" :rules="formRules" ref="testForm" label-width="120px" style="max-width: 600px;">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email"></el-input>
              </el-form-item>
              <el-form-item label="嵌套对象" prop="nested.value">
                <el-input v-model="formData.nested.value" placeholder="测试 getPropByPath"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </section>

        <!-- Tree 组件 - 使用 dom -->
        <section class="test-section">
          <h2><i class="el-icon-s-operation"></i> Tree 树形控件 (使用 dom)</h2>
          <el-card>
            <p>Tree 使用 dom (addClass/removeClass) 管理节点样式</p>
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[1, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps">
            </el-tree>
          </el-card>
        </section>

        <!-- Rate 组件 - 使用 dom -->
        <section class="test-section">
          <h2><i class="el-icon-star-off"></i> Rate 评分 (使用 dom)</h2>
          <el-card>
            <p>Rate 使用 dom (hasClass) 检查元素状态</p>
            <div>
              <el-rate v-model="rateValue" show-text></el-rate>
              <p style="margin-top: 10px;">评分: {{ rateValue }}</p>
            </div>
            <div style="margin-top: 20px;">
              <el-rate v-model="rateValue2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
            </div>
          </el-card>
        </section>

        <!-- Tabs 组件 - 使用 util -->
        <section class="test-section">
          <h2><i class="el-icon-folder"></i> Tabs 标签页 (使用 util)</h2>
          <el-card>
            <p>TabBar 使用 util (arrayFind)</p>
            <el-tabs v-model="activeTab" type="border-card">
              <el-tab-pane label="用户管理" name="first">
                <p>用户管理内容</p>
              </el-tab-pane>
              <el-tab-pane label="配置管理" name="second">
                <p>配置管理内容</p>
              </el-tab-pane>
              <el-tab-pane label="角色管理" name="third">
                <p>角色管理内容</p>
              </el-tab-pane>
              <el-tab-pane label="定时任务" name="fourth">
                <p>定时任务内容</p>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </section>

        <!-- 总结 -->
        <el-card class="summary-card">
          <h2><i class="el-icon-success"></i> 测试总结</h2>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="element-ui/src/utils/popup">
              Dialog, Drawer, MessageBox, ImageViewer 等弹出层组件
            </el-descriptions-item>
            <el-descriptions-item label="element-ui/src/utils/vue-popper">
              Popover, Tooltip, Select, DatePicker, Submenu, FilterPanel 等浮层组件
            </el-descriptions-item>
            <el-descriptions-item label="element-ui/src/utils/clickoutside">
              Dropdown, Select, DatePicker, ColorPicker 等需要点击外部关闭的组件
            </el-descriptions-item>
            <el-descriptions-item label="element-ui/src/utils/dom">
              Menu, Tree, Image, Popover, MessageBox, Rate 等需要 DOM 操作的组件
            </el-descriptions-item>
            <el-descriptions-item label="element-ui/src/utils/util">
              Form, Dropdown, Select, Tabs, Image 等使用工具函数的组件
            </el-descriptions-item>
          </el-descriptions>
          
          <el-alert
            style="margin-top: 20px;"
            title="✅ 所有组件均正常工作"
            type="success"
            :closable="false"
            show-icon>
            <template>
              如果以上所有组件都能正常显示和交互，说明 @liuzengwei/element-ui 的工具函数模块正确导出和工作！
            </template>
          </el-alert>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ElImageViewer from '@liuzengwei/element-ui/packages/image/src/image-viewer';

export default {
  name: 'UtilsComponentsTest',
  components: {
    ElImageViewer
  },
  data() {
    return {
      // Dialog
      dialogVisible: false,
      nestedDialogVisible: false,
      innerDialogVisible: false,
      
      // Drawer
      drawer: false,
      drawer2: false,
      drawer3: false,
      drawer4: false,
      drawerInput: '',
      
      // Popover
      popoverVisible: false,
      
      // Dropdown
      dropdownCommand: '',
      
      // Select
      selectValue: '',
      selectValue2: '',
      selectMultiple: [],
      selectOptions: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ],
      
      // DatePicker
      date1: '',
      date2: '',
      dateRange: '',
      
      // ColorPicker
      color1: '#409EFF',
      color2: 'rgba(64, 158, 255, 0.8)',
      color3: '#409EFF',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ],
      
      // Table
      tableData: [
        { date: '2016-05-02', name: '张三', tag: '家', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '李四', tag: '公司', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王五', tag: '家', address: '上海市普陀区金沙江路 1519 弄' },
        { date: '2016-05-03', name: '张三', tag: '公司', address: '上海市普陀区金沙江路 1516 弄' }
      ],
      
      // Menu
      activeMenu: '1',
      activeMenu2: '1',
      
      // Image
      imageUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      imageUrl2: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      imageSrcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      ],
      showViewer: false,
      
      // Form
      formData: {
        username: '',
        email: '',
        nested: {
          value: ''
        }
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        'nested.value': [
          { required: true, message: '请输入嵌套值', trigger: 'blur' }
        ]
      },
      
      // Tree
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
      
      // Rate
      rateValue: 3.5,
      rateValue2: 4,
      
      // Tabs
      activeTab: 'first'
    };
  },
  methods: {
    handleCommand(command) {
      this.dropdownCommand = command;
      this.$message.success(`点击了 ${command}`);
    },
    filterHandler(value, row) {
      return row.name === value;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleMenuSelect(index) {
      this.activeMenu = index;
      this.$message.info(`选中菜单: ${index}`);
    },
    handleMenuSelect2(index) {
      this.activeMenu2 = index;
    },
    submitForm() {
      this.$refs.testForm.validate((valid) => {
        if (valid) {
          this.$message.success('表单验证通过！');
        } else {
          this.$message.error('表单验证失败！');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.testForm.resetFields();
    },
    closeViewer() {
      this.showViewer = false;
    }
  }
};
</script>

<style scoped>
.utils-components-test {
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

h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #303133;
  padding-left: 10px;
  border-left: 4px solid #409eff;
}

h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #606266;
}

.test-section {
  margin-bottom: 30px;
}

.el-card {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.popover-demo {
  text-align: center;
}

.popover-demo .top,
.popover-demo .bottom {
  text-align: center;
  margin-bottom: 10px;
}

.popover-demo .left,
.popover-demo .right {
  width: 150px;
  display: inline-block;
  margin-bottom: 10px;
}

.popover-demo .left {
  float: left;
}

.popover-demo .right {
  float: right;
}

.popover-demo .el-button {
  width: 140px;
  margin: 5px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-dropdown-link:hover {
  color: #66b1ff;
}

.summary-card {
  border: 2px solid #67c23a;
}

.summary-card h2 {
  border-left-color: #67c23a;
}

ul {
  padding-left: 20px;
}

ul li {
  margin: 5px 0;
}
</style>
