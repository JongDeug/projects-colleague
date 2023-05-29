package com.joinus.joinus.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Calendar {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private LocalDateTime start;
    private LocalDateTime end;
    private Long teamId;
}
