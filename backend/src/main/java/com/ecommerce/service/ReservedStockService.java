package com.ecommerce.service;

import com.ecommerce.exception.InsufficientStockException;
import com.ecommerce.model.Order;
import com.ecommerce.model.Product;
import com.ecommerce.model.ReservedStock;
import com.ecommerce.repository.ReservedStockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservedStockService {

    private final ReservedStockRepository reservedStockRepository;
    private final ProductService productService;
    private final OrderService orderService;

    @Transactional
    public void reserveStock(Long productId, Integer quantity) {
        log.debug("Reserving {} units of product {}", quantity, productId);

        // Check available stock
        Product product = productService.getProductEntity(productId);
        int currentReserved = getTotalReservedQuantity(productId);
        int availableStock = product.getQuantity() - currentReserved;

        if (availableStock < quantity) {
            throw new InsufficientStockException(
                    String.format("Insufficient stock for product %d. Available: %d, Requested: %d",
                            productId, availableStock, quantity));
        }

        // Create reservation
        ReservedStock reservation = new ReservedStock(productId, quantity);
        reservedStockRepository.save(reservation);

        log.info("Reserved {} units of product {}", quantity, productId);
    }

    /**
     * Reserve stock for checkout with custom TTL (5 minutes)
     * This is called when user clicks "Proceed to Checkout"
     */
    @Transactional
    public void reserveStockForCheckout(Long productId, Integer quantity, int expiryMinutes) {
        log.debug("Reserving {} units of product {} for checkout (expires in {} minutes)",
                quantity, productId, expiryMinutes);

        // Check available stock
        Product product = productService.getProductEntity(productId);
        int currentReserved = getTotalReservedQuantity(productId);
        int availableStock = product.getQuantity() - currentReserved;

        if (availableStock < quantity) {
            throw new InsufficientStockException(
                    String.format("Insufficient stock for product %d. Available: %d, Requested: %d",
                            productId, availableStock, quantity));
        }

        // Create reservation with custom expiry
        ReservedStock reservation = new ReservedStock(productId, quantity, expiryMinutes);
        reservedStockRepository.save(reservation);

        log.info("Reserved {} units of product {} for checkout (expires in {} minutes)",
                quantity, productId, expiryMinutes);
    }

    @Transactional
    public void updateReservation(Long productId, Integer newQuantity) {
        log.debug("Updating reservation for product {} to {} units for single user", productId, newQuantity);

        // Release old reservations
        releaseStock(productId);

        // Create new reservation if quantity > 0
        if (newQuantity > 0) {
            reserveStock(productId, newQuantity);
        }
    }

    @Transactional
    public void releaseStock(Long productId) {
        log.debug("Releasing stock for product {}", productId);

        List<ReservedStock> reservations = reservedStockRepository
                .findByProductIdAndStatus(productId, ReservedStock.ReservationStatus.RESERVED);

        reservations.forEach(reservation -> {
            reservation.setStatus(ReservedStock.ReservationStatus.RELEASED);
            reservation.setReleasedAt(LocalDateTime.now());
            reservedStockRepository.save(reservation);
        });

        log.info("Released stock for product {}", productId);
    }

    @Transactional
    public void releaseAllStock() {
        log.debug("Releasing all stock");

        List<ReservedStock> reservations = reservedStockRepository
                .findByStatus(ReservedStock.ReservationStatus.RESERVED);

        reservations.forEach(reservation -> {
            reservation.setStatus(ReservedStock.ReservationStatus.RELEASED);
            reservation.setReleasedAt(LocalDateTime.now());
            reservedStockRepository.save(reservation);
        });

        log.info("Released all stock");
    }

    @Transactional
    public Order checkoutReservations() {
        log.debug("Checking out reservations");

        List<ReservedStock> reservations = reservedStockRepository
                .findByStatus(ReservedStock.ReservationStatus.RESERVED);

        if (reservations.isEmpty()) {
            log.warn("No reservations to checkout");
            return null;
        }

        // Mark reservations as checked out and reduce product quantities
        reservations.forEach(reservation -> {
            reservation.setStatus(ReservedStock.ReservationStatus.CHECKED_OUT);
            reservedStockRepository.save(reservation);

            // Reduce actual product quantity
            Product product = productService.getProductEntity(reservation.getProductId());
            int newQuantity = product.getQuantity() - reservation.getQuantity();
            productService.updateProductQuantity(reservation.getProductId(), newQuantity);
        });

        log.info("Checked out {} reservations", reservations.size());

        // Create order from checked-out reservations
        Order order = orderService.createOrderFromReservations(reservations);

        if (order != null) {
            log.info("Created order {} for checkout", order.getId());
        }

        return order;
    }
    
    public int getTotalReservedQuantity(Long productId) {
        List<ReservedStock> reservations = reservedStockRepository
                .findByProductIdAndStatus(productId, ReservedStock.ReservationStatus.RESERVED);
        
        return reservations.stream()
                .mapToInt(ReservedStock::getQuantity)
                .sum();
    }
    
    public int getAvailableStock(Long productId) {
        Product product = productService.getProductEntity(productId);
        int reserved = getTotalReservedQuantity(productId);
        return product.getQuantity() - reserved;
    }
}

