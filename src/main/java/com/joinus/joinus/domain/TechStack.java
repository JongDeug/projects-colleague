package com.joinus.joinus.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class TechStack {
    @Id @GeneratedValue
    private Long id;
    private String techStack;
}
