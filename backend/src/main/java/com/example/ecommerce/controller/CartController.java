//Integrated Email Notifications

package com.example.ecommerce.controller;

import com.example.ecommerce.model.Cart;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    // Get the cart for a specific user
    @GetMapping("/{userId}")
    public Optional<Cart> getCart(@PathVariable String userId) {
        return cartRepository.findByUserId(userId);
    }

    // Checkout the cart and create an order
    @PostMapping("/{userId}/checkout")
    public String checkout(@PathVariable String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Create an Order from the cart
        Order order = new Order();
        order.setUserId(userId);
        order.setOrderDate(new Date());
        order.setItems(cart.getItems().stream().map(cartItem -> {
            Order.OrderItem orderItem = new Order.OrderItem();
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(19.99); // Example price; replace with dynamic price lookup
            return orderItem;
        }).toList());

        orderRepository.save(order);
        cartRepository.delete(cart);

        // Send email notification
        emailService.sendOrderConfirmation(
                "user@example.com", // Replace with actual user email
                "Order Confirmation",
                "Thank you for your order! Your items will be shipped soon."
        );

        return "Checkout successful!";
    }

    // Remove an item from the cart
    @DeleteMapping("/{userId}/{productId}")
    public Cart removeItemFromCart(@PathVariable String userId, @PathVariable String productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }
}
