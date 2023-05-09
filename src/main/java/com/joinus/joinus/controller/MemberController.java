package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.service.MemberService;
import com.joinus.joinus.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/join")
    public String join(@RequestBody Member member){
        return memberService.join(member);
    }

    @PostMapping("/duplicateCheck")
    public boolean duplicateIdCheck(@RequestBody String memberId){
        return memberService.validateDuplicateMember(memberId);
    }
    @GetMapping("/list")
    public ModelAndView memberList(Model model){
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return new ModelAndView("/member/member-list");
    }
    @GetMapping("/profile/{memberId}/edit")
    public String updateProfileForm(@PathVariable("memberId") String memberId, Model model) {
        Member member = memberService.findOne(memberId).get();
        model.addAttribute("member", member);

        return "/member/update-profile";
    }
    @PostMapping("/profile/{memberId}/edit")
    public String updateProfile(@PathVariable("memberId") String memberId, @ModelAttribute("member") Member member){
        memberService.updateMember(memberId, member.getName(), member.getEmail(), member.getPhoneNum(), member.getDepartment(), member.getProfileImg());
        return "/member/update-profile-result";
    }
    @GetMapping("/password/{memberId}/edit")
    public String changePwdForm(@PathVariable("memberId") String memberId, Model model){
        Member member = memberService.findOne(memberId).get();
        model.addAttribute("member", member);

        return "/member/update-pw";
    }
    @PostMapping("/password/{memberId}/edit")
    public String changePwd(@PathVariable("memberId") String memberId, @RequestParam("pw") String pw, @RequestParam("newpw") String newPW, @RequestParam("newpwcheck") String newPWcheck){
        memberService.updatePW(memberId, pw, newPW, newPWcheck);
        return "/member/update-pw-result";
    }
    @GetMapping("/find/id")
    public String findIdForm(){
        return "/member/find-id";
    }
    @PostMapping("/find/id")
    public String findId(@ModelAttribute Member member, Model model){
        String memberId = memberService.findId(member.getName(), member.getEmail());
        model.addAttribute("id", memberId);
        return "/member/find-id-result";
    }
    @GetMapping("/find/pw")
    public String findPwForm(){
        return "/member/find-pw";
    }
    @PostMapping("/find/pw")
    public String findPw(Model model){
        return "/member/find-pw-result";
    }

}
