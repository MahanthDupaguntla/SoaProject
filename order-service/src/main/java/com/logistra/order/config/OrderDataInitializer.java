package com.logistra.order.config;

import com.logistra.order.model.CustomerOrder;
import com.logistra.order.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class OrderDataInitializer {

    @Bean
    public CommandLineRunner initOrders(OrderRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                CustomerOrder ord1 = new CustomerOrder();
                ord1.setOrderNumber("ORD-2026-0881");
                ord1.setCustomerName("Aerospace Systems India");
                ord1.setCustomerEmail("procurement@aerospace-systems.in");
                ord1.setShippingAddress("Sector 62, Electronic City, Bengaluru");
                ord1.setWarehouseId(1L);
                ord1.setProductId(1L);
                ord1.setQuantity(10);
                ord1.setTotalAmount(new BigDecimal("12400.00"));
                ord1.setStatus("CONFIRMED");
                ord1.setReservationStatus("RESERVED");
                repo.save(ord1);

                CustomerOrder ord2 = new CustomerOrder();
                ord2.setOrderNumber("ORD-2026-0882");
                ord2.setCustomerName("National Logistics Logistics Ltd");
                ord2.setCustomerEmail("supply@natlogistics.com");
                ord2.setShippingAddress("Bhiwandi Warehousing Zone, Mumbai");
                ord2.setWarehouseId(2L);
                ord2.setProductId(2L);
                ord2.setQuantity(50);
                ord2.setTotalAmount(new BigDecimal("4750.00"));
                ord2.setStatus("PROCESSING");
                ord2.setReservationStatus("RESERVED");
                repo.save(ord2);
            }
        };
    }
}
