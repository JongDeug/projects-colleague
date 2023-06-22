package com.joinus.joinus.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class MeetingMinutes {
    @Id @GeneratedValue
    private Long id;    //  회의록 아이디(오토인크리)
    private Long teamId;    //  팀 id (해당 팀에서 작성한 회의록임을 명시하기 위함)
    private String meetingName; //  회의명
    private String location;    //  회의장소
    private String agenda;  //  회의 의제
    private String content; //  회의 내용
    private String improvements;    // 지적사항 및 조치내용
    private String writerDepartment;    //  작성자 소속
    private String writerName;  //  작성자 이름
    private LocalDateTime createTime;   //  작성시간 (서버에서 자동 생성)

}
