import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Error from "../Components/ErrorMessage";
import "../css/updateMember.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function UpdateMember() {
  const [userId, setUserid] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [email, setEmail] = useState("");
  const [interestKeywords, setKeywords] = useState("");
  const token = sessionStorage.getItem("accessToken");

  const [isValidEmail, setIsValidEmail] = useState(false);

  const onEmailValidCheck = (event) => {
    const checkEmail = event.currentTarget.value;
    if (checkEmail === "") {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  //DB받아오기
  useEffect(() => {
    async function getInfo() {
      await axios({
        url: "/api/member/changeInfo",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
          setUserid(res.data.responseData.result.userId);
          setDateofBirth(res.data.responseData.result.dateOfBirth);
          setEmail(res.data.responseData.result.email);
          setKeywords(res.data.responseData.result.interestKeywords);
      })
      .catch(function (err) {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
          }
      });
    }

    getInfo();
  },[]);

  //데이터 전송
  function requestChangeInfo() {
    const token = sessionStorage.getItem("accessToken");

    axios({
      url: "/api/member/changeInfo",
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        "which": "changeInfo",
        "dateOfBirth": dateOfBirth,
        "email": email,
        "interestKeywords": interestKeywords,
      },
    })
      .then((res) => {
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

  const onIdHandler = (event) => {
    setUserid(event.currentTarget.value);
  };
  const onBirthHandler = (event) => {
    setDateofBirth(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onKeywordHandler = (event) => {
    setKeywords(event.currentTarget.value);
  };

  return (
    <div className="updateMember">
      <Form>
        <h3 className="updateMemberTitle mb-4">회원정보 수정</h3>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="id"
            id="userId"
            defaultValue={userId}
            onChange={onIdHandler}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>생년월일</Form.Label>
          <Form.Control
            type="date"
            id="dateOfBirth"
            defaultValue={dateOfBirth}
            onChange={onBirthHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            defaultValue={email}
            onChange={onEmailHandler}
            onBlur={onEmailValidCheck}
          />
          <Error className="error_text" visibility={isValidEmail}>
            <span>이메일을 입력해주세요.</span>
          </Error>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>키워드</Form.Label>
          <Form.Control
            type="keywords"
            id="inserestKeywords"
            defaultValue={interestKeywords}
            onChange={onKeywordHandler}
          />
        </Form.Group>

        <p className="updateMemberButtons">
          <Button
            className="btn-success"
            // type="submit"
            onClick={requestChangeInfo}
          >
            수정
          </Button>
          <Button className="btn-success" type="submit">
            <Link to="/changepassword" className="link_button">
              비밀번호 수정
            </Link>
          </Button>
          <Button className="btn-success" type="submit">
            <Link to="/leaveid" className="link_button">
              회원탈퇴
            </Link>
          </Button>
        </p>
      </Form>
    </div>
  );
}

export default UpdateMember;
