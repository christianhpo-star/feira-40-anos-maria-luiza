@echo off
setlocal
cd /d "%~dp0"

echo.
echo ===============================================
echo  Feira 40 Anos - Passaporte Digital
echo ===============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERRO: Node.js nao foi encontrado neste computador.
  echo Instale o Node.js 22 LTS e execute este arquivo novamente.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERRO: npm nao foi encontrado neste computador.
  echo Reinstale o Node.js 22 LTS e execute este arquivo novamente.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Primeira execucao: instalando dependencias...
  echo Isso pode levar alguns minutos.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo ERRO: nao foi possivel instalar as dependencias.
    echo Verifique sua conexao com a internet e tente novamente.
    pause
    exit /b 1
  )
)

echo.
echo Iniciando o aplicativo em http://localhost:5173
start "" "http://localhost:5173"
call npm run dev -- --host 127.0.0.1

endlocal
