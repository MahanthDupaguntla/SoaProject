package com.logistra.inventory.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_reconciliations")
public class StockReconciliation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String countNumber;

    @Column(nullable = false)
    private Long warehouseId;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Integer systemQuantity;

    @Column(nullable = false)
    private Integer physicalQuantity;

    @Column(nullable = false)
    private Integer difference; // physicalQuantity - systemQuantity

    @Column(nullable = false)
    private String status; // MATCHED, SHORTAGE, EXCESS

    private String workflowState = "DIFFERENCE_DETECTED"; // PHYSICAL_COUNT, DIFFERENCE_DETECTED, MANAGER_REVIEW, APPROVED, REJECTED, ADJUSTED

    private String countedBy;
    private String reviewedBy;
    private String approvedBy;
    private String notes;

    private LocalDateTime countedAt = LocalDateTime.now();
    private LocalDateTime reviewedAt;
    private LocalDateTime approvedAt;
    private LocalDateTime adjustedAt;

    public StockReconciliation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCountNumber() { return countNumber; }
    public void setCountNumber(String countNumber) { this.countNumber = countNumber; }
    public Long getWarehouseId() { return warehouseId; }
    public void setWarehouseId(Long warehouseId) { this.warehouseId = warehouseId; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Integer getSystemQuantity() { return systemQuantity; }
    public void setSystemQuantity(Integer systemQuantity) { this.systemQuantity = systemQuantity; }
    public Integer getPhysicalQuantity() { return physicalQuantity; }
    public void setPhysicalQuantity(Integer physicalQuantity) { this.physicalQuantity = physicalQuantity; }
    public Integer getDifference() { return difference; }
    public void setDifference(Integer difference) { this.difference = difference; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getWorkflowState() { return workflowState; }
    public void setWorkflowState(String workflowState) { this.workflowState = workflowState; }
    public String getCountedBy() { return countedBy; }
    public void setCountedBy(String countedBy) { this.countedBy = countedBy; }
    public String getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(String reviewedBy) { this.reviewedBy = reviewedBy; }
    public String getApprovedBy() { return approvedBy; }
    public void setApprovedBy(String approvedBy) { this.approvedBy = approvedBy; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCountedAt() { return countedAt; }
    public void setCountedAt(LocalDateTime countedAt) { this.countedAt = countedAt; }
    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
    public LocalDateTime getAdjustedAt() { return adjustedAt; }
    public void setAdjustedAt(LocalDateTime adjustedAt) { this.adjustedAt = adjustedAt; }

    public void calculateDiscrepancy() {
        this.difference = this.physicalQuantity - this.systemQuantity;
        if (this.difference == 0) {
            this.status = "MATCHED";
        } else if (this.difference < 0) {
            this.status = "SHORTAGE";
        } else {
            this.status = "EXCESS";
        }
    }
}
