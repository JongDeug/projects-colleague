package com.joinus.joinus.domain;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Team {
    @Id @GeneratedValue
    private Long id;

    private String pw;
    private String usersId;
    private String name;
    private String info;
    private String leader;
    private String state = "stable";

    @ManyToMany //  얘가 주인
    private List<Member> members;

    public void addMember(Member member)
    {
        this.members.add(member);
    }
}
