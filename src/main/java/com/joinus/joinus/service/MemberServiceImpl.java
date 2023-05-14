package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.persistence.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public String join(Member member){
//        validateDuplicateMember(member.getId());    //  중복 id 체크
        memberRepository.save(member);
        return member.getId();
    }

    @Override
    public boolean validateDuplicateMember(String memberId) {
        return memberRepository.findById(memberId)
                .isPresent();
    }

    @Override
    public void updateMember(String memberId, String name, String email, String phoneNum, String department, String profileImg){
        Member member = memberRepository.findById(memberId).get();
        member.setName(name);
        member.setEmail(email);
        member.setPhoneNum(phoneNum);
        member.setDepartment(department);
        member.setProfileImg(profileImg);
    }

    @Override
    public void updatePW(String memberId, String curPW, String newPW, String checkPW){
        Member member = memberRepository.findById(memberId).get();
        if (member.getPw().equals(curPW) && newPW.equals(checkPW)){
            member.setPw(newPW);
        }
        else {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }
    }
    @Override
    public Response findId(String name, String email, String phoneNum){
        Response response = new Response();
        if (memberRepository.findByInfo(name, email, phoneNum).isPresent()){
            response.setData(memberRepository.findByInfo(name, email, phoneNum).get().getId());
            response.setRedirect("here");
            return response;
        }
        else {
            response.setData("empty");
            response.setRedirect("here");
            return response;
        }
    }

    @Override
    public Response findPw(String id, String email){
        Response response = new Response();
        if (memberRepository.findPw(id, email).isPresent()){
            response.setData(memberRepository.findPw(id, email).get().getPw());
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
    @Override
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    @Override
    public Optional<Member> findOne(String memberId){
        return memberRepository.findById(memberId);
    }
}
