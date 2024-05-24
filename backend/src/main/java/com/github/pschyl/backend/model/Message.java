package com.github.pschyl.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class Message {

    private final String id;
    private final String addressee;
    private final String recipient;
    private final String header;
    private final String message;
    private final LocalDateTime timestamp;

}
