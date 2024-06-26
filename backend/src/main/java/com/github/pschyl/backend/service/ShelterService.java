package com.github.pschyl.backend.service;

import com.github.pschyl.backend.dto.ShelterWOIdAndCoordinates;
import com.github.pschyl.backend.model.Role;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.ShelterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShelterService {

    private final ShelterRepo repo;
    private final IdService idService;
    private final CoordinateService coordinateService;
    private final HashService hashService;

    public List<Shelter> getAllShelter() {
        return repo.findAll();
    }

    public Shelter saveNewShelter(ShelterWOIdAndCoordinates newShelter) {

        Shelter shelter = new Shelter(
                idService.generateId(),
                newShelter.getName(),
                newShelter.getStreet(),
                newShelter.getPostalCode(),
                newShelter.getCity(),
                newShelter.getMail(),
                newShelter.getUserName(),
                hashService.hashPassword(newShelter.getPassword()),
                coordinateService.transformLocationToCoordinates(newShelter.getPostalCode()),
                Role.SHELTER
        );
        repo.save(shelter);
        return shelter;

    }

    public Shelter getShelterByUsername(String username) {
        return repo.findShelterByUserName(username).orElseThrow();
    }
}

