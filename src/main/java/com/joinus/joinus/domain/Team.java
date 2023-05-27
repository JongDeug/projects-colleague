package com.joinus.joinus.domain;


import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Team {
    @Id @GeneratedValue
    private Long id;    //  팀 ID (auto increment)

    private String pw;  //  회의실 입장을 위한 팀 비밀번호
    private String name;    //  팀 이름
    private String info;    //  간단한 팀 소개글
    private String leader;  //  팀 리더 아이디
    private String state = "stabilized";    //  팀 상태
    private String teamGit;
    private LocalDateTime createTime;
    private String teamPic;

    @ElementCollection
    private Set<String> members = new HashSet<>();

    public void addMember(String memberId)
    {
        members.add(memberId);
    }
}
