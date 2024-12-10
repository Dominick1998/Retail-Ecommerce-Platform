package com.example.ecommerce.controller;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/{userId}")
    public Optional<Cart> getCart(@PathVariable String userId) {
        return cartRepository.findByUserId(userId);
    }

    @PostMapping("/{userId}")
    public Cart addItemToCart(@PathVariable String userId, @RequestBody Cart.CartItem item) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart());
        cart.setUserId(userId);
        cart.getItems().add(item);
        return cartRepository.save(cart);
    }

    @DeleteMapping("/{userId}/{productId}")
    public Cart removeItemFromCart(@PathVariable String userId, @PathVariable String productId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    @PostMapping("/{userId}/checkout")
public String checkout(@PathVariable String userId) {
    Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
    // Process checkout (e.g., save to orders collection)
    cartRepository.delete(cart);
    return "Checkout successful!";
    }
}
