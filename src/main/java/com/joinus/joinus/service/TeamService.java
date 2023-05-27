package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Team;
import com.joinus.joinus.dto.TeamForm;
import com.joinus.joinus.persistence.MemberRepository;
import com.joinus.joinus.persistence.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamService{
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    public void makeTeam(TeamForm teamForm){
        Team team = new Team();
        List<Member> members = new ArrayList<>();

        team.setLeader(teamForm.getLeaderId());
        team.setName(teamForm.getTeamName());
        team.setPw(teamForm.getTeamPw());
        team.setInfo(teamForm.getTeamInfo());

        for (String str : teamForm.getMemberIds()){
            if (memberRepository.findMemberById(str).isPresent()) {
                team.addMember(str);
            }
        }
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
