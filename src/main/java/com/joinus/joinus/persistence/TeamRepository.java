package com.joinus.joinus.persistence;
import com.joinus.joinus.domain.Team;

import java.util.List;
import java.util.Optional;

public interface TeamRepository {
    void save(Team team);
    Optional<Team> findById(Long id);
    Optional<Team> findByName(String name);
    List<Team> findAll();
    Optional<List<Team>> findByLeaderId(String id);
}