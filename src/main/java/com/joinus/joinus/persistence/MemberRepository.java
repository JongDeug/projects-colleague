package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    void save(Member member);
    Optional<Member> findById(String id);
    Optional<Member> findByName(String name);
    Optional<Member> findByInfo(String name, String email, String phoneNum);
    Optional<Member> findPw(String id, String email);
    List<Member> findAll();
}
