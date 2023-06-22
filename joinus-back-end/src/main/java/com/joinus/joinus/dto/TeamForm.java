package com.joinus.joinus.dto;

import lombok.Data;

import java.util.List;

@Data
public class TeamForm {
    String teamName;
    String teamInfo;
    String leaderId;
    List<String> memberIds;
    String teamPic;
    String teamPw;
}
