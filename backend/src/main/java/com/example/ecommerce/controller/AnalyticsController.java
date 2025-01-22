// simulate analytics

package com.example.ecommerce.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping
    public Map<String, Object> getAnalytics() {
        // Simulated analytics data
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalSales", 12000.50);
        analytics.put("totalOrders", 300);
        analytics.put("topCategories", List.of("Electronics", "Books", "Clothing"));
        return analytics;
    }
}
