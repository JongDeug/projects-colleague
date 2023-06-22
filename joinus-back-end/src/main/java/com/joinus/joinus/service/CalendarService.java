package com.joinus.joinus.service;

import com.joinus.joinus.domain.Calendar;
import com.joinus.joinus.persistence.CalendarRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepository calendarRepository;

    public void create(Calendar calendar){
        calendarRepository.save(calendar);
    }

    public List<Calendar> getList(Long teamId){
        if (calendarRepository.findCalendarsByTeamId(teamId).isPresent())
            return calendarRepository.findCalendarsByTeamId(teamId).get();
        return null;
    }

    public void delete(Long calendarId){
        Calendar calendar = calendarRepository.findById(calendarId).get();
        calendarRepository.delete(calendar);
    }
}
