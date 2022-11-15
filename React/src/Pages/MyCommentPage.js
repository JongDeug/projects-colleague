import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardHead from '../Components/Board/BoardHead';
import BodyContents from '../Components/Board/BoardBody';
import Pagination from '../Components/Board/Pagination';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button, Form, InputGroup } from 'react-bootstrap';
import PostWithComment from '../Components/Board/PostWithComment';
import { commentList } from '../Data';

function MyCommentPage () {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(()=>{
        // requestGet();
        console.log(posts);
    }, []);

    function requestGet() {
        const token = sessionStorage.getItem("accessToken");
        return axios({
            url:"/api/memberActivity/myComment",
            method:"get",
            headers:{
                Authorization: `Bearer ${token}`
            },
        }).then((res)=>{
            setPosts(res.data.responseData.result);
            console.log(res.data.responseData.result);
            console.log(posts);
        }).catch((err)=>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }
        })
    }

    function ShowContents(){
        var startNum=0;
        if (posts.length-(limit+offset)>=0){
            startNum = posts.length-(limit+offset);
        } 
        const list = [];
        posts&&Array.from(posts).slice(startNum,posts.length-offset).reverse().map((posts) => {
            list.push(<PostWithComment post={posts} comment={comments}></PostWithComment>)
        })
        return list;
    };


    return (
        <>
        <h2>내가 작성한 댓글</h2>

        <main>
        <Table striped bordered hover>
            <div className=''></div>
                <thead>
                    <tr className='board_head'>
                        {/* <th className='head'></th> */}
                        <th className='post_title head'>댓글 목록</th>
                    </tr>
                </thead>
                <tbody>
                    <PostWithComment></PostWithComment>
                    {/* <ShowContents></ShowContents> */}
                </tbody>
        </Table>
        {/* <div className='float-right'><Button className='create_btn float-right'><Link to='/writepost' className='link_to'>작성</Link></Button></div>
         */}
        </main>
        <Pagination total={posts.length} limit={limit} page={page} setPage={setPage}></Pagination>
        </>
    )
}

export default MyCommentPage;