# Element UI 新增组件开发流程规范

## 概述

本文档规范了在 Element UI 中新增组件的完整开发流程，确保新组件符合项目的架构设计、编码规范和质量标准。

## 开发流程

### 1. 组件规划阶段

#### 1.1 需求分析
- 确定组件的核心功能和使用场景
- 分析是否与现有组件重复或冲突
- 评估组件的通用性和扩展性

#### 1.2 API 设计
- 设计组件的 Props、Events、Slots
- 制定组件的命名规范（遵循 Element UI 命名约定）
- 确定组件的尺寸规格（large、default、small）
- 设计组件的状态管理（正常、禁用、加载等）

### 2. 组件创建阶段

#### 2.1 使用脚手架生成基础文件

```bash
# 使用内置脚手架创建组件
node build/bin/new.js <component-name> [中文名]

# 例如：创建分段控制器组件
node build/bin/new.js segmented 分段控制器
```

自动生成的文件包括：
- `packages/<component-name>/index.js` - 组件入口
- `packages/<component-name>/src/main.vue` - 组件实现
- `packages/theme-chalk/src/<component-name>.scss` - 样式文件
- `examples/docs/zh-CN/<component-name>.md` - 中文文档
- `examples/docs/en-US/<component-name>.md` - 英文文档
- `examples/docs/es/<component-name>.md` - 西班牙文档
- `examples/docs/fr-FR/<component-name>.md` - 法文文档
- `test/unit/specs/<component-name>.spec.js` - 单元测试
- `types/<component-name>.d.ts` - TypeScript 类型定义

### 3. 组件开发阶段

#### 3.1 组件实现 (`packages/<component-name>/src/main.vue`)

**必须包含的基础结构：**
```vue
<template>
  <div :class="componentClasses">
    <!-- 组件内容 -->
  </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'El<ComponentName>',
  
  componentName: 'El<ComponentName>',
  
  mixins: [emitter],
  
  inject: {
    elForm: { default: '' },
    elFormItem: { default: '' }
  },
  
  props: {
    // 组件属性定义
  },
  
  computed: {
    // 计算属性
  },
  
  methods: {
    // 组件方法
  }
};
</script>
```

**编码要求：**
- 组件名必须以 `El` 为前缀，使用 PascalCase
- 必须设置 `componentName` 属性（用于事件通信）
- 支持表单集成（inject elForm 和 elFormItem）
- 使用 emitter mixin 进行组件通信
- 支持尺寸配置（small、default、large）
- 支持禁用状态
- 遵循无障碍标准（ARIA 属性）

#### 3.2 样式开发 (`packages/theme-chalk/src/<component-name>.scss`)

**样式规范：**
```scss
@charset "UTF-8";
@import "common/var";
@import "mixins/mixins";
@import "mixins/utils";

@include b(<component-name>) {
  // 基础样式
  
  @include when(disabled) {
    // 禁用状态样式
  }
  
  @include m(large) {
    // 大尺寸样式
  }
  
  @include m(small) {
    // 小尺寸样式
  }
  
  @include e(element) {
    // 子元素样式
  }
}
```

**要求：**
- 使用 BEM 命名规范
- 使用项目定义的 SCSS 变量和 mixins
- 支持主题定制
- 适配不同尺寸
- 提供适当的过渡动画

#### 3.3 TypeScript 类型定义 (`types/<component-name>.d.ts`)

```typescript
import { ElementUIComponent, ElementUIComponentSize } from './component'

export interface ComponentProps {
  // 属性类型定义
}

export declare class El<ComponentName> extends ElementUIComponent {
  // 属性和方法定义
}
```

### 4. 文档编写阶段

#### 4.1 中文文档 (`examples/docs/zh-CN/<component-name>.md`)

**文档结构：**
```markdown
## ComponentName 组件中文名

组件描述

### 基础用法
基本使用示例

### 高级用法
进阶功能示例

### API
#### 属性
#### 事件
#### 插槽
```

**要求：**
- 提供完整的使用示例
- 所有 API 必须有详细说明
- 示例代码可以直接运行
- 包含各种使用场景

#### 4.2 国际化文档

根据中文文档翻译为对应语言版本。

### 5. 测试阶段

#### 5.1 单元测试 (`test/unit/specs/<component-name>.spec.js`)

**测试内容：**
- 组件渲染测试
- 属性传递测试
- 事件触发测试
- 用户交互测试
- 边界情况测试

```javascript
import { createTest, createVue, destroyVM } from '../util';
import <ComponentName> from 'packages/<component-name>';

describe('<ComponentName>', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(<ComponentName>);
    expect(vm.$el).to.exist;
  });
  
  // 更多测试用例
});
```

### 6. 集成和构建阶段

#### 6.1 更新配置文件

以下文件会被脚手架自动更新：
- `components.json` - 组件注册表
- `nav.config.json` - 导航配置
- `types/element-ui.d.ts` - 全局类型定义
- `packages/theme-chalk/src/index.scss` - 样式入口

#### 6.2 重新构建

```bash
# 重新生成入口文件
npm run build:file

# 构建样式
npm run build:theme

# 运行测试
npm run test

# 构建文档
npm run deploy:build
```

### 7. 质量检查阶段

#### 7.1 代码检查
- ESLint 检查通过
- 样式规范检查
- TypeScript 类型检查

#### 7.2 功能测试
- 基本功能测试
- 边界情况测试
- 兼容性测试
- 无障碍测试

#### 7.3 文档检查
- 文档完整性检查
- 示例代码测试
- API 文档准确性

### 8. 版本管理

#### 8.1 版本号规范
- 新增组件：升级 minor 版本号
- 组件更新：升级 patch 版本号
- 破坏性变更：升级 major 版本号

#### 8.2 更新 CHANGELOG
在相应的 CHANGELOG 文件中记录新增组件信息。

## 开发规范

### 命名规范
- 组件名：El + PascalCase（如：ElSegmented）
- 文件名：kebab-case（如：segmented.vue）
- 样式类：el- + kebab-case（如：.el-segmented）

### 属性设计规范
- 使用 camelCase 命名
- Boolean 属性默认值为 false
- 提供合理的默认值
- 支持 v-model（如适用）

### 事件设计规范
- 使用 kebab-case 命名
- 遵循 Vue 事件命名约定
- 提供必要的事件参数

### 样式设计规范
- 使用 BEM 命名方法
- 支持主题定制
- 提供响应式支持
- 适配不同尺寸

## 最佳实践

1. **复用性**：设计时考虑组件的通用性和可扩展性
2. **性能**：避免不必要的重渲染和计算
3. **无障碍**：遵循 WCAG 无障碍标准
4. **国际化**：支持多语言
5. **测试覆盖**：确保足够的测试覆盖率
6. **文档完整**：提供完整清晰的文档

## 工具支持

- **组件生成器**：`build/bin/new.js`
- **样式构建**：Gulp + Sass
- **文档系统**：VuePress
- **测试框架**：Karma + Mocha
- **类型检查**：TypeScript

这套流程确保了新增组件的质量和一致性，维护了整个组件库的稳定性和可维护性。