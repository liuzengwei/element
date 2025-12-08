# Element UI 本地开发快速启动脚本
# 使用方法: .\quick-dev.ps1

Write-Host "🚀 Starting Element UI development environment..." -ForegroundColor Cyan

# 检查是否已经 link
$linkExists = Test-Path "E:\work\xn-element\vue-test-project\node_modules\@liuzengwei\element-ui" -PathType Container
if ($linkExists) {
    $target = (Get-Item "E:\work\xn-element\vue-test-project\node_modules\@liuzengwei\element-ui").Target
    if ($target) {
        Write-Host "✓ Already linked to: $target" -ForegroundColor Green
    }
}

# 启动两个终端窗口
Write-Host "`n📦 Opening terminals..." -ForegroundColor Yellow

# 终端 1: 组件库 watch 模式
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd E:\work\xn-element; Write-Host '📦 Component Library - Watch Mode' -ForegroundColor Cyan; npm run dev:watch"

# 等待 2 秒
Start-Sleep -Seconds 2

# 终端 2: 测试项目 dev server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd E:\work\xn-element\vue-test-project; Write-Host '🌐 Test Project - Dev Server' -ForegroundColor Green; npm run dev"

Write-Host "`n✓ Development environment started!" -ForegroundColor Green
Write-Host "  - Component library watching for changes..." -ForegroundColor Gray
Write-Host "  - Test project running at http://localhost:8081" -ForegroundColor Gray
Write-Host "`nPress any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
