package com.github.pschyl.backend.repository;


import com.github.pschyl.backend.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<AppUser, String> {
    Optional<AppUser> findUserByUserName(String username);
}
