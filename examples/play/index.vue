<template>
  <div style="margin: 20px">
    <el-radio-group v-model="value" size="normal" @change="">
      <el-radio-button
        v-for="item in items"
        :key="item.key"
        :label="item.label"
      >
        {{ item.title }}
      </el-radio-button>
    </el-radio-group>

    <el-checkbox-group v-model="value" size="normal" @change="">
      <el-checkbox
        v-for="item in items"
        border
        :key="item.key"
        :label="item.label"
      >
        {{ item.title }}
      </el-checkbox>
    </el-checkbox-group>

    <el-checkbox-group v-model="value" size="normal" @change="">
      <el-checkbox v-for="item in items" :key="item.key" :label="item.label">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>

    <el-radio v-model="value" label="" border @change="">Nihao</el-radio>

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
      value: ["选项1"],
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
