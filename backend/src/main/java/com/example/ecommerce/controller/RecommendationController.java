/*
Endpoints:
GET /api/recommendations/{userId}: Fetch personalized recommendations for a user.
GET /api/recommendations/{userId}/category/{category}: Fetch recommendations filtered by category.
GET /api/recommendations/trending: Fetch globally trending products.
*/

package com.example.ecommerce.controller;

import com.example.ecommerce.model.Feedback;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.FeedbackRepository;
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

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Get recommended products for a user
    @GetMapping("/{userId}")
    public List<Product> getRecommendations(@PathVariable String userId) {
        // Fetch user's order history
        List<Order> userOrders = orderRepository.findByUserId(userId);

        // Collect product IDs from user's order history
        Set<String> purchasedProductIds = userOrders.stream()
                .flatMap(order -> order.getItems().stream())
                .map(Order.OrderItem::getProductId)
                .collect(Collectors.toSet());

        // Collect "Not Interested" product IDs from feedback
        Set<String> notInterestedProductIds = feedbackRepository.findByUserIdAndFeedbackType(userId, "not_interested")
                .stream()
                .map(Feedback::getProductId)
                .collect(Collectors.toSet());

        // Calculate product popularity (number of times purchased)
        Map<String, Long> productPopularity = orderRepository.findAll().stream()
                .flatMap(order -> order.getItems().stream())
                .collect(Collectors.groupingBy(Order.OrderItem::getProductId, Collectors.counting()));

        // Fetch all products and filter out purchased and "Not Interested" products
        return productRepository.findAll().stream()
                .filter(product -> !purchasedProductIds.contains(product.getId())) // Exclude purchased products
                .filter(product -> !notInterestedProductIds.contains(product.getId())) // Exclude "Not Interested" products
                .sorted(Comparator.comparingLong(
                        product -> -productPopularity.getOrDefault(product.getId(), 0L))) // Sort by popularity
                .limit(5) // Limit to 5 recommendations
                .collect(Collectors.toList());
    }

    // Get recommended products for a user filtered by category
    @GetMapping("/{userId}/category/{category}")
    public List<Product> getRecommendationsByCategory(
            @PathVariable String userId,
            @PathVariable String category) {
        List<Product> recommendations = getRecommendations(userId); // Base recommendations logic
        return recommendations.stream()
                .filter(product -> category.equalsIgnoreCase(product.getCategory())) // Filter by category
                .collect(Collectors.toList());
    }

    // Get trending products
    @GetMapping("/trending")
    public List<Product> getTrendingProducts() {
        // Calculate product popularity based on order frequency
        Map<String, Long> productPopularity = orderRepository.findAll().stream()
                .flatMap(order -> order.getItems().stream())
                .collect(Collectors.groupingBy(Order.OrderItem::getProductId, Collectors.counting()));

        // Fetch products and sort by popularity
        return productRepository.findAll().stream()
                .sorted(Comparator.comparingLong(
                        product -> -productPopularity.getOrDefault(product.getId(), 0L))) // Sort by popularity
                .limit(5) // Limit to top 5 trending products
                .collect(Collectors.toList());
    }
}
