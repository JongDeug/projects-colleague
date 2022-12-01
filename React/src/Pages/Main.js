import React, {Component, useEffect} from 'react';
import '../css/Main.module.css';
import { Link, Route, Routes } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';
import Carousel from '../Components/Main/CarouselSlide';
import styles from'../css/Main.module.css';
import { Tab, Tabs } from 'react-bootstrap';


function Main() {
    const [key, setKey] = useState('popular');
    const popularPosts = useRef([]);
    const recommendPosts = useRef([]);
    const recomLen = useRef(0);
    const popLen = useRef(0);
    const [isLogin, setIsLogin] = useState(true);
    const boardmenu = ["자유 게시판", "자랑 게시판", "정보 공유 게시판", "질문 게시판"];
    const [anything,setAnything] = useState([]);
    const [boast,setBoast] = useState([]);
    const [information,setInformation] = useState([]);
    const [question,setQuestion] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);

    const newsmenu = ["영상", "기사"];
    const [currentTabNews,setCurrentTabNews] = useState(0);
    const [article, setArticle] = useState([]);
    const [video, setVideo] = useState([]);


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
            let list = [];
            res.data.responseData.result.anything&&res.data.responseData.result.anything.map((post,i)=>{
                list.push(post);
                popularPosts.current.push(post);
            });
            res.data.responseData.result.boast&&res.data.responseData.result.boast.map((post)=>{
                list.push(post);
                popularPosts.current.push(post);
            });
            res.data.responseData.result.information&&res.data.responseData.result.information.map((post)=>{
                list.push(post);
                popularPosts.current.push(post);
            });
            res.data.responseData.result.question&&res.data.responseData.result.question.map((post)=>{
                list.push(post);
                popularPosts.current.push(post);
            });
            popLen.current = list.length;
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }
    function requestRecommendPosts(){
        const token = sessionStorage.getItem("accessToken");
        axios({
            url: '/api/recommendPosts',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((res) => {
            console.log(res.data.responseData.result);
            let list = [];
            recommendPosts.current = [];
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
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        });
    }

    function requestGetAny() {
        return axios({
            url:"/boardAnything/read",
            method:"get",
        }).then((res)=>{
            setAnything(res.data.responseData.result.reverse().slice(0,10));
            console.log(res.data.responseData.result.reverse().slice(0,10));
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }
    function requestGetBoast() {
        return axios({
            url:"/boardBoast/read",
            method:"get",
        }).then((res)=>{
            setBoast(res.data.responseData.result.reverse().slice(0,10));
            console.log(res.data.responseData.result.reverse().slice(0,10));
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }
    function requestGetInfo() {
        return axios({
            url:"/boardInformation/read",
            method:"get",
        }).then((res)=>{
            setInformation(res.data.responseData.result.reverse().reverse().slice(0,10));
            console.log(res.data.responseData.result.reverse().reverse().slice(0,10));
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }
    function requestGetQues() {
        return axios({
            url:"/boardQuestion/read",
            method:"get",
        }).then((res)=>{
            setQuestion(res.data.responseData.result.slice(0,10));
            console.log(res.data.responseData.result.slice(0,10));
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }


    function ShowPostList(){
        console.log(currentTab);
        if(currentTab===0){
            return <ShowPosts posts={anything}></ShowPosts>
        }
        else if(currentTab===1){
            return <ShowPosts posts={boast}></ShowPosts>
        }
        else if(currentTab===2){
            return <ShowPosts posts={information}></ShowPosts>
        }
        else if(currentTab===3){
            return <ShowPosts posts={question}></ShowPosts>
        }
    }
    function ShowNewsList(){
        console.log(currentTabNews);
        if(currentTabNews===0){
            return <ShowPosts posts={article}></ShowPosts>
        }
        else if(currentTabNews===1){
            return <ShowPosts posts={video}></ShowPosts>
        }
    }

    useEffect(()=>{
        requestGetPopular();
        requestGetAny();
        requestGetBoast();
        requestGetInfo();
        requestGetQues();
        setLoginState();
        console.log(isLogin);
    },[]);

    function ShowPosts(props){
        console.log(props.posts);
        console.log(props.posts[0]?.postContent);
        const list = [];
        for(let i=0; i<10; i++){
            if(props.posts[i]){
                console.log(props.posts[i]);
                list.push(<div className={styles.posttitle}>{props.posts[i]?.postTitle}</div>)
            }
            else{
                console.log(props.posts[i]);
                list.push(<div className={styles.posttitle}>&nbsp;</div>)
            }
        }
        // props.posts&&props.posts.map((post) => {
        //     console.log(post);
        //     console.log();
        //     list.push(<div className={styles.posttitle}>{post.postTitle}</div>)
        // }
        // )
        return list;
    };
    
    return(
        <>
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className={`${"mb-3"} ${styles.tabs}`}>
            <Tab eventKey={"popular"} title="인기 게시글" tabClassName={styles.tab}>
                <Carousel posts={popularPosts} len={popLen.current}></Carousel>
            </Tab>
            {isLogin&&
            <Tab eventKey={"recommend"} title="추천 게시글" tabClassName={styles.tab} onClick={requestRecommendPosts()}>
                <Carousel posts={recommendPosts} len={recomLen.current}></Carousel>
            </Tab>}
        </Tabs>
        
        <div className={styles.listarea}>
            <div className={styles.boardlist}>
                <ul className={styles.tabmenu}>
                {boardmenu.map((ele, index)=>{
                    return (
                        <li
                        key={index}
                        className={currentTab === index ? `${styles.submenu} ${styles.focused}` : `${styles.submenu}`}
                        onClick={()=> setCurrentTab(index)}
                    >
                    {ele}
                    </li>
                    )
                })}
                </ul>
                <div className={styles.titlearea}>
                    <ShowPostList></ShowPostList>
                </div>
            </div>

            <div className={styles.boardlist}>
                <ul className={styles.tabmenu}>
                {newsmenu.map((ele, index)=>{
                    return (
                        <li
                        key={index}
                        className={currentTabNews === index ? `${styles.submenu} ${styles.focused}` : `${styles.submenu}`}
                        onClick={()=> setCurrentTabNews(index)}
                    >
                    {ele}
                    </li>
                    )
                })}
                </ul>
                <div className={styles.titlearea}>
                    <ShowNewsList></ShowNewsList>
                </div>
            </div>
            {/* <div className='newslist'>
                <ul className={styles.tabmenu}>
                {newsmenu.map((ele, index)=>{
                    return (
                        <li
                        key={index}
                        className={currentTabNews === index ? `${styles.submenu} ${styles.focused}` : `${styles.submenu}`}
                        onClick={()=> setCurrentTabNews(index)}
                    >
                    {ele}
                    </li>
                    )
                })}
                </ul>
                <div>
                    <ShowNewsList></ShowNewsList>
                </div>
            </div> */}
        </div>
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

        <footer></footer>
        </>
    )
}

export default Main;