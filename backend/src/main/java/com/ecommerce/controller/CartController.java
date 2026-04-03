package com.ecommerce.controller;

import com.ecommerce.dto.AddToCartRequest;
import com.ecommerce.dto.ReserveCartRequest;
import com.ecommerce.dto.UpdateQuantityRequest;
import com.ecommerce.model.Order;
import com.ecommerce.service.ReservedStockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Cart Controller - Handles stock reservation operations
 *
 * Note: This is a single-user system. Session management has been removed.
 * All cart operations work with a single default user context.
 */
@Slf4j
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final ReservedStockService reservedStockService;

    /**
     * Add item to cart - No stock reservation until checkout
     */
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(@Valid @RequestBody AddToCartRequest request) {
        log.info("POST /cart/add - Adding product {} with quantity {}",
                request.getProductId(), request.getQuantity());

        // Stock reservation removed - will happen when user proceeds to checkout

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Item added to cart");

        return ResponseEntity.ok(response);
    }

    /**
     * Update cart item quantity - No stock reservation until checkout
     */
    @PutMapping("/update")
    public ResponseEntity<Map<String, Object>> updateQuantity(@Valid @RequestBody UpdateQuantityRequest request) {
        log.info("PUT /cart/update - Updating product {} to quantity {}",
                request.getProductId(), request.getQuantity());

        // Stock reservation removed - will happen when user proceeds to checkout

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Cart quantity updated");

        return ResponseEntity.ok(response);
    }

    /**
     * Remove item from cart - No stock release needed (not reserved yet)
     */
    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Map<String, Object>> removeFromCart(@PathVariable Long productId) {
        log.info("DELETE /cart/remove/{} - Removing product", productId);

        // Stock release removed - no reservations exist until checkout

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Item removed from cart");

        return ResponseEntity.ok(response);
    }

    /**
     * Clear cart - No stock release needed (not reserved yet)
     */
    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, Object>> clearCart() {
        log.info("DELETE /cart/clear - Clearing cart");

        // Stock release removed - no reservations exist until checkout

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Cart cleared");

        return ResponseEntity.ok(response);
    }
    
    /**
     * Reserve stock for checkout - Called when user clicks "Proceed to Checkout"
     * Reserves stock for 5 minutes before final confirmation
     */
    @PostMapping("/reserve")
    public ResponseEntity<Map<String, Object>> reserveStockForCheckout(@Valid @RequestBody ReserveCartRequest request) {
        log.info("POST /cart/reserve - Reserving stock for {} items", request.getItems().size());

        // Reserve each item with 5-minute expiry
        request.getItems().forEach(item -> {
            reservedStockService.reserveStockForCheckout(
                    item.getProductId(),
                    item.getQuantity(),
                    5  // 5 minutes expiry
            );
        });

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Stock reserved for checkout");
        response.put("expiresAt", LocalDateTime.now().plusMinutes(5).toString());
        response.put("expiryMinutes", 5);

        log.info("Successfully reserved stock for {} items (expires in 5 minutes)", request.getItems().size());

        return ResponseEntity.ok(response);
    }

    /**
     * Checkout - Finalizes the purchase, reduces actual product quantities, and creates an order
     * Works with single default user in this phase of the project.
     */
    @PostMapping("/checkout")
    public ResponseEntity<Map<String, Object>> checkout() {
        log.info("POST /cart/checkout - Processing checkout");

        Order order = reservedStockService.checkoutReservations();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Checkout successful");

        if (order != null) {
            response.put("orderId", order.getId());
            response.put("totalAmount", order.getTotalAmount());
            response.put("orderStatus", order.getStatus());
            log.info("Checkout successful - Order {} created with total ${}", order.getId(), order.getTotalAmount());
        }

        return ResponseEntity.ok(response);
    }
    
    /**
     * Get available stock for a product (excluding reserved quantities)
     */
    @GetMapping("/stock/{productId}")
    public ResponseEntity<Map<String, Object>> getAvailableStock(@PathVariable Long productId) {
        log.info("GET /cart/stock/{} - Getting available stock", productId);
        
        int availableStock = reservedStockService.getAvailableStock(productId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("productId", productId);
        response.put("availableStock", availableStock);
        
        return ResponseEntity.ok(response);
    }
}

