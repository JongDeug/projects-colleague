package com.joinus.joinus.service;

import com.joinus.joinus.domain.Post;
import com.joinus.joinus.persistence.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public Post findPost(Long postId){
        if (postRepository.findById(postId).isPresent())
            return postRepository.findById(postId).get();
        else return null;
    }

    public void create(Post post){
        post.setCreateTime(LocalDateTime.now());
        postRepository.save(post);
    }
    public void delete(Post post, String memberId){   //  공지 삭제 같은 경우는 프론트에서 롤타입에 따라 버튼 막아놓는 식으로
        if (post.getUserId().equals(memberId)){
            postRepository.delete(post);
        }
    }

    public void update(Post post, String memberId){
        if (post.getUserId().equals(memberId)){
            post.setCreateTime(LocalDateTime.now());
            postRepository.save(post);
        }
    }
    public List<Post> postList(){
        return postRepository.findAll();
    }
    public Post postDetail(Long postId){
        return postRepository.findById(postId).get();
    }
    public List<Post> myPosts(String memberId){
        if (postRepository.findPostsByUserId(memberId).isPresent())
            return postRepository.findPostsByUserId(memberId).get();
        else return null;
    }
    public List<Post> search(String text){
        List<Post> posts = new ArrayList<>();
        if (postRepository.findPostsByTitleContaining(text).isPresent())
            posts.addAll(postRepository.findPostsByTitleContaining(text).get());
        if (postRepository.findPostsByContentContaining(text).isPresent())
            posts.addAll(postRepository.findPostsByContentContaining(text).get());
        return posts;
    }
}
