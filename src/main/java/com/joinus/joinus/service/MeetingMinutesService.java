package com.joinus.joinus.service;

import com.joinus.joinus.domain.MeetingMinutes;
import com.joinus.joinus.persistence.MeetingMinutesRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MeetingMinutesService {
    private MeetingMinutesRepository meetingMinutesRepository;

    public void makeMinutes(MeetingMinutes meetingMinutes){
        meetingMinutes.setCreateTime(LocalDateTime.now());
        meetingMinutesRepository.save(meetingMinutes);
    }

    public List<MeetingMinutes> findMinutesList(Long teamId){
        return meetingMinutesRepository.findAllByTeamId(teamId).get();
    }

    public void updateMinutes(MeetingMinutes meetingMinutes){
        MeetingMinutes meetingMinutes1 = meetingMinutesRepository.findById(meetingMinutes.getId()).get();
        meetingMinutes.setTeamId(meetingMinutes1.getTeamId());
        meetingMinutes.setCreateTime(meetingMinutes.getCreateTime());
        meetingMinutesRepository.save(meetingMinutes);
    }

    public MeetingMinutes getMinutes(Long minutesId){
        return meetingMinutesRepository.findById(minutesId).get();
    }

    public void deleteMinutes(Long minutesId){
        meetingMinutesRepository.delete(meetingMinutesRepository.findById(minutesId).get());
    }
}
