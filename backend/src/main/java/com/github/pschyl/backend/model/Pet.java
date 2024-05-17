package com.github.pschyl.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class Pet {
    private final String id;
    private final String name;
    private final String type;
    private final String species;
    private final String gender;
    private final String castrated;
    private final String age;
    private final String description;
    private final List<String> images;
    private final Shelter shelter;
}
