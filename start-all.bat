@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0;C:\Users\MAHANTH\Downloads\artforge\backend\apache-maven-3.9.6\bin;C:\Program Files\Java\jdk-21\bin;%PATH%"

echo ============================================================
echo LOGISTRA - STARTING ALL MICROSERVICES
echo ============================================================

echo [1/6] Starting Eureka Service Registry (Port 8761)...
start "Eureka-8761" cmd /k "cd /d \"%~dp0service-registry\" && mvn spring-boot:run"

echo Waiting 12 seconds for Eureka to initialize...
timeout /t 12 /nobreak >nul

echo [2/6] Starting Spring Cloud API Gateway (Port 8080)...
start "Gateway-8080" cmd /k "cd /d \"%~dp0api-gateway\" && mvn spring-boot:run"

echo [3/6] Starting Auth Service (Port 8081)...
start "Auth-8081" cmd /k "cd /d \"%~dp0auth-service\" && mvn spring-boot:run"

echo [4/6] Starting Product Service (Port 8082)...
start "Product-8082" cmd /k "cd /d \"%~dp0product-service\" && mvn spring-boot:run"

echo [5/6] Starting Inventory Service (Port 8083)...
start "Inventory-8083" cmd /k "cd /d \"%~dp0inventory-service\" && mvn spring-boot:run"

echo [6/6] Starting Order Service (Port 8084)...
start "Order-8084" cmd /k "cd /d \"%~dp0order-service\" && mvn spring-boot:run"

echo.
echo ============================================================
echo All Spring Boot Microservices launched in dedicated windows!
echo - API Gateway:      http://localhost:8080
echo - Eureka Registry:  http://localhost:8761
echo - Postman Collection: postman/Logistra_SOA_Project.postman_collection.json
echo - Postman Env:        postman/Logistra_Environment.postman_environment.json
echo ============================================================
pause
