package com.ecommerce.repository;

import com.ecommerce.model.ReservedStock;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservedStockRepository extends MongoRepository<ReservedStock, String> {

    List<ReservedStock> findByProductIdAndStatus(Long productId, ReservedStock.ReservationStatus status);

    List<ReservedStock> findByUserIdAndStatus(String userId, ReservedStock.ReservationStatus status);

    List<ReservedStock> findByStatus(ReservedStock.ReservationStatus status);
}

