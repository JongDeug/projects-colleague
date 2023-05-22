package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechStackRepository extends JpaRepository <TechStack, Long> {

}
