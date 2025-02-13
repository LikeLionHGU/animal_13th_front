import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from "../styles/Page.module.css";
import FloatingButton from "../components/FloatingButton"; // 글쓰기 버튼 추가

function LostPage() {
  const navigate = useNavigate();
  
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
      <FloatingButton
                onLostClick={() => navigate("/lost-form")}
                onFoundClick={() => navigate("/found-form")}
            />
    </div>
  )
}

export default LostPage
