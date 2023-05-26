package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Member;
import com.joinus.joinus.domain.Post;
import com.joinus.joinus.dto.Response;
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

    @PostMapping("/create")
    public Response createPost(@RequestBody Post post, HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        post.setUserId(member.getId());
        postService.create(post);
        Response response = new Response();
        response.setData("success");
        response.setRedirect("/board/list");
        return response;
    }

    @GetMapping("/list")
    public Response getPostList(){
        List<Post> posts = postService.postList();
        Response response = new Response();
        response.setData(posts);
        response.setRedirect("/board/list");
        return response;
    }
    @GetMapping("/detail")
    public Response getPostDetail(@RequestParam Long postId){
        Post post =  postService.postDetail(postId);

        post.setHit(post.getHit()+1);
        postService.update(post);

        Response response = new Response();
        response.setData(post);
        response.setRedirect("/board/detail");
        return response;
    }
    @GetMapping("/detail/edit")
    public Response getPostDetailForUpdate(@RequestParam Long postId){
        Post post =  postService.postDetail(postId);
        Response response = new Response();
        response.setData(post);
        response.setRedirect("/board/detail");
        return response;
    }
    @PostMapping("/detail/edit")
    public Response updatePost(@RequestBody Post post, HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        postService.update(post);

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/board/detail/edit");
        return response;
    }
    @PostMapping("/detail/delete")
    public Response deletePost(@RequestParam Long postId, HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        Post post = postService.findPost(postId);

        postService.delete(post, member.getId());

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/board/detail/edit");

        return response;
    }
    @GetMapping("/myPost")
    public Response getMyPost(HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        List<Post> posts = postService.myPosts(member.getId());

        Response response = new Response();
        response.setData(posts);
        response.setRedirect("/myPage/myPosts");
        return response;
    }

    @GetMapping("/search")
    public Response searchPost(@RequestParam String text){
        Response response = new Response();
        response.setData(postService.search(text)); //  post list
        response.setRedirect("/myPage/myPosts");
        return response;
    }
}
