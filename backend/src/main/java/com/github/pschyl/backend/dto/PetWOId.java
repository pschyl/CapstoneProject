package com.github.pschyl.backend.dto;

import com.github.pschyl.backend.model.Shelter;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class PetWOId {

    private final String name;
    private final String species;
    private final Shelter shelter;
    private final List<String> images;
}
