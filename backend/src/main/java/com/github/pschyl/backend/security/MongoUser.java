package com.github.pschyl.backend.security;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class MongoUser {

    private final String id;
    private final String firstName;
    private final String lastName;
    private final String mail;
    private final String username;
    private final String password;

}
