package com.joinus.joinus.controller;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostMsgController {

    @MessageMapping("/hello")
    @SendTo("/topic/roomId")
    public Message broadCast(Message message){
        return message;
    }

}