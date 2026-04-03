package com.ecommerce.seeder;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    
    private final ProductRepository productRepository;
    
    @Override
    public void run(String... args) {
        log.info("Starting data seeding...");
        
        // Clear existing products (optional - comment out if you want to keep existing data)
        productRepository.deleteAll();
        log.info("Cleared existing products");
        
        // Create sample products matching the frontend mock data
        List<Product> products = Arrays.asList(
                createProduct(
                        1L,
                        "Wireless Headphones",
                        79.99,
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
                        "High-quality wireless headphones with noise cancellation",
                        4.5,
                        50 // Initial stock quantity
                ),
                createProduct(
                        2L,
                        "Smart Watch",
                        199.99,
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
                        "Feature-rich smartwatch with fitness tracking",
                        4.7,
                        30
                ),
                createProduct(
                        3L,
                        "Laptop Stand",
                        39.99,
                        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop",
                        "Ergonomic aluminum laptop stand",
                        4.3,
                        75
                ),
                createProduct(
                        4L,
                        "Mechanical Keyboard",
                        129.99,
                        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop",
                        "RGB mechanical keyboard with custom switches",
                        4.8,
                        40
                ),
                createProduct(
                        5L,
                        "USB-C Hub",
                        49.99,
                        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=200&fit=crop",
                        "Multi-port USB-C hub with HDMI and SD card reader",
                        4.4,
                        60
                ),
                createProduct(
                        6L,
                        "Wireless Mouse",
                        29.99,
                        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop",
                        "Ergonomic wireless mouse with precision tracking",
                        4.6,
                        100
                )
        );
        
        // Save all products
        productRepository.saveAll(products);
        
        log.info("Data seeding completed! Created {} products", products.size());
        products.forEach(p -> log.info("  - {} (ID: {}, Stock: {})", p.getName(), p.getProductId(), p.getQuantity()));
    }
    
    private Product createProduct(Long id, String name, Double price, String image, 
                                  String description, Double rating, Integer quantity) {
        Product product = new Product();
        product.setProductId(id);
        product.setName(name);
        product.setPrice(price);
        product.setImage(image);
        product.setDescription(description);
        product.setRating(rating);
        product.setQuantity(quantity);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return product;
    }
}

