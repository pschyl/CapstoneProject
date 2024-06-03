package com.github.pschyl.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CurrentTimeService {

    public LocalDateTime getCurrentTime() {
        return LocalDateTime.now();
    }

}
