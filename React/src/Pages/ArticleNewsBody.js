import { React } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [newsId, setNewsId] = useState(props.news._id);
  const [newsTitle, setNewsTitle] = useState(props.news.newsTitle);
  const [newsDescription, setNewsDescription] = useState(
    props.news.newsDescription
  );

  return (
    <tr>
      <th className="content post_title">
        <Link
          to={{ pathname: `/articleNews/${newsId}`, state: newsId }}
          className="post_link"
        >
          {newsDescription}
        </Link>
      </th>
      <th className="content post_writer">{newsTitle}</th>
    </tr>
  );
}

export default BodyContents;
