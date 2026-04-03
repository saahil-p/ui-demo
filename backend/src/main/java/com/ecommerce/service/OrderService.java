package com.ecommerce.service;

import com.ecommerce.model.Order;
import com.ecommerce.model.Product;
import com.ecommerce.model.ReservedStock;
import com.ecommerce.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final ProductService productService;
    
    /**
     * Create an order from reserved stock items
     * @param reservations List of checked-out reservations
     * @return Created order
     */
    @Transactional
    public Order createOrderFromReservations(List<ReservedStock> reservations) {
        log.debug("Creating order from {} reservations", reservations.size());
        
        if (reservations.isEmpty()) {
            log.warn("Attempted to create order with no reservations");
            return null;
        }
        
        // Convert reservations to order items
        List<Order.OrderItem> orderItems = reservations.stream()
                .map(reservation -> {
                    Product product = productService.getProductEntity(reservation.getProductId());
                    return new Order.OrderItem(
                            product.getProductId(),
                            product.getName(),
                            product.getImage(),
                            product.getPrice(),
                            reservation.getQuantity(),
                            product.getPrice() * reservation.getQuantity()
                    );
                })
                .collect(Collectors.toList());
        
        // Calculate total amount
        double totalAmount = orderItems.stream()
                .mapToDouble(Order.OrderItem::getSubtotal)
                .sum();
        
        // Create and save order
        Order order = new Order(orderItems, totalAmount);
        Order savedOrder = orderRepository.save(order);
        
        log.info("Created order {} with total amount ${}", savedOrder.getId(), totalAmount);
        
        return savedOrder;
    }
    
    /**
     * Get all orders
     */
    public List<Order> getAllOrders() {
        log.debug("Fetching all orders");
        return orderRepository.findAll();
    }
    
    /**
     * Get orders by status
     */
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        log.debug("Fetching orders with status {}", status);
        return orderRepository.findByStatus(status);
    }
    
    /**
     * Get order by ID
     */
    public Order getOrderById(String orderId) {
        log.debug("Fetching order with ID {}", orderId);
        return orderRepository.findById(orderId).orElse(null);
    }
}

