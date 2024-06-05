package com.github.pschyl.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> {
                    request.requestMatchers("/api/messages").authenticated();
                    request.requestMatchers("/api/user/login").permitAll();
                    request.requestMatchers("/api/user").authenticated();
                    request.requestMatchers(HttpMethod.POST, "/api/pets").authenticated();
                    request.requestMatchers(HttpMethod.PUT, "/api/pets").authenticated();
                    request.requestMatchers(HttpMethod.DELETE, "/api/pets").authenticated();
                    request.requestMatchers(HttpMethod.GET, "/api/pets").permitAll();
                    request.anyRequest().permitAll();
                })
                .sessionManagement(client -> client.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .httpBasic(Customizer.withDefaults())
                .logout(Customizer.withDefaults())
                .build();
    }

}
