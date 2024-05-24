package com.github.pschyl.backend.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    SHELTER,
    PRIVATE;


    @Override
    public String getAuthority() {
        return null;
    }
}
