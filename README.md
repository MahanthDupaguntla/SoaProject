# LOGISTRA — Multi-Warehouse Inventory Control & Stock Reconciliation System

**Tagline:** ONE INVENTORY. EVERY LOCATION.

LOGISTRA is an enterprise-grade, microservices-driven multi-warehouse inventory management and physical stock reconciliation system.

---

## 🏗 System Architecture

The application is structured into a microservices architecture using Spring Boot 3, Spring Cloud, and React:

1. **Service Registry (`service-registry`)** — Netflix Eureka Server running on port `8761`.
2. **API Gateway (`api-gateway`)** — Spring Cloud Gateway on port `8080` handling unified routing and CORS.
3. **Auth Service (`auth-service`)** — Spring Security with asymmetric **RSA RS256** JWT token generation on port `8081`.
4. **Product Service (`product-service`)** — SKU, catalog, pricing, and category management on port `8082`.
5. **Inventory Service (`inventory-service`)** — Stock movement, optimistic locking with `@Version`, inter-hub transfers, and reconciliation engine on port `8083`.
6. **Order Service (`order-service`)** — Order lifecycle, inventory reservation with **SAGA Distributed Transactions**, and Resilience4j circuit breakers on port `8084`.
7. **Frontend (`frontend`)** — Premium Single Page Application built with React, Vite, Tailwind CSS, Lucide icons, and Recharts on port `5173`.

---

## 📊 Stock Reconciliation Formula & Logic

The centerpiece of LOGISTRA calculates real-time inventory variance using:

$$\text{difference} = \text{physicalQuantity} - \text{systemQuantity}$$

- If **$\text{difference} = 0$** $\rightarrow$ `MATCHED`
- If **$\text{difference} < 0$** $\rightarrow$ `SHORTAGE`
- If **$\text{difference} > 0$** $\rightarrow$ `EXCESS`

### Reconciliation Lifecycle:
1. **Physical Count:** Auditor counts items on the warehouse floor.
2. **Difference Detected:** System calculates variance and assigns status.
3. **Manager Review:** Warehouse supervisor reviews discrepancy notes.
4. **Approval Gate:** Final manager/admin authorizes stock adjustment.
5. **Stock Adjustment:** Automatic stock level calibration with optimistic concurrency lock.
6. **Audit Trail:** Immutable ledger entry created in the audit log.

---

## 🚀 Quick Start

### Prerequisites
- Java 21 LTS
- Maven 3.9+
- Node.js 18+ & npm

### Starting the Ecosystem

Run the automated launcher:
```powershell
.\start-all.ps1
```

Or start individual services manually:

```powershell
# 1. Start Eureka Registry
cd service-registry && mvn spring-boot:run

# 2. Start Gateway
cd api-gateway && mvn spring-boot:run

# 3. Start Frontend
cd frontend && npm install && npm run dev
```

---

## 🔑 Default Credentials

- **Admin User:** `admin` / `Admin@123` (Role: `ROLE_SUPER_ADMIN`)
- **Warehouse Manager:** `warehouse_mgr` / `Manager@123` (Role: `ROLE_WAREHOUSE_MANAGER`)
