package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/users/{id}/promote")
    public User promoteUser(@PathVariable String id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRoles(List.of("ADMIN"));
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}/demote")
    public User demoteUser(@PathVariable String id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRoles(List.of("USER"));
        return userRepository.save(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
    }

    @GetMapping("/analytics")
    public Object getAnalytics() {
        return new Object() {
            public int totalUsers = userRepository.findAll().size();
            public int totalAdmins = (int) userRepository.findAll().stream()
                .filter(u -> u.getRoles().contains("ADMIN")).count();
        };
    }
}
