package com.joinus.joinus.controller;

import com.joinus.joinus.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
@Slf4j
public class FileController {
    private final FileService fileService;

    @PostMapping("/upload")
    public String upload(@RequestParam MultipartFile uploadFile, @RequestParam String type, @RequestParam String id){
        return fileService.uploadFile(uploadFile, type, id);
    }
    @PostMapping("/upload/test")
    public String uploadTest(MultipartFile uploadFile, Model model){
        return fileService.uploadFile(uploadFile, "member", "qwe");
    }
    @GetMapping("/download")
    public File download(@RequestParam String type, @RequestParam String id) throws IOException {
        return fileService.downloadFile(type, id);
    }

    @GetMapping("/download/test")
    public Resource downloadTest(@RequestParam String type, @RequestParam String id) throws MalformedURLException {
        return new UrlResource("file:" + fileService.downloadFile(type, id));
    }
}
