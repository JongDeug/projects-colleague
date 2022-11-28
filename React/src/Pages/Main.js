import React, {Component, useEffect} from 'react';
// import '../css/main.css';
import { Link, Route, Routes } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';
import Carousel from '../Components/Main/CarouselSlide';
import styles from'../css/Main.module.css';
import { Tab, Tabs } from 'react-bootstrap';


function Main() {
    const imgs = useRef([{src:"unsplash1.jpg", content:"https://images.unsplash.com/photo-1456926631375-92c8ce8"+
    "72def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
    {src:"unsplash2.jpg",content:"https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0"+
    ".3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",},
    {src:"unsplash3.jpg",content:"https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=MnwxMj"+
    "A3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}]);

    const [key, setKey] = useState('popular');
    const [postTitles, setPostTitles] = useState([]);
    const [img, setImg] = useState(null);

    // const [posts, setPosts] = useState([]);
    const posts = useRef([]);
    const recommendPosts = useRef([]);
    const recomLen = useRef(0);
    const popLen = useRef(0);
    const [isLogin, setIsLogin] = useState(true);

    function setLoginState() {
        if (sessionStorage.getItem("accessToken")) {
        setIsLogin(true);
        } else {
        setIsLogin(false);
        }
    }
    function requestGetPopular() {
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
            console.log(posts);
            res.data.responseData.result.anything&&res.data.responseData.result.anything.map((post,i)=>{
                list.push(post);
                posts.current.push(post);
            });
            res.data.responseData.result.boast&&res.data.responseData.result.boast.map((post)=>{
                list.push(post);
                posts.current.push(post);
            });
            res.data.responseData.result.information&&res.data.responseData.result.information.map((post)=>{
                list.push(post);
                posts.current.push(post);
            });
            res.data.responseData.result.question&&res.data.responseData.result.question.map((post)=>{
                list.push(post);
                posts.current.push(post);
            });
            popLen.current = list.length;
            console.log("popular: "+popLen.current);
            // console.log(postslen);
            console.log(list.length);
            // setImg(res.data.responseData.result.anything[0].attachedFile);
            // setPostslen(posts.current.length);
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }
    function requestGetRecommend() {
        const token = sessionStorage.getItem("accessToken");
        return axios({
            url:"/api/recommendPosts",
            method:"get",
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((res)=>{
            let list = [];
            console.log(res.data.responseData.result);
            res.data.responseData.result.anything&&res.data.responseData.result.anything.map((post,i)=>{
                list.push(post);
                recommendPosts.current.push(post);
            });
            res.data.responseData.result.boast&&res.data.responseData.result.boast.map((post)=>{
                list.push(post);
                recommendPosts.current.push(post);
            });
            res.data.responseData.result.information&&res.data.responseData.result.information.map((post)=>{
                list.push(post);
                recommendPosts.current.push(post);
            });
            res.data.responseData.result.question&&res.data.responseData.result.question.map((post)=>{
                list.push(post);
                recommendPosts.current.push(post);
            });
            recomLen.current = list.length;
            console.log("recommend: "+recomLen.current);
            console.log(list.length);
            // setImg(res.data.responseData.result.anything[0].attachedFile);
            // setPostslen(posts.current.length);
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }
    useEffect(()=>{
        requestGetPopular();
        setLoginState();
        console.log(isLogin);
    },[]);
    
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
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        // className="mb-3"
        className={`${"mb-3"} ${styles.tabs}`}>
            <Tab eventKey={"popular"} title="인기 게시글" tabClassName={styles.tab}>
                <Carousel posts={posts} len={popLen.current}></Carousel>
            </Tab>
            {isLogin&&<Tab eventKey="recommend" title="추천 게시글" tabClassName={styles.tab} onClick={requestGetRecommend}>
                <Carousel posts={recommendPosts} len={recomLen.current}></Carousel>
            </Tab>}
        </Tabs>
        {/* <main>
        <div>
            <ul className='tabmenu'>
            {menu.map((ele, index)=>{
                return (
                    <li
                    key={index}
                    className={currentTab === index ? "submenu focused" : "submenu"}
                    onClick={()=> selectMenuHandler(index)}
                >
                {ele}
                </li>
                )
            })}
            </ul>
        </div>
        <Carousel></Carousel>
        </main> */}
        {/* <div className='posts_main'>
            <Tabs
            id="controlled-tab-example"
            className="mb-3 main_tap"
            >
                <Tab eventKey="home" title="게시판">
                    <div className='post_titles'><ShowPosts /></div>
                </Tab>
            </Tabs>
            <section className="mb-5">
                <img src={`http://localhost:3500/${img}`}></img>
            </section>
            <Button id='link_to'><Link to='/board/all' className='link_button'>게시판 목록으로 이동</Link></Button>
            
        </div> */}


        </>
    )
}

export default Main;