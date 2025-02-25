package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Get user profile from JWT authentication
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        String username = jwtUtil.extractUsernameFromRequest(request);
        Optional<User> user = userRepository.findByUsername(username);

        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.status(404).body("User not found"));
    }

    // Update user profile
    @PutMapping("/profile/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody User updatedUser, HttpServletRequest request) {
        String username = jwtUtil.extractUsernameFromRequest(request);
        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            userRepository.save(user);
            return ResponseEntity.ok("Profile updated successfully");
        }
        return ResponseEntity.status(404).body("User not found");
    }

    // Change user password
    @PutMapping("/profile/change-password")
    public ResponseEntity<?> changePassword(@RequestBody User updatedUser, HttpServletRequest request) {
        String username = jwtUtil.extractUsernameFromRequest(request);
        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Encrypt password
            userRepository.save(user);
            return ResponseEntity.ok("Password updated successfully");
        }
        return ResponseEntity.status(404).body("User not found");
    }

    // Register new user with hashed password
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Authenticate user and generate JWT token
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername(), existingUser.get().getRoles());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(401).body("Invalid credentials.");
    }
}
