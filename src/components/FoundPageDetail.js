import React from 'react'
import { useState, useEffect, useParams} from 'react'
import axios from "axios";

function FoundPageDetail( ) {
  const [foundDetail, setFoundDetail] = useState("");
  const [isUser, setIsUser] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://koyangyee.info/board/found/${id}`);
            console.log("foundDetail: ", response.data.board);
            console.log("IsUser: ", response.data.isUser);
            setFoundDetail(response.data.board);
            setIsUser(response.data.isUser);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    fetchData();
}, []);


  return (
    <div>
        <div>title: {`${foundDetail.title}`}</div>
        <div>category: {`${foundDetail.category}`}</div>
        <div>Date: {`${foundDetail.printDate}`}</div>
        <div>title: {`${foundDetail.title}`}</div>
        <img src={foundDetail.image} alt={foundDetail.title}/>
    </div>
  )
}

export default FoundPageDetail
