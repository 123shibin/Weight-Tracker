package com.example.login.repository;

import com.example.login.models.Weight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface WeightRepository extends JpaRepository<Weight, Long> {

    // Only 1 weight per day check
    boolean existsByUserIdAndDate(Long userId, LocalDate date);

    // Pagination listing
    Page<Weight> findByUserIdOrderByDateDesc(Long userId, Pageable pageable);

    // Compare weight between dates
    Optional<Weight> findTopByUserIdAndDate(Long userId, LocalDate date);
}
