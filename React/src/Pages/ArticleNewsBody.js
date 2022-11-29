import { React } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/board.css";

function BodyContents(props) {
  const [newsId, setNewsId] = useState(props.news._id); //  DB 테이블 id
  const [newsTitle, setNewsTitle] = useState(props.news.newsTitle); //  뉴스 제목
  const [newsDescription, setNewsDescription] = useState(
    //  뉴스 요약문
    props.news.newsDescription
  );
  const [newsPubDate, setNewsPubDate] = useState(props.news.newsPubDate); // 뉴스 발행일
  const [newsImageURL, setNewsImageURL] = useState(); //  내용에 포함된 이미지 (url 형태) 이건 아직 조정중
  const [newsSourceLink, setNewsSourceLink] = useState(
    props.news.newsSourceLink
  ); // 뉴스 원문 링크 (네이버뉴스X 소스링크)

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
