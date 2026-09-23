# LOGISTRA — Multi-Warehouse Inventory Control & Stock Reconciliation System
Write-Host "============================================================" -ForegroundColor Yellow
Write-Host "LOGISTRA — ONE INVENTORY. EVERY LOCATION." -ForegroundColor Yellow
Write-Host "Starting All Backend Microservices and React Frontend..." -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Yellow

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Start Service Registry (Eureka: 8761)
Write-Host "[1/6] Starting Eureka Service Registry (Port 8761)..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$root/service-registry'; mvn spring-boot:run"

Start-Sleep -Seconds 8

# 2. Start API Gateway (Port 8080)
Write-Host "[2/6] Starting Spring Cloud API Gateway (Port 8080)..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$root/api-gateway'; mvn spring-boot:run"

# 3. Start Auth Service (Port 8081)
Write-Host "[3/6] Starting Auth Service RS256 JWT (Port 8081)..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$root/auth-service'; mvn spring-boot:run"

# 4. Start Product Service (Port 8082)
Write-Host "[4/6] Starting Product Service (Port 8082)..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$root/product-service'; mvn spring-boot:run"

# 5. Start Inventory Service (Port 8083)
Write-Host "[5/6] Starting Inventory Service (Port 8083)..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$root/inventory-service'; mvn spring-boot:run"

# 6. Start Order Service (Port 8084)
Write-Host "[6/6] Starting Order Service with SAGA (Port 8084)..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$root/order-service'; mvn spring-boot:run"

# 7. Start React Frontend (Port 5173)
Write-Host "Starting React Frontend on Vite (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$root/frontend'; npm run dev"

Write-Host "`nAll services initiated successfully!" -ForegroundColor Cyan
Write-Host "Frontend Portal: http://localhost:5173" -ForegroundColor Yellow
Write-Host "API Gateway:     http://localhost:8080" -ForegroundColor Yellow
Write-Host "Eureka Registry: http://localhost:8761" -ForegroundColor Yellow
