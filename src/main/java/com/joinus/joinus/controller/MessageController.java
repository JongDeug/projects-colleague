package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.MessageForm;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.MessageService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/message")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    @GetMapping("/list")
    public Response getAllMessages(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        Response response = new Response();
        response.setData(messageService.getAll());
        response.setRedirect("/postMsg");

        return response;
    }
    @GetMapping("/list/received")
    public Response getReceivedMessages(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        Response response = new Response();
        response.setData(messageService.getReceivedList(member.getId()));
        response.setRedirect("/postMsg");

        return response;
    }

    @GetMapping("/list/sent")
    public Response getSentMessages(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        Response response = new Response();
        response.setData(messageService.getSentList(member.getId()));
        response.setRedirect("/postMsg");

        return response;
    }

    @GetMapping("/detail")
    public Response getMessageDetail(@RequestParam Long messageId){
        Response response = new Response();
        response.setData(messageService.readMessageDetail(messageId));
        response.setRedirect("/postMsg/detail");
        return response;
    }


    @PostMapping("/delete")
    public Response delete(@RequestBody Long messageId) {
        messageService.deleteMessage(messageId);
        Response response = new Response();
        response.setData("success");
        response.setRedirect("/postMsg");
        return response;
    }

    //  메시지 작성 메소드 (create)
    @MessageMapping("/hello")
    @SendTo("/topic/roomId")
    public MessageForm create(MessageForm messageForm) {
        messageService.createMessage(messageForm);
        return messageForm;
    }

}
