package com.github.pschyl.backend.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserShelterObject {

    private final AppUser user;
    private final Shelter shelter;
}
