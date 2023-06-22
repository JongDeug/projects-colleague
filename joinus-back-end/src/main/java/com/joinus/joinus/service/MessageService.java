package com.joinus.joinus.service;

import com.joinus.joinus.domain.Message;
import com.joinus.joinus.dto.MessageForm;
import com.joinus.joinus.persistence.MessageRepository;
import lombok.RequiredArgsConstructor;
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

    public void createMessage(MessageForm messageForm){
        Message message = new Message();
        message.setSender(messageForm.getSender());
        message.setReceiver(messageForm.getReceiver());
        message.setContent(messageForm.getContent());
        message.setSendTime(LocalDateTime.now());
        messageRepository.save(message);
    }
    public List<Message> getAll(){
        return messageRepository.findAll();
    }
    public List<Message> getReceivedList(String memberId){
        if (messageRepository.findMessagesByReceiverAndReceiverDeleted(memberId, false).isPresent())
            return messageRepository.findMessagesByReceiverAndReceiverDeleted(memberId, false).get();
        return null;
    }
    public List<Message> getSentList(String memberId){
        if (messageRepository.findMessagesBySenderAndSenderDeleted(memberId, false).isPresent())
            return messageRepository.findMessagesBySenderAndSenderDeleted(memberId, false).get();
        return null;
    }
    public Message readMessageDetail(Long messageId){
        return messageRepository.findById(messageId).get();
    }
    public void deleteMessage(Long messageId, String actor){
        Message message = messageRepository.findById(messageId).get();

        if (actor.equals("sender"))
            message.setSenderDeleted(true);
        else if (actor.equals("receiver"))
            message.setReceiverDeleted(true);

        if (message.isSenderDeleted() && message.isReceiverDeleted())
            messageRepository.delete(message);
        else
            messageRepository.save(message);
    }

    public void updateMessage(Long messageId, boolean check){
        Message message = messageRepository.findById(messageId).get();
        message.setChecked(check);
        messageRepository.save(message);
    }
}
