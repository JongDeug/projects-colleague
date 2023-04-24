package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.persistence.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public String join(Member member){
        validateDuplicateMember(member);    //  중복 id 체크
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findById(member.getId())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디입니다.");
                });
    }

    public void updateMember(String memberId, String name, String email, String phoneNum, String department, String profileImg){
        Member member = memberRepository.findById(memberId).get();
        member.setName(name);
        member.setEmail(email);
        member.setPhoneNum(phoneNum);
        member.setDepartment(department);
        member.setProfileImg(profileImg);
    }

    public void updatePW(String memberId, String curPW, String newPW, String checkPW){
        Member member = memberRepository.findById(memberId).get();
        if (member.getPw().equals(curPW) && newPW.equals(checkPW)){
            member.setPw(newPW);
        }
        else {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }
    }
    public String findId(String name, String email){
        return memberRepository.findByName(name).get().getId();
    }

    /**
     * 관리자용 전체 회원 조회
     */
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(String memberId){
        return memberRepository.findById(memberId);
    }
}
