import { useState, useEffect } from "react";
import styles from "../../styles/FoundPageSearch.module.css";
import axios from "axios";
import { ReactComponent as SearchIcon } from "../../assets/icons/Vector.svg";

function FoundPageSearch({ selectCategory, setFoundData, setKeyword }) {
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault(); // 기본 제출(새로고침) 방지

    if (!search.trim()) return; // 빈 검색어 방지
    console.log("검색 실행됨:", search);
    setKeyword(search);
    setClick(true);
  };

  useEffect(() => {
    if (!search) return;

    const fetchData = async () => {
      const url = `https://koyangyee.info/board/found/all/category/search/new?category=${selectCategory}&search=${search}`;
      console.log(decodeURI(url));

      try {
        const response = await axios.get(encodeURI(url));
        console.log("검색 결과:", response.data);
        setFoundData(response.data.board);
      } catch (error) {
        console.error("검색 요청 실패:", error);
      }
    };

    fetchData();
  }, [selectCategory, click]); 

  return (
    <form className={styles.searchContainer} onSubmit={handleSearch} 
    /*Form형식으로 enter, input창과 아이콘을 묶어 CSS관리*/
    >
      <div className={styles.searchBox}> 
        <SearchIcon className={styles.searchIcon} onClick={handleSearch}/>
        <input
          type="text"
          value={search}
          placeholder="무엇을 찾고 계신가요?"
          onChange={(e) => setSearch(e.target.value)}
          onClick={handleSearch}
        ></input>
      </div>
      <button type="submit" style={{ display: "none" }}></button> {/* 엔터 입력 지원 */}
    </form>
  );
}

export default FoundPageSearch;



