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
    const [moveLen,setMoveLen] = useState(100);
    const [moveCnt, setMoveCnt] = useState(props.posts.current.length);
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
        var tabWidth = window.matchMedia("screen and (min-width:480px)");
        var pcWidth = window.matchMedia("screen and (min-width:800px)");
        if(pcWidth.matches){
            setMoveLen(current*33);
            setMoveCnt(props.posts.current.length-2);
        }
        
        else if(tabWidth.matches){
            setMoveLen(current*50);
            setMoveCnt(props.posts.current.length-1);
        }
        else{
            setMoveLen(current*100);
            setMoveCnt(props.posts.current.length);
        }
    }

    const imgSize = useRef(3);
    function moveSlide(i) {
        console.log(i);
        console.log(current);
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
        console.log(props.posts);
        return() =>{
            window.removeEventListener('resize',handleResize);
        }
    },[current]);

    return(
        <>
        <div className={styles.container}>
            <div className={styles.slide}>
                <div className={styles.btn} onClick={() => { moveSlide(-1); }}>&lt;</div>
                <div className={styles.window}>
                    <div className={styles.flexbox} style={{marginLeft:`-${moveLen}%`}}>
                    {props.posts.current.map((img, i) => (
                        img.attachedFile[0]?
                        <Card imgsrc={img.attachedFile[0]} content={img.postContent}></Card>
                        :
                        <Card imgsrc={`unsplash${i+1}.jpg`} content={img.postContent}></Card>
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