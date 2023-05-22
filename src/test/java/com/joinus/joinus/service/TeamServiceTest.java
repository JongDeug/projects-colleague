package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.MemberRepository;
import com.joinus.joinus.persistence.TeamRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class TeamServiceTest {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 내팀_찾기(){
        //given
        Member member1 = new Member();
        Member member2 = new Member();
        member1.setId("member1");
        member1.setName("kim");
        member2.setId("member2");
        member2.setName("park");
        memberRepository.save(member1);
        memberRepository.save(member2);

        Team team1 = new Team();
        Team team2 = new Team();
        Team team3 = new Team();
        Team team4 = new Team();
        team1.setName("team1");
        team2.setName("team2");
        team3.setName("team3");
        team4.setName("team4");

        teamRepository.save(team1);
        teamRepository.save(team2);
        teamRepository.save(team3);
        teamRepository.save(team4);

        team1.setLeader(member1.getId());
        team1.addMember(member2);
//        team2.addMember(member1);
        team3.addMember(member1);
        team4.addMember(member1);

        //when
        List<Team> findMyTeam = teamRepository.findTeamsByLeader(member1.getId()).get();
        findMyTeam.addAll(teamRepository.findTeamsByMembersId(member1.getId()).get());


        //then
        System.out.println("result :: ++++++++++++++++++++++++++++++++++++++++++++++");
        for(Team t : findMyTeam){
            System.out.println(t.getName());
        }

    }
}