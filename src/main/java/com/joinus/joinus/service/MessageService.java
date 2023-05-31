package com.joinus.joinus.service;

import com.joinus.joinus.domain.Message;
import com.joinus.joinus.persistence.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final SimpMessageSendingOperations messagingTemplate;



    public void createMessage(Message message){
//        messagingTemplate.convertAndSend("/sub/" + message.getReceiver(), message.getContent());
        message.setSendTime(LocalDateTime.now());
        messageRepository.save(message);
    }
    public List<Message> getAll(){
        return messageRepository.findAll();
    }
    public List<Message> getReceivedList(String memberId){
        if (messageRepository.findMessagesByReceiver(memberId).isPresent())
            return messageRepository.findMessagesByReceiver(memberId).get();
        return null;
    }
    public List<Message> getSentList(String memberId){
        if (messageRepository.findMessagesBySender(memberId).isPresent())
            return messageRepository.findMessagesBySender(memberId).get();
        return null;
    }
    public Message readMessageDetail(Long messageId){
        return messageRepository.findById(messageId).get();
    }
    public void deleteMessage(Long messageId){
        Message message = messageRepository.findById(messageId).get();
        messageRepository.delete(message);
    }

    @MessageMapping("/{userId}")
    public void message(@DestinationVariable("userId") Long userId) {
        messagingTemplate.convertAndSend("/sub/" + userId, "alarm socket connection completed.");
    }
}
