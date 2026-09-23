package com.logistra.order.controller;

import com.logistra.order.model.CustomerOrder;
import com.logistra.order.repository.OrderRepository;
import com.logistra.order.service.OrderSagaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderSagaService sagaService;

    @GetMapping
    public List<CustomerOrder> getOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody CustomerOrder order) {
        CustomerOrder processed = sagaService.createOrder(order);
        return ResponseEntity.ok(processed);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            return ResponseEntity.ok(orderRepository.save(order));
        }).orElse(ResponseEntity.notFound().build());
    }
}
