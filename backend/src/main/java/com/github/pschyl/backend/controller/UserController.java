package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.dto.UserWOId;
import com.github.pschyl.backend.model.MongoUser;
import com.github.pschyl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public MongoUser registerNewUser(@RequestBody UserWOId newUser) {
        return  service.registerNewUser(newUser);
    }


    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
