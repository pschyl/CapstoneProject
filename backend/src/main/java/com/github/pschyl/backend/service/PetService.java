package com.github.pschyl.backend.service;

import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.repository.PetRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepo repo;

    public List<Pet> getAllPets() {
        return repo.findAll();
    }
}
