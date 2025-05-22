package com.example.ecommerce.controller;

import com.example.ecommerce.service.StripeService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    /**
     * Creates a Stripe PaymentIntent and returns the client secret.
     * Expects JSON body: { "amount": 2500, "currency": "usd" }
     */
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> request) {
        try {
            Long amount = Long.valueOf(request.get("amount").toString());
            String currency = request.get("currency").toString();

            Map<String, Object> intent = stripeService.createPaymentIntent(amount, currency);
            return ResponseEntity.ok(intent);

        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Invalid request"));
        }
    }
}
