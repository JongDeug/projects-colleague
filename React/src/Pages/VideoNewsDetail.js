import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/postDetail.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function VideoNewsDetail() {
  const params = useParams();
  const [_id, set_id] = useState(params.videoNewsId);
  const [videoId, setVideoNewsId] = useState();
  const [newsTitle, setVideoNewsTitle] = useState();
  const [newsDescription, setVideoNewsDescription] = useState();

  function requestGetDetail(_id) {
    const token = sessionStorage.getItem("accessToken");
    set_id(_id);
    return axios({
      url: `/api/news/video/${_id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setVideoNewsId(res.data.responseData.result.videoId);
        setVideoNewsTitle(res.data.responseData.result.newsTitle);
        setVideoNewsDescription(res.data.responseData.result.newsDescription);
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

  const source = "https://www.youtube.com/embed/" + videoId;

  return (
    <div class="container mt-5">
      {newsTitle}
      <div className="row ri">
        <iframe
          id="ytplayer"
          type="text/html"
          width="720"
          height="600"
          src={source}
          frameborder="0"
          allowfullscreen
        ></iframe>
        {newsDescription}
        {/* 이건 그냥 뺄까? */}
      </div>
    </div>
  );
}

export default VideoNewsDetail;
