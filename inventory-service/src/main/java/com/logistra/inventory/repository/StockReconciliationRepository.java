package com.logistra.inventory.repository;

import com.logistra.inventory.model.StockReconciliation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockReconciliationRepository extends JpaRepository<StockReconciliation, Long> {
    List<StockReconciliation> findByWarehouseId(Long warehouseId);
    List<StockReconciliation> findByStatus(String status);
    List<StockReconciliation> findByWorkflowState(String workflowState);
}
