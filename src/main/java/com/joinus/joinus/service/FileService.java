package com.joinus.joinus.service;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Team;
import com.joinus.joinus.persistence.MemberRepository;
import com.joinus.joinus.persistence.TeamRepository;
import com.joinus.joinus.web.validation.FileConst;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class FileService {
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    public String uploadFile(MultipartFile uploadFile, String type, String id) {
        String path = FileConst.UPLOAD_PATH + type;
        File uploadFolder = new File(path, id);
        if (!uploadFolder.exists()){
            uploadFolder.mkdirs();
            log.info("{} 디렉토리 생성됨 ", uploadFolder.getAbsolutePath());
        }
        log.info("#############################");
        log.info("파일명 : {}", uploadFile.getOriginalFilename());
        log.info("파일 크기 : {} byte", uploadFile.getSize());

        if (type.equals("member")){
            Member member = memberRepository.findMemberById(id).get();
            member.setProfileImg(uploadFile.getOriginalFilename());
            memberRepository.save(member);
        }
        else if (type.equals("team")){
            Team team = teamRepository.findTeamById(Long.parseLong(id)).get();
            team.setTeamPic(uploadFile.getOriginalFilename());
            teamRepository.save(team);
        }
        File saveFile = new File(uploadFolder, uploadFile.getOriginalFilename());
        try {
            uploadFile.transferTo(saveFile);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return uploadFile.getOriginalFilename();
    }
    public File downloadFile(String type, String id){
        String path = FileConst.UPLOAD_PATH + type + "\\" + id;
        String fileName = null;
        if (type.equals("member")){
            Member member = memberRepository.findMemberById(id).get();
            fileName = member.getProfileImg();
        }
        else if (type.equals("team")){
            Team team = teamRepository.findTeamById(Long.parseLong(id)).get();
            fileName = team.getTeamPic();
        }
        if (fileName != null)
            return new File(path, fileName);
        else
            return null;
    }
}
