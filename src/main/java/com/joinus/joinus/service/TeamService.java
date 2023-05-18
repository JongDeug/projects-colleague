package com.joinus.joinus.service;

import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService{
    private final TeamRepository teamRepository;

    public String makeTeam(Team team){
        teamRepository.save(team);
        return team.getId().toString();
    }

    public List<Team> findMyTeams(String memberId){
        return teamRepository.findTeamsByLeaderAndState(memberId, "processing").get();
    }

    public Team findTeamById(Long teamId){
        return teamRepository.findById(teamId).get();
    }

    public void updateTeam(Team team){
        teamRepository.save(team);
    }

}
