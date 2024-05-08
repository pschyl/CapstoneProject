package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.service.PetService;
import com.github.pschyl.backend.service.ShelterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
