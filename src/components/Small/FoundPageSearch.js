import { useState, useEffect } from "react";
import styles from "../../styles/FoundSearch.module.css";
import axios from "axios";

function FoundPageSearch({ selectCategory, setFoundData, setKeyword }) {
  const [search, setSearch] = useState(""); // 검색어 상태

  const handleSearch = () => {
    if (!search) return; // 빈 검색어는 요청하지 않음
    console.log("검색 버튼 클릭 시 keyword 값:", search);
    setKeyword(search);
  };

  useEffect(() => {
    if (!search) return;

    const fetchData = async () => {
      const url = `https://koyangyee.info/board/found/all/category/search/new?category=${selectCategory}&search=${search}`;
      console.log(decodeURI(url));
      console.log(encodeURI(url));

      try {
        const response = await axios.get(encodeURI(url));
        console.log("ResponseLost:", response.data);
        setFoundData(response.data.board);
      } catch (error) {
        console.error("검색 요청 실패:", error);
      }
    };

    fetchData(); // 비동기 함수 실행
  }, [selectCategory, search]); // `search`를 의존성 배열에 추가하여 검색어 변경 시에도 요청 수행

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // 입력값 업데이트
      />
      <button onClick={handleSearch}>검색하기</button>
    </div>
  );
}

export default FoundPageSearch;


