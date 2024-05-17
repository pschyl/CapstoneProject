package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.dto.PetWOId;
import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService service;

    @GetMapping
    public List<Pet> getAllPets() {
        return service.getAllPets();
    }

    @GetMapping("/{location}/{radius}")
    public List<Pet> getAllWithinRadius(@PathVariable String location, @PathVariable int radius) {
        return service.getAllWithinRadius(location, radius);
    }

    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable String id) {
        return service.getPetById(id);
    }

    @PostMapping
    public Pet saveNewPet(@RequestBody PetWOId newPet) {
        return service.saveNewPet(newPet);
    }

    @DeleteMapping("/{id}")
    public Pet deletePetById(@PathVariable String id) {
        return service.deletePetById(id);
    }

    @PutMapping("/{id}")
    public Pet editPetById(@PathVariable String id, @RequestBody Pet editedPet) {
        return service.editPetById(id, editedPet);
    }

}
