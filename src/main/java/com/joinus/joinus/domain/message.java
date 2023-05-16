package com.joinus.joinus.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class message {
    @Id @GeneratedValue
    private Long id;
    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime sendTime;
}
