package com.example.ecommerce.controller;

import com.example.ecommerce.model.Wishlist;
import com.example.ecommerce.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    @Autowired
    private WishlistRepository wishlistRepository;

    // Get the wishlist for a specific user
    @GetMapping("/{userId}")
    public Optional<Wishlist> getWishlist(@PathVariable String userId) {
        return wishlistRepository.findByUserId(userId);
    }

    // Add a product to the wishlist
    @PutMapping("/{userId}/add/{productId}")
    public Wishlist addToWishlist(@PathVariable String userId, @PathVariable String productId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElse(new Wishlist());
        wishlist.setUserId(userId);
        wishlist.getProductIds().add(productId);
        return wishlistRepository.save(wishlist);
    }

    // Remove a product from the wishlist
    @PutMapping("/{userId}/remove/{productId}")
    public Wishlist removeFromWishlist(@PathVariable String userId, @PathVariable String productId) {
        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));
        wishlist.getProductIds().remove(productId);
        return wishlistRepository.save(wishlist);
    }
}
