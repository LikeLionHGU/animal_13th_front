import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import styles from '../styles/FoundDetail.module.css';

const categoryMap = {
  1: "전자기기",
  2: "카드/학생증",
  3: "지갑/현금",
  4: "택배",
  5: "도서 및 서류",
  6: "의류/액세서리",
  7: "가방",
  8: "기타",
};

function FoundPageDetail( ) {
  const [foundDetail, setFoundDetail] = useState(null);
  const [isUser, setIsUser] = useState("");
  const [sawPeople, setSawpeople] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
    "Ivy",
    "Jack"
  ]);
  const { id } = useParams();

   // 목데이터 세팅
   useEffect(() => {
    const mockData = {
      id: 1,
      title: "검정색 지갑",
      image: "https://i.ibb.co/TD1YDGKw/Group-384.png", // 샘플 이미지
      PhoneNum: "010-1234-5678",
      category: "지갑/현금",
      printDate: "2024/02/20",
      content: "지하철역 근처에서 발견했습니다. 신분증과 카드가 들어있습니다.",
    };

    setFoundDetail(mockData);
  }, []);



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
  // 로딩 처리
  if (!foundDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.backcolor}>
      <div className={styles.contentContainer}>
      <div className={styles.container4two}>
       
        <div className={styles.detailContentsContainer}>
          <div className={styles.detailContents}>
            <div className={styles.foundDetailTitle}>FOUND 글 상세조회</div>
            <div className={styles.pathTop}>
              <span className={styles.path}>{"HOME > FOUND > "}</span> 
              <span className={styles.pathTitle}>{`${foundDetail.title}`}</span>
            </div>

            <div className={styles.imgNcontentscontainer}>
            <span className={styles.imgContainer}>
              <img className={styles.img} src={foundDetail.image} alt={foundDetail.title}/>
            </span>
            <span className={styles.topRight}>
              <div className={styles.contentsTitle}>{`${foundDetail.title}`}</div>
              <div className={styles.catNDate}>
                <span className={styles.category}>{categoryMap[foundDetail.category] || "기타"}</span>
                <span className={styles.printDate}>{` - ${foundDetail.printDate}`}</span>
              </div>
              <div className={styles.phone}>
                <span className={styles.phoneTitle}>전화번호</span>
                <span className={styles.phoneNum}>{foundDetail.PhoneNum === "undefined" ? `${foundDetail.category}` : "없음"}</span>
              </div>
              <div className={styles.contentBox}>
              <div className={styles.contentContent}>{`${foundDetail.content}`}</div>
              </div>
            </span>
          </div>
          <div>
            <h2>위치</h2>
            <div className={styles.address}>주소 <span> 주소 띄우기</span></div>
            <div className={styles.detailLocation}>상세위치 <span>{foundDetail.detailLocation === "null" ? `${foundDetail.detailLocation}` : "없음"}</span></div>
          </div>
          {/* 여기에 지도 넣기 */}
          </div>
        </div>
        <div className={styles.sawPeopleContainer}>
          <div className={styles.sawPeopleContents}>
            <div className={styles.sawPeopleTitle}>조회한 사람</div>
            <div className={styles.filterContainer}>
            {sawPeople.map((name) => (
              <div
                key={name}
                type="text"
                className={styles.sawNames}
              >
                {name}
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
   
      </div>
    </div>
  );
}

export default FoundPageDetail;
