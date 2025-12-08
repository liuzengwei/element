// vue.config.js - 放在项目根目录（与 package.json 同级）
const path = require('path');

module.exports = {
  // 配置 Webpack alias
  chainWebpack: config => {
    config.resolve.alias
      .set('element-ui/src', path.resolve(__dirname, 'node_modules/@liuzengwei/element-ui/lib'));
  },
  
  // 可选：关闭 ESLint（如果报 lint 错误）
  lintOnSave: false,
  
  // 可选：开发服务器配置
  devServer: {
    port: 8080,
    open: true
  }
};
