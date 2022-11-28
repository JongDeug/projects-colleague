import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BodyContents from "./VideoNewsBody";
import Pagination from "../Components/Board/Pagination";
import "../css/board.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function VideoNewsList() {
  const [videoNews, setVideoNews] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  function requestGet() {
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/api/news/video",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setVideoNews(res.data.responseData.result);
        console.log(res.data.responseData.result);
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
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: "/api/news/videoKeyword",
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setVideoNews(res.data.responseData.result);
        console.log(res.data.responseData.result);
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
  }, []);

  function ShowContents() {
    const list = [];
    videoNews.slice(offset, offset + limit).map((videoNews) => {
      list.push(<BodyContents videoNews={videoNews}></BodyContents>);
    });
    return list;
  }

  return (
    <>
      <h2>유튜브 뉴스 목록</h2>
      <button onClick={requestGetWithKeyword}>내 키워드 적용</button>

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
        total={videoNews.length}
        limit={limit}
        page={page}
        setPage={setPage}
      ></Pagination>
    </>
  );
}

export default VideoNewsList;
