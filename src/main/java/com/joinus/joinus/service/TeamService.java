package com.joinus.joinus.service;

import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService{
    private final TeamRepository teamRepository;

    public void makeTeam(Team team){
        teamRepository.save(team);
    }

    public List<Team> findMyTeams(String memberId){
        List<Team> teams = new ArrayList<>();
        if (teamRepository.findTeamsByLeaderAndState(memberId, "processing").isPresent())
            teams.addAll(teamRepository.findTeamsByLeaderAndState(memberId, "processing").get());
        if (teamRepository.findTeamsByMembersId(memberId).isPresent())
            teams.addAll(teamRepository.findTeamsByMembersId(memberId).get());
        return teams;
    }

    public Team findTeamById(Long teamId){
        return teamRepository.findById(teamId).get();
    }

    public void updateTeam(Team team){
        teamRepository.save(team);
    }

}
