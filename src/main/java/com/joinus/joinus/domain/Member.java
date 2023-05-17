package com.joinus.joinus.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Entity
public class Member {
    @Id
    private String id;

    private String pw;
    private String name;
    private String email;
    private String phoneNum;
    private String department;
    private String profileImg;
    private String info;
    private String blog;
    private String gitAddress;
    private boolean roleType = false;

    @ManyToMany(mappedBy = "members")
    private List<Team> teams;

    @OneToMany
    @JoinColumn
    private List<TechStack> techStacks = new ArrayList<>();

    public void addTeam(Team team){
        this.teams.add(team);
    }
    public void addTechStack(TechStack techStack){
        this.techStacks.add(techStack);
    }
}
