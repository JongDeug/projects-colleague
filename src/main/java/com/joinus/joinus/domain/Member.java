package com.joinus.joinus.domain;

import lombok.Data;

@Data
//@Entity
public class Member {
//    @Id @GeneratedValue
    private String id;
    private String pw;
    private String name;
    private String email;
    private String phoneNum;
    private String techStack;
    private String department;
    private String profileImg;
}
