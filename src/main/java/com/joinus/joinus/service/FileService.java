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
    public String uploadFile(MultipartFile[] uploadFile, String type, String id){
        String uploadPath = "C:\\Users\\user\\Desktop\\Spring\\join-us-web-back-end\\src\\main\\resources\\" + type + "\\" + id;
        String fileName;

        for (MultipartFile multipartFile : uploadFile){
            log.info("#############################");
            log.info("파일명 : ", multipartFile.getOriginalFilename());
            log.info("파일 크기 : ", multipartFile.getSize());

            File saveFile = new File(uploadPath, multipartFile.getOriginalFilename());
            fileName = multipartFile.getOriginalFilename();
            try{
                multipartFile.transferTo(saveFile);
            }
            catch (Exception e){
                log.error(e.getMessage());
            }
        }
        return "success";

    }
}
