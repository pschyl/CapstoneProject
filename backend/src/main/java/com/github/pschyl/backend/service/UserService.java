package com.github.pschyl.backend.service;

import com.github.pschyl.backend.dto.UserWOId;
import com.github.pschyl.backend.model.AppUser;
import com.github.pschyl.backend.model.Role;
import com.github.pschyl.backend.model.Shelter;
import com.github.pschyl.backend.repository.ShelterRepo;
import com.github.pschyl.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepo repo;
    private final ShelterRepo shelterRepo;
    private final IdService idService;
    private final HashService hashService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> oUser = repo.findUserByUserName(username);
        if (oUser.isPresent()) {
            AppUser user = oUser.get();
            return new User(user.getUserName(), user.getPassword(), List.of(user.getRole()));
        } else {
            Shelter shelter = shelterRepo.findShelterByUserName(username).orElseThrow();
            return new User(shelter.getUserName(), shelter.getPassword(), List.of(shelter.getRole()));
        }
    }

    public AppUser registerNewUser(UserWOId newUser) {

        AppUser user = new AppUser(
                idService.generateId(),
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getMail(),
                newUser.getUserName(),
                hashService.hashPassword(newUser.getPassword()),
                Role.PRIVATE
        );

        repo.save(user);
        return user;
    }

    public AppUser getUserByUsername(String username) {
        return repo.findUserByUserName(username).orElseThrow();
    }
}
