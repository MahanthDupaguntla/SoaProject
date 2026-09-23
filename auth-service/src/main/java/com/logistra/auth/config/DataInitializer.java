package com.logistra.auth.config;

import com.logistra.auth.model.Role;
import com.logistra.auth.model.RoleName;
import com.logistra.auth.model.User;
import com.logistra.auth.repository.RoleRepository;
import com.logistra.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepo, UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            for (RoleName rn : RoleName.values()) {
                if (roleRepo.findByName(rn).isEmpty()) {
                    Role r = new Role(rn, "Default " + rn.name());
                    Set<String> perms = new HashSet<>(Arrays.asList(
                            "inventory.read", "warehouse.read", "reports.view"
                    ));
                    if (rn == RoleName.ROLE_SUPER_ADMIN || rn == RoleName.ROLE_ADMIN) {
                        perms.addAll(Arrays.asList(
                                "inventory.create", "inventory.update", "inventory.adjust", "inventory.approve",
                                "warehouse.create", "warehouse.update",
                                "transfer.create", "transfer.approve", "transfer.dispatch", "transfer.receive",
                                "reconciliation.create", "reconciliation.review", "reconciliation.approve",
                                "users.manage", "audit.view"
                        ));
                    }
                    r.setPermissions(perms);
                    roleRepo.save(r);
                }
            }

            if (!userRepo.existsByUsername("admin")) {
                User admin = new User("admin", "admin@logistra.io", encoder.encode("Admin@123"), "System Administrator");
                Role superAdminRole = roleRepo.findByName(RoleName.ROLE_SUPER_ADMIN).orElse(null);
                if (superAdminRole != null) {
                    admin.getRoles().add(superAdminRole);
                }
                userRepo.save(admin);
            }

            if (!userRepo.existsByUsername("warehouse_mgr")) {
                User mgr = new User("warehouse_mgr", "mgr@logistra.io", encoder.encode("Manager@123"), "Warehouse Manager");
                Role mgrRole = roleRepo.findByName(RoleName.ROLE_WAREHOUSE_MANAGER).orElse(null);
                if (mgrRole != null) {
                    mgr.getRoles().add(mgrRole);
                }
                userRepo.save(mgr);
            }
        };
    }
}
