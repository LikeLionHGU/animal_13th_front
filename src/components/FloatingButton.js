import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/FloatingButton.module.css"; // 스타일 적용
import { ReactComponent as WriteIcon } from "../assets/icons/writeIcon.svg"; // 글쓰기 아이콘
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function FloatingButton({ onLostClick, onFoundClick }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 감지용 ref
  const lostFormClick = async () => {
    try {
      const response = await axios.get("https://koyangyee.info/user");
      console.log("user: ", response.data);

      if (response.data.isLogin === 0) {
        const result = await Swal.fire({
          title: "로그인이 필요합니다.",
          text: "분실물 등록을 위해 로그인해 주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });

        if (result.isConfirmed) navigate("/");
        return;
      }

      navigate("/lost-form");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // 바깥 클릭 시 닫기
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.floatingContainer} ref={dropdownRef}>
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.show : ""}`}>
        <button className={styles.dropdownItem} onClick={() => {
  onLostClick();  // 부모 컴포넌트에서 전달된 함수 실행
  lostFormClick(); // 내부에서 정의한 함수 실행
}}>
          LOST 글쓰기
        </button>
        <hr className={styles.divider} />
        <button className={styles.dropdownItem} onClick={onFoundClick}>
          FOUND 글쓰기
        </button>
      </div>

      <button
        className={styles.floatingButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <WriteIcon />
      </button>
    </div>
  );
}

export default FloatingButton;