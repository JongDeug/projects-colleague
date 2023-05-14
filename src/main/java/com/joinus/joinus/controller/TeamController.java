package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Team;
import com.joinus.joinus.service.TeamService;
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
    public String makeTeam(@RequestBody Team team){
        return teamService.makeTeam(team);
    }
    @GetMapping("/myTeam/list")
    public List<Team> getTeamList(@RequestParam("memberId") String memberId){
        return teamService.findMyTeams(memberId);
    }
    @GetMapping("/myTeam/detail")
    public Team getTeamInfo(@RequestParam("teamId") Long teamId){
        Team team = teamService.findTeamById(teamId);

        return teamService.findTeamById(teamId);
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

    @GetMapping("/list")
    public ModelAndView teamList(Model model){
        List<Team> teams = teamService.findMyTeams("qwe");
        model.addAttribute("teams", teams);
        return new ModelAndView("/team/team-list");
    }
}
