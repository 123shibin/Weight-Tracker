package com.example.login.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "weights",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"user_id", "date"})
       }
)
public class Weight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Weight value
    @Column(nullable = false)
    private Double weightValue;

    // Date auto saved
    @Column(nullable = false)
    private LocalDate date;

    // ✅ Many weights belong to One user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Weight() {}

    // Getters & Setters
    public Long getId() { return id; }

    public Double getWeightValue() { return weightValue; }

    public void setWeightValue(Double weightValue) {
        this.weightValue = weightValue;
    }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() { return user; }

    public void setUser(User user) {
        this.user = user;
    }
}
