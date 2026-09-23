package com.logistra.inventory.repository;

import com.logistra.inventory.model.StockTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockTransferRepository extends JpaRepository<StockTransfer, Long> {
    List<StockTransfer> findByStatus(String status);
    List<StockTransfer> findBySourceWarehouseIdOrDestinationWarehouseId(Long source, Long destination);
}
