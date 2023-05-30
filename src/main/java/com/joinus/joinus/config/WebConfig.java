package com.joinus.joinus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true).allowedOrigins("http://127.0.0.1:8000", "http://localhost:8080");
//        .allowedOrigins("http://localhost:8080", "http://localhost:8081");
    }
}