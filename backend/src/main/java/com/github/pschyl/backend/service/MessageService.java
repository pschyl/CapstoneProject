package com.github.pschyl.backend.service;

import com.github.pschyl.backend.dto.MessageWOIdAndTime;
import com.github.pschyl.backend.model.Message;
import com.github.pschyl.backend.repository.MessageRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepo repo;
    private final IdService idService;
    private final CurrentTimeService currentTimeService;


    public List<Message> getAllMessages() {
        return repo.findAll();
    }

    public Message saveNewMessage(MessageWOIdAndTime newMessage) {
        Message message = new Message(
                idService.generateId(),
                newMessage.getAddressee(),
                newMessage.getRecipient(),
                newMessage.getHeader(),
                newMessage.getMessage(),
                currentTimeService.getCurrentTime()
        );
        repo.save(message);
        return message;
    }

    public List<Message> getAllMessagesWithUsername(String username) {
        return repo.findAll().stream()
                .filter(message -> message.getAddressee().contains(username) || message.getRecipient().contains(username))
                .sorted(Comparator.comparing(Message::getTimestamp).reversed())
                .toList();

    }
}
