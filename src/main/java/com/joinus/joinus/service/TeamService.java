package com.joinus.joinus.service;

import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.MemberRepository;
import com.joinus.joinus.persistence.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class TeamService{
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    public void makeTeam(Team team){
        team.setCreateTime(LocalDateTime.now());
        teamRepository.save(team);
    }

    public List<Team> findMyTeams(String memberId){
        List<Team> teams = new ArrayList<>();
        Set<String> targetId = new HashSet<>();
        targetId.add(memberId);
        if (teamRepository.findTeamsByMembersIn(targetId).isPresent())
            teams.addAll(teamRepository.findTeamsByMembersIn(targetId).get());
        return teams;
    }

    public Team findTeamById(Long teamId){
        return teamRepository.findById(teamId).get();
    }

    public void updateTeam(Team team){
        teamRepository.save(team);
    }

    public void changeLeader(Long teamId, String memberId){
        Team team = teamRepository.findTeamById(teamId).get();
        team.setLeader(memberId);
    }
}
