package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<List<Message>> findMessagesByReceiverAndReceiverDeleted(String memberId, boolean isDeleted);
    Optional<List<Message>> findMessagesBySenderAndSenderDeleted(String memberId, boolean isDeleted);

    Optional<List<Message>> findMessagesByReceiver(String memberId);
    Optional<List<Message>> findMessagesBySender(String memberId);
}
