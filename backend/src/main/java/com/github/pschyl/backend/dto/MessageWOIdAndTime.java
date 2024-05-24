package com.github.pschyl.backend.dto;

import com.github.pschyl.backend.model.Pet;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class MessageWOIdAndTime {

    private final String addressee;
    private final String recipient;
    private final String message;

}
