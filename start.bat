@echo off
REM Basketball Stats Tracker - Iniciador para Windows
REM Este script instala dependencias e inicia la aplicación

echo.
echo ===================================
echo  Basketball Stats Tracker 🏀
echo ===================================
echo.

REM Verificar si node está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no está instalado. Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js encontrado

REM Verificar si npm está instalado
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm no está instalado.
    pause
    exit /b 1
)

echo [✓] npm encontrado
echo.

REM Verificar si node_modules existe
if not exist node_modules (
    echo [*] Instalando dependencias...
    call npm install
    echo [✓] Dependencias instaladas
    echo.
) else (
    echo [✓] Dependencias ya instaladas
)

echo [*] Iniciando servidor de desarrollo...
echo [*] La aplicación se abrirá en http://localhost:3000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

call npm run dev
pause
