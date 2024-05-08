package com.github.pschyl.backend.service;

import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.PetRepo;
import com.github.pschyl.backend.repository.ShelterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShelterService {

    private final ShelterRepo repo;

    public List<Shelter> getAllShelter() {
        return repo.findAll();
    }
}
