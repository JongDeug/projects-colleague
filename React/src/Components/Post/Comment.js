import axios from 'axios';
import React, {useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { commentList } from '../../Data';
import '../../css/like.css';

function Comment (comment, currentUser) {
    const [userId, setUserId] = useState(comment.comment.userId);
    const [contents, setContents] = useState(comment.comment.contents);
    const [commentTime, setcommentTime] = useState(comment.comment.commentTime);
    const [onUpdate, setOnUpdate] = useState(false);
    const [commentId, setCommentId] = useState(comment.comment._id);    
    const [postId, setPostId] = useState(comment.comment.postId);
    const [isUser, setIsUser] = useState(currentUser===userId);

    function requestCommentPut(){
        const token = sessionStorage.getItem("accessToken");
    
        return axios({
            url: "/api/board/comment/crud",
            method:'put',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                commentId : commentId,
                contents : contents,
            }
        }).then((res)=>{
            return res.data.responseData.redirect;
        }).then((res)=>{
            window.location = `${res}`;
        }).catch((err)=>{
            if (err) {
                console.log(commentId);
                console.log(contents);
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        });
    }
    function requestCommentDelete(){
        const token = sessionStorage.getItem("accessToken");
        setPostId(`${comment.comment.postId}`);
        return axios({
            url: '/api/board/comment/crud',
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                postId: `${postId}`,
                commentId: commentId,
            },
        }).then((res)=>{
            return res.data.responseData.redirect;
        }).then((res)=>{
            window.location = `${res}`;
        }).catch((err)=>{
            if (err) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        });
    }

    const onUpcontentHandler=(event)=>{
        setContents(event.currentTarget.value);
    }
    function isUpdating(){
        setOnUpdate(true);
    }
    function EndUpdating(){
        setOnUpdate(false);
    }

    return (
        <div className='comment_content'>
            <div className='username'>{userId}</div>
            {
                onUpdate?
                <textarea className='update_comment' defaultValue={contents} onChange={onUpcontentHandler}></textarea>
                :
                <div className='comment'>{contents}</div>
            }
            <div className='lastline'>
                <div className='comment_time'>{commentTime}</div>
                {
                    onUpdate?
                    <input type='button' value='작성' className='cmtbtn comment_write' onClick={()=>{EndUpdating();  requestCommentPut();}}></input>
                    :
                    (isUser&&<span>
                    <input type='button' value='수정' className='cmtbtn comment_update' onClick={isUpdating}></input>
                    <input type='button' value='삭제' className='cmtbtn comment_delete' onClick={requestCommentDelete}></input>
                    </span>)
                }
            </div>
        </div>
    )
}

// function Comments(props) {
//     const [postId,setPostId] = useState(props._id);
//     const [userId,setUserId] = useState();
//     const [comment, setComment] = useState('');
//     const [commentlist, setCommentlist] = useState(props.comments);
//     const commentarr = [];


//     // useEffect(()=>{
//     //     // setCommentlist(props.comments);
//     //     for(var i=0; i<props.comments.length; i++){
//     //         commentarr.push(props.comments[i]);
//     //     }
//     //     console.log(props.comments[0]);
//     //     console.log(commentlist)
//     //     console.log(commentarr);
//     //     console.log("commentlist");
//     //     // setPostId(props._id);
//     //     console.log(postId);
//     // },[]);

//     const onCommentHandler = (event) => {
//         setComment(event.currentTarget.value);
//     };

//     function PrintComments(){
//         const list = [];

//         commentarr&&commentarr.map((list,i)=>{
//             list.push(
//                 <Comment
//                     comment={list}
//                     key={i}
//                 />
//             )
//         });

//         return list;
//     }

//     function requestCommentPost(){
//         const token = sessionStorage.getItem("accessToken");

//         return axios({
//             url: "/api/board/comment/crud",
//             method:'post',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             data: {
//                 postId : postId,
//                 contents : comment,
//             }
//         }).then((res)=>{
//             console.log(res.data.responseData.result);
//             return res.data.responseData.redirect;
//         }).then((res)=>{
//             window.location = `${res}`;
//         }).catch((err)=>{
//             if (err) {
//                 console.log(err.response.data);
//                 console.log(err.response.status);
//                 console.log(err.response.header);
//             }
//         });
//     }


//     return (
//         <>
//         <div className='comment_area'>
//             <div className='commentslist'>
//                 {/* {commentlist&&commentlist.map((list,i)=>{
//                     return(
//                         <Comment
//                             userId={list.userId}
//                             contents={list.contents}
//                             commentTime={list.commentTime}
//                             key={i}
//                         />
//                     )
//                 })
//             } */}
//             <PrintComments></PrintComments>
            
//             </div>
//             <div className='input_comment'>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                     <Form.Control placeholder='댓글 작성' as="textarea" rows={3} className='comment_form' onChange={onCommentHandler}/>
//                     <Button 
//                         variant="outline-secondary" 
//                         className='write_button'
//                         onClick={requestCommentPost}
//                     >작성</Button>
//                 </Form.Group>
        
//             </div>
//         </div>
        
        
//         </>
//     )
// }

export default Comment;