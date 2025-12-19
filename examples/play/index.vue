<template>
  <div style="margin: 20px;">
    <h2>Table getSelectionRows 方法示例</h2>
    
    <el-card style="margin-bottom: 20px;">
      <h3>功能说明</h3>
      <p>getSelectionRows 方法可以获取选中行的节点信息和数据，返回包含以下信息的数组：</p>
      <ul>
        <li><code>row</code>: 行数据对象</li>
        <li><code>index</code>: 行在数据中的索引</li>
        <li><code>$el</code>: 行的DOM节点</li>
        <li><code>selected</code>: 选中状态</li>
      </ul>
    </el-card>
    
    <!-- 表格示例 -->
    <el-card style="margin-bottom: 20px;">
      <h3>表格示例</h3>
      <el-table
        ref="multipleTable"
        :data="tableData"
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
      
      <div style="margin-top: 20px">
        <el-button @click="getSelectionInfo" type="primary">获取选中行节点信息</el-button>
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="highlightSelectedRows" type="success">高亮显示选中行</el-button>
      </div>
    </el-card>
    
    <!-- 选中行信息展示 -->
    <el-card v-if="selectionInfo.length > 0" style="margin-bottom: 20px;">
      <h3>选中行信息 ({{ selectionInfo.length }} 条)</h3>
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item, index) in selectionInfo" :key="index">
          <el-card style="margin-bottom: 10px; background: #f9f9f9;">
            <h4>选中行 #{{ index + 1 }}</h4>
            <p><strong>数据索引:</strong> {{ item.index }}</p>
            <p><strong>姓名:</strong> {{ item.row.name }}</p>
            <p><strong>地址:</strong> {{ item.row.address }}</p>
            <p><strong>DOM节点:</strong> {{ item.$el ? '已获取' : '未获取' }}</p>
            <p><strong>选中状态:</strong> {{ item.selected ? '已选中' : '未选中' }}</p>
            <el-button size="mini" @click="scrollToRow(item)" type="text">滚动到此行</el-button>
            <el-button size="mini" @click="highlightRow(item)" type="text">高亮此行</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    
    <!-- 控制台输出 -->
    <el-card style="margin-bottom: 20px;">
      <h3>控制台输出</h3>
      <el-input
        type="textarea"
        :rows="10"
        placeholder="控制台输出将显示在这里"
        v-model="consoleOutput"
        readonly>
      </el-input>
      <el-button @click="clearConsole" style="margin-top: 10px;" size="small">清空输出</el-button>
    </el-card>

    <!-- 自定义滚动容器测试 -->
    <div style="margin: 40px 0;">
      <h3>7. 自定义滚动容器测试</h3>
      <p>下面的容器有固定高度和滚动条，懒加载基于这个容器而不是整个页面</p>
      
      <div 
        id="test-scroll-container" 
        style="height: 400px; overflow-y: auto; border: 2px solid #ddd; padding: 20px; margin-bottom: 20px;">
        
        <!-- 占位内容 -->
        <div style="height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
          <h3>👇 在容器内向下滚动</h3>
        </div>
        
        <!-- 懒加载内容 -->
        <el-lazy-load 
          scroll-container="#test-scroll-container"
          offset="50px"
          @load="handleLoad('自定义滚动容器')">
          <template #default>
            <el-card v-if="loadedItems.includes('自定义滚动容器')" style="margin-bottom: 20px;">
              <h4>✅ 自定义容器中的懒加载内容</h4>
              <p>这个内容是基于自定义滚动容器进行懒加载的</p>
              <p>滚动容器选择器: #test-scroll-container</p>
              <p>提前加载距离: 50px</p>
            </el-card>
            <el-card v-else style="margin-bottom: 20px;">
              <div style="padding: 40px; background: #e6f7ff; text-align: center;">
                <i class="el-icon-loading" style="font-size: 30px; color: #409EFF;"></i>
                <p>正在加载中...</p>
              </div>
            </el-card>
          </template>
        </el-lazy-load>
        
        <!-- 更多内容 -->
        <div style="height: 300px; background: #f9f9f9; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
          <h3>更多内容</h3>
        </div>
        
        <!-- 第二个懒加载 -->
        <el-lazy-load 
          scroll-container="#test-scroll-container"
          offset="100px"
          @load="handleLoad('自定义容器-第二个')">
          <template #default>
            <el-card v-if="loadedItems.includes('自定义容器-第二个')" style="margin-bottom: 20px;">
              <h4>✅ 第二个懒加载项目</h4>
              <p>在同一个自定义容器中的第二个懒加载项目</p>
            </el-card>
            <el-card v-else style="margin-bottom: 20px;">
              <div style="padding: 40px; background: #fffbe6; text-align: center;">
                <i class="el-icon-loading" style="font-size: 30px; color: #faad14;"></i>
                <p>等待加载...</p>
              </div>
            </el-card>
          </template>
        </el-lazy-load>
        
        <!-- 底部内容 -->
        <div style="height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
          <h3>🎉 容器底部！</h3>
        </div>
      </div>
    </div>

    <!-- 占位空间，确保需要滚动 -->
    <div style="height: 600px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      <h3>👇 向下滚动查看懒加载内容</h3>
    </div>

    <!-- 基础懒加载 -->
    <div style="margin: 40px 0;">
      <h3>1. 基础懒加载（2秒延迟）</h3>
      <el-lazy-load @load="handleLoad('基础懒加载')">
        <template #default>
          <el-card v-if="loadedItems.includes('基础懒加载')">
            <div style="padding: 20px; background: #409EFF; color: white;">
              <h2>✅ 我已经被加载了！</h2>
              <p>当前时间: {{ currentTime }}</p>
              <p>模拟了 2 秒的加载延迟</p>
            </div>
          </el-card>
          <el-card v-else>
            <div style="padding: 20px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; height: 100px;">
              <div>
                <i class="el-icon-loading" style="font-size: 30px; color: #409EFF;"></i>
                <p>正在加载中...</p>
              </div>
            </div>
          </el-card>
        </template>
      </el-lazy-load>
    </div>

    <div style="height: 400px;"></div>

    <!-- 骨架屏占位 -->
    <div style="margin: 40px 0;">
      <h3>2. 骨架屏占位（3秒延迟）</h3>
      <el-lazy-load show-skeleton @load="handleLoad('骨架屏')">
        <template #default>
          <el-card v-if="loadedItems.includes('骨架屏')">
            <h4>带骨架屏的内容</h4>
            <p>这个内容在加载前会显示骨架屏动画</p>
            <p>模拟了 3 秒的加载延迟</p>
          </el-card>
          <el-card v-else>
            <div style="padding: 20px;">
              <div class="el-skeleton-item el-skeleton__text" style="width: 50%; margin-bottom: 10px;"></div>
              <div class="el-skeleton-item el-skeleton__text" style="width: 80%;"></div>
            </div>
          </el-card>
        </template>
      </el-lazy-load>
    </div>

    <div style="height: 400px;"></div>

    <!-- 自定义占位 -->
    <div style="margin: 40px 0;">
      <h3>3. 自定义占位内容（1.5秒延迟）</h3>
      <el-lazy-load @load="handleLoad('自定义占位')">
        <template #placeholder>
          <div style="height: 150px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; border: 2px dashed #ddd;">
            <div>
              <i class="el-icon-loading" style="font-size: 30px; color: #409EFF;"></i>
              <p>正在加载中...</p>
              <p style="font-size: 12px; color: #999;">自定义占位内容</p>
            </div>
          </div>
        </template>
        <template #default>
          <el-alert
            v-if="loadedItems.includes('自定义占位')"
            title="自定义占位"
            type="success"
            description="我使用了自定义的加载占位内容，模拟了 1.5 秒延迟"
            :closable="false">
          </el-alert>
        </template>
      </el-lazy-load>
    </div>

    <div style="height: 400px;"></div>

    <!-- 提前加载 -->
    <div style="margin: 40px 0;">
      <h3>4. 提前 200px 加载（1秒延迟）</h3>
      <el-lazy-load offset="200px" @load="handleLoad('提前加载')">
        <template #default>
          <el-card v-if="loadedItems.includes('提前加载')">
            <h4>⚡ 提前加载</h4>
            <p>距离视口还有 200px 时就开始加载了</p>
            <p>模拟了 1 秒的加载延迟</p>
          </el-card>
          <el-card v-else>
            <div style="padding: 20px; background: #e6f7ff; border-left: 4px solid #409EFF;">
              <p>🚀 正在提前加载内容...</p>
            </div>
          </el-card>
        </template>
      </el-lazy-load>
    </div>

    <div style="height: 400px;"></div>

    <!-- 可重复加载 -->
    <div style="margin: 40px 0;">
      <h3>5. 可重复加载（滚出视口会卸载）</h3>
      <p>加载次数: {{ repeatLoadCount }}</p>
      <el-lazy-load 
        :once="false" 
        @load="handleRepeatLoad" 
        @unload="handleRepeatUnload">
        <template #default>
          <el-alert
            v-if="repeatLoadCount > 0"
            title="可重复加载"
            type="warning"
            :description="`滚出视口后会卸载，重新滚回来会再次加载。当前是第 ${repeatLoadCount} 次加载`"
            :closable="false">
          </el-alert>
          <el-card v-else>
            <div style="padding: 20px; background: #fffbe6; border-left: 4px solid #faad14;">
              <p>🔄 等待加载...</p>
            </div>
          </el-card>
        </template>
      </el-lazy-load>
    </div>

    <div style="height: 400px;"></div>

    <!-- 列表懒加载 -->
    <div style="margin: 40px 0;">
      <h3>8. 列表懒加载（每个项目2秒延迟）</h3>
      <el-lazy-load 
        v-for="i in 10" 
        :key="i" 
        offset="0px"
        show-skeleton
        style="margin-bottom: 16px;"
        @load="handleLoad(`列表项${i}`)">
        <template #default>
          <el-card v-if="loadedItems.includes(`列表项${i}`)">
            <h4>列表项 {{ i }}</h4>
            <p>这是第 {{ i }} 个列表项的内容，每个都是独立懒加载的</p>
            <el-tag type="success">已加载</el-tag>
          </el-card>
          <el-card v-else>
            <div style="padding: 20px;">
              <div class="el-skeleton-item el-skeleton__text" style="width: 60%; margin-bottom: 8px;"></div>
              <div class="el-skeleton-item el-skeleton__text" style="width: 40%;"></div>
            </div>
          </el-card>
        </template>
      </el-lazy-load>
    </div>

    <div style="height: 400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: new Date().toLocaleTimeString(),
      repeatLoadCount: 0,
      loadedItems: [] // 跟踪已加载的项目
    };
  },
  methods: {
    handleLoad(name) {
      console.log(`${name} 触发加载`, new Date().toLocaleTimeString());
      
      // 模拟不同项目的加载延迟
      let delay = 2000; // 默认2秒
      if (name.includes('骨架屏')) delay = 3000;
      else if (name.includes('自定义占位')) delay = 1500;
      else if (name.includes('提前加载')) delay = 1000;
      
      // 显示加载中消息
      this.$message.info(`${name} 开始加载...`);
      
      // 模拟延迟加载
      setTimeout(() => {
        this.loadedItems.push(name);
        this.currentTime = new Date().toLocaleTimeString();
        this.$message.success(`${name} 加载完成！`);
        console.log(`${name} 加载完成`, new Date().toLocaleTimeString());
      }, delay);
    },
    handleRepeatLoad() {
      this.repeatLoadCount++;
      console.log('重复加载触发', this.repeatLoadCount);
      this.$message.info('内容已加载');
    },
    handleRepeatUnload() {
      console.log('内容已卸载');
      this.$message.warning('内容已卸载');
    },
    resetAll() {
      this.loadedItems = [];
      this.repeatLoadCount = 0;
      this.currentTime = new Date().toLocaleTimeString();
      this.$message.info('已重置所有加载状态');
    }
  }
};
</script>

