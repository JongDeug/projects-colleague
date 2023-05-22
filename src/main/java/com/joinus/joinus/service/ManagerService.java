package com.joinus.joinus.service;

import com.joinus.joinus.persistence.MemberRepository;
import com.joinus.joinus.persistence.TeamRepository;
import com.joinus.joinus.persistence.TechStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ManagerService {
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final TechStackRepository techStackRepository;
}
