// Role-based access control + password encoder setup

package com.example.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    // Password encoder bean for hashing and validating user passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Role-based access control and security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and() // Optional: Enable CORS if frontend is hosted separately
            .authorizeRequests()
                .requestMatchers(new AntPathRequestMatcher("/api/admin/**")).hasRole("ADMIN")
                .requestMatchers(new AntPathRequestMatcher("/api/user/**")).hasRole("USER")
                .requestMatchers(new AntPathRequestMatcher("/api/**")).permitAll()
                .anyRequest().authenticated()
            .and()
            .httpBasic(); // For simplicity — can be replaced by JWT Auth filter

        return http.build();
    }
}
