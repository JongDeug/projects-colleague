package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.TeamRepository;
import com.joinus.joinus.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/team")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/make-team")
    public String makeTeamForm(){
        return "/team/make-team";
    }
    @PostMapping("/make-team")
    public String makeTeam(@ModelAttribute Team team, Model model){
        teamService.makeTeam(team);
        model.addAttribute("team", team);
        return "/team/make-team-result";
    }
    @GetMapping("/{memberId}/team/list")
    public String getTeamList(@PathVariable("memberId") String memberId, Model model){
        List<Team> teams = teamService.findMyTeams(memberId);
        model.addAttribute("teams", teams);

        return "/team/team-list";
    }
    @GetMapping("/{teamId}/teamInfo")
    public String getTeamInfo(@PathVariable("teamId") Long teamId, Model model){
        Team team = teamService.findTeamById(teamId);
        model.addAttribute("team", team);

        return "/team/team-info";
    }
    @GetMapping("/{teamId}/update")
    public String updateTeamInfoForm(@PathVariable("teamId") Long teamId, Model model){
        Team team = teamService.findTeamById(teamId);
        model.addAttribute("team", team);

        return "/team/update-info";
    }
    @PostMapping("/{teamId}/update")
    public String updateTeamInfo(@PathVariable("teamId") Long teamId, @ModelAttribute("team") Team team){
        teamService.updateTeam(teamId, team.getPw(), team.getName(), team.getInfo(), team.getLeader(), team.getPeople());
        return "/team/update-info-result";
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
