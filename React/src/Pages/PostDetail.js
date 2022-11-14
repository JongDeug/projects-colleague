import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/postDetail.css";
import { Form } from "react-bootstrap";
import Comment from "../Components/Post/Comment";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { getPostById } from "../Data";

function PostDetail() {
  // const [category, setCategory] = useState("");
  const params = useParams();
  const [_id, set_id] = useState(params.postId);
  const [postTitle, setPostTitle] = useState("");
  const [postUserId, setPostUserId] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTime, setPostTime] = useState("");
  const [hit, setHit] = useState("");
  const [likeHit, setLikeHit] = useState("");
  const [keywords, setKeywords] = useState("");
  const [attachedFile, setAttatchedFile] = useState("");
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function requestGetDetail(_id, method) {
    const token = sessionStorage.getItem("accessToken");
    set_id(_id);
    return axios({
      url: `/api/board/${_id}/${method}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // setPostId(res.data.responseData.result._id);//추가
        setPostTitle(res.data.responseData.result.postTitle);
        setPostContent(res.data.responseData.result.postContent);
        setPostTime(res.data.responseData.result.postTime);
        setPostUserId(res.data.responseData.result.userId);
        setLikeHit(res.data.responseData.result.setLikeHit);
        setKeywords(res.data.responseData.result.keywords);
        setAttatchedFile(res.data.responseData.result.attachedFile);
        setComments(res.data.responseData.result.comments);
        console.log(res.data.responseData.result.attachedFile)
        console.log(typeof res.data.responseData.result.attachedFile)
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  useEffect(() => {
    requestGetDetail(_id, "get");
  }, []);

  function requestDelete() {
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/api/board/crud",
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        postId: _id,
      },
    })
      .then((res) => {
        return res.data.responseData.redirect;
      })
      .then((res) => {
        window.location = `${res}`;
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }
  const onCommentHandler = (event) => {
    setComment(event.currentTarget.value);
  };

  function PrintComments() {
    const list = [];

    comments && comments.map((comments) => {
      list.push(
        <Comment
          comment={comments}
        />
      )
    });
    return list;
  }
  function requestCommentPost() {
    const token = sessionStorage.getItem("accessToken");

    return axios({
      url: "/api/board/comment/crud",
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        postId: _id,
        contents: comment,
      }
    }).then((res) => {
      console.log(res.data.responseData.result);
      return res.data.responseData.redirect;
    }).then((res) => {
      window.location = `${res}`;
    }).catch((err) => {
      if (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      }
    });
  }
  // const { like, like_exist, like_num } = this.state;

  const printImage = () => {
    const arr = [];
    console.log(attachedFile);
    attachedFile && attachedFile.map((value) => {
      arr.push(
        <section className="mb-5">
          <img src={`http://localhost:3500/${value}`}></img>
        </section>
      )
    });
    return arr;
  }

  return (
    <>
      <div class="container mt-5">
        <div className="row ri">
          <Form.Group className="group">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{postTitle}</h1>
                <div className="text-muted fst-italic mb-2">
                  작성날짜 : {postTime}
                </div>
                <div className="text-muted fst-italic mb-2">
                  by {postUserId}
                </div>
                <a
                  className="badge bg-secondary text-decoration-none link-light"
                  href="#!"
                >
                  태그1
                </a>
                <a
                  className="badge bg-secondary text-decoration-none link-light"
                  href="#!"
                >
                  태그2
                </a>
              </header>
              <section className="mb-5">
                <p className="fs-5 mb-4">{postContent}</p>
              </section>
              
              {/* 여기 고친거 */}
              {printImage()}

            </article>

            <div className="btn-wrap">
              <p className="postDetailButtons mt-4 float-right">
                {/* <div className="Like">
                  <img
                    src={!like_exist ? none_like : like}
                    onClick={() => this._toggleLike()}
                  />
                  <h5> 좋아요 ( {like_num} ) </h5>
                </div> */}

                <div>
                  <Link to={{ pathname: `/updatepost/${_id}`, state: _id }}>
                    <Button
                      className="btn-success udPostDetailButtons"
                    // type="submit"
                    // onClick={requestChangePost}}
                    >
                      수정
                    </Button>
                  </Link>
                </div>
              </p>
              <p className="postDetailButtons mt-4 pd">
                <Button
                  className="btn-danger udPostDetailButtons"
                  type="button"
                  onClick={handleShow}
                >
                  삭제
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header>
                    <Modal.Title>게시글 삭제</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>정말 삭제하시겠습니까?</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="none"
                      className="posDtCancelBtn"
                      onClick={handleClose}
                    >
                      취소
                    </Button>
                    <Button
                      variant="none"
                      className="posDtDeleteBtn"
                      onClick={() => {
                        requestDelete();
                      }}
                    >
                      삭제
                    </Button>
                  </Modal.Footer>
                </Modal>
              </p>
            </div>
            <div className='comment_area'>
              <div className='commentslist'>
                <PrintComments></PrintComments>

              </div>
              <div className='input_comment'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control placeholder='댓글 작성' as="textarea" rows={3} className='comment_form' onChange={onCommentHandler} />
                  <Button
                    variant="outline-secondary"
                    className='write_button'
                    onClick={requestCommentPost}
                  >작성</Button>
                </Form.Group>

              </div>
            </div>
          </Form.Group>

          <div />
        </div>
      </div>
    </>
  );
}

export default PostDetail;
