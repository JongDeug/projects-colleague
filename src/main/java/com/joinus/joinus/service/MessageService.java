package com.joinus.joinus.service;

import com.joinus.joinus.domain.Message;
import com.joinus.joinus.persistence.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public void createMessage(Message message){
        messageRepository.save(message);
    }
    public List<Message> readMessageList(String memberId){
        return messageRepository.findMessagesByReceiver(memberId).get();
    }
    public Message readMessageDetail(Long messageId){
        return messageRepository.findById(messageId).get();
    }
    public void deleteMessage(Long messageId){
        Message message = messageRepository.findById(messageId).get();
        messageRepository.delete(message);
    }

}
