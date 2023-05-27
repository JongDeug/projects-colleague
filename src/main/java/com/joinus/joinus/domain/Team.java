package com.joinus.joinus.domain;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany //  얘가 주인
    private List<Member> members = new ArrayList<>();   //  팀 구성원 id 리스트

    public void addMember(Member member)
    {
        if (!this.members.contains(member))
            this.members.add(member);
    }
}
