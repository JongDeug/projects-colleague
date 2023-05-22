package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manager")
public class ManagerController {
    private final MemberService memberService;
    private final TeamService teamService;
    private final PostService postService;
    private final MessageService messageService;
    private final TechStackService techStackService;
    private final ManagerService managerService;

    @PostMapping("/tech")
    public ModelAndView memberList(Model model){
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return new ModelAndView("/member/member-list");
    }


}
