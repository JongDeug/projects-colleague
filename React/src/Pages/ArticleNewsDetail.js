import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/postDetail.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function ArticleNewsDetail() {
  const params = useParams();
  const [_id, set_id] = useState(params.newsId);
  const [newsId, setNewsId] = useState();
  const [newsTitle, setNewsTitle] = useState();
  const [newsDescription, setNewsDescription] = useState();
  const [newsContent, setNewsContent] = useState();

  function requestGetDetail(_id) {
    const token = sessionStorage.getItem("accessToken");
    set_id(_id);
    return axios({
      url: `/api/news/article/${_id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setNewsTitle(res.data.responseData.result.newsTitle);
        setNewsDescription(res.data.responseData.result.newsDescription);
        setNewsContent(res.data.responseData.result.newsContent);
        console.log(res.data.responseData.result);
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
    requestGetDetail(_id);
  }, []);

  return (
    <div class="container mt-5">
      {newsTitle}
      <pre></pre>
      <pre></pre>
      {newsDescription}
      <div className="row ri">{newsContent}</div>
    </div>
  );
}

export default ArticleNewsDetail;
