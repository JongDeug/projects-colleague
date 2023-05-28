package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberRepository extends JpaRepository<Member, String> {


    Optional<Member> findMemberById(String id);

    Optional<List<Member>> findMembersByIdContains(String id);
    Optional<Member> findByName(String name);

    Optional<Member> findMemberByEmail(String email);

    Optional<Member> findByNameAndEmailAndPhoneNum(String name, String email, String phoneNum);
    Optional<Member> findMemberByPwAndEmail(String id, String email);

    Optional<Member> findMemberByIdAndEmail(String id, String email);

    Optional<List<Member>> findByTechStackIn(Set<String> stack);
    Optional<List<Member>> findMembersByTechStackIn(Set<String> stack);

    Optional<List<Member>> findMembersByNameContains(String name);
}
