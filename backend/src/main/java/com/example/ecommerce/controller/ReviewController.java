package com.example.ecommerce.controller;

import com.example.ecommerce.model.Review;
import com.example.ecommerce.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(@PathVariable String productId) {
        return reviewRepository.findByProductId(productId);
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }
}
