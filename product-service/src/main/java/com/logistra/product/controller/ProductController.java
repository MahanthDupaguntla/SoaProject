package com.logistra.product.controller;

import com.logistra.product.model.Product;
import com.logistra.product.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sku/{sku}")
    public ResponseEntity<Product> getProductBySku(@PathVariable String sku) {
        return productRepository.findBySku(sku)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@Valid @RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody Product productDetails) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(productDetails.getName());
            existing.setDescription(productDetails.getDescription());
            existing.setCategory(productDetails.getCategory());
            existing.setBrand(productDetails.getBrand());
            existing.setUnit(productDetails.getUnit());
            existing.setPrice(productDetails.getPrice());
            existing.setCost(productDetails.getCost());
            existing.setBarcode(productDetails.getBarcode());
            existing.setQuantity(productDetails.getQuantity());
            existing.setReorderLevel(productDetails.getReorderLevel());
            existing.setReorderQuantity(productDetails.getReorderQuantity());
            existing.setStatus(productDetails.getStatus());
            existing.setBatchNumber(productDetails.getBatchNumber());
            existing.setSerialNumber(productDetails.getSerialNumber());
            existing.setExpiryDate(productDetails.getExpiryDate());
            existing.setSupplier(productDetails.getSupplier());
            existing.setImageUrl(productDetails.getImageUrl());
            return ResponseEntity.ok(productRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return productRepository.findById(id).map(p -> {
            productRepository.delete(p);
            return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}
