import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/postDetail.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function MemberDetail() {
  const params = useParams();
  const [_id, set_id] = useState(params.memberId);
  const [userId, setUserid] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const [interestKeywords, setKeywords] = useState("");

  function requestGetDetail(_id) {
    const token = sessionStorage.getItem("accessToken");
    set_id(_id);
    return axios({
      url: `/api/adminMember/manage/${_id}`, // 멤버id(pk)로 findOne 해서 멤버하나 가져오는 get 컨트롤러
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserid(res.data.responseData.result.userId);
        setUserName(res.data.responseData.result.userName);
        setDateofBirth(res.data.responseData.result.dateOfBirth);
        setEmail(res.data.responseData.result.email);
        setKeywords(res.data.responseData.result.interestKeywords);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  function requestMemberDelete() {
    const token = sessionStorage.getItem("accessToken");
    axios({
      url: `/api/adminMember/manage/${_id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        window.location = `${res.data.responseData.redirect}`;
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  useEffect(() => {
    requestGetDetail(_id);
  }, []);

  return (
    <div class="container mt-5">
      사용자 아이디 : {userId}
      <br></br>
      사용자 이름 : {userName}
      <br></br>
      사용자 생년월일 : {dateOfBirth}
      <br></br>
      사용자 이메일 : {email}
      <br></br>
      사용자 관심 키워드 : {interestKeywords}
      <br></br>
      <div className="row ri">
        <button onClick={requestMemberDelete}>사용자 추방</button>
      </div>
    </div>
  );
}

export default MemberDetail;
