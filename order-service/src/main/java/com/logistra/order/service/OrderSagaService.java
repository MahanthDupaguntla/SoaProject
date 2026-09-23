package com.logistra.order.service;

import com.logistra.order.client.InventoryClient;
import com.logistra.order.model.CustomerOrder;
import com.logistra.order.repository.OrderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class OrderSagaService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired(required = false)
    private InventoryClient inventoryClient;

    @Transactional
    public CustomerOrder createOrder(CustomerOrder order) {
        order.setOrderNumber("ORD-" + System.currentTimeMillis());
        order.setStatus("NEW");
        order.setReservationStatus("PENDING");
        CustomerOrder saved = orderRepository.save(order);

        // Step 2 in SAGA: Request inventory reservation
        boolean reserved = executeReservationSaga(saved.getProductId(), saved.getWarehouseId(), saved.getQuantity());

        if (reserved) {
            saved.setReservationStatus("RESERVED");
            saved.setStatus("CONFIRMED");
        } else {
            saved.setReservationStatus("FAILED");
            saved.setStatus("CANCELLED"); // Compensation
        }

        return orderRepository.save(saved);
    }

    @CircuitBreaker(name = "inventoryCircuitBreaker", fallbackMethod = "reservationFallback")
    public boolean executeReservationSaga(Long productId, Long warehouseId, Integer quantity) {
        if (inventoryClient == null) {
            return true; // Local standalone mode fallback
        }
        try {
            Map<String, Object> req = new HashMap<>();
            req.put("productId", productId);
            req.put("warehouseId", warehouseId);
            req.put("quantity", quantity);
            ResponseEntity<Map<String, Object>> response = inventoryClient.reserveStock(req);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean reservationFallback(Long productId, Long warehouseId, Integer quantity, Throwable t) {
        // Circuit open or service down: graceful degraded fallback
        return false;
    }
}
