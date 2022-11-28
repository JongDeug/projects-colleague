import React from 'react';
import { useState, useRef, useEffect } from "react";
import styles from'../../css/Main.module.css';
import Card from './SlideCard';
import { debounce } from 'lodash';


function Carousel(props) {
    const imgs = useRef([{src:"unsplash1.jpg", content:"https://images.unsplash.com/photo-1456926631375-92c8ce8"+
    "72def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
    {src:"unsplash2.jpg",content:"https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0"+
    ".3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",},
    {src:"unsplash3.jpg",content:"https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=MnwxMj"+
    "A3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}]);

    
    const [current, setCurrent] = useState(0);
    // const [style, setStyle] = useState({
    //     marginLeft: `-${current}00%`
    // });
    const [posts, setPosts] = useState(props.posts);
    const [moveLen,setMoveLen] = useState(100);
    console.log(posts.current.length);
    const [moveCnt, setMoveCnt] = useState(posts.current.length);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const handleResize = debounce(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, 1000);
    
    function changeMov(){
        console.log(moveCnt);
        var tabWidth = window.matchMedia("screen and (min-width:480px)");
        var pcWidth = window.matchMedia("screen and (min-width:800px)");
        if(pcWidth.matches){
            setMoveLen(current*33);
            console.log(props.len-2);
            setMoveCnt(props.len-2);
            console.log("pcpsize: "+moveCnt);
        }
        
        else if(tabWidth.matches){
            setMoveLen(current*50);
            console.log(props.len-1);
            setMoveCnt(props.len-1);
            console.log("tabsize: "+moveCnt);
        }
        else{
            setMoveLen(current*100);
            console.log(props.len-0);
            setMoveCnt(props.len);
            console.log("phonesize: "+moveCnt);
        }
    }

    const imgSize = useRef(props.len);
    function moveSlide(i) {
        console.log(moveCnt);
        console.log(imgSize.current+"+"+"i"+i+"current"+current);
        let nextIndex = current + i;
        if(nextIndex<0){
            nextIndex = imgSize.current -1;
        }
        else if(nextIndex>=moveCnt){
            nextIndex = 0;
        }
        setCurrent(nextIndex);
    }
    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        changeMov();
        console.log("useEffect: "+moveCnt);
        return() =>{
            window.removeEventListener('resize',handleResize);
        }
    },[current]);

    console.log(posts);
    console.log(moveCnt);
    return(
        <>
        <div className={styles.container}>
            <div className={styles.slide}>
                <div className={styles.btn} onClick={() => { moveSlide(-1); }}>&lt;</div>
                <div className={styles.window}>
                    <div className={styles.flexbox} style={{marginLeft:`-${moveLen}%`}}>
                    {props.posts.current.map((img, i) => (
                        img.attachedFile[0]?
                        <Card imgsrc={img.attachedFile[0]} post={img} type={img.postType} content={img.postContent}></Card>
                        :
                        <Card imgsrc={"semobanlogo_3.png"} post={img} type={img.postType} content={img.postContent}></Card>
                    ))}
                    </div>
                </div>
                <div className={styles.btn} onClick={() => { moveSlide(1); }}>&gt;</div>
            </div>
        </div>
        </>
    )
}

export default Carousel;