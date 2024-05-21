package com.github.pschyl.backend.dto;

import com.github.pschyl.backend.model.Coordinates;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ShelterWOIdAndCoordinates {

    private final String name;
    private final String street;
    private final String postalCode;
    private final String city;
    private final String mail;
    private final String userName;
    private final String password;

}
