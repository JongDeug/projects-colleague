import { React } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [videoNewsId, setVideoNewsId] = useState(props.videoNews._id); //  db 테이블 id
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
  return (
    <tr>
      <th className="content news_title">
        <Link
          to={{ pathname: `/videoNews/${videoNewsId}`, state: videoNewsId }}
          className="post_link"
        >
          {videoNewsTitle}
        </Link>
      </th>
      <th className="news_description">
        <Link
          to={{ pathname: `/videoNews/${videoNewsId}`, state: videoNewsId }}
          className="post_link"
        >
          {videoNewsDescription}
        </Link>
      </th>
    </tr>
  );
}

export default BodyContents;
