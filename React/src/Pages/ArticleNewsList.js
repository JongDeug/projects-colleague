import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BodyContents from "./ArticleNewsBody";
import Pagination from "../Components/Board/Pagination";
import "../css/board.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function ArticleNewsList() {
  const [news, setNews] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  function requestGet() {
    // const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/news/article",
      method: "get",
      // headers: {
        // Authorization: `Bearer ${token}`,
      // },
    })
      .then((res) => {
        setNews(res.data.responseData.result);
        console.log(res.data.responseData.result);
        console.log(news);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }
  function requestGetWithKeyword() {
    // const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/news/articleKeyword",
      method: "get",
      // headers: {
        // Authorization: `Bearer ${token}`,
      // },
    })
      .then((res) => {
        setNews(res.data.responseData.result);
        console.log(res.data.responseData.result);
        console.log(news);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  useEffect(() => {
    requestGet();
    console.log(news);
  }, []);

  function ShowContents() {
    const list = [];
    news.slice(offset, offset + limit).map((news) => {
      list.push(<BodyContents news={news}></BodyContents>);
    });
    return list;
  }

  return (
    <>
      <h2>기사 뉴스 목록</h2>
      <button onClick={requestGetWithKeyword}>내 키워드 적용</button>
      <button onClick={requestGet}>전체 기사 조회</button>

      <main>
        <Table striped bordered hover>
          <div className=""></div>
          {/* <BoardHead></BoardHead> */}
          <tbody>
            <ShowContents></ShowContents>
          </tbody>
        </Table>
      </main>
      <Pagination
        total={news.length}
        limit={limit}
        page={page}
        setPage={setPage}
      ></Pagination>
    </>
  );
}

export default ArticleNewsList;
