<template>
  <div style="margin: 20px">
    <h2>城市选择器测试</h2>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>基础用法</h3>
          <el-area-picker v-model="value1" placeholder="请选择省/市/区"></el-area-picker>
          <p>选中的值: {{ value1 }}</p>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="demo-block">
          <h3>只选择省份</h3>
          <el-area-picker v-model="value2" :level="1" placeholder="请选择省份"></el-area-picker>
          <p>选中的值: {{ value2 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>选择省市</h3>
          <el-area-picker v-model="value3" :level="2" placeholder="请选择省市"></el-area-picker>
          <p>选中的值: {{ value3 }}</p>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="demo-block">
          <h3>可选择任意级别</h3>
          <el-area-picker v-model="value4" :props="{ checkStrictly: true }" placeholder="请选择"></el-area-picker>
          <p>选中的值: {{ value4 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>多选</h3>
          <el-area-picker v-model="value5" :props="{ multiple: true, checkStrictly: true  }" placeholder="请选择多个城市"></el-area-picker>
          <p>选中的值: {{ value5 }}</p>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="demo-block">
          <h3>可搜索</h3>
          <el-area-picker v-model="value6" filterable clearable placeholder="可搜索"></el-area-picker>
          <p>选中的值: {{ value6 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="demo-block">
          <h3>自定义字段名</h3>
          <el-area-picker 
            v-model="value7" 
            :value-key="'id'"
            :label-key="'name'"
            :children-key="'items'"
            placeholder="自定义字段名">
          </el-area-picker>
          <p>选中的值: {{ value7 }}</p>
        </div>
      </el-col>
    </el-row>
    
    <el-divider></el-divider>
    
    <el-button type="primary" size="default" @click="onOpen">打开弹窗</el-button>
    <el-cascader :options="options" v-model="form.xxx" clearable filterable :show-all-levels="false"
      :props="{ expandTrigger: 'hover', multiple: true, checkStrictly: true }" @change="">
    </el-cascader>
    
    <el-dialog
      center
      title="弹窗"
      :visible.sync="show"
      width="30%"
      @close="">
      <span></span>
      <span slot="footer">
        <el-button @click="show = false">Cancel</el-button>
        <el-button type="primary" @click="">OK</el-button>
      </span>
    </el-dialog>
    
    
    <!-- Radio 和 Checkbox 竖向排列及溢出测试 -->
    <h2>Radio 和 Checkbox 新功能测试</h2>
    
    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>Radio - 竖向排列测试</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h4>横向排列（默认）</h4>
          <el-radio-group v-model="radio1">
            <el-radio :label="1">选项一</el-radio>
            <el-radio :label="2">选项二</el-radio>
            <el-radio :label="3">选项三</el-radio>
            <el-radio :label="4">选项四</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12">
          <h4>竖向排列</h4>
          <el-radio-group v-model="radio2" direction="vertical">
            <el-radio :label="1">选项一</el-radio>
            <el-radio :label="2">选项二</el-radio>
            <el-radio :label="3">选项三</el-radio>
            <el-radio :label="4">选项四</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>Radio - 文本溢出处理测试</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h4>自动换行（默认）</h4>
          <div style="width: 300px; border: 1px solid #ddd; padding: 10px;">
            <el-radio-group v-model="radio3">
              <el-radio :label="1">这是一个非常非常非常长的单选框文本内容</el-radio>
              <el-radio :label="2">短文本</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="12">
          <h4>显示省略号</h4>
          <div style="width: 300px; border: 1px solid #ddd; padding: 10px;">
            <el-radio-group v-model="radio4" overflow="ellipsis">
              <el-radio :label="1">这是一个非常非常非常长的单选框文本内容</el-radio>
              <el-radio :label="2">短文本</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>Checkbox - 竖向排列测试</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h4>横向排列（默认）</h4>
          <el-checkbox-group v-model="checkList1">
            <el-checkbox label="选项一"></el-checkbox>
            <el-checkbox label="选项二"></el-checkbox>
            <el-checkbox label="选项三"></el-checkbox>
            <el-checkbox label="选项四"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="12">
          <h4>竖向排列</h4>
          <el-checkbox-group v-model="checkList2" direction="vertical">
            <el-checkbox label="选项一"></el-checkbox>
            <el-checkbox label="选项二"></el-checkbox>
            <el-checkbox label="选项三"></el-checkbox>
            <el-checkbox label="选项四"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>Checkbox - 文本溢出处理测试</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h4>自动换行（默认）</h4>
          <div style="width: 300px; border: 1px solid #ddd; padding: 10px;">
            <el-checkbox-group v-model="checkList3">
              <el-checkbox label="这是一个非常非常非常长的多选框文本内容"></el-checkbox>
              <el-checkbox label="短文本"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <el-col :span="12">
          <h4>显示省略号</h4>
          <div style="width: 300px; border: 1px solid #ddd; padding: 10px;">
            <el-checkbox-group v-model="checkList4" overflow="ellipsis">
              <el-checkbox label="这是一个非常非常非常长的多选框文本内容"></el-checkbox>
              <el-checkbox label="短文本"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>组合测试 - 竖向 + 省略号</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <h4>Radio 竖向 + 省略号</h4>
          <div style="width: 200px; border: 1px solid #ddd; padding: 10px;">
            <el-radio-group v-model="radio5" direction="vertical" overflow="ellipsis">
              <el-radio :label="1">这是一个非常非常非常长的单选框文本内容</el-radio>
              <el-radio :label="2">短文本</el-radio>
              <el-radio :label="3">另一个很长很长很长的文本内容</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="12">
          <h4>Checkbox 竖向 + 省略号</h4>
          <div style="width: 200px; border: 1px solid #ddd; padding: 10px;">
            <el-checkbox-group v-model="checkList5" direction="vertical" overflow="ellipsis">
              <el-checkbox label="这是一个非常非常非常长的多选框文本内容"></el-checkbox>
              <el-checkbox label="短文本"></el-checkbox>
              <el-checkbox label="另一个很长很长很长的文本内容"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-descriptions>
      <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注"> - </el-descriptions-item>
      <el-descriptions-item label="联系地址"
        >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
      >
    </el-descriptions>

    <el-card shadow="never">
      <div slot="header">
        <span>card title</span>
      </div>
      card body
    </el-card>
    

    <!-- Area Loading 组件测试 -->
    <h3>Area Loading 区域加载组件</h3>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <h4>基础用法</h4>
        <el-area-loading :loading="loading1">
          <div style="padding: 40px; background: #f5f7fa; text-align: center;">
            <p>这是一段需要加载的内容</p>
            <p>当loading为true时，会显示加载状态</p>
          </div>
        </el-area-loading>
        <el-button @click="loading1 = !loading1" style="margin-top: 10px;">
          切换加载状态
        </el-button>
      </el-col>

      <el-col :span="8">
        <h4>自定义文本</h4>
        <el-area-loading :loading="loading2" text="加载中...">
          <div style="padding: 40px; background: #f5f7fa; text-align: center;">
            <p>带有自定义文本的加载</p>
          </div>
        </el-area-loading>
        <el-button @click="loading2 = !loading2" style="margin-top: 10px;">
          切换加载状态
        </el-button>
      </el-col>

      <el-col :span="8">
        <h4>使用 ref 方法控制</h4>
        <el-area-loading ref="areaLoading3" text="方法控制">
          <div style="padding: 30px; background: #f5f7fa; text-align: center;">
            <p>通过 ref 方法控制</p>
          </div>
        </el-area-loading>
        <div style="margin-top: 10px;">
          <el-button size="mini" @click="$refs.areaLoading3.show()">显示</el-button>
          <el-button size="mini" @click="$refs.areaLoading3.hide()">隐藏</el-button>
          <el-button size="mini" @click="$refs.areaLoading3.toggle()">切换</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="8">
        <h4>大尺寸</h4>
        <el-area-loading :loading="loading4" text="大尺寸加载" size="large">
          <div style="padding: 50px; background: #f5f7fa; text-align: center;">
            <p>大尺寸加载效果</p>
          </div>
        </el-area-loading>
        <el-button @click="loading4 = !loading4" style="margin-top: 10px;">
          切换加载状态
        </el-button>
      </el-col>

      <el-col :span="8">
        <h4>自定义背景色</h4>
        <el-area-loading 
          :loading="loading5" 
          text="自定义背景" 
          background="rgba(0, 0, 0, 0.8)">
          <div style="padding: 40px; background: #f5f7fa; text-align: center;">
            <p>深色背景的加载</p>
          </div>
        </el-area-loading>
        <el-button @click="loading5 = !loading5" style="margin-top: 10px;">
          切换加载状态
        </el-button>
      </el-col>

      <el-col :span="8">
        <h4>自定义图标</h4>
        <el-area-loading 
          :loading="loading6" 
          text="自定义图标" 
          spinner="el-icon-loading">
          <div style="padding: 40px; background: #f5f7fa; text-align: center;">
            <p>使用自定义图标</p>
          </div>
        </el-area-loading>
        <el-button @click="loading6 = !loading6" style="margin-top: 10px;">
          切换加载状态
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <h4>内容模糊效果</h4>
        <el-area-loading 
          :loading="loading7" 
          text="加载中，请稍候..." 
          :blur="true">
          <div style="padding: 40px; background: #f5f7fa;">
            <h5>文章标题</h5>
            <p>这是一段示例文本。当开启blur属性时，加载期间内容会变模糊。</p>
            <p>这提供了更好的视觉反馈效果。</p>
          </div>
        </el-area-loading>
        <el-button @click="loading7 = !loading7" style="margin-top: 10px;">
          切换加载状态
        </el-button>
      </el-col>

      <el-col :span="12">
        <h4>表格加载示例</h4>
        <el-area-loading :loading="loading8" text="正在加载表格数据...">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </el-area-loading>
        <el-button @click="loading8 = !loading8" style="margin-top: 10px;">
          切换加载状态
        </el-button>
      </el-col>
    </el-row>

    <hr style="margin: 40px 0;">

    <!-- FormItem label-position 测试 -->
    <h3>FormItem label-position 标签位置测试</h3>
    
    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>表单标签位置自定义测试</span>
      </div>
      
      <el-form :model="formLabelPosition" label-width="120px" label-position="right">
        <h4>整个表单标签位置设置为右对齐（label-position="right"）</h4>
        <p>某些表单项可以自定义标签位置，覆盖表单的默认设置</p>
        
        <el-form-item label="默认标签位置（右对齐）" prop="name">
          <el-input v-model="formLabelPosition.name" placeholder="使用表单的默认标签位置"></el-input>
        </el-form-item>
        
        <el-form-item label="左对齐标签" label-position="left" prop="region">
          <el-select v-model="formLabelPosition.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="顶部标签" label-position="top" prop="desc">
          <el-input type="textarea" v-model="formLabelPosition.desc" placeholder="标签位于顶部"></el-input>
        </el-form-item>
        
        <el-form-item label="右对齐标签（显式设置）" label-position="right" prop="type">
          <el-radio-group v-model="formLabelPosition.type">
            <el-radio label="online">线上品牌商</el-radio>
            <el-radio label="offline">线下实体店</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>表单标签位置设置为顶部（label-position="top"）</span>
      </div>
      
      <el-form :model="formLabelPosition2" label-width="120px" label-position="top" :rules="rules">
        <h4>整个表单标签位置设置为顶部，某些表单项自定义标签位置</h4>
        
        <el-form-item label="默认标签位置（顶部）" prop="name">
          <div slot="label">
            2222222
          </div>
          <el-input v-model="formLabelPosition2.name" placeholder="使用表单的默认标签位置"></el-input>
        </el-form-item>
        
        <el-form-item label="右对齐标签" label-position="right" prop="region">
          <el-select v-model="formLabelPosition2.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="左对齐标签" label-position="left" prop="desc">
          <el-input type="textarea" v-model="formLabelPosition2.desc" placeholder="标签左对齐"></el-input>
        </el-form-item>
        
        <el-form-item label="顶部标签（显式设置）" label-position="top" prop="type">
          <el-checkbox-group v-model="formLabelPosition2.type">
            <el-checkbox label="美食/餐厅线上活动"></el-checkbox>
            <el-checkbox label="地推活动"></el-checkbox>
            <el-checkbox label="线下主题活动"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-bottom: 20px;">
      <div slot="header">
        <span>嵌套表单测试</span>
      </div>
      
      <el-form :model="nestedForm" label-width="120px" label-position="right">
        <h4>外层表单（标签右对齐）</h4>
        
        <el-form-item label="用户名" prop="username">
          <el-input v-model="nestedForm.username"></el-input>
        </el-form-item>
        
        <el-form-item label="地址信息" label-position="top">
          <el-card shadow="never">
            <el-form :model="nestedForm.address" label-width="100px" label-position="left">
              <h5>内层表单（标签左对齐）</h5>
              
              <el-form-item label="省份" prop="province">
                <el-input v-model="nestedForm.address.province"></el-input>
              </el-form-item>
              
              <el-form-item label="城市" label-position="top" prop="city">
                <el-input v-model="nestedForm.address.city"></el-input>
              </el-form-item>
              
              <el-form-item label="详细地址" label-position="right" prop="detail">
                <el-input v-model="nestedForm.address.detail"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- Form Label 两端对齐测试 -->
    <h3>Form Label 两端对齐测试</h3>
    <p>当label-justify为true时，label文本会在单行情况下进行两端对齐</p>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <h4>默认对齐方式</h4>
        <el-form :model="form" ref="form" label-width="120px" size="normal">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="这是一个很长的标签文本" prop="longLabel">
            <el-input v-model="form.longLabel"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <h4>两端对齐方式</h4>
        <el-form :model="form" ref="form" label-width="120px" size="normal" :label-justify="true">
          <el-form-item label="用户名" prop="username2">
            <el-input v-model="form.username2"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password2">
            <el-input v-model="form.password2" type="password"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email2">
            <el-input v-model="form.email2"></el-input>
          </el-form-item>
          <el-form-item label="这是一个很长的标签文本" prop="longLabel2">
            <el-input v-model="form.longLabel2"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    

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

    <el-radio-group v-model="value" size="normal" @change="">
      <el-radio
        v-for="item in items"
        :key="item.key"
        :label="item.label"
      >
        {{ item.title }}
      </el-radio>
    </el-radio-group>

    <el-checkbox-group v-model="valueCheckbox" size="small" @change="">
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

    <!-- SelectableTag 示例 -->
    <h2>SelectableTag 可选择标签</h2>
    
    <h3>基础用法</h3>
    <p>多选模式，支持不同类型和效果</p>
    <el-selectable-tag-group v-model="selectableValue" :multiple="true" style="margin-bottom: 16px;">
      <el-selectable-tag label="标签一">标签一</el-selectable-tag>
      <el-selectable-tag label="标签二" type="success">标签二</el-selectable-tag>
      <el-selectable-tag label="标签三" type="warning">标签三</el-selectable-tag>
      <el-selectable-tag label="标签四" type="danger">标签四</el-selectable-tag>
      <el-selectable-tag label="标签五" type="info">标签五</el-selectable-tag>
      <el-selectable-tag label="禁用" disabled>禁用</el-selectable-tag>
    </el-selectable-tag-group>
    <div>当前选中：{{ selectableValue }}</div>

    <h3>单选模式</h3>
    <p>设置 multiple 为 false 实现单选</p>
    <el-selectable-tag-group v-model="selectableRadio" :multiple="false" style="margin-bottom: 16px;">
      <el-selectable-tag label="A">A</el-selectable-tag>
      <el-selectable-tag label="B">B</el-selectable-tag>
      <el-selectable-tag label="C">C</el-selectable-tag>
    </el-selectable-tag-group>
    <div>单选模式：{{ selectableRadio }}</div>

    <h3>不同效果</h3>
    <p>支持 light、dark、plain 三种效果</p>
    <div style="margin-bottom: 16px;">
      <h4>Light 效果（默认）</h4>
      <el-selectable-tag-group v-model="selectableLight" effect="light" :multiple="true" style="margin-bottom: 8px;">
        <el-selectable-tag label="选项1">选项1</el-selectable-tag>
        <el-selectable-tag label="选项2">选项2</el-selectable-tag>
        <el-selectable-tag label="选项3">选项3</el-selectable-tag>
      </el-selectable-tag-group>
      <div>当前选中：{{ selectableLight }}</div>
    </div>

    <div style="margin-bottom: 16px;">
      <h4>Dark 效果</h4>
      <el-selectable-tag-group v-model="selectableDark" effect="dark" :multiple="true" style="margin-bottom: 8px;">
        <el-selectable-tag label="选项1">选项1</el-selectable-tag>
        <el-selectable-tag label="选项2">选项2</el-selectable-tag>
        <el-selectable-tag label="选项3">选项3</el-selectable-tag>
      </el-selectable-tag-group>
      <div>当前选中：{{ selectableDark }}</div>
    </div>

    <div style="margin-bottom: 16px;">
      <h4>Plain 效果</h4>
      <el-selectable-tag-group v-model="selectablePlain" effect="plain" :multiple="true" style="margin-bottom: 8px;">
        <el-selectable-tag label="选项1">选项1</el-selectable-tag>
        <el-selectable-tag label="选项2">选项2</el-selectable-tag>
        <el-selectable-tag label="选项3">选项3</el-selectable-tag>
      </el-selectable-tag-group>
      <div>当前选中：{{ selectablePlain }}</div>
    </div>

    <h3>不同尺寸</h3>
    <p>支持 mini、small、medium、large 四种尺寸</p>
    <div style="margin-bottom: 16px;">
      <h4>Mini</h4>
      <el-selectable-tag-group v-model="selectableMini" size="mini" :multiple="true" style="margin-bottom: 8px;">
        <el-selectable-tag label="迷你">迷你</el-selectable-tag>
        <el-selectable-tag label="小型">小型</el-selectable-tag>
      </el-selectable-tag-group>
      <div>当前选中：{{ selectableMini }}</div>
    </div>

    <div style="margin-bottom: 16px;">
      <h4>Small</h4>
      <el-selectable-tag-group v-model="selectableSmall" size="small" :multiple="true" style="margin-bottom: 8px;">
        <el-selectable-tag label="小型">小型</el-selectable-tag>
        <el-selectable-tag label="中型">中型</el-selectable-tag>
      </el-selectable-tag-group>
      <div>当前选中：{{ selectableSmall }}</div>
    </div>

    <div style="margin-bottom: 16px;">
      <h4>Medium</h4>
      <el-selectable-tag-group v-model="selectableMedium" size="medium" :multiple="true" style="margin-bottom: 8px;">
        <el-selectable-tag label="中型">中型</el-selectable-tag>
        <el-selectable-tag label="大型">大型</el-selectable-tag>
      </el-selectable-tag-group>
      <div>当前选中：{{ selectableMedium }}</div>
    </div>

    <h3>带图标</h3>
    <p>支持自定义图标</p>
    <el-selectable-tag-group v-model="selectableIcon" :multiple="true" style="margin-bottom: 16px;">
      <el-selectable-tag label="收藏" icon="el-icon-star-off">收藏</el-selectable-tag>
      <el-selectable-tag label="点赞" icon="el-icon-thumb">点赞</el-selectable-tag>
      <el-selectable-tag label="分享" icon="el-icon-share">分享</el-selectable-tag>
    </el-selectable-tag-group>
    <div>当前选中：{{ selectableIcon }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options:[],
      show: false,
      // Radio 和 Checkbox 测试数据
      radio1: 1,
      radio2: 1,
      radio3: 1,
      radio4: 1,
      radio5: 1,
      checkList1: ['选项一'],
      checkList2: ['选项一'],
      checkList3: [],
      checkList4: [],
      checkList5: [],
      
      // Area Loading 测试数据
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loading8: false,
      
      form: {
        xxx: "",
        yyy: "",
        zzz: "",
        username: "",
        password: "",
        email: "",
        longLabel: "",
        username2: "",
        password2: "",
        email2: "",
        longLabel2: "",
      },
      // FormItem label-position 测试数据
      formLabelPosition: {
        name: '',
        region: '',
        desc: '',
        type: 'online'
      },
      formLabelPosition2: {
        name: '',
        region: '',
        desc: '',
        type: []
      },
      nestedForm: {
        username: '',
        address: {
          province: '',
          city: '',
          detail: ''
        }
      },
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
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        desc: [
          { required: true, message: "请输入活动形式", trigger: "blur" },
          { min: 5, max: 100, message: "长度在 5 到 100 个字符", trigger: "blur" },
        ],
        type: [
          { type: "array", required: true, message: "请至少选择一个活动类型", trigger: "change" },
        ],
      },
      selectableValue: ['标签一', '标签三'],
      selectableRadio: 'A',
      selectableLight: ['选项1'],
      selectableDark: [],
      selectablePlain: [],
      selectableMini: [],
      selectableSmall: [],
      selectableMedium: [],
      selectableIcon: [],
      // 城市选择器测试数据
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: [],
      value6: '',
      value7: '',
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
    onOpen() {
      // this.show = true;
      this.$msgbox({
        title: '标题',
        message: '这是一段信息',
        showClose: true,
      });
    },
  },
};
</script>

<style scoped>
.demo-block {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
}

.demo-block p {
  margin-top: 10px;
  color: #666;
}
</style>
