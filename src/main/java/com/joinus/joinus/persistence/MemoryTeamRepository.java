package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Team;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@Primary // 데이터베이스 리포지토리 만들면 프라이머리 옮기기
@Qualifier("MemoryTeamRepository")
public class MemoryTeamRepository implements TeamRepository{
    private static final List<Team> teams = new ArrayList<>();

    @Override
    public void save(Team team){
        teams.add(team);
    }
    @Override
    public Optional<Team> findById(Long id){
        return teams.stream()
                .filter(team -> team.getId().equals(id))
                .findAny();
    }
    @Override
    public Optional<Team> findByName(String name){
        return teams.stream()
                .filter(team -> team.getName().equals(name))
                .findAny();
    }
    @Override
    public Optional<List<Team>> findByLeaderId(String id){
        List<Team> findTeams = new ArrayList<>();
        for (Team team :teams) {
            if (team.getLeader().equals(id))
                findTeams.add(team);
        }
        return Optional.of(findTeams);
    }
    @Override
    public List<Team> findAll(){
        return teams;
    }
}