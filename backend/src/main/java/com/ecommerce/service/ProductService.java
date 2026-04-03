package com.ecommerce.service;

import com.ecommerce.dto.ProductDTO;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public List<ProductDTO> getAllProducts() {
        log.debug("Fetching all products");
        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProductDTO getProductById(Long productId) {
        log.debug("Fetching product with ID: {}", productId);
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + productId));
        return convertToDTO(product);
    }
    
    public Product getProductEntity(Long productId) {
        return productRepository.findByProductId(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + productId));
    }
    
    @Transactional
    public void updateProductQuantity(Long productId, Integer newQuantity) {
        log.debug("Updating quantity for product {} to {}", productId, newQuantity);
        Product product = getProductEntity(productId);
        product.setQuantity(newQuantity);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);
    }
    
    public boolean hasAvailableStock(Long productId, Integer requestedQuantity) {
        Product product = getProductEntity(productId);
        return product.getQuantity() >= requestedQuantity;
    }
    
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getProductId(),
                product.getName(),
                product.getPrice(),
                product.getImage(),
                product.getDescription(),
                product.getRating()
        );
    }
}

