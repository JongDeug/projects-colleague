import { React } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [videoNewsId, setVideoNewsId] = useState(props.videoNews._id); //  db 테이블 id
  const [videoId, setVideoId] = useState(
    //  유튜브 제목
    props.videoNews.videoId
  );
  const [videoNewsTitle, setVideoNewsTitle] = useState(
    //  유튜브 제목
    props.videoNews.newsTitle
  );
  const [videoNewsDescription, setVideoNewsDescription] = useState(
    //  유튜브 영상 소개글 (요약문)
    props.videoNews.newsDescription
  );
  const [thumbnailURL, setThumbnailURL] = useState(
    //  썸네일 이미지 (주소 형식)
    props.videoNews.thumbnailURL
  );
  const srcLink = "https://www.youtube.com/watch?v=" + videoId;
  return (
    <tr className="cursoron" onClick={() => window.open(srcLink)}>
      <th className="content news_thumbnail">
        <div class="url" onClick={() => window.open(srcLink)}>
          <img src={thumbnailURL}></img>
        </div>
      </th>
      <th className="content news_title">
        <div class="url" onClick={() => window.open(srcLink)}>
          {videoNewsTitle}
        </div>
      </th>
      <th className="news_description">
        <div class="url" onClick={() => window.open(srcLink)}>
          {videoNewsDescription}
        </div>
      </th>
    </tr>
  );
}

export default BodyContents;
