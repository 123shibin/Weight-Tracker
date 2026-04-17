package com.example.login.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.login.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

