package com.example.ecommerce.repository;

import com.example.ecommerce.model.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepository extends MongoRepository<Wishlist, String> {

        // Optimized query using MongoDB indexing
    @Query(value = "{ 'userId': ?0 }", fields = "{ 'productIds': 1, '_id': 0 }")
    Optional<Wishlist> findByUserId(String userId);
}
