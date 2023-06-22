package com.joinus.joinus.controller;

import com.joinus.joinus.dto.MessageForm;
import com.joinus.joinus.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageSocketController {
    private final MessageService messageService;

    //  메시지 작성 메소드 (create)
    @MessageMapping("/hello")
    @SendTo("/topic/roomId")
    public MessageForm create(MessageForm messageForm) {
        messageService.createMessage(messageForm);
        return messageForm;
    }

}
