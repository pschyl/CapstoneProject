package com.github.pschyl.backend.repository;

import com.github.pschyl.backend.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends MongoRepository<Message, String> {

}
