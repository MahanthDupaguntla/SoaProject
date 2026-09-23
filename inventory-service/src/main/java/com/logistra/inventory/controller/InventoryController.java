package com.logistra.inventory.controller;

import com.logistra.inventory.model.*;
import com.logistra.inventory.repository.*;
import com.logistra.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private StockMovementRepository stockMovementRepository;

    @Autowired
    private StockTransferRepository stockTransferRepository;

    @Autowired
    private StockReconciliationRepository reconciliationRepository;

    @Autowired
    private InventoryService inventoryService;

    // --- WAREHOUSES ---
    @GetMapping("/warehouses")
    public List<Warehouse> getWarehouses() {
        return warehouseRepository.findAll();
    }

    @PostMapping("/warehouses")
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    // --- INVENTORY ---
    @GetMapping("/items")
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/items/warehouse/{warehouseId}")
    public List<Inventory> getInventoryByWarehouse(@PathVariable Long warehouseId) {
        return inventoryRepository.findByWarehouseId(warehouseId);
    }

    @PostMapping("/adjust")
    public ResponseEntity<?> adjustStock(@RequestBody Map<String, Object> req) {
        Long productId = Long.valueOf(req.get("productId").toString());
        Long warehouseId = Long.valueOf(req.get("warehouseId").toString());
        Integer newQuantity = Integer.valueOf(req.get("newQuantity").toString());
        String reason = (String) req.getOrDefault("reason", "Manual adjustment");
        String user = (String) req.getOrDefault("performedBy", "admin");

        Inventory adjusted = inventoryService.adjustStock(productId, warehouseId, newQuantity, reason, user);
        return ResponseEntity.ok(adjusted);
    }

    // --- MOVEMENTS ---
    @GetMapping("/movements")
    public List<StockMovement> getMovements() {
        return stockMovementRepository.findAllByOrderByTimestampDesc();
    }

    // --- TRANSFERS ---
    @GetMapping("/transfers")
    public List<StockTransfer> getTransfers() {
        return stockTransferRepository.findAll();
    }

    @PostMapping("/transfers")
    public ResponseEntity<?> createTransfer(@RequestBody StockTransfer transfer) {
        transfer.setTransferNumber("TRF-" + System.currentTimeMillis());
        transfer.setStatus("PENDING");
        return ResponseEntity.ok(stockTransferRepository.save(transfer));
    }

    @PutMapping("/transfers/{id}/status")
    public ResponseEntity<?> updateTransferStatus(@PathVariable Long id, @RequestParam String status, @RequestParam(required = false) String user) {
        return stockTransferRepository.findById(id).map(trf -> {
            trf.setStatus(status);
            if ("APPROVED".equalsIgnoreCase(status)) {
                trf.setApprovedBy(user != null ? user : "Warehouse Manager");
            } else if ("DISPATCHED".equalsIgnoreCase(status)) {
                trf.setDispatchedAt(LocalDateTime.now());
            } else if ("RECEIVED".equalsIgnoreCase(status)) {
                trf.setReceivedAt(LocalDateTime.now());
                // Complete transfer: deduct from source, add to dest
                inventoryService.adjustStock(trf.getProductId(), trf.getDestinationWarehouseId(),
                        inventoryRepository.findByProductIdAndWarehouseId(trf.getProductId(), trf.getDestinationWarehouseId())
                                .map(i -> i.getQuantity() + trf.getQuantity()).orElse(trf.getQuantity()),
                        "Transfer Received: " + trf.getTransferNumber(), user);
            }
            return ResponseEntity.ok(stockTransferRepository.save(trf));
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- RECONCILIATION ---
    @GetMapping("/reconciliations")
    public List<StockReconciliation> getReconciliations() {
        return reconciliationRepository.findAll();
    }

    @PostMapping("/reconciliations")
    public ResponseEntity<?> createReconciliation(@RequestBody StockReconciliation recon) {
        recon.setCountNumber("REC-" + System.currentTimeMillis());
        recon.calculateDiscrepancy();
        recon.setWorkflowState(recon.getDifference() == 0 ? "MATCHED" : "DIFFERENCE_DETECTED");
        return ResponseEntity.ok(reconciliationRepository.save(recon));
    }

    @PutMapping("/reconciliations/{id}/review")
    public ResponseEntity<?> reviewReconciliation(@PathVariable Long id, @RequestParam String reviewer, @RequestParam(required = false) String notes) {
        return reconciliationRepository.findById(id).map(r -> {
            r.setReviewedBy(reviewer);
            r.setReviewedAt(LocalDateTime.now());
            r.setWorkflowState("MANAGER_REVIEW");
            if (notes != null) r.setNotes(notes);
            return ResponseEntity.ok(reconciliationRepository.save(r));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/reconciliations/{id}/approve")
    public ResponseEntity<?> approveReconciliation(@PathVariable Long id, @RequestParam String approver) {
        return reconciliationRepository.findById(id).map(r -> {
            r.setApprovedBy(approver);
            r.setApprovedAt(LocalDateTime.now());
            r.setWorkflowState("ADJUSTED");
            r.setAdjustedAt(LocalDateTime.now());

            // Auto-adjust inventory to match physical count
            inventoryService.adjustStock(r.getProductId(), r.getWarehouseId(), r.getPhysicalQuantity(),
                    "Reconciliation Approval: " + r.getCountNumber(), approver);

            return ResponseEntity.ok(reconciliationRepository.save(r));
        }).orElse(ResponseEntity.notFound().build());
    }

    // --- SAGA RESERVATION ENDPOINTS (CALLED BY ORDER SERVICE) ---
    @PostMapping("/reserve")
    public ResponseEntity<?> reserveStock(@RequestBody Map<String, Object> req) {
        Long productId = Long.valueOf(req.get("productId").toString());
        Long warehouseId = Long.valueOf(req.get("warehouseId").toString());
        Integer quantity = Integer.valueOf(req.get("quantity").toString());

        boolean success = inventoryService.reserveStock(productId, warehouseId, quantity);
        if (success) {
            return ResponseEntity.ok(Map.of("status", "SUCCESS", "message", "Stock reserved"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "FAILED", "message", "Insufficient available stock"));
        }
    }

    @PostMapping("/release")
    public ResponseEntity<?> releaseReservation(@RequestBody Map<String, Object> req) {
        Long productId = Long.valueOf(req.get("productId").toString());
        Long warehouseId = Long.valueOf(req.get("warehouseId").toString());
        Integer quantity = Integer.valueOf(req.get("quantity").toString());

        inventoryService.releaseReservation(productId, warehouseId, quantity);
        return ResponseEntity.ok(Map.of("status", "RELEASED"));
    }
}
