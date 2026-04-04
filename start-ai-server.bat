@echo off
cd /d %~dp0

if "%OPENROUTER_API_KEY%"=="" (
  echo OPENROUTER_API_KEY is not set.
  echo Example:
  echo   set OPENROUTER_API_KEY=your_key_here
  echo   start-ai-server.bat
  pause
  exit /b 1
)

python ai_server.py
