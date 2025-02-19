import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css';
import FloatingButton from "../components/FloatingButton"; // 글쓰기 버튼 추가
import { ReactComponent as LostBanner } from "../assets/icons/LostPageBanner.svg";
import { ReactComponent as DropdownBtn } from "../assets/icons/DropdownButton.svg";
import axios from "axios";
import {Link} from "react-router-dom";

const categories = [
  { id: 0 , name: "전체" },
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
  const [latest, setLatest] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("request: ", category);
  
        const url = latest 
          ? 'https://koyangyee.info/board/lost/all/category/new'
          : 'https://koyangyee.info/board/lost/all/category/old';
  
        const response = await axios({
          method: 'get',
          url: url,
          params: {
            "category": category
          }
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
  }, [category, latest]); 

  const onCategorySelect = (categoryId) => {
    console.log(categoryId);
    setCategory(categoryId);
  }

  const onLatestChange = (event) => {
    const value = event.target.value === "true";
    setLatest(value);
    console.log("latest:", value);
  };
  
  return (
    <div className={styles.wrapper}>
      <LostBanner/>
      <div className={styles.contentsContainer}>
      <div className={styles.contents}>
        <div className={styles.zummLogoContainer}>
        </div>

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

        <div className={styles.dropdownWrapper}>
        <select className={styles.dropdown} name="latest" id="latest" onChange={onLatestChange} value={String(latest)}>
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

        <FloatingButton
                  onLostClick={() => navigate("/lost-form")}
                  onFoundClick={() => navigate("/found-form")}
              />
      </div>
    </div>
  )
}

export default LostPage
