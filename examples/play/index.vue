<template>
  <div style="padding: 20px;">
    <h1>表头吸顶测试 - 右固定列修复</h1>
    
    <h2>带固定列的表头吸顶（向下滚动查看效果）</h2>
    <p style="color: #666; margin-bottom: 20px;">
      注意观察：表头吸顶时，左右固定列应该保持在正确的位置
    </p>
    
    <el-table
      :data="tableData"
      :header-affixed-top="56"
      border
      style="width: 100%; margin-bottom: 40px;">
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="height: 800px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
      <p style="color: #999; text-align: center;">
        底部占位区域<br/>
        向上滚动可以看到表头吸顶效果消失
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableAffixHeaderTest',
  data() {
    return {
      tableData: Array(50).fill(null).map((_, index) => ({
        id: 1000 + index,
        date: '2016-05-0' + (index % 9 + 1),
        name: '王小虎 ' + index,
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 ' + (1518 + index) + ' 弄',
        zip: 200333,
        email: 'user' + index + '@example.com',
        phone: '138-0000-' + String(1000 + index).padStart(4, '0')
      }))
    };
  }
};
</script>

<style scoped>
h1 {
  color: #333;
  margin-bottom: 10px;
}

h2 {
  margin-top: 40px;
  margin-bottom: 10px;
  color: #333;
}
</style>
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
    

    <h2>3. 设置偏移量的表头吸顶</h2>
    <el-table
      :data="tableData"
      :header-affixed-top="{ offsetTop: 10 }"
      border
      style="width: 100%; margin-bottom: 40px;">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <div style="height: 500px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
      <p style="color: #999;">底部占位区域 - 向上滚动可以看到表头吸顶效果消失</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableAffixHeaderTest',
  data() {
    return {
      tableData: Array(30).fill(null).map((_, index) => ({
        date: '2016-05-0' + (index % 9 + 1),
        name: '王小虎 ' + index,
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 ' + (1518 + index) + ' 弄',
        zip: 200333
      }))
    };
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
  color: #333;
}
</style>
