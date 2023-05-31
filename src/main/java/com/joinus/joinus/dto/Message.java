package com.joinus.joinus.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Data
public class Message {
    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime sendTime;

    public Message(String sender, String receiver, String content, LocalDateTime sendTime) {
        this.sender= sender;
        this.receiver= receiver;
        this.content= content;
        this.sendTime = sendTime;
    }
}
