@echo off
cd /d %~dp0

if "%OPENAI_API_KEY%"=="" (
  echo OPENAI_API_KEY is not set.
  echo Example:
  echo   set OPENAI_API_KEY=your_key_here
  echo   start-ai-server.bat
  pause
  exit /b 1
)

python ai_server.py
