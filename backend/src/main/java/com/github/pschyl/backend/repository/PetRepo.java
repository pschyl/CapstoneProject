package com.github.pschyl.backend.repository;

import com.github.pschyl.backend.model.Pet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepo extends MongoRepository<Pet, String> {
}
