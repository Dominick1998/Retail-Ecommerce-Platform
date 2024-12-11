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

     @PostMapping("/{userId}/checkout")
public String checkout(@PathVariable String userId) {
    Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
    
    // Create an Order from the cart
    Order order = new Order();
    order.setUserId(userId);
    order.setOrderDate(new Date());
    order.setItems(cart.getItems().stream().map(cartItem -> {
        Order.OrderItem orderItem = new Order.OrderItem();
        orderItem.setProductId(cartItem.getProductId());
        orderItem.setQuantity(cartItem.getQuantity());
        // Add price lookup from the product repository if necessary
        orderItem.setPrice(19.99); // Example price
        return orderItem;
    }).toList());

    orderRepository.save(order);
    cartRepository.delete(cart);
    return "Checkout successful!";
}

    @DeleteMapping("/{userId}/{productId}")
    public Cart removeItemFromCart(@PathVariable String userId, @PathVariable String productId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }
}
