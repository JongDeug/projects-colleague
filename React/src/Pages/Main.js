import React, {Component, useEffect} from 'react';
import '../css/main.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { postList } from '../Data';
import axios from 'axios';
import Carousel from '../Components/Main/CarouselSlide';
import Card from '../Components/Main/SlideCard';


function Main() {
    const imgs = useRef([{src:"unsplash1.jpg", content:"https://images.unsplash.com/photo-1456926631375-92c8ce8"+
    "72def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
    {src:"unsplash2.jpg",content:"https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0"+
    ".3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",},
    {src:"unsplash3.jpg",content:"https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=MnwxMj"+
    "A3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}]);

    const [key, setKey] = useState('home');
    const [postTitles, setPostTitles] = useState([]);
    const [img, setImg] = useState(null);

    // const [posts, setPosts] = useState([]);
    const posts = useRef([]);

    function requestGet() {
        const token = sessionStorage.getItem("accessToken");
        return axios({
            url:"/popularityPosts",
            method:"get",
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((res)=>{
            setPostTitles(res.data.responseData.result);
            let list = [];
            res.data.responseData.result.anything&&res.data.responseData.result.anything.map((post,i)=>{
                list.push(post);
                posts.current.push(post);
            })
            res.data.responseData.result.boast&&res.data.responseData.result.boast.map((post)=>{
                list.push(post);
                posts.current.push(post);
            })
            res.data.responseData.result.information&&res.data.responseData.result.information.map((post)=>{
                list.push(post);
                posts.current.push(post);
            })
            res.data.responseData.result.question&&res.data.responseData.result.question.map((post)=>{
                list.push(post);
                posts.current.push(post);
            })
            console.log(list);
            console.log(posts);
            console.log(res.data.responseData.result);
            console.log(res.data.responseData.result.anything[0].attachedFile[0]);
            console.log(res.data.responseData.result.anything[1].attachedFile[0]);
            console.log(res.data.responseData.result.anything[1].attachedFile[0]===undefined);
            setImg(res.data.responseData.result.anything[0].attachedFile);
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
    console.log(posts);
    function ShowPosts(){
        const list = [];
            postTitles&&Array(postTitles).slice(0,6).map((posts) => {
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
        <Carousel imgs={imgs} posts={posts}></Carousel>
        <div className='posts_main'>
            <Tabs
            id="controlled-tab-example"
            className="mb-3 main_tap"
            >
                <Tab eventKey="home" title="게시판">
                    <div className='post_titles'><ShowPosts /></div>
                </Tab>
            </Tabs>
            <Card></Card>
            {/* <section className="mb-5">
                <img src={`http://localhost:3500/${img}`}></img>
            </section> */}
            <Button id='link_to'><Link to='/board/all' className='link_button'>게시판 목록으로 이동</Link></Button>
            
        </div>


        </>
    )
}

export default Main;