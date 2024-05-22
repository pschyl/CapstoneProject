package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.dto.ShelterWOIdAndCoordinates;
import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.service.PetService;
import com.github.pschyl.backend.service.ShelterService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelter")
@RequiredArgsConstructor
public class ShelterController {

    private final ShelterService service;

    @GetMapping
    public List<Shelter> getAllShelter() {
        return service.getAllShelter();
    }

    @PostMapping
    public Shelter saveNewShelter(@RequestBody ShelterWOIdAndCoordinates newShelter) {
        return service.saveNewShelter(newShelter);
    }

}
