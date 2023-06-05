package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Message;
import com.joinus.joinus.domain.Post;
import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final PostRepository postRepository;
    private final MeetingMinutesRepository meetingMinutesRepository;
    private final MessageRepository messageRepository;
//    private final TechStackRepository techStackRepository;

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


    public List<Member> recommendUsers(String memberId){
        Member member = memberRepository.findMemberById(memberId).get();
        if (memberRepository.findMembersByTechStackIn(member.getTechStack()).isPresent())
            return memberRepository.findMembersByTechStackIn(member.getTechStack()).get();
        return null;
    }

    public List<Member> getMembersByName(String name){
        if (memberRepository.findMembersByNameContains(name).isPresent())
            return memberRepository.findMembersByNameContains(name).get();
        return null;
    }

    public void deleteMember(Member member){
        //  완전 삭제
        String targetId = member.getId();

        //  팀 연관관계 삭제
        Set<String> targetSet = new HashSet<>();
        targetSet.add(targetId);
        List<Team> teams = new ArrayList<>();
        if (teamRepository.findTeamsByMembersIn(targetSet).isPresent()){
            teams = teamRepository.findTeamsByMembersIn(targetSet).get();
            for (Team t : teams){
                //  1인 팀일 경우 팀 즉시삭제
                if (t.getMembers().size() == 1)
                    teamRepository.delete(t);
                else{
                    Set<String> teamMembers = t.getMembers();
                    teamMembers.remove(targetId);
                    t.setMembers(teamMembers);
                    if (t.getLeader().equals(targetId))
                        t.setLeader(teamMembers.stream().findAny().get());
                    teamRepository.save(t);
                }

            }
        }

        //  포스트 연관관계
        if (postRepository.findPostsByUserId(targetId).isPresent()){
            List<Post> posts = postRepository.findPostsByUserId(targetId).get();
            for (Post p : posts){
                p.setUserId("탈퇴한 회원");
                postRepository.save(p);
            }
        }

        //  쪽지 연관관계
        if (messageRepository.findMessagesBySender(targetId).isPresent()){
            List<Message> messages = messageRepository.findMessagesBySender(targetId).get();
            for (Message m : messages){
                m.setSender("탈퇴한 회원");
                m.setSenderDeleted(true);
                messageRepository.save(m);
            }
        }
        if (messageRepository.findMessagesByReceiver(targetId).isPresent()){
            List<Message> messages = messageRepository.findMessagesByReceiver(targetId).get();
            for (Message m : messages){
                m.setReceiver("탈퇴한 회원");
                m.setReceiverDeleted(true);
                messageRepository.save(m);
            }
        }

        //  회의록 수정




        
        //  마지막으로 회원 삭제
        memberRepository.delete(member);
    }


    /**
     * 관리자용 전체 회원 조회
     */
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(String memberId){
        return memberRepository.findMemberById(memberId);
    }
}
