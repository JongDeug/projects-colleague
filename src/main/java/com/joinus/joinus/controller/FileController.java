package com.joinus.joinus.controller;

import com.joinus.joinus.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
@Slf4j
public class FileController {
    private final FileService fileService;

    @PostMapping("/upload")
    public String upload(@RequestParam MultipartFile uploadFile, @RequestParam String type, @RequestParam String id){
        fileService.uploadFile(uploadFile, type, id);
        return "success";
    }
    @GetMapping("/download")
    public String download(@RequestParam String type, @RequestParam String id){
        return "success";
    }
}
