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
        analytics.put("totalSales", 5000);
        analytics.put("totalOrders", 120);
        analytics.put("topProducts", List.of("Product A", "Product B", "Product C"));
        return analytics;
    }
}
