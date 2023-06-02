package com.joinus.joinus.controller;

import com.joinus.joinus.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
@Slf4j
public class FileController {
    private final FileService fileService;

    @PostMapping("/upload")
    public String upload(@RequestBody MultipartFile[] uploadFile){
        String uploadPath = "C:\\Users\\user\\Desktop\\Spring\\join-us-web-back-end\\src\\main\\resources\\";

        for (MultipartFile multipartFile : uploadFile){
            log.info("#############################");
            log.info("info = {}", multipartFile.getOriginalFilename());
        }
        return "success";
    }
}
