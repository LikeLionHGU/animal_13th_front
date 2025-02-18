import { useState } from "react";
import styles from "../../styles/FoundSearch.module.css";
import axios from "axios";

function FoundSearch({ selectCategory, setLost }) {
  const [keyword, setKeyword] = useState(""); // 검색어 상태

  // 검색 버튼을 눌렀을 때 실행
  const handleSearch = async () => {
    if (!keyword) return; // 빈 검색어는 요청하지 않음
    console.log("검색 버튼 클릭 시 keyword 값:", keyword);

    try {
      const response = await axios.get("https://koyangyee.info/board/lost/all/category/search", {
        params: {
          category: selectCategory,
          search: decodeURI(keyword), // keyword를 직접 인코딩
        },
      });

      console.log("ResponseLost:", response.data);
      setLost(response.data.board);
    } catch (error) {
      console.error("검색 요청 실패:", error);
    }
  };

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
}

export default FoundSearch;

