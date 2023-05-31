package com.joinus.joinus.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Message {
    @Id @GeneratedValue
    private Long id;
    private String sender;
    private String receiver;
    private String title;
    private String content;
    private LocalDateTime sendTime;
    private boolean checked = false;
}
