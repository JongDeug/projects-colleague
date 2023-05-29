package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.MeetingMinutes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeetingMinutesRepository extends JpaRepository<MeetingMinutes, Long> {
    Optional<List<MeetingMinutes>> findAllByTeamId(Long teamId);
    Optional<List<MeetingMinutes>> findAllByMeetingNameContains(String name);
}
