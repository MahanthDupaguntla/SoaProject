package com.logistra.inventory.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventories")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Long warehouseId;

    private String locationId; // Zone-Rack-Shelf-Bin e.g., "Z1-R04-S2-B12"

    private Integer quantity = 0;
    private Integer reservedQuantity = 0;
    private Integer availableQuantity = 0;
    private Integer damagedQuantity = 0;
    private Integer expiredQuantity = 0;
    private Integer inTransitQuantity = 0;

    private String batchNumber;
    private String serialNumber;

    @Version
    private Long version;

    private LocalDateTime updatedAt = LocalDateTime.now();

    public Inventory() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Long getWarehouseId() { return warehouseId; }
    public void setWarehouseId(Long warehouseId) { this.warehouseId = warehouseId; }
    public String getLocationId() { return locationId; }
    public void setLocationId(String locationId) { this.locationId = locationId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        calculateAvailable();
    }
    public Integer getReservedQuantity() { return reservedQuantity; }
    public void setReservedQuantity(Integer reservedQuantity) {
        this.reservedQuantity = reservedQuantity;
        calculateAvailable();
    }
    public Integer getAvailableQuantity() { return availableQuantity; }
    public void setAvailableQuantity(Integer availableQuantity) { this.availableQuantity = availableQuantity; }
    public Integer getDamagedQuantity() { return damagedQuantity; }
    public void setDamagedQuantity(Integer damagedQuantity) { this.damagedQuantity = damagedQuantity; }
    public Integer getExpiredQuantity() { return expiredQuantity; }
    public void setExpiredQuantity(Integer expiredQuantity) { this.expiredQuantity = expiredQuantity; }
    public Integer getInTransitQuantity() { return inTransitQuantity; }
    public void setInTransitQuantity(Integer inTransitQuantity) { this.inTransitQuantity = inTransitQuantity; }
    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }
    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public void calculateAvailable() {
        int q = this.quantity != null ? this.quantity : 0;
        int r = this.reservedQuantity != null ? this.reservedQuantity : 0;
        int d = this.damagedQuantity != null ? this.damagedQuantity : 0;
        int e = this.expiredQuantity != null ? this.expiredQuantity : 0;
        this.availableQuantity = Math.max(0, q - r - d - e);
    }

    @PrePersist
    @PreUpdate
    public void preUpdate() {
        calculateAvailable();
        this.updatedAt = LocalDateTime.now();
    }
}
