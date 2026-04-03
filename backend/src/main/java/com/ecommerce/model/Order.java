package com.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    
    @Id
    private String id;

    @NotNull
    private List<OrderItem> items = new ArrayList<>();
    
    @NotNull
    @Min(value = 0, message = "Total amount must be greater than or equal to 0")
    private Double totalAmount;
    
    private OrderStatus status;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime completedAt;
    
    public enum OrderStatus {
        PENDING,
        COMPLETED,
        CANCELLED,
        FAILED
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem {
        private Long productId;
        private String name;
        private String imageUrl;
        private Double price;
        private Integer quantity;
        private Double subtotal; // price * quantity
    }
    
    public Order(List<OrderItem> items, Double totalAmount) {
        this.items = items;
        this.totalAmount = totalAmount;
        this.status = OrderStatus.COMPLETED;
        this.createdAt = LocalDateTime.now();
        this.completedAt = LocalDateTime.now();
    }
}

