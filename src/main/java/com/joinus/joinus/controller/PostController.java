package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Post;
import com.joinus.joinus.service.PostService;
import com.joinus.joinus.web.validation.SessionConst;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;


    @GetMapping("/list")
    public List<Post> getPostList(){
        return postService.postList();
    }
    @GetMapping("/detail")
    public Post getPostDetail(@RequestParam Long postId){
        return postService.postDetail(postId);
    }
    @PostMapping("/detail/edit")
    public void updatePost(@RequestBody Post post, HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        postService.update(post, member.getId());
    }
    @PostMapping("/detail/delete")
    public void deletePost(@RequestBody Post post, HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        postService.delete(post, member.getId());
    }
    @GetMapping("/myPost")
    public List<Post> getMyPost(HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        return postService.myPosts(member.getId());
    }
}
