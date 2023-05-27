package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Team;
import com.joinus.joinus.dto.TeamForm;
import com.joinus.joinus.persistence.MemberRepository;
import com.joinus.joinus.persistence.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
                team.addMember(memberRepository.findMemberById(str).get());
//                members.add(memberRepository.findMemberById(str).get());
            }
        }
//        team.setMembers(members);

        teamRepository.save(team);
    }

    public List<Team> findMyTeams(String memberId){
        List<Team> teams = new ArrayList<>();
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

    public void changeLeader(Long teamId, String memberId){
        Team team = teamRepository.findTeamById(teamId).get();
        team.setLeader(memberId);
    }
}
