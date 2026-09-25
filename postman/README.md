# Logistra SOA Postman Collection & Guide

This directory contains the ready-to-import Postman collection and environment for testing all microservices through the Spring Cloud API Gateway.

## Files
- `Logistra_SOA_Project.postman_collection.json`: Complete endpoint collection covering Auth, Products, Inventory, Warehouses, Stock Movements, Stock Transfers, Reconciliations, and Orders.
- `Logistra_Environment.postman_environment.json`: Postman environment with `baseUrl` (`http://localhost:8080`) and auto-injected `bearer_token`.

## Microservices Architecture & Ports
| Service | Port | Description |
|---|---|---|
| **Service Registry (Eureka)** | `8761` | Eureka discovery dashboard: `http://localhost:8761` |
| **API Gateway** | `8080` | Unified entry point for all frontend/Postman requests |
| **Auth Service** | `8081` | JWT authentication, RBAC, users & permissions |
| **Product Service** | `8082` | Product catalog, SKUs, reorder thresholds |
| **Inventory Service** | `8083` | Warehouses, multi-location stock, transfers, reconciliations |
| **Order Service** | `8084` | Order orchestration & SAGA pattern reservations |

## Quick Start (How to Run Backend)
1. Double-click or run:
   ```cmd
   start-all.bat
   ```
   *(or run `./start-all.ps1` in PowerShell)*
2. Wait ~20 seconds for Eureka (8761) and API Gateway (8080) to register all services.
3. Check Eureka dashboard: [http://localhost:8761](http://localhost:8761).

To stop all services:
```cmd
stop-all.bat
```

## How to Import & Use in Postman
1. Open Postman.
2. Click **Import** (top left).
3. Drag and drop both:
   - `Logistra_SOA_Project.postman_collection.json`
   - `Logistra_Environment.postman_environment.json`
4. Select the **Logistra Local Environment** from the environment dropdown in the top-right corner of Postman.
5. In the collection, expand **1. Authentication** and send **Login (Admin)**:
   - Default credentials: `admin` / `Admin@123`
   - The test script automatically captures the returned JWT and saves it as `bearer_token` in your Postman environment.
6. Now run any request under Products, Inventory, Transfers, Reconciliations, or Orders — the `Authorization: Bearer {{bearer_token}}` header is pre-configured!
