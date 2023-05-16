package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.ChangePasswordForm;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.MemberService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;


    @PostMapping("/join")
    public String join(@RequestBody Member member){
        return memberService.join(member);
    }

    @PostMapping("/duplicateCheck")
    public boolean duplicateIdCheck(@RequestBody Member member){    //  requestparam, 생략 string id, modelattribute는 작동이 안됨 일단 dto로 박아놓음
        return memberService.validateDuplicateMember(member.getId());
    }

    @GetMapping("/profile/update")
    public Member getProfile(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        return memberService.findOne(member.getId()).get();
    }
    @PostMapping("/profile/update")
    public String updateProfile(@RequestBody Member member){

        memberService.updateMember(member);
        return member.getId();
    }
    @PostMapping("/profile/changePwd")
    public String changePwd(@RequestBody ChangePasswordForm pf){
        memberService.updatePW(pf.getMemberId(), pf.getCurPw(), pf.getNewPw(), pf.getNewPwCheck());
        return pf.getMemberId();
    }
    @PostMapping("/find/id")
    public Response findId(@RequestBody Member member){
        return memberService.findId(member.getName(), member.getEmail(), member.getPhoneNum());
    }
    @PostMapping("/find/pw")
    public Response findPw(@RequestBody Member member){
        return memberService.findPw(member.getId(), member.getEmail());
    }

    @GetMapping("/list")
    public ModelAndView memberList(Model model){
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return new ModelAndView("/member/member-list");
    }

}
