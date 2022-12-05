import { React } from "react";
import { useEffect, useState } from "react";
import "../../css/board.css";

function MenuNames({ rowname }) {
  return <th>{rowname.name}</th>;
}

function NewsBoardHead(props) {
  return (
    <thead>
      <tr className="board_head">
        {/* <th className='head'></th> */}
        <th className="news_thumbnail head">썸네일</th>
        <th className="news_title head">뉴스 제목</th>
        <th className="news_description head">미리보기</th>
      </tr>
    </thead>
  );
}

export default NewsBoardHead;
