import React from 'react'
import { useNavigate } from "react-router-dom";

function MyPage() {
    const navigate = useNavigate();

    const myFoundPageClick = () => {
        navigate("/mypage-found");
    }

    const myLostPageClick = () => {
        navigate("/mypage-lost");
    }

  return (
    <div>
      <h1>마이페이지</h1>
      <button onClick={myFoundPageClick}>My Found Page</button>
      <button onClick={myLostPageClick}>My Lost Page</button>
    </div>
  )
}

export default MyPage
