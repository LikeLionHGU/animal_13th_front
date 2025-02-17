import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css';
import FloatingButton from "../components/FloatingButton"; // 글쓰기 버튼 추가
import axios from "axios";
import {Link} from "react-router-dom";

const categories = [
  { id: 1 , name: "전자기기" },
  { id: 2, name: "카드/학생증" },
  { id: 3, name: "지갑/현금" },
  { id: 4, name: "택배" },
  { id: 5, name: "도서 및 서류" },
  { id: 6, name: "의류/액세서리" },
  { id: 7, name: "가방" },
  { id: 8, name: "기타" },
];

function LostPage() {
  const navigate = useNavigate();

  const [lostData, setLostData] = useState();
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("request: ", category);
        const response = await axios({
          method: 'get',
          url: 'https://koyangyee.info/board/lost/all/category/new',
          params: {
            "category": category
          }
        }, { withCredentials : true })
          .then((Response)=>{
            console.log("Response: ", Response.data);
            setLostData(Response.data.board);
            setLoading(false);
        })
      } catch (error) {
        console.error("오류 발생:", error.response?.data || error.message);
      }
    };
  
    fetchData();
  }, [category]); 

  const onCategorySelect = (categoryId) => {
    console.log(categoryId);
    setCategory(categoryId);
  }
  
  return (
    <div>
      <div className={styles.zummLogoContainer}>
      </div>
      <div className={styles.title}>
        <span className={styles.Lost}>LOST</span> 
        <span className={styles.comma}>, </span>
        <span className={styles.restTitle}>물건을 잃어버렸어요</span>
      </div>
      <div className={styles.intro}>분실물에 대한 정보를 올려주세요</div>

      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`${styles.filterButton} ${category === category.id ? styles.active : ""}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
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

      <FloatingButton
                onLostClick={() => navigate("/lost-form")}
                onFoundClick={() => navigate("/found-form")}
            />
    </div>
  )
}

export default LostPage
