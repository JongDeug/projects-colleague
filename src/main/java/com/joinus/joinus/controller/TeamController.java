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
import org.springframework.web.servlet.ModelAndView;

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
    @GetMapping("/myTeam/list")
    public List<Team> getTeamList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        return teamService.findMyTeams(member.getId());
    }
    @GetMapping("/detail")
    public Team getTeamInfo(@RequestParam("teamId") Long teamId){
        Team team = teamService.findTeamById(teamId);

        return teamService.findTeamById(teamId);
    }
    @PostMapping("/myTeam/update")
    public String updateTeamInfo(@RequestBody Team team){
        teamService.updateTeam(team);
        return "ok";
    }
    
    @GetMapping("/{teamId}/manage/minutes")
    public String getMinutesList(@PathVariable("teamId") Long teamId, Model model){

        return "/team/manage-minutes";
    }
    @GetMapping("/{teamId}/manage/calendar")
    public String getCalendar(@PathVariable("teamId") Long teamId, Model model){

        return "/team/manage-calendar";
    }

    @GetMapping("/list")
    public ModelAndView teamList(Model model){
        List<Team> teams = teamService.findMyTeams("qwe");
        model.addAttribute("teams", teams);
        return new ModelAndView("/team/team-list");
    }
}
