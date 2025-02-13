import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css';
import FloatingButton from "../components/FloatingButton"; // 글쓰기 버튼 추가

function FoundPage() {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className={styles.zummLogoContainer}>
      </div>
      <div className={styles.title}>
        <span className={styles.Lost}>FOUND</span> 
        <span className={styles.comma}>, </span>
        <span className={styles.restTitle}>물건을 찾았어요</span>
      </div>
      <div className={styles.intro}>혹시 잃어버린 물건이 있나요? 여기에서 확인해보세요!</div>
      <FloatingButton
                onLostClick={() => navigate("/lost-form")}
                onFoundClick={() => navigate("/found-form")}
            />
    </div>
  )
}

export default FoundPage
