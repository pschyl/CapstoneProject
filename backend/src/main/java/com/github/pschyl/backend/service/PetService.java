package com.github.pschyl.backend.service;

import com.github.pschyl.backend.dto.PetWOId;
import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.repository.PetRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepo repo;
    private final IdService idService;

    public List<Pet> getAllPets() {
        return repo.findAll();
    }

    public Pet saveNewPet(PetWOId newPet) {
        Pet pet = new Pet(
                idService.generateId(),
                newPet.getName(),
                newPet.getSpecies(),
                newPet.getShelter(),
                newPet.getImages()
        );
        repo.save(pet);
        return pet;
    }
}
