package com.joinus.joinus.controller;

import com.joinus.joinus.dto.FileForm;
import com.joinus.joinus.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
@Slf4j
public class FileController {
    private final FileService fileService;

    @PostMapping("/upload/0")
    public String upload(@RequestParam MultipartFile multipartFile, @RequestParam String type, @RequestParam String id){
        log.info("file = {}", multipartFile);
        log.info("type = {}", type);
        log.info("id = {}", id);
        return fileService.uploadFile(multipartFile, type, id);
    }

    @PostMapping("/upload/1")
    public String upload(@RequestBody FileForm fileForm){
        log.info("{}", fileForm);
        return fileService.uploadFile(fileForm.getMultipartFile(), fileForm.getType(), fileForm.getId());
    }
    @PostMapping("/upload/2")
    public String upload(MultipartHttpServletRequest req){
//        String type = req.getParameter("type");
//        String id = req.getParameter("id");
        MultipartFile file = req.getFile("multipartFile");
        log.info("{}", req);
//        return fileService.uploadFile(file, type, id);
        return fileService.uploadFile(file, "member", "qwe");
    }
    @PostMapping("/upload/3")
    public String upload(@RequestParam MultipartFile multipartFile){
        log.info("{}", multipartFile);
        return fileService.uploadFile(multipartFile, "member", "qwe");
    }

    @PostMapping("/upload/test")
    public String uploadTest(MultipartFile multipartFile, String type, String id, Model model){
        fileService.uploadFile(multipartFile, type, id);
        return "success";
    }

    @GetMapping("/download")
    public Resource downloadTest(@RequestParam String type, @RequestParam String id) throws MalformedURLException {
        if (fileService.downloadFile(type, id) == null)
            return null;
        else
            return new UrlResource("file:" + fileService.downloadFile(type, id));
    }
    @GetMapping("/download/test")
    public File download(@RequestParam String type, @RequestParam String id) throws IOException {
        return fileService.downloadFile(type, id);
    }

}
