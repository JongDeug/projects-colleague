import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/board.css';

function PostWithComment(){
    // const [postId, setPostId] = useState(props.post._id);
    // const [postTitle, setPostTitle] = useState(props.post.postTitle);
    // const [postUserId, setPostUserId] = useState(props.post.userId);
    // const [commentId, setCommentId] = useState(props.post.id);
    // const [commentContents, setCommentContents] = useState(props.comment.contents);
    const postId = 1;
    const postTitle = "테스트용제목";
    const commentContents = "테스트용임시댓글내용";

    const titlestyle = {fontWeight: "bold"}

    return(
        <tr>
            <th className='content post_title'>
                <Link to={{pathname:`/post/${postId}`, state:postId}} className='post_link'>
                    <div style={titlestyle}>{postTitle}</div>
                    <br/>
                    <div>{commentContents}</div>
                    </Link>
            </th>
        </tr>
    )
}

export default PostWithComment;