import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styles from '../styles/Mypage.module.css';
import axios from "axios";
import {Link} from "react-router-dom";
import { ReactComponent as MyFoundBanner } from "../assets/icons/MyLostFoundPageBanner.svg";

function MyPageFound() {
  const navigate = useNavigate();

  const [lostData, setLostData] = useState();
  const [loading, setLoading] = useState(true);
  const [latest, setLatest] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const url = latest 
          ? 'https://koyangyee.info/board/found/mypage/all/new'
          : 'https://koyangyee.info/board/found/mypage/all/old';
  
        const response = await axios({
          method: 'get',
          url: url,
        }, { withCredentials : true })
          .then((response)=>{
            console.log("Response: ", response.data);
            setLostData(response.data.board);
            setLoading(false);
        })
      } catch (error) {
        console.error("오류 발생:", error.response?.data || error.message);
      }
    };
  
    fetchData();
  }, [latest]); 

  const onLatestChange = (event) => {
    const value = event.target.value === "true";
    setLatest(value);
    console.log("latest:", value);
  };
  
  return (
    <div className={styles.backcolor}>
      <div className={styles.bannerWrapper}>
          <MyFoundBanner className={styles.banner}/>
      </div>
      <div className={styles.myLFContentsContainer}>
        <div className={styles.myLFContents}>
          <div className={styles.title}>
            <span className={styles.myfoundtitle}>내가 작성한 FOUND</span> 
          </div>

          <div>
          <select name="latest" id="latest" onChange={onLatestChange} value={String(latest)}>
            <option value="true" >최신순</option>
            <option value="false" >오래된순</option>
          </select>
        </div>

          {loading ? (
            <p>로딩 중...</p> // 로딩 중 메시지 표시
                ) : lostData ?
                  <div className={styles.cardList} >
                    {lostData.map((item) => (
                        <Link to={`/lost-detail/${item.id}`}>
                        <div
                        key={item.id} // key는 item.board.id가 아닌 item.id 사용
                        style={{ cursor: "pointer" }}
                        >
                            <div className={styles.cardContainer}>
                                <img src={item.image} alt={item.title} className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <span className={styles.cardTitle}>{item.title}</span>
                                    <span className={styles.cardCategory}>{item.category}</span>
                                    <span className={styles.cardDate}>{item.printDate}</span> 
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))}
                    </div>
                    
                : (
                    <p>불러온 정보 없음</p> // 데이터가 없을 경우
                )}
        </div> 
      </div>   
    </div>
  )
}

export default MyPageFound
