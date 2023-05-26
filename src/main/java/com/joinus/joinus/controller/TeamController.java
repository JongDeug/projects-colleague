package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Team;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.dto.TeamForm;
import com.joinus.joinus.service.MemberService;
import com.joinus.joinus.service.TeamService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;
    private final MemberService memberService;

    @PostMapping("/create")
    public Response makeTeam(@RequestBody TeamForm teamForm, HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        Team team = new Team();
        List<Member> members = new ArrayList<>();

        team.setLeader(member.getId());
        team.setName(teamForm.getTeamName());
        team.setPw(teamForm.getTeamPw());
        team.setInfo(teamForm.getTeamInfo());

        for (String str : teamForm.getMemberIds()){
            if (memberService.searchMember(str).isPresent())
                members.add(memberService.searchMember(str).get());
        }
        team.setMembers(members);

        teamService.makeTeam(team);

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/myPage/updateProfile");

        return response;
    }
    @GetMapping("/myTeam/list")     //  로그인 한 상태로 내팀 리스트
    public Response getMyTeamList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        Response response = new Response();
        response.setData(teamService.findMyTeams(member.getId()));
        response.setRedirect("/myPage/myTeam");
        return response;
    }
    @GetMapping("/list")        //  로그인 상관없이 타 유저 팀 리스트
    public Response getTeamList(@RequestBody String userId) {
        Response response = new Response();
        response.setData(teamService.findMyTeams(userId));
        response.setRedirect("/team/list");
        return response;
    }
    @GetMapping("/detail")
    public Response getTeamInfo(@RequestParam("teamId") Long teamId){
        Response response = new Response();
        response.setData(teamService.findTeamById(teamId));
        response.setRedirect("/team/detail");
        return response;
    }
    @PostMapping("/myTeam/update")
    public Response updateTeamInfo(@RequestBody Team team){
        teamService.updateTeam(team);

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/team/detail");
        return response;
    }

    //  그냥 위에꺼 써도 되지만 혹시몰라서
    @PostMapping("/changeLeader")
    public Response changeLeader(@RequestParam Long teamId, @RequestParam String memberId){
        teamService.changeLeader(teamId, memberId);

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/team/detail");
        return response;
    }
    
    @GetMapping("/{teamId}/manage/minutes")
    public String getMinutesList(@PathVariable("teamId") Long teamId, Model model){

        return "/team/manage-minutes";
    }
    @GetMapping("/{teamId}/manage/calendar")
    public String getCalendar(@PathVariable("teamId") Long teamId, Model model){

        return "/team/manage-calendar";
    }
}
