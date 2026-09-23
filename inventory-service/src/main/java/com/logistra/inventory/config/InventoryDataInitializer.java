package com.logistra.inventory.config;

import com.logistra.inventory.model.*;
import com.logistra.inventory.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class InventoryDataInitializer {

    @Bean
    public CommandLineRunner initInventory(WarehouseRepository whRepo,
                                           InventoryRepository invRepo,
                                           StockTransferRepository trfRepo,
                                           StockReconciliationRepository recRepo) {
        return args -> {
            if (whRepo.count() == 0) {
                // Enterprise Hubs requested in specification
                Warehouse w1 = new Warehouse();
                w1.setCode("WH-DEL-01");
                w1.setName("NORTH HUB");
                w1.setCity("Delhi NCR");
                w1.setState("Delhi");
                w1.setCountry("India");
                w1.setManager("Vikram Singhania");
                w1.setCapacity(250000);
                w1.setCurrentUtilization(74);
                whRepo.save(w1);

                Warehouse w2 = new Warehouse();
                w2.setCode("WH-BOM-02");
                w2.setName("WEST HUB");
                w2.setCity("Mumbai");
                w2.setState("Maharashtra");
                w2.setCountry("India");
                w2.setManager("Ananya Deshmukh");
                w2.setCapacity(300000);
                w2.setCurrentUtilization(82);
                whRepo.save(w2);

                Warehouse w3 = new Warehouse();
                w3.setCode("WH-BLR-03");
                w3.setName("SOUTH HUB");
                w3.setCity("Bengaluru");
                w3.setState("Karnataka");
                w3.setCountry("India");
                w3.setManager("Rajesh Hegde");
                w3.setCapacity(280000);
                w3.setCurrentUtilization(68);
                whRepo.save(w3);

                Warehouse w4 = new Warehouse();
                w4.setCode("WH-HYD-04");
                w4.setName("CENTRAL HUB");
                w4.setCity("Hyderabad");
                w4.setState("Telangana");
                w4.setCountry("India");
                w4.setManager("Sunita Rao");
                w4.setCapacity(210000);
                w4.setCurrentUtilization(61);
                whRepo.save(w4);

                Warehouse w5 = new Warehouse();
                w5.setCode("WH-CCU-05");
                w5.setName("EAST HUB");
                w5.setCity("Kolkata");
                w5.setState("West Bengal");
                w5.setCountry("India");
                w5.setManager("Debashis Roy");
                w5.setCapacity(190000);
                w5.setCurrentUtilization(55);
                whRepo.save(w5);

                Warehouse w6 = new Warehouse();
                w6.setCode("WH-PNQ-06");
                w6.setName("MID WEST HUB");
                w6.setCity("Pune");
                w6.setState("Maharashtra");
                w6.setCountry("India");
                w6.setManager("Kunal Patil");
                w6.setCapacity(175000);
                w6.setCurrentUtilization(79);
                whRepo.save(w6);

                // Inventory stocks
                Inventory inv1 = new Inventory();
                inv1.setProductId(1L);
                inv1.setWarehouseId(w1.getId());
                inv1.setLocationId("Z1-R04-S2-B12");
                inv1.setQuantity(320);
                inv1.setReservedQuantity(20);
                inv1.setBatchNumber("BAT-2026-X01");
                invRepo.save(inv1);

                Inventory inv2 = new Inventory();
                inv2.setProductId(2L);
                inv2.setWarehouseId(w1.getId());
                inv2.setLocationId("Z2-R01-S1-B05");
                inv2.setQuantity(850);
                inv2.setReservedQuantity(50);
                invRepo.save(inv2);

                Inventory inv3 = new Inventory();
                inv3.setProductId(1L);
                inv3.setWarehouseId(w2.getId());
                inv3.setLocationId("Z1-R02-S3-B08");
                inv3.setQuantity(160);
                inv3.setReservedQuantity(0);
                invRepo.save(inv3);

                // Sample Transfer
                StockTransfer trf = new StockTransfer();
                trf.setTransferNumber("TRF-2026-0091");
                trf.setSourceWarehouseId(w1.getId());
                trf.setDestinationWarehouseId(w2.getId());
                trf.setProductId(1L);
                trf.setQuantity(40);
                trf.setStatus("IN_TRANSIT");
                trf.setRequestedBy("Ananya Deshmukh");
                trf.setApprovedBy("System Admin");
                trf.setTrackingNumber("LOG-EXPR-99218");
                trf.setDispatchedAt(LocalDateTime.now().minusHours(4));
                trfRepo.save(trf);

                // Centerpiece Reconciliation Sample (from requirement: 1000 system, 970 physical, -30 shortage)
                StockReconciliation rec = new StockReconciliation();
                rec.setCountNumber("REC-2026-0042");
                rec.setWarehouseId(w1.getId());
                rec.setProductId(2L);
                rec.setSystemQuantity(1000);
                rec.setPhysicalQuantity(970);
                rec.calculateDiscrepancy();
                rec.setWorkflowState("DIFFERENCE_DETECTED");
                rec.setCountedBy("Suresh Kumar (Audit Staff)");
                rec.setNotes("Shortage of 30 units detected during monthly physical count cycle.");
                recRepo.save(rec);
            }
        };
    }
}
