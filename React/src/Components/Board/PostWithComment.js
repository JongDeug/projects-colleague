import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/board.css';

function PostWithComment(props){
    const [postId, setPostId] = useState(props.postid);
    // const [postTitle, setPostTitle] = useState(props.post.postTitle);
    // const [postUserId, setPostUserId] = useState(props.post.userId);
    // const [commentId, setCommentId] = useState(props.post.id);
    const [commentContents, setCommentContents] = useState(props.comment);
    const [postType, setPostType] = useState(props.posttype);
    // const postId = 1;
    // const commentContents = "테스트용임시댓글내용";
    var postBoard;
    if(postType === "질문 게시판"){
        postBoard = "boardQuestion";
    }else if(postType === "자유 게시판"){
        postBoard = "boardAnything";
    }else if(postType === "자랑 게시판"){
        postBoard = "boardBoast";
    }else if(postType === "정보 공유 게시판"){
        postBoard = "boardInformation";
    }
    const titlestyle = {fontWeight: "bold"}

    return(
        <tr>
            <th className='content post_title'>
                <Link to={{pathname:`/post/${postBoard}/${postId}`, state:{postBoard:postBoard, postId:postId}}} className='post_link'>
                    
                    <div>{commentContents}</div>
                    </Link>
            </th>
        </tr>
    )
}

export default PostWithComment;