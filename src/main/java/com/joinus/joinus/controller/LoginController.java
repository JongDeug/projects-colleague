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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LoginController {
    private final LoginService loginService;

//    @GetMapping("/")
//    public String home(HttpServletRequest request, Model model){
//        HttpSession session = request.getSession(false);
//        if(session==null){
//            return "index";
//        }
//        Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
//
//        if(loginMember==null){
//            return "index";
//        }
//
//        model.addAttribute("member",loginMember);
//
//        return "index";
//    }

//    @GetMapping("/login")
//    public String loginForm(@ModelAttribute("loginForm") LoginForm loginForm){
//        return "login/login-Form";
//    }

    @PostMapping("/login")
    public Response login(@Validated @RequestBody LoginForm loginForm, BindingResult bindingResult, HttpServletRequest request){
//        if(bindingResult.hasErrors()){
//            return "login/login-Form";
//        }


        Response response = new Response();
        Member loginMember = loginService.login(loginForm.getLoginId(), loginForm.getLoginPw());
        if(loginMember == null){
            bindingResult.reject("loginFail","아이디 또는 비밀번호가 맞지 않습니다.");
            response.setData("error");
            response.setRedirect("/login");
            return response;
        }
        //로그인 성공 처리
        //세션이 있으면 있는 세션반환, 없으면 신규 세션을 생성
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);

        response.setData("success");
        response.setRedirect("/");

        return response;
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session!=null){
            session.invalidate();
        }
        return "redirect:/";
    }
}