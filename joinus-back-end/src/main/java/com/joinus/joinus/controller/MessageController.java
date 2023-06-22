package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.MessageService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/detail")
    public Response getMessageDetail(@RequestParam Long messageId, @RequestParam Boolean check){
        messageService.updateMessage(messageId, check);

        Response response = new Response();
        response.setData(messageService.readMessageDetail(messageId));
        response.setRedirect("/postMsg/detail");
        return response;
    }

    @PostMapping("/delete/sender")
    public Response deleteBySender(@RequestParam Long messageId) {
        messageService.deleteMessage(messageId, "sender");
        Response response = new Response();
        response.setData("success");
        response.setRedirect("/postMsg");
        return response;
    }
    @PostMapping("/delete/receiver")
    public Response deleteByReceiver(@RequestParam Long messageId) {
        messageService.deleteMessage(messageId, "receiver");
        Response response = new Response();
        response.setData("success");
        response.setRedirect("/postMsg");
        return response;
    }
}
