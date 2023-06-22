package com.joinus.joinus.domain;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

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

    @ElementCollection
    private Set<String> techStack = new HashSet<>();
    public void addTechStack(String stack){
        this.techStack.add(stack);
    }
}
