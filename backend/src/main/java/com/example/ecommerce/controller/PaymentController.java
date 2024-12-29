package com.example.ecommerce.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping
    public Map<String, String> processPayment(@RequestBody Map<String, Object> paymentDetails) {
        // Simulated payment processing logic
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Payment processed successfully");
        return response;
    }
}
