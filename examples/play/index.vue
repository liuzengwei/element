<template>
  <div style="margin: 20px;">
    <h2>Table getSelectionRows 方法示例</h2>
    
    <div style="margin-bottom: 20px;">
      <el-button @click="handleGetSelection" type="primary">获取选中行</el-button>
      <el-button @click="handleClearSelection">清空选择</el-button>
      <el-button @click="handleToggleFirstRow">切换第一行选中状态</el-button>
    </div>

    <div v-if="selectionResult.length > 0" style="margin-bottom: 20px;">
      <el-alert 
        title="选中的行数据" 
        type="success" 
        :closable="false">
        <pre>{{ JSON.stringify(selectionResult, null, 2) }}</pre>
      </el-alert>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <h3 style="margin-top: 40px;">树形表格示例</h3>
    
    <div style="margin-bottom: 20px;">
      <el-button @click="handleGetTreeSelection" type="primary">获取选中行数据</el-button>
      <el-button @click="handleGetTreeNodes" type="success">获取选中节点信息</el-button>
      <el-button @click="handleClearTreeSelection">清空选择</el-button>
    </div>

    <div v-if="treeSelectionResult.length > 0" style="margin-bottom: 20px;">
      <el-alert 
        title="选中的行数据 (getSelectionRows)" 
        type="info" 
        :closable="false">
        <pre>{{ JSON.stringify(treeSelectionResult, null, 2) }}</pre>
      </el-alert>
    </div>

    <div v-if="treeNodesResult.length > 0" style="margin-bottom: 20px;">
      <el-alert 
        title="选中的节点信息 (getSelectionNodes)" 
        type="warning" 
        :closable="false">
        <pre>{{ JSON.stringify(treeNodesResult, null, 2) }}</pre>
      </el-alert>
    </div>

    <el-table
      ref="treeTable"
      :data="treeData"
      style="width: 100%; margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @selection-change="handleTreeSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1520 弄'
          }
        ],
        treeData: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            children: [
              {
                id: 11,
                date: '2016-05-01',
                name: '王小虎-子节点1',
                address: '上海市普陀区金沙江路 1518 弄-1'
              },
              {
                id: 12,
                date: '2016-05-01',
                name: '王小虎-子节点2',
                address: '上海市普陀区金沙江路 1518 弄-2'
              }
            ]
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [
              {
                id: 31,
                date: '2016-05-03',
                name: '王小虎-子节点3',
                address: '上海市普陀区金沙江路 1519 弄-1'
              }
            ]
          },
          {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        selectionResult: [],
        treeSelectionResult: [],
        treeNodesResult: []
      };
    },

    methods: {
      handleSelectionChange(val) {
        console.log('selection-change event:', val);
      },

      handleTreeSelectionChange(val) {
        console.log('tree selection-change event:', val);
      },

      handleGetSelection() {
        const selection = this.$refs.multipleTable.getSelectionRows();
        this.selectionResult = selection;
        this.$message.success(`获取到 ${selection.length} 行选中数据`);
        console.log('选中的行:', selection);
      },

      handleGetTreeSelection() {
        const selection = this.$refs.treeTable.getSelectionRows();
        this.treeNodesResult = [];
        this.$message.success(`获取到 ${selection.length} 行选中数据`);
        console.log('树形表格选中的行:', selection);
      },

      handleGetTreeNodes() {
        const nodes = this.$refs.treeTable.getSelectionNodes();
        this.treeNodesResult = nodes;
        this.treeSelectionResult = [];
        this.$message.success(`获取到 ${nodes.length} 个节点信息`);
        console.log('树形表格选中的节点信息:', nodes);
      },

      handleClearSelection() {
        this.$refs.multipleTable.clearSelection();
        this.selectionResult = [];
        this.$message.info('已清空选择');
      },

      handleClearTreeSelection() {
        this.$refs.treeTable.clearSelection();
        this.treeSelectionResult = [];
        this.treeNodesle.clearSelection();
        this.treeSelectionResult = [];
        this.$message.info('已清空树形表格选择');
      },

      handleToggleFirstRow() {
        this.$refs.multipleTable.toggleRowSelection(this.tableData[0]);
      }
    }
  };
</script>

<style scoped>
pre {
  background: #f4f4f5;
  padding: 10px;
  border-radius: 4px;
  max-height: 300px;
  overflow: auto;
}
</style>
