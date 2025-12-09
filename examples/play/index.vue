<template>
  <div style="margin: 20px">
    <h3>Text 组件测试</h3>
    
    <h4>基本用法</h4>
    <el-text>默认文本</el-text>
    <br/>
    <el-text type="primary">Primary 文本</el-text>
    <br/>
    <el-text type="success">Success 文本</el-text>
    <br/>
    <el-text type="warning">Warning 文本</el-text>
    <br/>
    <el-text type="danger">Danger 文本</el-text>
    <br/>
    <el-text type="info">Info 文本</el-text>
    
    <h4>尺寸</h4>
    <el-text size="large">大号文本</el-text>
    <br/>
    <el-text size="default">默认文本</el-text>
    <br/>
    <el-text size="small">小号文本</el-text>
    
    <h4>单行省略</h4>
    <div style="width: 200px">
      <el-text truncated>这是一段很长的文本，会被截断并显示省略号，测试文本省略功能是否正常工作</el-text>
    </div>
    
    <h4>多行省略</h4>
    <div style="width: 200px">
      <el-text line-clamp="2">这是一段很长的文本，会被截断到两行并显示省略号。这段文本用来测试多行省略功能是否正常工作。继续添加更多文本来测试效果。</el-text>
    </div>
    
    <h4>自定义标签</h4>
    <el-text tag="p" type="primary">段落标签的文本</el-text>
    <el-text tag="div" type="success">DIV标签的文本</el-text>

    <hr style="margin: 30px 0"/>

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
      list: [{}],
      input: "Hello Element UI!",
      value: '选项1',
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
};
</script>
