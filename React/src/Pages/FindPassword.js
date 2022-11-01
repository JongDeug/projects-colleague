import axios from 'axios';
import React, { Component, useEffect, useState, useCallback } from 'react';
import '../css/member.css';



function FindPwPage() {

    const [userId, setUserId] = useState();
    const [userEmail, setUserEmail] = useState();

    const onIdHandler = (event) => {
        setUserId(event.currentTarget.value);
    }

    const onEmailHandler = (event) => {
        setUserEmail(event.currentTarget.value);
    }

    const requestFindPw = (event) => {
        axios({
            method: "POST",
            url: "/auth/findPwd",
            data: {
                "userId": userId,
                "email": userEmail
            }
        })
            .then((res) => {
                console.log(res.data.responseData);
                return res.data.responseData.redirect;
            })
            .then((res) => {
                window.location = `${res}`;
            })
            .catch((err) => {
                if (err) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.header);
                }
            });
    }

    return (
        <div className='input_page'>
            <h2>비밀번호 찾기</h2>
            <div className='input'>
                <div className='input_content'>
                    <div className='input_what'><label for="id" className='form-label'>아이디</label></div>
                    <span className='input_area'><input type="text" id="id" className='write form-control' onChange={onIdHandler}></input></span>
                </div>
                <div className='input_content'>
                    <div className='input_what'><label for="email" className='form-label'>이메일</label></div>
                    <span className='input_area'><input type="email" id="email" className='write form-control' onChange={onEmailHandler}></input></span>
                </div>

                <input type='button' id="button" value="비밀번호 찾기" class="btn btn-success" onClick={requestFindPw}></input>
            </div>
        </div>
    )
}


export default FindPwPage;