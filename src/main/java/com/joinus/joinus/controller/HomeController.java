package com.joinus.joinus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home(){
        return "home";
    }
    @GetMapping("/member")
    public String memberMenu(){
        return "/member/member-main";
    }
    @GetMapping("/team")
    public String teamMenu(){
        return "/team/team-main";
    }
    @GetMapping("/test")
    public String test(){
        return "Test Success";
    }
}
