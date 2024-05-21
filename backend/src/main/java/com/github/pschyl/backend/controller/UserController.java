package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.dto.UserWOId;
import com.github.pschyl.backend.model.MongoUser;
import com.github.pschyl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public MongoUser registerNewUser(@RequestBody UserWOId newUser) {
        return  service.registerNewUser(newUser);
    }
}
