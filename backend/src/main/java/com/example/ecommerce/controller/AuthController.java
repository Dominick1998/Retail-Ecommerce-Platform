package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String registerUser(@RequestBody Map<String, String> userData) {
        return authService.registerUser(userData.get("username"), userData.get("password"), "USER");
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, String> credentials) {
        Optional<User> user = authService.authenticate(credentials.get("username"), credentials.get("password"));
        if (user.isPresent()) {
            return Map.of("message", "Login successful", "role", user.get().getRole(), "username", user.get().getUsername());
        }
        return Map.of("message", "Invalid credentials");
    }
}
