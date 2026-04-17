package com.example.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.login.dto.RegisterRequest;
import com.example.login.models.User;
import com.example.login.repository.UserRepository;
import com.example.login.models.User;


@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    public void register(RegisterRequest request) {
    	User user = new User();
        user.setEmail(request.getEmail());
        user.setFullname(request.getFullname());

        // 🔐 ENCRYPT PASSWORD HERE
        user.setPassword(encoder.encode(request.getPassword()));
        repo.save(user);
    }
}
