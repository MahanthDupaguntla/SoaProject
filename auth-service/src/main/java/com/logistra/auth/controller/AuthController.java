package com.logistra.auth.controller;

import com.logistra.auth.dto.JwtResponse;
import com.logistra.auth.dto.LoginRequest;
import com.logistra.auth.dto.RegisterRequest;
import com.logistra.auth.model.Role;
import com.logistra.auth.model.RoleName;
import com.logistra.auth.model.User;
import com.logistra.auth.repository.RoleRepository;
import com.logistra.auth.repository.UserRepository;
import com.logistra.auth.security.JwtUtils;
import com.logistra.auth.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .filter(auth -> auth.startsWith("ROLE_"))
                .collect(Collectors.toList());

        List<String> permissions = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .filter(auth -> !auth.startsWith("ROLE_"))
                .collect(Collectors.toList());

        String jwt = jwtUtils.generateJwtToken(userDetails.getUsername(), userDetails.getId(), roles, permissions);

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                roles,
                permissions));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Email is already in use!"));
        }

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFullName());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            Role defaultRole = roleRepository.findByName(RoleName.ROLE_WAREHOUSE_STAFF)
                    .orElseGet(() -> roleRepository.save(new Role(RoleName.ROLE_WAREHOUSE_STAFF, "Warehouse Staff Role")));
            roles.add(defaultRole);
        } else {
            strRoles.forEach(role -> {
                RoleName roleName;
                try {
                    roleName = RoleName.valueOf(role.startsWith("ROLE_") ? role : "ROLE_" + role);
                } catch (IllegalArgumentException e) {
                    roleName = RoleName.ROLE_VIEWER;
                }
                final RoleName rName = roleName;
                Role foundRole = roleRepository.findByName(rName)
                        .orElseGet(() -> roleRepository.save(new Role(rName, rName.name() + " Role")));
                roles.add(foundRole);
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        boolean isValid = jwtUtils.validateJwtToken(token);
        if (isValid) {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            return ResponseEntity.ok(Map.of("valid", true, "username", username));
        }
        return ResponseEntity.ok(Map.of("valid", false));
    }
}
