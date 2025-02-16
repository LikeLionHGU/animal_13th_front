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
            console.log("comment: ", response.data.board.comments.content);
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
        <div>Content: {`${lostDetail.content}`}</div>
        <img src={lostDetail.image} alt={lostDetail.title}/>
        {lostDetail.comments.map((item) => (
                    <Link to={`/found-detail/${item.id}`}>
                    <div
                    key={item.id} // key는 item.board.id가 아닌 item.id 사용
                    onClick={() => handleClick(item)}
                    style={{ cursor: "pointer" }}
                    >
                        <div>comment: {`${item.content}`}</div>
                        <div>등록날짜: {`${item.regDate}`}</div>
                        <div>Print Date: {`${item.printDate}`}</div>
                        <img src={item.image} alt={item.id}/>
                        <div>comments userID: {`${item.userId}`}</div>
                    </div>
                </Link>
                ))}

        
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