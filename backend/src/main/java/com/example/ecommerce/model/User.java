package com.example.ecommerce.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private List<String> roles; // Supports multiple roles like "USER", "ADMIN"

    // Constructors
    public User() {}

    public User(String username, String password, List<String> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }

    // Utility Methods
    public boolean isAdmin() {
        return roles.contains("ADMIN");
    }

    public boolean isUser() {
        return roles.contains("USER");
    }
    public User(String username, String password, List<String> roles) {
    this.username = username;
    this.password = password;
    this.roles = roles;
}

}
