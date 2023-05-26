package com.joinus.joinus.service;

import com.joinus.joinus.domain.Post;
import com.joinus.joinus.persistence.PostRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@Transactional
@SpringBootTest
class PostServiceTest {
    @Autowired
    PostRepository postRepository;

    @Test
    void 조회수_체크(){
        //given
        Post post =  new Post();
        post.setId(1L);
        post.setCreateTime(LocalDateTime.now());
        post.setTitle("wow");
        post.setContent("wowwow");
        post.setUserId("sos");
        post.setType(false);
        post.setHit(10);

        //when
        post.setHit(post.getHit()+1);

        //then
        System.out.println("post = " + post);
    }

}