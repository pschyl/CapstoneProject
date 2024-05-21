package com.github.pschyl.backend.dto;

import com.github.pschyl.backend.model.Shelter;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class PetWOId {

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
