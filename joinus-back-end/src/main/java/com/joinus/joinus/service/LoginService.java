package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.persistence.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final MemberRepository memberRepository;
    public Member login(String loginId, String password){
        if (memberRepository.findMemberById(loginId).isPresent()) {
            Member member = memberRepository.findMemberById(loginId).get();
            if (member.getPw().equals(password))
                return member;
            else
                return null;
        }
        else{
            return null;
        }
    }
}
