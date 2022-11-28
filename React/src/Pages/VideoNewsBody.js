import { React } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [videoNewsId, setVideoNewsId] = useState(props.videoNews._id);
  const [videoNewsTitle, setVideoNewsTitle] = useState(
    props.videoNews.newsTitle
  );
  const [videoNewsDescription, setVideoNewsDescription] = useState(
    props.videoNews.newsDescription
  );
  return (
    <tr>
      <th className="content post_title">
        <Link
          to={{ pathname: `/videoNews/${videoNewsId}`, state: videoNewsId }} //  뉴스 상세 페이지
          className="post_link"
        >
          {videoNewsDescription}
        </Link>
      </th>
      <th className="content post_writer">{videoNewsTitle}</th>
    </tr>
  );
}

export default BodyContents;
