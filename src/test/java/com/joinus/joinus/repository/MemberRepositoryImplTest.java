package com.joinus.joinus.repository;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.persistence.MemberRepository;
import com.joinus.joinus.persistence.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class MemberRepositoryImplTest {
    MemberRepository repository = new MemoryMemberRepository();

    @AfterEach
    public void afterEach(){

    }

    @Test
    public void save(){
        Member member = new Member();
        member.setName("kim");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        assertThat(member)
                .isEqualTo(result);

    }
    @Test
    public void findByName(){
        Member member1 = new Member();
        member1.setName("kim");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("lee");
        repository.save(member2);

        Member result = repository.findByName("kim").get();

        assertThat(result).isEqualTo(member1);
    }
}
