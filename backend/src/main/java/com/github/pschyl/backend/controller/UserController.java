package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.dto.UserWOId;
import com.github.pschyl.backend.model.AppUser;
import com.github.pschyl.backend.model.Role;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.model.UserShelterObject;
import com.github.pschyl.backend.service.ShelterService;
import com.github.pschyl.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ShelterService shelterService;

    @PostMapping
    public AppUser registerNewUser(@RequestBody UserWOId newUser) {
        return  userService.registerNewUser(newUser);
    }


    @PostMapping("/login")
    public UserShelterObject login() {
        if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().equals("[PRIVATE]")) {
            return new UserShelterObject(
                    userService.getUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()),
                    null);
        } else {
            return new UserShelterObject(null,
                    shelterService.getShelterByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
        }
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @GetMapping("/{username}")
    public AppUser getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
}
