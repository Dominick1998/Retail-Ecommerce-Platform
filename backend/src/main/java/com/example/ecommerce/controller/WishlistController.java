package com.example.ecommerce.controller;

import com.example.ecommerce.model.Wishlist;
import com.example.ecommerce.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/wishlists")
public class WishlistController {
    @Autowired
    private WishlistRepository wishlistRepository;

    @GetMapping("/{userId}")
    public Optional<Wishlist> getWishlist(@PathVariable String userId) {
        return wishlistRepository.findByUserId(userId);
    }

    @PutMapping("/{userId}")
    public Wishlist updateWishlist(@PathVariable String userId, @RequestBody Wishlist updatedWishlist) {
        return wishlistRepository.findByUserId(userId)
                .map(wishlist -> {
                    wishlist.setProductIds(updatedWishlist.getProductIds());
                    return wishlistRepository.save(wishlist);
                })
                .orElseGet(() -> wishlistRepository.save(updatedWishlist));
    }
}
