
import React, { useState, useEffect } from 'react'
import styles from '../styles/Page.module.css';
import FloatingButton from "../components/FloatingButton"; // 글쓰기 버튼 추가
import { ReactComponent as FoundBanner } from "../assets/icons/FoundPageBanner.svg";  
import axios from "axios";
import {Link} from "react-router-dom";
import FoundPageSearch from "./Small/FoundLostSearch"; 
import { useNavigate } from "react-router-dom";
import FoundWriteModal from "../components/FoundWriteModal";
import { ReactComponent as TopBtn } from "../assets/icons/TopBtn.svg";

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

function FoundPage() {
  const navigate = useNavigate();
  
  const [foundData, setFoundData] = useState();
  const [selectCategory, setSelectCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [latest, setLatest] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [ showModal, setShowModal] = useState(false);
  const [id, setId] = useState(); //모달 창 아이디디
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("https://koyangyee.info/user");
            console.log("user: ", response.data);
            setUserInfo(response.data);
            if(response.data.isLogin === 0){
              alert("로그인이 필요한 페이지입니다.");
              navigate("/");
          }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (keyword) {
          // 검색어가 있을 경우, 검색 API 사용
          url = latest 
            ? `https://koyangyee.info/board/found/all/category/search/new?category=${selectCategory}&search=${keyword}`
            : `https://koyangyee.info/board/found/all/category/search/old?category=${selectCategory}&search=${keyword}`;
        } else {
          // 검색어가 없을 경우, 일반 카테고리 API 사용
          url = latest 
            ? `https://koyangyee.info/board/found/all/category/new?category=${selectCategory}`
            : `https://koyangyee.info/board/found/all/category/old?category=${selectCategory}`;
        }
  
        const response = await axios.get(encodeURI(url));
        console.log("GET URL: ", url);
        console.log("Response: ", response.data);
        setFoundData(response.data.board);
        setLoading(false);
      } catch (error) {
        console.error("오류 발생:", error.response?.data || error.message);
      }
    };
  
    fetchData();
  }, [selectCategory, latest, keyword]); // keyword 상태가 변경될 때도 반영되도록 포함
  

const onCategorySelect = (categoryId) => {
  console.log(categoryId);
  setSelectCategory(categoryId);

}

const onLatestChange = (event) => {
  const value = event.target.value === "true";
  setLatest(value);
  console.log("latest:", value);
};

const onWrite = (id) => {
  setShowModal(true); // 모달을 띄움
  setId(id);
}

const foundNavigate = () =>{
  navigate(`/found-detail/${id}`);
}

const onTopBtnClick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 부드러운 스크롤 효과
  });
}

  
  return (
    <div className={styles.backcolor}>
       <div className={styles.bannerWrapper}>
        <div className={styles.bannerWrapper}>
          <FoundBanner className={styles.banner}/>
          <Link to={'/found-form'} className={styles.bannerBtn}>FOUND 게시물 작성하기</Link>
        </div>
      </div>
      <div className={styles.contentsContainer}>
        <div className={styles.contents}>
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.filterButton} ${selectCategory === category.id ? styles.active : ""}`}
              onClick={() => onCategorySelect(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <FoundPageSearch selectCategory={selectCategory} setFoundData={setFoundData} setKeyword={setKeyword} />
       
     <div className={styles.dropdownWrapper}>
      <select className={styles.dropdown} name="latest" id="latest" onChange={onLatestChange} value={String(latest)}>
        <option value="true" >최신순 </option>
        <option value="false" >오래된순</option>
      </select>
     </div>
      {loading ? (
        <p>로딩 중...</p> // 로딩 중 메시지 표시
            ) : foundData ?
              <div className={styles.cardList} >
                {foundData.map((item) => (
                    <div
                    key={item.id} // key는 item.board.id가 아닌 item.id 사용
                    style={{ cursor: "pointer" }}
                    onClick={() => onWrite(item.id)}
                    >
                        <div className={styles.cardContainer}>
                            <img src={item.image} alt={item.title} className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <span className={styles.cardTitle}>{item.title}</span>
                                <span className={styles.cardCategory}>
                                  {categoryMap[item.category] || "기타"}
                                </span>
                                <span className={styles.cardDate}>{item.printDate}</span> 
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                
             : (
                <p>불러온 정보 없음</p> // 데이터가 없을 경우
            )}
            </div>
        <TopBtn 
          className={styles.TopBtn}
          onClick={() => onTopBtnClick()} 
        />
      <FloatingButton
                onLostClick={() => navigate("/lost-form")}
                onFoundClick={() => navigate("/found-form")}
            />
        </div>
        {showModal && <FoundWriteModal onClose={() => setShowModal(false)} onConfirm={foundNavigate} />}
    </div>
    
  )
}

export default FoundPage
