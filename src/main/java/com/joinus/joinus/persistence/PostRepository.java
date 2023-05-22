package com.joinus.joinus.persistence;

import com.joinus.joinus.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository <Post, Long> {
    Optional<List<Post>> findPostsByUserId(String userId);
    Optional<List<Post>> findPostsByTitleContaining(String title);
    Optional<List<Post>> findPostsByContentContaining(String content);
}
