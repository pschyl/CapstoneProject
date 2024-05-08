package com.github.pschyl.backend.repository;

import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.model.Shelter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterRepo extends MongoRepository<Shelter, String> {
}
