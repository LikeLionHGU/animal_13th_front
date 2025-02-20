import { useState } from "react";
import styles from "../../styles/FoundPageSearch.module.css";
import { ReactComponent as SearchIcon } from "../../assets/icons/Vector.svg";

function LostSearch({ setKeyword}) {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault(); // 기본 제출 방지

    if (!search.trim()) return; // 빈 검색어 방지
    console.log("검색 실행됨:", search);
    setKeyword(search); // 검색어를 FoundPage로 전달
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSearch}>
      <div className={styles.searchBox}>
        <SearchIcon className={styles.searchIcon} onClick={handleSearch} />
        <input
          type="text"
          value={search}
          placeholder="무엇을 찾고 계신가요?"
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchPlaceholder}
        />
      </div>
      <button type="submit" style={{ display: "none" }}></button> {/* 엔터 입력 지원 */}
    </form>
  );
}

export default LostSearch;

