package com.joinus.joinus.controller;

import com.joinus.joinus.domain.TechStack;
import com.joinus.joinus.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/tech")
    public List<TechStack> getStacks(){
        return techStackService.getList();
    }
    @PostMapping("/tech")
    public void addStack(@RequestBody String stack){
        techStackService.addStack(stack);
    }
}
