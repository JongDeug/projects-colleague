package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Message;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.MessageService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/message")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    @GetMapping("/list")
    public List<Message> getMessageList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        return messageService.readMessageList(member.getId());
    }

    @GetMapping("/detail")
    public Message getMessageDetail(Long messageId){
        return messageService.readMessageDetail(messageId);
    }

    @PostMapping("/create")
    public Response create(@RequestBody Message message, HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        message.setSender(member.getId());
        messageService.createMessage(message);
        Response response = new Response();
        response.setData("success");
        response.setRedirect("oo");
        return response;
    }
    @PostMapping("/delete")
    public Response delete(@RequestParam Long messageId) {
        messageService.deleteMessage(messageId);
        Response response = new Response();
        response.setData("success");
        response.setRedirect("oo");
        return response;
    }
}
