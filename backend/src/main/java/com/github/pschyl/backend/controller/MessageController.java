package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.model.Message;
import com.github.pschyl.backend.repository.MessageRepo;
import com.github.pschyl.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService service;

    @GetMapping
    public List<Message> getAllMessages() {
        return service.getAllMessages();
    }

}
