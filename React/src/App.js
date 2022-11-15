// import logo from './logo.svg';
import React, { useRef } from "react";
import Main from './Pages/Main';
import Header from './Components/Header';
import Header2 from "./Components/Header2";
import { Route, Routes } from "react-router-dom";
import FindIdPage from './Pages/FindId';
import FindPwPage from './Pages/FindPassword';
import ChangePwPage from './Pages/ChangePw';
import LeaveIdPage from './Pages/LeaveId';
import RequestRegister from './Pages/RequestRegister';
import Login from './Pages/Login';
import UpdateMember from './Pages/UpdateMember';
import Board from './Pages/FreeBoard';
import Comments from './Components/Post/Comment';
import PostDetail from './Pages/PostDetail';
import RegisterPost from './Pages/RegisterPost';
import UpdatePost from './Pages/UpdatePost';
import Logout from './Pages/Logout';
import BoardFree from './Pages/BoardAnything';
import BoardBoast from './Pages/BoardBoast';
import BoardInfo from './Pages/BoardInfo';
import BoardQues from './Pages/BoardQues';
import MyPostPage from './Pages/MyPostPage';
import MyCommentPage from './Pages/MyCommentPage';
import MyLikePage from './Pages/MyLikePage';

function App() {
  return (
    <>
    <Header2></Header2>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/register" element={<RequestRegister />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/updatemem" element={<UpdateMember />}></Route>
        <Route path="/findid" element={<FindIdPage />}></Route>
        <Route path="/findpassword" element={<FindPwPage />}></Route>
        <Route path="/changepassword" element={<ChangePwPage />}></Route>
        <Route path="/leaveid" element={<LeaveIdPage />}></Route>
        <Route path="/board/free" element={<BoardFree />}></Route>
        <Route path="/board/boast" element={<BoardBoast />}></Route>
        <Route path="/board/info" element={<BoardInfo />}></Route>
        <Route path="/board/question" element={<BoardQues />}></Route>
        <Route path='/comments' element={<Comments />}></Route>
        {/* <Route path='/post' element={<PostDetail />}></Route> */}
        <Route path='/post/:postType/:postId' element={<PostDetail />}></Route>
        <Route path='/writepost' element={<RegisterPost />}></Route>
        <Route path='/updatepost/:postId' element={<UpdatePost />}></Route>
        <Route path='/myact/post' element={<MyPostPage />}></Route>
        <Route path='/myact/like' element={<MyLikePage />}></Route>
        <Route path='/myact/comment' element={<MyCommentPage />}></Route>
      </Routes>
    </>
  );
}

export default App;