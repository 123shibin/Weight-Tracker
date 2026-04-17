package com.example.login.controller;

import com.example.login.models.User;
import com.example.login.models.Weight;
import com.example.login.repository.WeightRepository;
import com.example.login.repository.UserRepository;
import com.example.login.service.WeightServiceImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/weights")
public class WeightController {

    @Autowired
    private WeightServiceImpl weightService;

    @PostMapping("/add")
    public ResponseEntity<?> addWeight(
            @RequestParam Double weightValue,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(weightService.addWeight(weightValue, email));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editWeight(
            @PathVariable Long id,
            @RequestParam Double newWeight,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(weightService.editWeight(id, newWeight, email));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteWeight(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(weightService.deleteWeight(id, email));
    }

    @GetMapping("/list")
    public ResponseEntity<?> listWeights(
            Authentication authentication,
            Pageable pageable
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(weightService.listWeights(email, pageable));
    }

    @GetMapping("/compare")
    public ResponseEntity<?> compareWeightLoss(
            @RequestParam String startDate,
            @RequestParam String endDate,
            Authentication authentication
    ) {
        String email = authentication.getName();

        Double loss = weightService.compareWeightLoss(
                email,
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)
        );

        return ResponseEntity.ok( loss + " kg");
    }
}

