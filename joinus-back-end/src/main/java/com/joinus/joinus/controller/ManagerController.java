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


    //  test 기술스택 셋업
    @GetMapping("/setStack")
    public String setStack(){
        techStackService.addStack("Django");
        techStackService.addStack("ExpressJS");
        techStackService.addStack("NodeJS");
        techStackService.addStack("Spring");
        techStackService.addStack("SpringBoot");
        techStackService.addStack("WebRTC");
        techStackService.addStack("Angular");
        techStackService.addStack("GraphQL");
        techStackService.addStack("NextJS");
        techStackService.addStack("React Context");
        techStackService.addStack("ReactiveX");
        techStackService.addStack("ReactJs");
        techStackService.addStack("React Query");
        techStackService.addStack("Redux");
        techStackService.addStack("Svelte");
        techStackService.addStack("Tailwind");
        techStackService.addStack("Unity");
        techStackService.addStack("VueJs");
        techStackService.addStack("React Native");
        techStackService.addStack("OracleDB");
        techStackService.addStack("MySQL");
        techStackService.addStack("MSSQL");
        techStackService.addStack("MongoDB");
        techStackService.addStack("ElasticSearch");
        techStackService.addStack("kotlin");
        techStackService.addStack("C");
        techStackService.addStack("C++");
        techStackService.addStack("C#");
        techStackService.addStack("Go");
        techStackService.addStack("Java");
        techStackService.addStack("Javacript");
        techStackService.addStack("Kotlin");
        techStackService.addStack("MATLAB");
        techStackService.addStack("PHP");
        techStackService.addStack("Python");
        techStackService.addStack("R");
        techStackService.addStack("Ruby");
        techStackService.addStack("Rust");
        techStackService.addStack("Scala");
        techStackService.addStack("Swift");
        techStackService.addStack("Typescript");
        techStackService.addStack("Kafka");
        techStackService.addStack("Pytorch");
        techStackService.addStack("Tensorflow");
        techStackService.addStack("Github");

        return "Stacks Added";
    }
}
