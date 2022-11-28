import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/Main.module.css';

function Card(props) {
    const [img,setImg] = useState(props.imgsrc);
    const [content, setContent] = useState(props.post.postContent);
    const [type, setType] = useState(props.post.postType);
    const [id, setId] = useState(props.post._id);
    let posttype;
    if(type==="자유 게시판") posttype="boardAnything";
    else if(type==="자랑 게시판") posttype="boardBoast";
    else if(type==="정보 공유 게시판") posttype="boardInformation";
    else if(type==="질문 게시판") posttype="boardQuestion";

    console.log(props.post);
    return (
        <Link to={`/post/${posttype}/${id}`} className={styles.card_area}>
            <div className={styles.image_area}>
                {/* <img src="unsplash1.jpg" className={styles.img} /> */}
                <img src={img} className={styles.img} />
            </div>
            <div className={styles.text_area}>
                <p className={styles.text}>
                    {type}
                </p>
                <p className={styles.text}>
                    {content}
                </p>
            </div>
        </Link>
    )
}

export default Card;