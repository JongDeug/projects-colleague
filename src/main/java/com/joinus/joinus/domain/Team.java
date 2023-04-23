package com.joinus.joinus.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Team {
    private Long id;
    private String pw;
    private String usersId;
    private String name;
    private String info;
    private String leader;
    private String people;
}
