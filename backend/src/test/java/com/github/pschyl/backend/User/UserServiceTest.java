package com.github.pschyl.backend.User;

import com.github.pschyl.backend.dto.UserWOId;
import com.github.pschyl.backend.model.AppUser;
import com.github.pschyl.backend.model.Coordinates;
import com.github.pschyl.backend.model.Role;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.ShelterRepo;
import com.github.pschyl.backend.repository.UserRepo;
import com.github.pschyl.backend.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    UserRepo mockrepo = mock(UserRepo.class);
    ShelterRepo mockrepoShelter = mock(ShelterRepo.class);
    IdService mockIdService = mock(IdService.class);
    HashService mockHashService = mock(HashService.class);
    UserService userService = new UserService(mockrepo, mockrepoShelter, mockIdService, mockHashService);


    @Test
    void registerNewUser_shouldReturnAppUser_WhenCalledWithDto() {
        //GIVEN
        UserWOId newUser = new UserWOId("Vincent", "Freckmann", "v.freckmann@yahoo.de", "vreckmann", "123");
        AppUser expected = new AppUser("1", "Vincent", "Freckmann", "v.freckmann@yahoo.de", "vreckmann", "abc", Role.PRIVATE);

        when(mockrepo.save(expected)).thenReturn(expected);
        when(mockIdService.generateId()).thenReturn("1");
        when(mockHashService.hashPassword(newUser.getPassword())).thenReturn("abc");

        //WHEN
        AppUser actual = userService.registerNewUser(newUser);

        //THEN
        verify(mockrepo).save(expected);
        verify(mockIdService).generateId();
        verify(mockHashService).hashPassword(newUser.getPassword());
        assertEquals(expected, actual);
    }

    @Test
    void getUserByUsername_shouldReturnUser_whenCalledWithUsername() {
        //GIVEN
        String username = "vreckmann";
        AppUser expected = new AppUser("1", "Vincent", "Freckmann", "v.freckmann@yahoo.de", "vreckmann", "abc", Role.PRIVATE);

        when(mockrepo.findUserByUserName(username)).thenReturn(Optional.of(expected));

        //WHEN
        AppUser actual = userService.getUserByUsername(username);

        //THEN
        verify(mockrepo).findUserByUserName(username);
        assertEquals(expected, actual);
    }

    @Test
    void loadUserByUsername_shouldReturnUser_whenCalledWithUsernameOfUser() {
        //GIVEN
        String username = "vreckmann";
        AppUser user = new AppUser("1", "Vincent", "Freckmann", "v.freckmann@yahoo.de", "vreckmann", "abc", Role.PRIVATE);
        UserDetails expected = new User(user.getUserName(), user.getPassword(), List.of(user.getRole()));

        when(mockrepo.findUserByUserName(username)).thenReturn(Optional.of(user));
        when(mockrepoShelter.findShelterByUserName(username)).thenReturn(Optional.empty());

        //WHEN
        UserDetails actual = userService.loadUserByUsername(username);

        //THEN
        verify(mockrepo).findUserByUserName(username);
        assertEquals(actual, expected);
    }

    @Test
    void loadUserByUsername_shouldReturnShelter_whenCalledWithUsernameOfShelter() {
        //GIVEN
        String username = "TH_DellB";
        Shelter shelter = new Shelter("1", "Tierheim Dellbrück", "Krasse Straße 3", "51069", "Berlin", "tierheim@yahoo.de", "TH_DellB", "123", new Coordinates(50.96214243254786, 7.086788534833288), Role.SHELTER);
        AppUser user = new AppUser("1", "Vincent", "Freckmann", "v.freckmann@yahoo.de", "vreckmann", "abc", Role.PRIVATE);

        UserDetails expected = new User(shelter.getUserName(), shelter.getPassword(), List.of(shelter.getRole()));

        when(mockrepo.findUserByUserName(username)).thenReturn(Optional.empty());
        when(mockrepoShelter.findShelterByUserName(username)).thenReturn(Optional.of(shelter));

        //WHEN
        UserDetails actual = userService.loadUserByUsername(username);

        //THEN
        verify(mockrepo).findUserByUserName(username);
        verify(mockrepoShelter).findShelterByUserName(username);
        assertEquals(actual, expected);
    }
}
