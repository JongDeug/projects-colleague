import { React } from 'react';
import { useEffect, useState } from 'react';
import '../../css/board.css';


function MenuNames ({rowname}) {

    return <th>{rowname.name}</th>;
}

function BoardHead (props) {


    return (
        <thead>
            <tr className='board_head'>
                {/* <th className='head'></th> */}
                <th className='post_title head'>게시글 제목</th>
                <th className='post_writer head'>작성자</th>
                <th className='post_date head'>작성일</th>
                <th className='post_hit head'>조회</th>
                <th className='post_like head'>추천</th>
            </tr>
        </thead>
    )
}


export default BoardHead;