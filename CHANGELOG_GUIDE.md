# CHANGELOG 维护指南

## 📋 概述

本文档介绍 Element UI 项目中 CHANGELOG（更新日志）的维护方法和最佳实践。

---

## 🎯 推荐方案

本项目采用 **半自动化方案**，结合手动编写和脚本工具，确保 CHANGELOG 的质量和多语言同步。

### 方案特点

✅ **交互式工具** - 提供友好的命令行交互界面  
✅ **多语言同步** - 自动更新 4 个语言版本的 CHANGELOG  
✅ **格式统一** - 确保所有文件格式一致  
✅ **版本自动识别** - 从 package.json 读取当前版本号

---

## 📁 文件结构

项目包含 4 个 CHANGELOG 文件，需同步维护：

```
xn-element/
├── CHANGELOG.zh-CN.md    # 中文更新日志
├── CHANGELOG.en-US.md    # 英文更新日志
├── CHANGELOG.es.md       # 西班牙语更新日志
├── CHANGELOG.fr-FR.md    # 法语更新日志
└── build/
    └── bin/
        └── add-changelog.js  # CHANGELOG 更新工具
```

---

## 🛠️ 使用工具

### 方式一：使用交互式工具（推荐）

```bash
# 运行 CHANGELOG 更新工具
npm run changelog

# 或直接运行脚本
node build/bin/add-changelog.js
```

#### 交互流程

1. **显示当前版本信息**
   ```
   📦 当前版本: 2.15.5-xn.58
   📅 发布日期: 2026-01-22
   ```

2. **输入新增功能**
   ```
   【新增功能】
     - Amount 金额显示
       - 新增金额显示组件
       - 支持货币符号配置（默认 ¥）
     - （输入空行结束）
   ```

3. **输入优化改进**
   ```
   【优化改进】
     - Table 表格
       - 优化大数据渲染性能
     - （输入空行结束）
   ```

4. **输入 Bug 修复**
   ```
   【Bug 修复】
     - Input 输入框
       - 修复 clearable 图标显示问题
     - （输入空行结束）
   ```

5. **确认并更新**
   ```
   确认更新所有 CHANGELOG 文件？(y/n): y
   
   ✅ 已更新 CHANGELOG.zh-CN.md
   ✅ 已更新 CHANGELOG.en-US.md
   ✅ 已更新 CHANGELOG.es.md
   ✅ 已更新 CHANGELOG.fr-FR.md
   ```

---

### 方式二：手动编辑

如果需要更精细的控制，可以手动编辑 CHANGELOG 文件。

#### 标准格式模板

```markdown
## 更新日志

### 2.15.5-xn.58

*2026-01-22*

#### 新增
- 组件名
  - 功能描述 1
  - 功能描述 2

#### 优化
- 组件名
  - 优化描述

#### Bug 修复
- 组件名
  - 修复描述 (#PR编号 by @作者)

#### 破坏性变更
- 组件名
  - 变更描述

### 2.15.5-xn.57
...（之前的版本）
```

---

## 📝 编写规范

### 1. 版本号格式

- **定制版本**：`2.15.5-xn.XX`（项目内部版本）
- **官方版本**：`2.15.14`（合并自 Element UI 官方）

### 2. 日期格式

统一使用 ISO 格式：`*YYYY-MM-DD*`

示例：`*2026-01-22*`

### 3. 分类说明

| 分类 | 中文 | 英文 | 西班牙语 | 法语 | 使用场景 |
|------|------|------|---------|------|---------|
| **新增** | 新增 | New Features | Nuevas características | Nouvelles fonctionnalités | 新组件、新功能 |
| **优化** | 优化 | Optimization | Optimización | Optimisation | 性能改进、体验优化 |
| **Bug 修复** | Bug 修复 | Bug Fixes | Corrección de errores | Corrections de bugs | 问题修复 |
| **破坏性变更** | 破坏性变更 | Breaking Changes | Cambios importantes | Changements importants | API 变更 |

### 4. 描述要点

✅ **好的描述**：
- 简洁明了，一句话说清楚
- 从用户角度描述价值
- 突出核心功能

```markdown
- Amount 金额显示
  - 新增金额显示组件
  - 支持万元/亿元自动换算
  - 支持正负值颜色区分
```

❌ **不好的描述**：
```markdown
- 添加了一个新的组件用于显示金额
- 修改了一些代码
- 更新了文档
```

---

## 🌍 多语言翻译指南

### 自动翻译建议

工具会自动更新所有语言版本，但**英文、西班牙语、法语**需要人工校对翻译质量。

### 推荐翻译工具

1. **DeepL** - https://www.deepl.com/translator（质量最高）
2. **Google Translate** - https://translate.google.com/
3. **ChatGPT** - 提供上下文翻译

### 翻译示例

**中文**：
```markdown
- Amount 金额显示
  - 新增金额显示组件
  - 支持货币符号配置（默认 ¥）
```

**英文**：
```markdown
- Amount
  - Add Amount component for displaying monetary values
  - Support currency symbol configuration (default ¥)
```

**西班牙语**：
```markdown
- Amount
  - Añadir componente Amount para mostrar valores monetarios
  - Admite configuración de símbolo de moneda (predeterminado ¥)
```

**法语**：
```markdown
- Amount
  - Ajouter le composant Amount pour afficher les valeurs monétaires
  - Prend en charge la configuration du symbole monétaire (par défaut ¥)
```

---

## 🔄 完整工作流程

### 发布新版本的标准流程

```bash
# 1. 开发新功能
git checkout -b feature/amount-component
# ... 开发代码 ...

# 2. 提交代码（使用规范的提交信息）
git add .
git commit -m "feat(Amount): 新增金额显示组件"

# 3. 更新 CHANGELOG
npm run changelog
# 按提示输入更新内容

# 4. 升级版本号（如需要）
# 手动修改 package.json 中的 version
# 或使用: npm version patch/minor/major

# 5. 重新生成入口文件
npm run build:file

# 6. 提交 CHANGELOG 和版本更新
git add CHANGELOG*.md package.json
git commit -m "chore: release v2.15.5-xn.58"

# 7. 打标签
git tag v2.15.5-xn.58

# 8. 推送到远程
git push origin dev
git push origin v2.15.5-xn.58
```

---

## 📊 示例参考

### 完整示例：Amount 组件发布

**中文版本**：
```markdown
### 2.15.5-xn.58

*2026-01-22*

#### 新增
- Amount 金额显示
  - 新增金额显示组件
  - 支持货币符号配置（默认 ¥）
  - 支持万元/亿元自动换算
  - 支持千分位分隔符
  - 支持正负值颜色区分
  - 支持前缀、后缀、货币符号、主体、单位等细粒度样式定制
  - 缺省状态默认显示 ¥-
  - 支持数字滚动动画
```

**英文版本**：
```markdown
### 2.15.5-xn.58

*2026-01-22*

#### New Features
- Amount
  - Add Amount component for displaying monetary values
  - Support currency symbol configuration (default ¥)
  - Support automatic conversion to wan/yi units (10,000/100,000,000)
  - Support thousand separators
  - Support color differentiation for positive/negative values
  - Support fine-grained style customization for prefix/suffix/currency/value/unit
  - Default placeholder shows ¥-
  - Support number scrolling animation
```

---

## ⚙️ 工具配置

### package.json 脚本

在 `package.json` 中添加快捷命令：

```json
{
  "scripts": {
    "changelog": "node build/bin/add-changelog.js"
  }
}
```

### 自定义工具

如需修改工具行为，编辑 `build/bin/add-changelog.js`：

- **修改分类**：编辑 `CHANGELOG_FILES` 配置
- **修改格式**：编辑 `updateChangelog` 函数
- **添加验证**：在 `main` 函数中添加逻辑

---

## 🎓 最佳实践

### ✅ 推荐做法

1. **及时更新** - 每次发布前更新 CHANGELOG
2. **详细描述** - 提供足够的上下文信息
3. **用户视角** - 从用户角度描述功能价值
4. **版本关联** - 在导航配置中添加版本徽章
5. **定期归档** - 保持文件可读性，必要时归档旧版本

### ❌ 避免做法

1. **遗漏翻译** - 确保所有语言版本都已更新
2. **格式不统一** - 严格遵守模板格式
3. **信息不完整** - 缺少日期、版本号或分类
4. **过于技术化** - 使用用户易懂的语言
5. **一次性大更新** - 应该持续维护，而非积累后一次性更新

---

## 🔧 故障排查

### 常见问题

**Q: 工具提示 "文件不存在"？**  
A: 确保在项目根目录运行命令，检查 CHANGELOG 文件是否存在。

**Q: 如何修改已发布的 CHANGELOG？**  
A: 直接编辑对应的 CHANGELOG 文件，提交修改即可。

**Q: 是否需要为每个 commit 更新 CHANGELOG？**  
A: 不需要。通常在准备发布新版本时集中更新。

**Q: 多语言版本内容不一致怎么办？**  
A: 以中文版本为准，使用翻译工具校对其他语言版本。

---

## 📚 相关文档

- [组件开发流程](./SEGMENTED_COMPONENT.md)
- [版本徽章使用指南](./VERSION_BADGE_GUIDE.md)
- [发布指南](./PUBLISH.md)

---

## 💡 提示

- 使用 `npm run changelog` 可以快速生成符合规范的 CHANGELOG
- 建议在 PR 中包含 CHANGELOG 更新
- 重要的破坏性变更需要在文档中额外说明
- 定期检查翻译质量，确保多语言版本准确

---

**维护者**：Element UI 开发团队  
**最后更新**：2026-01-22
