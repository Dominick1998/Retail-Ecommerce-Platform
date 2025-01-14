package com.example.ecommerce.controller;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    // Get recommended products for a user
    @GetMapping("/{userId}")
    public List<Product> getRecommendations(@PathVariable String userId) {
        // Fetch orders for the user
        List<Order> userOrders = orderRepository.findByUserId(userId);

        // Collect product IDs from user's order history
        Set<String> purchasedProductIds = userOrders.stream()
                .flatMap(order -> order.getItems().stream())
                .map(Order.OrderItem::getProductId)
                .collect(Collectors.toSet());

        // Fetch products not purchased by the user for recommendations
        return productRepository.findAll().stream()
                .filter(product -> !purchasedProductIds.contains(product.getId()))
                .limit(5) // Limit to 5 recommendations
                .collect(Collectors.toList());
    }
}
