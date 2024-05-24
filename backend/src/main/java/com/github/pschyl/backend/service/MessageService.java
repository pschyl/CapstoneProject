package com.github.pschyl.backend.service;

import com.github.pschyl.backend.model.Message;
import com.github.pschyl.backend.repository.MessageRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepo repo;
    private final IdService idService;


    public List<Message> getAllMessages() {
        return repo.findAll();
    }
}
