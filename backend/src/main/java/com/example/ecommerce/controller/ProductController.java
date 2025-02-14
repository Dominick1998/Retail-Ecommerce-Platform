package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Get all products with pagination and sorting
    @GetMapping
    public Page<Product> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder) {

        Sort sort = sortOrder.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return productRepository.findAll(pageable);
    }

    // Get all products without pagination
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get a single product by ID
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable String id) {
        return productRepository.findById(id);
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    // Search products by name
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    // Create a new product (Admin only)
    @PostMapping
    public Object createProduct(@RequestBody Product product, HttpServletRequest request) {
        List<String> roles = jwtUtil.extractRolesFromRequest(request);

        if (roles.contains("ADMIN")) {
            return productRepository.save(product);
        } else {
            return "Unauthorized - Only admins can add products";
        }
    }

    // Update an existing product (Admin only)
    @PutMapping("/{id}")
    public Object updateProduct(@PathVariable String id, @RequestBody Product updatedProduct, HttpServletRequest request) {
        List<String> roles = jwtUtil.extractRolesFromRequest(request);

        if (roles.contains("ADMIN")) {
            return productRepository.findById(id)
                    .map(product -> {
                        product.setName(updatedProduct.getName());
                        product.setPrice(updatedProduct.getPrice());
                        product.setDescription(updatedProduct.getDescription());
                        product.setCategory(updatedProduct.getCategory());
                        return productRepository.save(product);
                    })
                    .orElseThrow(() -> new RuntimeException("Product not found"));
        } else {
            return "Unauthorized - Only admins can update products";
        }
    }

    // Delete a product by ID (Admin only)
    @DeleteMapping("/{id}")
    public Object deleteProduct(@PathVariable String id, HttpServletRequest request) {
        List<String> roles = jwtUtil.extractRolesFromRequest(request);

        if (roles.contains("ADMIN")) {
            productRepository.deleteById(id);
            return "Product deleted successfully";
        } else {
            return "Unauthorized - Only admins can delete products";
        }
    }
}
