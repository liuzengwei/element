# 快速链接脚本 - 用于本地开发
# 使用方法: .\dev-link.ps1

Write-Host "`n🔗 Setting up npm link for local development...`n" -ForegroundColor Cyan

# 步骤 1: 在组件库创建链接
Write-Host "Step 1: Creating global link in component library..." -ForegroundColor Yellow
Set-Location "E:\work\xn-element"
npm link

# 步骤 2: 在测试项目链接到组件库
Write-Host "`nStep 2: Linking test project to component library..." -ForegroundColor Yellow
Set-Location "E:\work\xn-element\vue-test-project"
npm link "@liuzengwei/element-ui"

Write-Host "`n✓ Link setup complete!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run 'npm run dev:watch' in component library (E:\work\xn-element)" -ForegroundColor Gray
Write-Host "  2. Run 'npm run dev' in test project (E:\work\xn-element\vue-test-project)" -ForegroundColor Gray
Write-Host "  3. Edit component library code - changes will auto-rebuild!" -ForegroundColor Gray
Write-Host "`nOr simply run: .\quick-dev.ps1" -ForegroundColor Yellow
