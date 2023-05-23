package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.ChangePasswordForm;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.MemberService;
import com.joinus.joinus.service.TechStackService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final TechStackService techStackService;


    @PostMapping("/join")
    public Response join(@RequestBody Member member){
        Response response = new Response();
        if (duplicateEmailCheck(member.getEmail()))
            response.setData("duplicated email address");
        else if (memberService.join(member).equals(member.getId()))
            response.setData("success");
        else response.setData("failure");
        response.setRedirect("/login");
        return response;
    }

    @PostMapping("/duplicateCheck")
    public boolean duplicateIdCheck(@RequestBody Member member){    //  requestparam, 생략 string id, modelattribute는 작동이 안됨 일단 dto로 박아놓음
        return memberService.validateDuplicateMember(member.getId());       //  간단한 기능이라, 리다이렉트 필요없어서 bool로 함
    }

    public boolean duplicateEmailCheck(String email){
        return memberService.validateDuplicateEmail((email));
    }

    @GetMapping("/profile/update")
    public Response getProfile(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        Response response = new Response();
        response.setData(memberService.findOne(member.getId()).get());      //  member 객체 반환
        response.setRedirect("/myPage/updateProfile");
        return response;
    }
    @PostMapping("/profile/update")
    public Response updateProfile(@RequestBody Member member){
        memberService.updateMember(member);
        Response response = new Response();
        response.setData("success");
        response.setRedirect("/myPage/updateProfile");
        return response;
    }
    @PostMapping("/profile/changePwd")
    public String changePwd(@RequestBody ChangePasswordForm pf){
        memberService.updatePW(pf.getMemberId(), pf.getCurPw(), pf.getNewPw(), pf.getNewPwCheck());
        return pf.getMemberId();
    }
    @PostMapping("/find/id")    //  get으로+requestparam 여러개 받아오고 프론트 param 하기 vs post로 편하게 받기
    public Response findId(@RequestBody Member member){
        Response response = new Response();
        response.setData(memberService.findId(member.getName(), member.getEmail(), member.getPhoneNum()));
        response.setRedirect("/login");
        return response;
    }
    @PostMapping("/find/pw")    //  get으로
    public Response findPw(@RequestBody Member member){
        Response response = new Response();
        response.setData(memberService.findPw(member.getId(), member.getEmail()));
        response.setRedirect("/login");
        return response;
    }

    @GetMapping("/recommend")
    public Response recommendUsers(HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        Response response = new Response();
        response.setData(memberService.recommendUsers(member));
        response.setRedirect("/userRecommendation");
        return response;
    }

    @GetMapping("/search")
    public Response searchUser(@RequestParam String memberId){
        Response response = new Response();
        if (memberService.searchMember(memberId).isPresent())
            response.setData(memberService.searchMember(memberId).get());
        else response.setData("failure");
        response.setRedirect("no required");
        return response;
    }

    @GetMapping("/list")
    public ModelAndView memberList(Model model){
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return new ModelAndView("/member/member-list");
    }

    @GetMapping("/name")
    public Response memberName(@RequestParam String userName){
        List<Member> members = memberService.getMembersByName(userName);

        Response response = new Response();
        response.setData(members);
        response.setRedirect("no required");
        return response;
    }
}
