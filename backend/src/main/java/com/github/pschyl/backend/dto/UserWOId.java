package com.github.pschyl.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserWOId {

    private final String firstName;
    private final String lastName;
    private final String mail;
    private final String username;
    private final String password;

}