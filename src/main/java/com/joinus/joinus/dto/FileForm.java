package com.joinus.joinus.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileForm {
    private MultipartFile multipartFile;
    private String type;
    private String id;
}
