# Script to stop all Logistra backend microservices
Write-Host "Stopping all Logistra microservices on ports 8761, 8080, 8081, 8082, 8083, 8084..." -ForegroundColor Yellow

$ports = @(8761, 8080, 8081, 8082, 8083, 8084)

foreach ($port in $ports) {
    $processes = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($processes) {
        foreach ($pidToKill in $processes) {
            Write-Host "Killing PID $pidToKill listening on port $port..." -ForegroundColor Cyan
            Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
        }
    } else {
        Write-Host "Port $port is clear." -ForegroundColor Gray
    }
}

Write-Host "All Logistra services stopped successfully." -ForegroundColor Green
