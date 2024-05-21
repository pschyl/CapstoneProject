package com.github.pschyl.backend.model;

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
