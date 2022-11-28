import React from 'react';
import { useState,useEffect,useRef } from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { BiX } from "react-icons/bi";

function CommentNotice(props){
    const [userid,setUserid] = useState(props.comment.userId);
    const [title,setTitle] = useState(props.comment.postTitle);
    const [content,setContent] = useState(props.comment.content);

    return(
        <div class="list-group-item">
            <div class="row g-0 align-items-center">
                <div class="col-10">
                    <a href="#" class="text-dark">
                        <strong>{props.comment.userId}</strong>님이 회원님의 게시글 "{props.comment.postTitle}"에 댓글을 작성했습니다.
                    </a>
                    <div class="text-muted small mt-1">
                        댓글 내용 : {props.comment.content}
                    </div>
                    {/* <div class="text-muted small mt-1">30분 전</div> */}
                    </div>
                    <div class="col-2 deleteBtn">
                        <Nav.Link>
                            <BiX
                                className="deleteIcon"
                                fill="#f64d7185"
                                size={24}
                            ></BiX>
                        </Nav.Link>
                    </div>
                </div>
        </div>
    )
}

export default CommentNotice;