package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.security.JwtUtil;
import com.example.ecommerce.service.RefreshTokenService;
import com.example.ecommerce.model.RefreshToken;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Tag(name = "Authentication", description = "Handles user registration, login, and refresh token")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        // Hash the password before saving
        String encodedPassword = passwordEncoder.encode(password);
        User newUser = new User(username, encodedPassword, List.of("USER")); // Default role: USER
        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully");
    }

    @Operation(summary = "Login a user and return JWT access token")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = jwtUtil.generateToken(username, user.get().getRoles());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(username);
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "accessToken", token,
                    "refreshToken", refreshToken.getToken(),
                    "roles", user.get().getRoles(),
                    "username", username
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @Operation(summary = "Generate new access token from valid refresh token")
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String requestToken = request.get("refreshToken");

        return refreshTokenService.findByToken(requestToken)
                .map(refreshToken -> {
                    if (refreshTokenService.isExpired(refreshToken)) {
                        refreshTokenService.deleteByUserId(refreshToken.getUserId());
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired");
                    }

                    String newAccessToken = jwtUtil.generateToken(refreshToken.getUserId());
                    return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token"));
    }
}
