import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

function LostPageDetail( ) {
  const [lostDetail, setLostDetail] = useState();
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
}, []);


  return (
    <div>
      {lostDetail ? 
      <>
        <h1>Loading...</h1>
      </> :
      <>
        <div>
          <div></div>
          <div>title: {`${lostDetail.title}`}</div>
          <div>category: {`${lostDetail.category}`}</div>
          <div>Date: {`${lostDetail.printDate}`}</div>
          <div>title: {`${lostDetail.title}`}</div>
          <img src={lostDetail.image} alt={lostDetail.title}/>
      </div>
      </>}
      
    </div>
  )
}

export default LostPageDetail