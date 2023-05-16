package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Team;
import com.joinus.joinus.service.TeamService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("api/team")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/create")
    public String makeTeam(@RequestBody Team team, HttpServletRequest request) {
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        team.setLeader(member.getId());
        return teamService.makeTeam(team);
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
