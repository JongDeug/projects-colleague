package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Post;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    String join(Member member);

    boolean validateDuplicateMember(String memberId);
    void updateMember(String memberId, String name, String email, String phoneNum, String department, String profileImg);
    void updatePW(String memberId, String curPW, String newPW, String checkPW);
    String findId(String name, String email);
    List<Member> findMembers();
    Optional<Member> findOne(String memberId);

    //List<Post> findMyPost(String memberId);
}
