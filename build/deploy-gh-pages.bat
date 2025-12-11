@echo off
echo Building documentation site...
call npm run build:file
call cross-env NODE_ENV=production webpack --config build/webpack.demo.js

cd examples\element-ui

if not exist .git (
    git init
    git checkout -b gh-pages
)

git add -A
git commit -m "Deploy to GitHub Pages - %date% %time%"

echo Deploying to GitHub Pages...
git push -f git@github.com:liuzengwei/element.git gh-pages

echo Deployment completed!
echo Your site will be available at: https://liuzengwei.github.io/element/

cd ..\..
