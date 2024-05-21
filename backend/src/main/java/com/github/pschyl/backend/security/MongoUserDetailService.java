package com.github.pschyl.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

@RequiredArgsConstructor
public class MongoUserDetailService implements UserDetailsService {

    private final MongoUserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser user = repo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with " + username + " not found"));
        return new User(user.getUsername(), user.getPassword(), Collections.emptyList());
    }

}
