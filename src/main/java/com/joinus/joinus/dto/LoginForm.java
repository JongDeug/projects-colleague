package com.joinus.joinus.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginForm {
    @NotNull
    private String loginId;
    @NotNull
    private String loginPw;
}
