<template>
  <div style="margin: 20px">
    <h3>Table 表头吸顶功能测试</h3>

    <p>向下滚动页面，表头会固定在顶部</p>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>card title - Table 在卡片内</span>
      </div>
      <el-table
        :data="tableData"
        :sticky-header="0"
        border
        style="width: 100%; margin-bottom: 30px"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </el-card>

    <div
      style="
        height: 500px;
        background: #f0f0f0;
        padding: 20px;
        margin-bottom: 30px;
      "
    >
      <p>占位内容区域 - 向下滚动查看吸顶效果</p>
    </div>

    <h3>InputNumber 计数器格式化功能测试</h3>

    <h4>货币格式化</h4>
    <div style="margin-bottom: 20px">
      <el-input-number
        v-model="money"
        :formatter="
          (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        "
        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        :min="0"
        :max="100000"
      ></el-input-number>
      <span style="margin-left: 10px">当前值: {{ money }}</span>
    </div>

    <h4>千分符显示</h4>
    <div style="margin-bottom: 20px">
      <el-input-number
        v-model="bigNumber"
        :thousand-separator="true"
        :min="0"
        :max="10000000"
      ></el-input-number>
      <span style="margin-left: 10px">当前值: {{ bigNumber }}</span>
    </div>

    <h4>千分符 + 精度</h4>
    <div style="margin-bottom: 20px">
      <el-input-number
        v-model="precisionNumber"
        :thousand-separator="true"
        :precision="2"
        :step="0.01"
        :min="0"
      ></el-input-number>
      <span style="margin-left: 10px">当前值: {{ precisionNumber }}</span>
    </div>

    <h4>百分比格式</h4>
    <div style="margin-bottom: 30px">
      <el-input-number
        v-model="percent"
        :formatter="(value) => `${value}%`"
        :parser="(value) => value.replace('%', '')"
        :min="0"
        :max="100"
      ></el-input-number>
      <span style="margin-left: 10px">当前值: {{ percent }}</span>
    </div>

    <h3>Switch 开关新功能测试</h3>

    <h4>内部文字显示</h4>
    <div style="margin-bottom: 20px">
      <el-switch
        v-model="switchValue1"
        active-inner-text="ON"
        inactive-inner-text="OFF"
      ></el-switch>
      <el-switch
        v-model="switchValue2"
        active-inner-text="开"
        inactive-inner-text="关"
        active-color="#13ce66"
        inactive-color="#ff4949"
        style="margin-left: 10px"
      ></el-switch>
      <el-switch
        v-model="switchValue3"
        active-inner-text="YES"
        inactive-inner-text="NO"
        style="margin-left: 10px"
      ></el-switch>
    </div>

    <h4>异步控制 + Loading</h4>
    <div style="margin-bottom: 20px">
      <el-switch
        v-model="asyncValue1"
        :before-change="beforeChange1"
      ></el-switch>
      <span style="margin-left: 10px">带确认框的异步切换</span>
    </div>
    <div style="margin-bottom: 30px">
      <el-switch
        v-model="asyncValue2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :before-change="beforeChange2"
        active-inner-text="开"
        inactive-inner-text="关"
        :width="60"
      ></el-switch>
      <span style="margin-left: 10px">模拟异步请求(随机成功/失败)</span>
    </div>

    <el-tooltip
      content="content to trigger tooltip here"
      placement="top"
      effect="dark"
    >
      <el-link
        type="primary"
        :underline="false"
        v-if="showTooltip"
        @click="onClick"
        >测试</el-link
      >
    </el-tooltip>

    <div>
      <el-switch v-model="loading" active-text="加载中"></el-switch>
      <el-switch
        v-model="animated"
        active-text="动画效果"
        style="margin-left: 20px"
      ></el-switch>

      <el-descriptions
        class="margin-top"
        title="用户信息"
        :column="3"
        :loading="loading"
        :animated="animated"
      >
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注"> - </el-descriptions-item>
        <el-descriptions-item label="联系地址"
          >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
        >
      </el-descriptions>
    </div>
    <h3>Affix 固钉组件测试</h3>

    <h4>基础用法</h4>
    <div style="height: 200px; background: #f5f7fa; padding: 20px">
      <el-affix :offset="80">
        <el-button type="primary">距离顶部 80px</el-button>
      </el-affix>
    </div>

    <h4>固定在底部（完全贴底 bottom: 0）</h4>
    <div
      style="
        height: 200px;
        background: #e4e7ed;
        padding: 20px;
        margin-top: 20px;
        position: relative;
      "
    >
      <el-affix position="bottom" :offset="0">
        <el-button type="danger">贴底固定 (bottom: 0)</el-button>
      </el-affix>
    </div>

    <h4>固定在底部（有间距）</h4>
    <div
      style="
        height: 200px;
        background: #d3dce6;
        padding: 20px;
        margin-top: 20px;
      "
    >
      <el-affix position="bottom" :offset="20">
        <el-button type="success">距离底部 20px</el-button>
      </el-affix>
    </div>

    <hr style="margin: 30px 0" />

    <h3>Text 组件测试</h3>

    <h4>基本用法</h4>
    <el-text>默认文本</el-text>
    <br />
    <el-text type="primary">Primary 文本</el-text>
    <br />
    <el-text type="success">Success 文本</el-text>
    <br />
    <el-text type="warning">Warning 文本</el-text>
    <br />
    <el-text type="danger">Danger 文本</el-text>
    <br />
    <el-text type="info">Info 文本</el-text>

    <h4>尺寸</h4>
    <el-text size="large">大号文本</el-text>
    <br />
    <el-text size="default">默认文本</el-text>
    <br />
    <el-text size="small">小号文本</el-text>

    <h4>单行省略</h4>
    <div style="width: 200px">
      <el-text truncated
        >这是一段很长的文本，会被截断并显示省略号，测试文本省略功能是否正常工作</el-text
      >
    </div>

    <h4>多行省略</h4>
    <div style="width: 200px">
      <el-text line-clamp="2"
        >这是一段很长的文本，会被截断到两行并显示省略号。这段文本用来测试多行省略功能是否正常工作。继续添加更多文本来测试效果。</el-text
      >
    </div>

    <h4>自定义标签</h4>
    <el-text tag="p" type="primary">段落标签的文本</el-text>
    <el-text tag="div" type="success">DIV标签的文本</el-text>

    <hr style="margin: 30px 0" />

    <el-radio-group v-model="value" size="normal" @change="">
      <el-radio-button
        v-for="item in items"
        :key="item.key"
        :label="item.label"
      >
        {{ item.title }}
      </el-radio-button>
    </el-radio-group>

    <el-checkbox-group v-model="valueCheckbox" size="normal" @change="">
      <el-checkbox
        v-for="item in items"
        border
        :key="item.key"
        :label="item.label"
      >
        {{ item.title }}
      </el-checkbox>
    </el-checkbox-group>

    <el-checkbox-group v-model="valueCheckbox" size="normal" @change="">
      <el-checkbox v-for="item in items" :key="item.key" :label="item.label">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>

    <el-radio v-model="value" label="" border @change="">Nihao</el-radio>
    <el-radio v-model="value" label="" @change="">Nihao</el-radio>

    <el-upload
      action=""
      ref="upload"
      list-type="picture-card"
      :auto-upload="false"
      multiple
      :limit="5"
      :file-list="list"
    >
    </el-upload>

    <el-input v-model="input" placeholder="请输入内容" clearable></el-input>
    <el-button type="info" @click="">按钮</el-button>
    <el-button @click="">按钮</el-button>

    <h3>Round Tag 测试</h3>
    <el-tag type="danger" size="normal" round>圆形标签</el-tag>
    <el-tag type="success" size="normal" round>成功圆形标签</el-tag>
    <el-tag type="warning" size="small" round>小型圆形标签</el-tag>
    <el-tag type="info" size="mini" round>迷你圆形标签</el-tag>

    <h3>带图标的标签测试</h3>
    <el-tag type="primary">
      <template slot="icon">
        <i class="el-icon-check"></i>
      </template>
      带图标的标签
    </el-tag>

    <el-tag type="success" round>
      <template slot="icon">
        <i class="el-icon-check"></i>
      </template>
      带图标的圆形标签
    </el-tag>

    <el-tag type="warning" closable>
      <template slot="icon">
        <i class="el-icon-warning"></i>
      </template>
      可关闭的带图标标签
    </el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Table 测试数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "李小龙",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "张小明",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "赵小红",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-05",
          name: "钱小白",
          address: "上海市普陀区金沙江路 1520 弄",
        },
        {
          date: "2016-05-06",
          name: "孙小黑",
          address: "上海市普陀区金沙江路 1521 弄",
        },
        {
          date: "2016-05-07",
          name: "周小青",
          address: "上海市普陀区金沙江路 1522 弄",
        },
        {
          date: "2016-05-08",
          name: "吴小紫",
          address: "上海市普陀区金沙江路 1523 弄",
        },
      ],
      // InputNumber 测试数据
      money: 1000,
      bigNumber: 1234567,
      precisionNumber: 12345.67,
      percent: 50,
      // 其他数据
      showTooltip: true,
      loading: false,
      animated: false,
      switchValue1: true,
      switchValue2: false,
      switchValue3: true,
      asyncValue1: false,
      asyncValue2: false,
      list: [{}],
      input: "Hello Element UI!",
      value: "选项1",
      valueCheckbox: ["选项1"],
      items: [
        { key: 1, label: "选项1", title: "黄金糕" },
        { key: 2, label: "选项2", title: "双皮奶" },
        { key: 3, label: "选项3", title: "蚵仔煎" },
        { key: 4, label: "选项4", title: "龙须糖" },
        { key: 5, label: "选项5", title: "北京烤鸭" },
      ],
    };
  },
  methods: {
    onClick() {
      setTimeout(() => {
        this.showTooltip = false;
      }, 300);
    },
    beforeChange1() {
      return new Promise((resolve) => {
        this.$confirm("确认切换开关状态吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 模拟异步操作
            setTimeout(() => {
              this.$message.success("切换成功");
              resolve(true);
            }, 1000);
          })
          .catch(() => {
            this.$message.info("已取消");
            resolve(false);
          });
      });
    },
    beforeChange2() {
      return new Promise((resolve) => {
        // 模拟异步请求
        setTimeout(() => {
          if (Math.random() > 0.5) {
            this.$message.success("切换成功");
            resolve(true);
          } else {
            this.$message.error("切换失败");
            resolve(false);
          }
        }, 1500);
      });
    },
  },
};
</script>
