import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //id에 입력한 id 저장
  function onIdHandler(event) {
    setId(event.currentTarget.value);
  }
  //password에 입력한 비밀번호 저장
  function onPasswordHandler(event) {
    setPassword(event.currentTarget.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function LoginEnter(event) {
    if (event.key === "Enter") {
      Login();
    }
  }

  function Login() {
    requestAdminLogin();
  }

  function requestAdminLogin() {
    axios({
      url: "/adminAuth/login",
      method: "post",
      data: {
        userId: id,
        password: password,
      },
    })
      .then((res) => {
        const accessToken = res.data.responseData.result.accessToken;
        sessionStorage.setItem("accessToken", accessToken);
        console.log(res.data.responseData.result);
      })
      .then((res) => {
        window.location = `${res}`; //  컨트롤러에서 리다이렉트 없으면 이거 삭제
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  return (
    <div className="Login">
      <Form className="p-4">
        <h3 className="loginTitle">관리자 로그인</h3>
        <Form.Group size="lg" controlId="id" className="mb-4">
          <Form.Label className="mb-2">아이디</Form.Label>
          <Form.Control autoFocus type="id" value={id} onChange={onIdHandler} />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="mb-5">
          <Form.Label className="mb-2">비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={onPasswordHandler}
            onKeyPress={LoginEnter}
          />
        </Form.Group>

        <Button
          block="true"
          className="mb-5 btn btn-success loginBtn"
          size="lg"
          onClick={requestAdminLogin}
        >
          로그인
        </Button>
      </Form>
    </div>
  );
}
