package com.example.ecommerce.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI ecommerceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Retail E-Commerce Platform API")
                        .description("Full documentation for the backend REST endpoints")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Dominick Ferro")
                                .email("your.email@example.com")
                                .url("https://github.com/Dominick1998")));
    }
}
