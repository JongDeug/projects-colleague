package com.joinus.joinus.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {
    private String id;
    private String pw;
    private String name;
    private String email;
    private String phoneNum;
    private String techStack;
    private String department;
    private String profileImg;
}
