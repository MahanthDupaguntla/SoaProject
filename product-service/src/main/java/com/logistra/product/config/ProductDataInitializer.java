package com.logistra.product.config;

import com.logistra.product.model.Product;
import com.logistra.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;

@Configuration
public class ProductDataInitializer {

    @Bean
    public CommandLineRunner initProducts(ProductRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                Product p1 = new Product();
                p1.setSku("LOG-IND-7701");
                p1.setName("Industrial LiDAR Sensor Unit Pro");
                p1.setDescription("Precision distance and depth scanner for autonomous guided vehicles and smart racks.");
                p1.setCategory("Automation & Robotics");
                p1.setBrand("ApexMotion Dynamics");
                p1.setUnit("PCS");
                p1.setPrice(new BigDecimal("1240.00"));
                p1.setCost(new BigDecimal("820.00"));
                p1.setBarcode("8901245007701");
                p1.setQuantity(480);
                p1.setReorderLevel(100);
                p1.setReorderQuantity(250);
                p1.setStatus("ACTIVE");
                p1.setBatchNumber("BAT-2026-X01");
                p1.setSerialNumber("SN-LIDAR-9821");
                p1.setExpiryDate(LocalDate.now().plusYears(3));
                p1.setSupplier("Apex Tech Solutions");
                repo.save(p1);

                Product p2 = new Product();
                p2.setSku("LOG-PAL-4402");
                p2.setName("High-Load Smart Poly-Pallet (RFID Tagged)");
                p2.setDescription("Ultra-durable 1500kg payload composite pallet embedded with dual frequency RFID tracking.");
                p2.setCategory("Storage & Material Handling");
                p2.setBrand("Logistra HeavyDuty");
                p2.setUnit("PCS");
                p2.setPrice(new BigDecimal("95.00"));
                p2.setCost(new BigDecimal("55.00"));
                p2.setBarcode("8901245004402");
                p2.setQuantity(1200);
                p2.setReorderLevel(300);
                p2.setReorderQuantity(600);
                p2.setStatus("ACTIVE");
                p2.setBatchNumber("BAT-2026-P99");
                p2.setSupplier("LogiMaterials Corp");
                repo.save(p2);

                Product p3 = new Product();
                p3.setSku("LOG-FORK-3305");
                p3.setName("Lithium-Iron Battery Module 48V 600Ah");
                p3.setDescription("Fast-charging high-discharge cell pack designed for electric reach trucks and heavy forklifts.");
                p3.setCategory("Power Systems");
                p3.setBrand("VoltStorage Enterprise");
                p3.setUnit("UNITS");
                p3.setPrice(new BigDecimal("4850.00"));
                p3.setCost(new BigDecimal("3400.00"));
                p3.setBarcode("8901245003305");
                p3.setQuantity(45);
                p3.setReorderLevel(15);
                p3.setReorderQuantity(30);
                p3.setStatus("ACTIVE");
                p3.setBatchNumber("BAT-VLT-881");
                p3.setSupplier("Volt Energy Global");
                repo.save(p3);
            }
        };
    }
}
