import "../../css/like.css"
import { Button } from "react-bootstrap";
import { GoHeart } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from 'axios';


function Like(props) {
  const [isLiked, setIsLiked] = useState(props.likeHitBool);
  const [postid, setPostid] = useState(props.postid);

  useEffect(()=>{
    setIsLiked(props.likeHitBool);
    console.log(props.likeHitBool);
    console.log(isLiked);
  },[isLiked]);
  const likeBtnStyle = {
    likeBtn: {
      color: isLiked ? "red" : "grey",
    },
  };

  function requestLike(){
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: `/api/boardInformation/like/${postid}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.responseData.result);
        console.log(postid);
        return res.data.responseData.result;
      })
      .catch((err) => {
        if (err) {
          console.log(props.postid);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  function onChangeState() {
    setIsLiked(!isLiked);
    props.setLikeHitBool(!isLiked);
  }

  return (
    <div>
      <GoHeart
        style={likeBtnStyle.likeBtn}
        onClick={()=>{onChangeState(); requestLike();}}
        size={36}
        className="likeBtn"
      ></GoHeart>
      <span>{props.likeHit}</span>
    </div>
  );
}

export default Like;
