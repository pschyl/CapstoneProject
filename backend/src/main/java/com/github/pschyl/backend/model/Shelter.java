package com.github.pschyl.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Shelter {

    private final String id;
    private final String name;
    private final String street;
    private final String postalCode;
    private final String city;
    private final String mail;
    private final String userName;
    private final String password;
    private final Coordinates coordinates;
    private final Role role;

}

