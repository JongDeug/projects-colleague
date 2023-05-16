package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.persistence.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
    public Response findId(String name, String email, String phoneNum){
        Response response = new Response();
        if (memberRepository.findByNameAndEmailAndPhoneNum(name, email, phoneNum).isPresent()){
            response.setData(memberRepository.findByNameAndEmailAndPhoneNum(name, email, phoneNum).get().getId());
            response.setRedirect("here");
            return response;
        }
        else {
            response.setData("empty");
            response.setRedirect("here");
            return response;
        }
    }

    public Response findPw(String id, String email){
        Response response = new Response();
        if (memberRepository.findMemberByPwAndEmail(id, email).isPresent()){
            response.setData(memberRepository.findMemberByPwAndEmail(id, email).get().getPw());
            response.setRedirect("here");
            return response;
        }
        else {
            response.setData("empty");
            response.setRedirect("here");
            return response;
        }
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
