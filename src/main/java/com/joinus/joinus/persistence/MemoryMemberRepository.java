package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Member;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@Primary // 데이터베이스 리포지토리 만들면 프라이머리 옮기기
@Qualifier("MemoryMemberRepository")
public class MemoryMemberRepository implements MemberRepository{
    //ConcurrentHashMap (동시성 문제로 공유되는 변수는 이걸로써야됨)
    private static final List<Member> members = new ArrayList<>();

    @Override
    public void save(Member member) {
        members.add(member);
    }

    @Override
    public Optional<Member> findById(String id) {
        return members.stream()
                .filter(member -> member.getId().equals(id))
                .findAny();
    }

    @Override
    public Optional<Member> findByName(String name) {
        return members.stream()
                .filter(member -> member.getName().equals(name))
                .findAny();
    }

    @Override
    public List<Member> findAll() {
        return members;
    }
}
