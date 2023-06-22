package com.joinus.joinus.service;

import com.joinus.joinus.domain.TechStack;
import com.joinus.joinus.persistence.TechStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TechStackService {
    private final TechStackRepository techStackRepository;

    public void addStack(String stack){
        TechStack techStack = new TechStack();
        techStack.setTechStack(stack);
        techStackRepository.save(techStack);
    }
    public List<TechStack> getList(){
        return techStackRepository.findAll();
    }
}
