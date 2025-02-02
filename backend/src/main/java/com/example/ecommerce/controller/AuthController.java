package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String registerUser(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        if (userRepository.findByUsername(username).isPresent()) {
            return "User already exists";
        }

        User newUser = new User(username, password, List.of("USER")); // Default role: USER
        userRepository.save(newUser);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && user.get().getPassword().equals(password)) { // Replace with password hashing in production
            String token = jwtUtil.generateToken(username, user.get().getRoles());
            return Map.of("message", "Login successful", "token", token, "roles", user.get().getRoles(), "username", username);
        }
        return Map.of("message", "Invalid credentials");
    }
}
