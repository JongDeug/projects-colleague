package com.joinus.joinus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {
    public String uploadFile(MultipartFile uploadFile, String type, String id){
        String uploadPath = "C:\\Users\\user\\Desktop\\Spring\\join-us-web-back-end\\src\\main\\webapp\\" + type;//+ "\\" + id;

        File uploadFolder = new File(uploadPath, id);
        if (!uploadFolder.exists())
            uploadFolder.mkdirs();

        log.info("#############################");
        log.info("파일명 : {}", uploadFile.getOriginalFilename());
        log.info("파일 크기 : {}", uploadFile.getSize());

        File saveFile = new File(uploadFolder, uploadFile.getOriginalFilename());
        try{
            uploadFile.transferTo(saveFile);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }
        return "success";
    }

}
