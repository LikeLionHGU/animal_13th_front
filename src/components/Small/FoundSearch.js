import { useState, useEffect } from 'react'
import styles from '../../styles/FoundSearch.module.css';
import axios from 'axios';

function FoundSearch({selectCategory}) {
    const [keyword, setKeyword] = useState(""); // 검색어 상태
    const [click, setClick] = useState(""); // 실제 요청을 보낼 키워드
  
    // 검색 버튼을 눌렀을 때 실행
    const handleSearch = () => {
      setClick(keyword); // 클릭 시, 입력된 검색어를 저장
    };
  
    // click 상태가 변경될 때마다 GET 요청
    useEffect(() => {
      if (!click) return; // click 값이 없으면 요청 X
      console.log("카테고리:", selectCategory);
      const fetchData = async () => {
        try {
          const response = await axios.get({
            method: 'get',
            url: 'https://koyangyee.info//board/lost/all//category/search',
            params: {
            "category": selectCategory,
            "search": keyword
          }
        })
          console.log("검색 결과:", response.data);
        } catch (error) {
          console.error("검색 요청 실패:", error);
        }
      };
  
      fetchData();
    }, [click]); // click이 변경될 때만 실행


  return (
    <div className={styles.search}>
    <input
      type="text"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)} // 입력값 업데이트
    />
    <button onClick={handleSearch}>검색하기</button>
  </div>
  );
};

export default FoundSearch
