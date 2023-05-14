package com.joinus.joinus.dto;

import lombok.Data;

@Data
public class ChangePasswordForm {
    private String memberId;
    private String curPw;
    private String newPw;
    private String newPwCheck;
}
