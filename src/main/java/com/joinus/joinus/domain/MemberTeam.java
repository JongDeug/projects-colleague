package com.joinus.joinus.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class MemberTeam {
    @Id @GeneratedValue
    private Long id;

    @OneToMany
    private Member member;

    private Team team;

}
