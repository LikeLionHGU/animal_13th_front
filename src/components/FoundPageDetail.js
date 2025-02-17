import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import styles from '../styles/FoundDetail.module.css';

function FoundPageDetail( ) {
  const [foundDetail, setFoundDetail] = useState(null);
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
}, [id]);


  return (
    <div>
      {foundDetail ? 
      <>
      <div>
        <p>{`HOME > FOUND > ${foundDetail.title}`}</p>
        <div>Phone: {`${foundDetail.PhoneNum}`}</div>
        <div>title: {`${foundDetail.title}`}</div>
        <div>category: {`${foundDetail.category}`}</div>
        <div>Date: {`${foundDetail.printDate}`}</div>
        <div>Content: {`${foundDetail.content}`}</div>
        <img className={styles.img} src={foundDetail.image} alt={foundDetail.title}/>
      </div>
    </>:
      <>
        <h1>Loading...</h1>
      </> 
    } 
      
    </div>
  )
}

export default FoundPageDetail