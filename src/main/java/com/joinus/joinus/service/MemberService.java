package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Long join(Member member);
    List<Member> findMembers();
    Optional<Member> findOne(Long memberId);
}
