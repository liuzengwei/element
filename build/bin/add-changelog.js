#!/usr/bin/env node

/**
 * 多语言 CHANGELOG 更新工具
 * 用于在所有 CHANGELOG 文件中添加新版本的更新记录
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// CHANGELOG 文件配置
const CHANGELOG_FILES = {
  'zh-CN': {
    file: 'CHANGELOG.zh-CN.md',
    header: '## 更新日志',
    categories: {
      new: '#### 新增',
      feature: '#### 优化',
      fix: '#### Bug 修复',
      breaking: '#### 破坏性变更'
    }
  },
  'en-US': {
    file: 'CHANGELOG.en-US.md',
    header: '## Changelog',
    categories: {
      new: '#### New Features',
      feature: '#### Optimization',
      fix: '#### Bug Fixes',
      breaking: '#### Breaking Changes'
    }
  },
  'es': {
    file: 'CHANGELOG.es.md',
    header: '## Registro de cambios',
    categories: {
      new: '#### Nuevas características',
      feature: '#### Optimización',
      fix: '#### Corrección de errores',
      breaking: '#### Cambios importantes'
    }
  },
  'fr-FR': {
    file: 'CHANGELOG.fr-FR.md',
    header: '## Journal des modifications',
    categories: {
      new: '#### Nouvelles fonctionnalités',
      feature: '#### Optimisation',
      fix: '#### Corrections de bugs',
      breaking: '#### Changements importants'
    }
  }
};

// 获取当前版本号和日期
function getVersionInfo() {
  const pkg = require('../../package.json');
  const version = pkg.version;
  const date = new Date().toISOString().split('T')[0];
  return { version, date };
}

// 创建交互式输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// 更新单个 CHANGELOG 文件
function updateChangelog(lang, config, versionInfo, entries) {
  const filePath = path.resolve(__dirname, '../../', config.file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${config.file} 不存在，跳过...`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 构建新版本内容
  let newVersionContent = `\n### ${versionInfo.version}\n\n*${versionInfo.date}*\n`;
  
  // 按类别添加条目
  ['new', 'feature', 'fix', 'breaking'].forEach(category => {
    if (entries[category] && entries[category].length > 0) {
      newVersionContent += `\n${config.categories[category]}\n`;
      entries[category].forEach(entry => {
        newVersionContent += `${entry}\n`;
      });
    }
  });
  
  // 在 header 后插入新版本
  content = content.replace(
    config.header,
    `${config.header}${newVersionContent}`
  );
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 已更新 ${config.file}`);
}

// 主函数
async function main() {
  console.log('\n📝 Element UI CHANGELOG 更新工具\n');
  console.log('━'.repeat(50));
  
  const versionInfo = getVersionInfo();
  console.log(`📦 当前版本: ${versionInfo.version}`);
  console.log(`📅 发布日期: ${versionInfo.date}\n`);
  
  // 收集中文条目（作为主要语言）
  const entries = {
    new: [],
    feature: [],
    fix: [],
    breaking: []
  };
  
  console.log('请输入更新内容（输入空行结束当前类别）\n');
  
  // 新增功能
  console.log('【新增功能】');
  let input;
  while (true) {
    input = await question('  - ');
    if (!input.trim()) break;
    entries.new.push(`- ${input.trim()}`);
  }
  
  // 优化改进
  console.log('\n【优化改进】');
  while (true) {
    input = await question('  - ');
    if (!input.trim()) break;
    entries.feature.push(`- ${input.trim()}`);
  }
  
  // Bug 修复
  console.log('\n【Bug 修复】');
  while (true) {
    input = await question('  - ');
    if (!input.trim()) break;
    entries.fix.push(`- ${input.trim()}`);
  }
  
  // 破坏性变更
  console.log('\n【破坏性变更】（通常为空，直接回车跳过）');
  while (true) {
    input = await question('  - ');
    if (!input.trim()) break;
    entries.breaking.push(`- ${input.trim()}`);
  }
  
  console.log('\n━'.repeat(50));
  console.log('\n📋 预览更新内容:\n');
  
  // 预览中文版本
  console.log(`### ${versionInfo.version}\n`);
  console.log(`*${versionInfo.date}*\n`);
  if (entries.new.length) {
    console.log('#### 新增');
    entries.new.forEach(e => console.log(e));
  }
  if (entries.feature.length) {
    console.log('\n#### 优化');
    entries.feature.forEach(e => console.log(e));
  }
  if (entries.fix.length) {
    console.log('\n#### Bug 修复');
    entries.fix.forEach(e => console.log(e));
  }
  if (entries.breaking.length) {
    console.log('\n#### 破坏性变更');
    entries.breaking.forEach(e => console.log(e));
  }
  
  console.log('\n━'.repeat(50));
  const confirm = await question('\n确认更新所有 CHANGELOG 文件？(y/n): ');
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 已取消');
    rl.close();
    return;
  }
  
  console.log('\n开始更新...\n');
  
  // 更新所有语言的 CHANGELOG
  Object.keys(CHANGELOG_FILES).forEach(lang => {
    updateChangelog(lang, CHANGELOG_FILES[lang], versionInfo, entries);
  });
  
  console.log('\n✨ 所有 CHANGELOG 文件更新完成！\n');
  console.log('💡 提示: 请检查并翻译英文、西班牙语、法语版本的内容\n');
  
  rl.close();
}

// 运行
main().catch(err => {
  console.error('❌ 错误:', err);
  rl.close();
  process.exit(1);
});
