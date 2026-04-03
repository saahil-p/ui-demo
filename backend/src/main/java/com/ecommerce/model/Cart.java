package com.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "carts")
public class Cart {
    
    @Id
    private String id;
    
    private String userId; // For future user authentication
    
    @NotNull
    private List<CartItem> items = new ArrayList<>();
    
    private Double totalAmount;
    
    private CartStatus status;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocalDateTime checkedOutAt;
    
    public enum CartStatus {
        ACTIVE,
        CHECKED_OUT,
        ABANDONED
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItem {
        private Long productId;
        private String name;
        private Double price;
        private String image;
        private String description;
        private Double rating;
        private Integer quantity;
    }
}

