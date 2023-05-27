package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.persistence.MemberRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@SpringBootTest
class MemberServiceTest {
    @Autowired
    MemberRepository memberRepository;

    @Test
    void 기술스택_조회(){
        //given
        Member member1 = new Member();
        member1.setId("1");
        member1.setName("kim");
        member1.addTechStack("c");
        member1.addTechStack("java");
        member1.addTechStack("spring");
        member1.addTechStack("python");

        Member member2 = new Member();
        member2.setId("2");
        member2.setName("park");
        member2.addTechStack("c++");
        member2.addTechStack("go");
        member2.addTechStack("pypy");

        memberRepository.save(member1);
        memberRepository.save(member2);

        Set<String> findStack = new HashSet<>();
        findStack.add("string");
        findStack.add("python");

        //when
        List<Member> result = memberRepository.findByTechStackIn(findStack).get();

        //then
        for(Member m : result){
            System.out.println(m.getName());
        }


    }
}