/**
 * 修复 packages 目录中的 element-ui/src 导入路径
 * 将 'element-ui/src/...' 替换为相对路径或 lib 路径
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 获取所有需要处理的 .vue 和 .js 文件
const packagesDir = path.join(__dirname, '../../packages');
const files = glob.sync('**/*.{vue,js}', { 
  cwd: packagesDir,
  absolute: true 
});

let totalReplacements = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  const originalContent = content;
  
  // 替换 element-ui/src 为 ../../lib (相对于 packages 目录)
  // 或者替换为 @liuzengwei/element-ui/lib
  content = content.replace(
    /from\s+['"]element-ui\/src\/(.*?)['"]/g, 
    "from '../../lib/$1'"
  );
  
  // 替换 import { } from 'element-ui/src/...'
  content = content.replace(
    /import\s+(.+?)\s+from\s+['"]element-ui\/src\/(.*?)['"]/g,
    "import $1 from '../../lib/$2'"
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    totalReplacements++;
    console.log(`✓ Fixed: ${path.relative(packagesDir, file)}`);
  }
});

console.log(`\n✓ Total files fixed: ${totalReplacements}`);
