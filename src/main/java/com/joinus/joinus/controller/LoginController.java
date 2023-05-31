package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.LoginForm;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.LoginService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LoginController {
    private final LoginService loginService;
    private final SimpMessageSendingOperations messagingTemplate;

    @PostMapping("/login")
    public Response login(@Validated @RequestBody LoginForm loginForm, BindingResult bindingResult, HttpServletRequest request){
        Response response = new Response();
        Member loginMember = loginService.login(loginForm.getLoginId(), loginForm.getLoginPw());
        if(loginMember == null){
            bindingResult.reject("loginFail","아이디 또는 비밀번호가 맞지 않습니다.");
            response.setData("failure");
            response.setRedirect("/login");
            return response;
        }
        //로그인 성공 처리
        //세션이 있으면 있는 세션반환, 없으면 신규 세션을 생성
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);

        messagingTemplate.convertAndSend("/sub/" + loginForm.getLoginId(), "alarm socket connection completed.");

        response.setData("success");
        response.setRedirect("/");

        return response;
    }

    @GetMapping("/logout")
    public Response logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session!=null){
            session.invalidate();
        }

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/");
        return response;
    }
}