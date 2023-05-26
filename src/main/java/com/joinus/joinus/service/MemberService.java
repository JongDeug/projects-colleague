package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.persistence.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;

    public String join(Member member){
//        validateDuplicateMember(member.getId());    //  중복 id 체크
        memberRepository.save(member);
        return member.getId();
    }

    public boolean validateDuplicateMember(String memberId) {
        return memberRepository.findById(memberId)
                .isPresent();
    }
    public boolean validateDuplicateEmail(String email) {
        return memberRepository.findMemberByEmail(email)
                .isPresent();
    }
    public void updateMember(Member member){
        memberRepository.save(member);
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
    public String findId(String name, String email, String phoneNum){
        if (memberRepository.findByNameAndEmailAndPhoneNum(name, email, phoneNum).isPresent()){
            return memberRepository.findByNameAndEmailAndPhoneNum(name, email, phoneNum).get().getId();
        }
        else {
            return "user not exist";
        }
    }

    public String findPw(String id, String email){
        if (memberRepository.findMemberByIdAndEmail(id, email).isPresent()){
            return memberRepository.findMemberByIdAndEmail(id, email).get().getPw();
        }
        else {
            return "user not exist";
        }
    }

    public Optional<List<Member>> searchMember(String memberId){
        return memberRepository.findMembersByIdContains(memberId);
    }


    public List<Member> recommendUsers(Member member){
        Set<String> techStacks = member.getTechStack();
        List<Member> members = memberRepository.findByTechStackIn(techStacks).get();
        return members;
    }

    public List<Member> getMembersByName(String name){
        if (memberRepository.findMembersByNameContains(name).isPresent())
            return memberRepository.findMembersByNameContains(name).get();
        return null;
    }

    public void deleteMember(Member member){
        memberRepository.delete(member);
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
