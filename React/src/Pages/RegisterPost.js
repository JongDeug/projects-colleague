import React from "react";
import axios from "axios";
import { useState } from "react";
import "../css/registerPost.css";

function RegisterPost() {
  // const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const frm = new FormData();
  // 리액트 뭐가 ㅣㅇㅆ나본데
  const [attachedFile, setAttachedFile] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };

  const onKeywordsHandler = (event) => {
    setKeywords(event.currentTarget.value);
  };

  const onAttachedFileHandler = (event) => {
    const {files} = event.currentTarget;
    setAttachedFile(files);
  };

  async function requestPost() {
    const token = sessionStorage.getItem("accessToken");

    frm.append('postTitle', JSON.stringify(title));
    frm.append('postContent', JSON.stringify(content));
    frm.append('keywords', JSON.stringify(keywords));

    Array.from(attachedFile).forEach(file => {
      frm.append('attachedFile', file);
    });
    
    return await axios({
      url: "/api/board/crud",
      method: "post",
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      },
      data: frm,
    })
      .then((res) => {
        console.log(res.data.responseData.result["_id"]);
        const postId = res.data.responseData.result["_id"];
        return res.data.responseData.redirect;
      }).then((res) => {
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

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center mt-5">게시글 작성</h2>

          <form>
            <div className="form-group">
              <label for="title">
                제목 <span className="require"></span>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={onTitleHandler}
              />
            </div>

            <div className="form-group">
              <label for="description">내용</label>
              <textarea
                rows="10"
                className="form-control"
                name="content"
                onChange={onContentHandler}
              ></textarea>
            </div>


            <div className="form-group">
              <label for="attachedFile" className="form-label">
                첨부파일
              </label>
              <input
                type="file"
                id="attachedfile"
                name="attachedFile"
                className="form-control"
                multiple
                onChange={onAttachedFileHandler}
              ></input>
            </div>

            <div className="form-group">
              <label for="keyword" className="form-label">
                키워드
              </label>
              <input
                type="text"
                id="keyword"
                className="form-control"
                onChange={onKeywordsHandler}
              ></input>
            </div>

            <div class="form-group mt-5 ">
              <button
                // type="submit"
                type="button"
                className="btn btn-success"
                onClick={requestPost}
              // onSubmit={requestPost}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}

export default RegisterPost;
