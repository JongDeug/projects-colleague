package com.joinus.joinus.service;

import com.joinus.joinus.persistence.MessageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Service
@Transactional
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler{
    private final MessageRepository messageRepository;

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession sesion) throws Exception{

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{

    }

}
