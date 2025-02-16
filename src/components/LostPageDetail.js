import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

function LostPageDetail( ) {
  const [lostDetail, setLostDetail] = useState(null);
  const [isUser, setIsUser] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://koyangyee.info/board/lost/${id}`);
            console.log("foundDetail: ", response.data.board);
            console.log("IsUser: ", response.data.isUser);
            setLostDetail(response.data.board);
            setIsUser(response.data.isUser);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    fetchData();
}, [id]);


  return (
    <div>
      {lostDetail ? 
      <>
      <div>
        <div>title: {`${lostDetail.title}`}</div>
        <div>category: {`${lostDetail.category}`}</div>
        <div>Date: {`${lostDetail.printDate}`}</div>
        <div>title: {`${lostDetail.title}`}</div>
        <img src={lostDetail.image} alt={lostDetail.title}/>
        <div>comment: {`${lostDetail.comments.content}`}</div>
        <img src={lostDetail.comments.image} alt={lostDetail.title}/>
        <div>comments userID: {`${lostDetail.comments.userId}`}</div>
    </div>
    </> :
      <>
        <h1>Loading...</h1>
      </>
    }
    </div>
  )
}

export default LostPageDetail