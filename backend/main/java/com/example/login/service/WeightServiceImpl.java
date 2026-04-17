package com.example.login.service;

import com.example.login.models.User;
import com.example.login.models.Weight;
import com.example.login.repository.UserRepository;
import com.example.login.repository.WeightRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class WeightServiceImpl  {

    @Autowired
    private WeightRepository weightRepo;

    @Autowired
    private UserRepository userRepo;

    // ======================================================
    // ✅ ADD WEIGHT (Only 1 per day)
    // ======================================================
    
    public String addWeight(Double weightValue, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();

        // ❌ Only 1 entry per day check
        boolean alreadyExists =
                weightRepo.existsByUserIdAndDate(user.getId(), today);

        if (alreadyExists) {
            throw new RuntimeException("Only one weight entry allowed per day!");
        }

        // ✅ Save weight
        Weight weight = new Weight();
        weight.setWeightValue(weightValue);
        weight.setDate(today);
        weight.setUser(user);

        weightRepo.save(weight);

        return "Weight added successfully!";
    }

    // ======================================================
    // ✅ EDIT WEIGHT
    // ======================================================
    
    public String editWeight(Long weightId, Double newWeight, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Weight weight = weightRepo.findById(weightId)
                .orElseThrow(() -> new RuntimeException("Weight record not found"));

        // ❌ Only owner can edit
        if (!weight.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not allowed to edit others weight record!");
        }

        weight.setWeightValue(newWeight);
        weightRepo.save(weight);

        return "Weight updated successfully!";
    }

    // ======================================================
    // ✅ DELETE WEIGHT
    // ======================================================
    
    public String deleteWeight(Long weightId, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Weight weight = weightRepo.findById(weightId)
                .orElseThrow(() -> new RuntimeException("Weight record not found"));

        // ❌ Only owner can delete
        if (!weight.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not allowed to delete others weight record!");
        }

        weightRepo.delete(weight);

        return "Weight deleted successfully!";
    }

    // ======================================================
    // ✅ LIST WEIGHTS WITH PAGINATION
    // ======================================================
    
    public Page<Weight> listWeights(String email, Pageable pageable) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return weightRepo.findByUserIdOrderByDateDesc(user.getId(), pageable);
    }

    // ======================================================
    // ✅ COMPARE WEIGHT LOSS BETWEEN TWO DATES
    // ======================================================
    
    public Double compareWeightLoss(String email, LocalDate start, LocalDate end) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Weight> startWeight =
                weightRepo.findTopByUserIdAndDate(user.getId(), start);

        Optional<Weight> endWeight =
                weightRepo.findTopByUserIdAndDate(user.getId(), end);

        if (startWeight.isEmpty() || endWeight.isEmpty()) {
            throw new RuntimeException("Weight record missing for given dates!");
        }

        return startWeight.get().getWeightValue()
                - endWeight.get().getWeightValue();
    }
}
