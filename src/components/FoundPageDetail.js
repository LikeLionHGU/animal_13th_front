import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import styles from '../styles/FoundDetail.module.css';

function FoundPageDetail() {
  const [foundDetail, setFoundDetail] = useState(null);
  const [isUser, setIsUser] = useState("");
  const [people, setPeople] = useState([]); // 초기값을 빈 배열로 설정
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
  /*사용자 정보 PUSH*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`https://koyangyee.info/board/found/saw/${id}`);
        console.log("post여부 확인: ", response);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, [id]);

  /* 사용자 이름 GET해오기 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://koyangyee.info/board/found/saw/${id}`);
        console.log("유저 데이터: ", response.data.people);
        setPeople(response.data.people || []); // 만약 undefined가 오면 빈 배열로 설정
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {foundDetail ? (
        <>
          <div>
            <p>{`HOME > FOUND > ${foundDetail.title}`}</p>
            <div>Phone: {foundDetail.PhoneNum}</div>
            <div>Title: {foundDetail.title}</div>
            <div>Category: {foundDetail.category}</div>
            <div>Date: {foundDetail.printDate}</div>
            <div>Content: {foundDetail.content}</div>
            <img className={styles.img} src={foundDetail.image} alt={foundDetail.title} />
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}

      {/* 유저 불러오기 */}
      {people.length > 0 ? (
        <div>
          <h3>조회한 사람</h3>
          {people.map((person, index) => (
            <div key={index} className={styles.people}>
              {person.userName} {/* userName 속성을 출력 */}
            </div>
          ))}
        </div>
      ) : (
  <h1>조회한 사람 없음</h1>
)}
    </div>
  );
}

export default FoundPageDetail;
