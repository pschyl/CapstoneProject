package com.github.pschyl.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Shelter {

    private final String id;
    private final String name;
    private final String postalCode;
    private final Coordinates coordinates;

}
