package com.joinus.joinus.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageForm {
    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime sendTime;
}