package com.logistra.inventory.repository;

import com.logistra.inventory.model.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {
    List<StockMovement> findByProductIdOrderByTimestampDesc(Long productId);
    List<StockMovement> findByWarehouseIdOrderByTimestampDesc(Long warehouseId);
    List<StockMovement> findAllByOrderByTimestampDesc();
}
