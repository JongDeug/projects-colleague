package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface MemberRepository extends JpaRepository<Member, String> {


    Optional<Member> findMemberById(String id);
    Optional<Member> findByName(String name);

    Optional<Member> findByNameAndEmailAndPhoneNum(String name, String email, String phoneNum);
    Optional<Member> findMemberByPwAndEmail(String id, String email);

    Optional<List<Member>> findMembersByTechStacks(TechStack techStack);
}
