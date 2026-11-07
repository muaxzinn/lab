@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ===================================================
echo   Interactive Learning Platform (Docker Launcher)
echo   Optimized for Windows 10/11 & Docker Desktop
echo ===================================================
echo.

:: 1. Check if Docker CLI is installed
where docker >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Docker CLI not found!
    echo Please install Docker Desktop for Windows:
    echo https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)

:: 2. Check if Docker Engine / Desktop daemon is running
echo [*] Checking Docker daemon status...
docker info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Docker Desktop is installed but not running!
    echo Please launch Docker Desktop from your Start menu and wait
    echo for the engine to initialize, then run this file again.
    echo.
    pause
    exit /b 1
)

echo [OK] Docker daemon is running.
echo.
echo [*] Building and starting the container (Port 3000)...
echo.

:: 3. Try docker compose, then legacy docker-compose, then direct docker run
docker compose version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    docker compose up --build -d
) else (
    where docker-compose >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        docker-compose up --build -d
    ) else (
        echo [*] Falling back to standard docker build and run...
        docker build -t interactive-lab .
        docker stop interactive-lab >nul 2>&1
        docker rm interactive-lab >nul 2>&1
        docker run -d -p 3000:3000 --name interactive-lab --restart unless-stopped interactive-lab
    )
)

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Build or launch failed. Please check the logs above.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo   [SUCCESS] Platform is running!
echo   Local Web Address: http://localhost:3000
echo ===================================================
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo To stop the container later, run:
echo   docker compose down
echo.
pause
