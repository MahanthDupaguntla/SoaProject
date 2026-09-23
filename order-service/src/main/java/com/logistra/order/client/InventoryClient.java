package com.logistra.order.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "inventory-service")
public interface InventoryClient {

    @PostMapping("/api/inventory/reserve")
    ResponseEntity<Map<String, Object>> reserveStock(@RequestBody Map<String, Object> req);

    @PostMapping("/api/inventory/release")
    ResponseEntity<Map<String, Object>> releaseReservation(@RequestBody Map<String, Object> req);
}
