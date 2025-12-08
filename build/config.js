var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `@liuzengwei/element-ui/lib/${key}`;
  externals[`@liuzengwei/element-ui/packages/${key}`] = `@liuzengwei/element-ui/lib/${key}`;
});

externals['element-ui/src/locale'] = '@liuzengwei/element-ui/lib/locale';
externals['@liuzengwei/element-ui/src/locale'] = '@liuzengwei/element-ui/lib/locale';

// 添加 utils 目录整体映射
externals['element-ui/src/utils'] = '@liuzengwei/element-ui/lib/utils';
externals['@liuzengwei/element-ui/src/utils'] = '@liuzengwei/element-ui/lib/utils';

utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/utils/${file}`] = `@liuzengwei/element-ui/lib/utils/${file}`;
  externals[`@liuzengwei/element-ui/src/utils/${file}`] = `@liuzengwei/element-ui/lib/utils/${file}`;
});

// 添加 mixins 目录整体映射
externals['element-ui/src/mixins'] = '@liuzengwei/element-ui/lib/mixins';
externals['@liuzengwei/element-ui/src/mixins'] = '@liuzengwei/element-ui/lib/mixins';

mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/mixins/${file}`] = `@liuzengwei/element-ui/lib/mixins/${file}`;
  externals[`@liuzengwei/element-ui/src/mixins/${file}`] = `@liuzengwei/element-ui/lib/mixins/${file}`;
});

// 添加 transitions 目录整体映射
externals['element-ui/src/transitions'] = '@liuzengwei/element-ui/lib/transitions';
externals['@liuzengwei/element-ui/src/transitions'] = '@liuzengwei/element-ui/lib/transitions';

transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/transitions/${file}`] = `@liuzengwei/element-ui/lib/transitions/${file}`;
  externals[`@liuzengwei/element-ui/src/transitions/${file}`] = `@liuzengwei/element-ui/lib/transitions/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  '@liuzengwei/element-ui': path.resolve(__dirname, '../'),
  'element-ui': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js|utils\/lodash\.js/;
