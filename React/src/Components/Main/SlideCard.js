import React from 'react';
import { useEffect, useState, useRef } from 'react';
import styles from '../../css/Main.module.css';

function Card(props) {
    const [img,setImg] = useState(props.imgsrc);
    const [content, setContent] = useState(props.content);

    return (
        <div className={styles.card_area}>
            <div className={styles.image_area}>
                {/* <img src="unsplash1.jpg" className={styles.img} /> */}
                <img src={img} className={styles.img} />
            </div>
            <div className={styles.text_area}>
                <p className={styles.text}>
                    {content}
                </p>
            </div>
        </div>
    )
}

export default Card;