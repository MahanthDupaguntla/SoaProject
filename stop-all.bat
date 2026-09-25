@echo off
setlocal
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0;%PATH%"
echo ============================================================
echo Stopping all Logistra microservices on ports 8761, 8080-8084
echo ============================================================

for %%p in (8761 8080 8081 8082 8083 8084) do (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr /r /c:":%%p .*LISTENING"') do (
        if not "%%a"=="0" if not "%%a"=="4" (
            echo Terminating process on port %%p with PID %%a...
            taskkill /f /pid %%a >nul 2>&1
        )
    )
)

echo Port check complete.
