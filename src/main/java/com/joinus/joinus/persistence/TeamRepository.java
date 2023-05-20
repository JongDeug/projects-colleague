package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository <Team, Long>{
    Optional<Team> findTeamById(Long id);
    Optional<Team> findByName(String name);
    Optional<List<Team>> findTeamsByLeaderAndState(String id, String state);    //   수정 필요
}