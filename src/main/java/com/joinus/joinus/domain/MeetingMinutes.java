package com.joinus.joinus.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class MeetingMinutes {
    @Id @GeneratedValue
    private Long id;
    private Long teamId;
    private String meetingName;
    private String location;
    private String agenda;
    private String content;
    private String improvements;
    private String writerDepartment;
    private String writerName;
    private LocalDateTime createTime;

}
