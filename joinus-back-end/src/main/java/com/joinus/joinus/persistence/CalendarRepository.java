package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends JpaRepository <Calendar, Long> {
    Optional<List<Calendar>> findCalendarsByTeamId(Long teamId);
}
