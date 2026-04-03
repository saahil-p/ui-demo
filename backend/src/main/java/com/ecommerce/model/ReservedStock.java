package com.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reserved_stock")
public class ReservedStock {
    
    @Id
    private String id;
    
    @NotNull
    private Long productId;

    private String userId; // For future user authentication

    @NotNull
    @Min(value = 1, message = "Reserved quantity must be at least 1")
    private Integer quantity;
    
    private ReservationStatus status;
    
    @Indexed(expireAfterSeconds = 1800) // 30 minutes TTL
    private LocalDateTime expiresAt;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime releasedAt;
    
    public enum ReservationStatus {
        RESERVED,
        RELEASED,
        CHECKED_OUT
    }
    
    public ReservedStock(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
        this.status = ReservationStatus.RESERVED;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = LocalDateTime.now().plusMinutes(30);
    }

    // Constructor with custom expiry time (in minutes)
    public ReservedStock(Long productId, Integer quantity, int expiryMinutes) {
        this.productId = productId;
        this.quantity = quantity;
        this.status = ReservationStatus.RESERVED;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = LocalDateTime.now().plusMinutes(expiryMinutes);
    }
}

