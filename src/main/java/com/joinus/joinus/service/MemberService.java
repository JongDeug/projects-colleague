package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.Response;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    String join(Member member);

    boolean validateDuplicateMember(String memberId);
    void updateMember(String memberId, String name, String email, String phoneNum, String department, String profileImg);
    void updatePW(String memberId, String curPW, String newPW, String checkPW);
    Response findId(String name, String email, String phoneNum);
    Response findPw(String id, String email);
    List<Member> findMembers();
    Optional<Member> findOne(String memberId);

    //List<Post> findMyPost(String memberId);
}
