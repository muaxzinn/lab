# ==============================================================================
# Interactive Learning Platform - PowerShell Docker Launcher for Windows
# Run with: powershell -ExecutionPolicy Bypass -File .\run.ps1
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Interactive Learning Platform (Windows Launcher) " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Docker CLI
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Docker CLI is not installed on this system." -ForegroundColor Red
    Write-Host "Please download and install Docker Desktop for Windows:" -ForegroundColor Yellow
    Write-Host "https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# 2. Check Docker Daemon
Write-Host "[*] Checking Docker Desktop status..." -ForegroundColor Gray
$dockerInfo = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Docker Desktop is not running." -ForegroundColor Red
    Write-Host "Please start Docker Desktop from your Start menu, wait until it says 'Engine running', and re-run this script." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Docker Desktop is ready." -ForegroundColor Green
Write-Host "[*] Building and starting container on port 3000..." -ForegroundColor Cyan

# 3. Launch via compose or build
docker compose up --build -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "[*] Trying fallback docker build..." -ForegroundColor Yellow
    docker build -t interactive-lab .
    docker stop interactive-lab 2>$null
    docker rm interactive-lab 2>$null
    docker run -d -p 3000:3000 --name interactive-lab --restart unless-stopped interactive-lab
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===================================================" -ForegroundColor Green
    Write-Host "  [SUCCESS] Application started successfully!" -ForegroundColor Green
    Write-Host "  URL: http://localhost:3000" -ForegroundColor Green
    Write-Host "===================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Opening default browser..." -ForegroundColor Gray
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000"
    Write-Host "To stop the server anytime, run: docker compose down" -ForegroundColor Gray
} else {
    Write-Host "[ERROR] Failed to start container. Check output above." -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"
