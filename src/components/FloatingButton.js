import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/FloatingButton.module.css"; // 스타일 적용
import { ReactComponent as WriteIcon } from "../assets/icons/writeIcon.svg"; // 글쓰기 아이콘

function FloatingButton({ onLostClick, onFoundClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 감지용 ref

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
        <button className={styles.dropdownItem} onClick={onLostClick}>
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