package com.joinus.joinus.service;

import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService{
    private final TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public String makeTeam(Team team){
        teamRepository.save(team);
        return team.getId().toString();
    }

    public List<Team> findMyTeams(String memberId){
        return teamRepository.findByLeaderId(memberId).get();
    }

    public Team findTeamById(Long teamId){
        return teamRepository.findById(teamId).get();
    }

    public void updateTeam(Long teamId, String pw, String name, String info, String leader, String people){
        Team team = teamRepository.findById(teamId).get();
        team.setPw(pw);
        team.setName(name);
        team.setInfo(info);
        team.setLeader(leader);
        team.setPeople(people);
    }

}
