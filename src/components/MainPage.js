import React from 'react'
import { useNavigate } from "react-router-dom";


function MainPage() {
    const navigate = useNavigate();

    const foundFormClick = () => {
        navigate("/found-form");
    }

    const lostFormClick = () => {
        navigate("/lost-form");
    }

    const foundPageClick = () => {
        navigate("/found-page");
    }

    const lostPageClick = () => {
        navigate("/lost-page");
    }

    const myPageClick = () => {
        navigate("/mypage");
    }

    const alertPageClick = () => {
        navigate("/alert-page");
    }
    

    return (
        <div>
            <div>
                <button onClick={myPageClick}>마이페이지</button>
                <button onClick={alertPageClick}>알림페이지</button>
            </div>
            <div>
                <button onClick={foundFormClick}>Found 글 작성</button>
                <button onClick={lostFormClick}> Lost 글 작성</button>
            </div>
            <div>
                <button onClick={foundPageClick}>Found 게시판</button>
                <button onClick={lostPageClick}>Lost 게시판</button>
            </div>
        </div>
    )
}

export default MainPage
