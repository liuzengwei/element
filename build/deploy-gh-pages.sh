#!/bin/bash

# 构建文档站点
echo "Building documentation site..."
npm run build:file
NODE_ENV=production webpack --config build/webpack.demo.js

# 进入构建输出目录
cd examples/element-ui

# 初始化 git 仓库（如果还没有）
if [ ! -d ".git" ]; then
  git init
  git checkout -b gh-pages
fi

# 添加所有文件
git add -A

# 提交
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 GitHub Pages
echo "Deploying to GitHub Pages..."
git push -f https://github.com/liuzengwei/element.git gh-pages

echo "Deployment completed!"
echo "Your site will be available at: https://liuzengwei.github.io/element/"

cd ../..
