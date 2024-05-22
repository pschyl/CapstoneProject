package com.github.pschyl.backend.service;

import com.github.pschyl.backend.dto.UserWOId;
import com.github.pschyl.backend.model.MongoUser;
import com.github.pschyl.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepo repo;
    private final IdService idService;
    private final HashService hashService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser user = repo.findMongoUserByUserName(username).orElseThrow(() -> new UsernameNotFoundException("User with " + username + " not found"));
        return new User(user.getUserName(), user.getPassword(), Collections.emptyList());
    }

    public MongoUser registerNewUser(UserWOId newUser) {

        MongoUser user = new MongoUser(
                idService.generateId(),
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getMail(),
                newUser.getUserName(),
                hashService.hashPassword(newUser.getPassword())
        );

        repo.save(user);
        return user;
    }
}
