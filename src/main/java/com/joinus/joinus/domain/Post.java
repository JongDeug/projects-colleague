package com.joinus.joinus.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Post {
    @Id @GeneratedValue
    private Long id;

    private String userId;
    private String title;
    private String content;
    private int hit = 0;
    private LocalDateTime createTime;
    private boolean type;
}
