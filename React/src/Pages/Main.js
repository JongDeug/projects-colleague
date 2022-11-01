import React, {Component, useEffect} from 'react';
import '../css/main.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import { postList } from '../Data';
import axios from 'axios';


function Main() {
    const [key, setKey] = useState('home');
    const [postTitles, setPostTitles] = useState([]);
    function requestGet() {
        const token = sessionStorage.getItem("accessToken");
        return axios({
            url:"/api/board/crud",
            method:"get",
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((res)=>{
            setPostTitles(res.data.responseData.result);
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }
    useEffect(()=>{
        requestGet();
    },[]);
    function ShowPosts(){
        const list = [];
            postTitles.slice(0,6).map((posts,i) => {
                list.push(<div className='content post_title'>{posts.postTitle}</div>)
            }
            )
            return list;
    };
    
    return(
        <>
        {/* <div className='main'>
            <Link to='/register'>회원가입</Link>
            <Link to='/login'>로그인</Link>
            <Link to='/updatemem'>회원정보 수정</Link>
            <Link to='/findid'>아이디찾기</Link>
            <Link to='/findpassword'>비밀번호찾기</Link>
            <Link to='/changepassword'>비밀번호변경</Link>
            <Link to='/leaveid'>회원탈퇴</Link>
            <p></p>
            <Link to='/freeboard'>자유게시판</Link>
            <Link to='/comments'>댓글예시</Link>
            <Link to='/post'>게시글</Link>
            <Link to='/updatepost'>게시글수정</Link>
            <Link to='/writepost'>게시글작성</Link>
        </div> */}
        <div className='posts_main'>
            <Tabs
            id="controlled-tab-example"
            className="mb-3 main_tap"
            >
                <Tab eventKey="home" title="게시판">
                    <div className='post_titles'><ShowPosts /></div>
                </Tab>
            </Tabs>
            <Button id='link_to'><Link to='/board/all' className='link_button'>게시판 목록으로 이동</Link></Button>
            
        </div>
        </>
    )
}

export default Main;