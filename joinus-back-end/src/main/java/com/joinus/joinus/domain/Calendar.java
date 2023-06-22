package com.joinus.joinus.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Calendar {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String startDate;
    private String endDate;
    private Long teamId;
}
