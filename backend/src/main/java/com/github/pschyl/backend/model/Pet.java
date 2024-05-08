package com.github.pschyl.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class Pet {
    private final String id;
    private final String name;
    private final String species;
    private final Shelter shelter;
    private final List<String> images;
}
