package com.example.ecommerce.controller;

import com.example.ecommerce.model.Wishlist;
import com.example.ecommerce.repository.WishlistRepository;
import com.example.ecommerce.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Get the wishlist for the authenticated user
    @GetMapping
    public ResponseEntity<?> getWishlist(HttpServletRequest request) {
        String userId = jwtUtil.extractUsernameFromRequest(request);
        Optional<Wishlist> wishlist = wishlistRepository.findByUserId(userId);

        return wishlist.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.status(404).body("Wishlist not found"));
    }

    // Add a product to the wishlist
    @PutMapping("/add/{productId}")
    public ResponseEntity<?> addToWishlist(@PathVariable String productId, HttpServletRequest request) {
        String userId = jwtUtil.extractUsernameFromRequest(request);
        Wishlist wishlist = wishlistRepository.findByUserId(userId).orElse(new Wishlist(userId));

        if (wishlist.getProductIds().contains(productId)) {
            return ResponseEntity.badRequest().body("Product is already in the wishlist");
        }

        wishlist.getProductIds().add(productId);
        wishlistRepository.save(wishlist);
        return ResponseEntity.ok("Product added to wishlist");
    }

    // Remove a product from the wishlist
    @PutMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable String productId, HttpServletRequest request) {
        String userId = jwtUtil.extractUsernameFromRequest(request);
        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        if (!wishlist.getProductIds().contains(productId)) {
            return ResponseEntity.badRequest().body("Product not found in wishlist");
        }

        wishlist.getProductIds().remove(productId);
        wishlistRepository.save(wishlist);
        return ResponseEntity.ok("Product removed from wishlist");
    }
}
