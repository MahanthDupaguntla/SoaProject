package com.logistra.inventory.service;

import com.logistra.inventory.model.Inventory;
import com.logistra.inventory.model.StockMovement;
import com.logistra.inventory.repository.InventoryRepository;
import com.logistra.inventory.repository.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private StockMovementRepository movementRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getByWarehouse(Long warehouseId) {
        return inventoryRepository.findByWarehouseId(warehouseId);
    }

    @Transactional
    public Inventory adjustStock(Long productId, Long warehouseId, Integer newQuantity, String reason, String performedBy) {
        Inventory inv = inventoryRepository.findByProductIdAndWarehouseId(productId, warehouseId)
                .orElseGet(() -> {
                    Inventory newInv = new Inventory();
                    newInv.setProductId(productId);
                    newInv.setWarehouseId(warehouseId);
                    newInv.setQuantity(0);
                    return newInv;
                });

        int oldQuantity = inv.getQuantity() != null ? inv.getQuantity() : 0;
        int delta = newQuantity - oldQuantity;
        inv.setQuantity(newQuantity);
        Inventory saved = inventoryRepository.save(inv);

        StockMovement movement = new StockMovement();
        movement.setProductId(productId);
        movement.setWarehouseId(warehouseId);
        movement.setMovementType("ADJUSTMENT");
        movement.setQuantity(delta);
        movement.setPerformedBy(performedBy);
        movement.setReason(reason != null ? reason : "Stock reconciliation manual/automated adjustment");
        movementRepository.save(movement);

        return saved;
    }

    @Transactional
    public boolean reserveStock(Long productId, Long warehouseId, Integer quantity) {
        Inventory inv = inventoryRepository.findByProductIdAndWarehouseId(productId, warehouseId).orElse(null);
        if (inv == null || inv.getAvailableQuantity() < quantity) {
            return false;
        }
        inv.setReservedQuantity(inv.getReservedQuantity() + quantity);
        inventoryRepository.save(inv);

        StockMovement movement = new StockMovement();
        movement.setProductId(productId);
        movement.setWarehouseId(warehouseId);
        movement.setMovementType("RESERVATION");
        movement.setQuantity(quantity);
        movement.setPerformedBy("ORDER_SAGA");
        movement.setReason("Order reserved inventory");
        movementRepository.save(movement);

        return true;
    }

    @Transactional
    public void releaseReservation(Long productId, Long warehouseId, Integer quantity) {
        Inventory inv = inventoryRepository.findByProductIdAndWarehouseId(productId, warehouseId).orElse(null);
        if (inv != null) {
            inv.setReservedQuantity(Math.max(0, inv.getReservedQuantity() - quantity));
            inventoryRepository.save(inv);

            StockMovement movement = new StockMovement();
            movement.setProductId(productId);
            movement.setWarehouseId(warehouseId);
            movement.setMovementType("RELEASE");
            movement.setQuantity(quantity);
            movement.setPerformedBy("ORDER_COMPENSATION");
            movement.setReason("Order cancelled or failed - release reserved stock");
            movementRepository.save(movement);
        }
    }
}
