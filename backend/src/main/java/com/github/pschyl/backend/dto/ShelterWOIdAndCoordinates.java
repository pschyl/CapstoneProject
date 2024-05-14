package com.github.pschyl.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ShelterWOIdAndCoordinates {

    private final String name;
    private final String postalCode;
}
