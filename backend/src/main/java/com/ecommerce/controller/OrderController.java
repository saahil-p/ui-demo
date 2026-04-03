package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Order Controller - Handles order-related operations
 * Provides endpoints to view order history and order details
 */
@Slf4j
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    /**
     * Get all orders
     * Returns complete order history for display in Orders tab
     */
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        log.info("GET /orders - Fetching all orders");
        List<Order> orders = orderService.getAllOrders();
        log.info("Found {} orders", orders.size());
        return ResponseEntity.ok(orders);
    }
    
    /**
     * Get order by ID
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        log.info("GET /orders/{} - Fetching order by ID", orderId);
        Order order = orderService.getOrderById(orderId);
        
        if (order == null) {
            log.warn("Order not found with ID: {}", orderId);
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(order);
    }
    
    /**
     * Get orders by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
        log.info("GET /orders/status/{} - Fetching orders by status", status);
        
        try {
            Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
            List<Order> orders = orderService.getOrdersByStatus(orderStatus);
            log.info("Found {} orders with status {}", orders.size(), status);
            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException e) {
            log.error("Invalid order status: {}", status);
            return ResponseEntity.badRequest().build();
        }
    }
}

