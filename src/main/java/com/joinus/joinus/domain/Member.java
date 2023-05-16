package com.joinus.joinus.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Member {
    @Id
    private String id;

    private String pw;
    private String name;
    private String email;
    private String phoneNum;
    private String techStack;
    private String department;
    private String profileImg;
    private String info;
    private String blog;
    private String gitAddress;

    @ManyToMany(mappedBy = "members")
    private List<Team> teams;

    public void addTeam(Team team){
        this.teams.add(team);
    }
}
