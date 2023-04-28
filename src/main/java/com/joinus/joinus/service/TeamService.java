package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Team;

import java.util.List;

public interface TeamService {
    String makeTeam(Team team);
    List<Team> findMyTeams(String memberId);
    Team findTeamById(Long teamId);
    void updateTeam(Long teamId, String pw, String name, String info, String leader, String people);
}
