import React from 'react'
import styles from '../styles/Page.module.css'
import { ReactComponent as Logo } from "../assets/icons/zuumLogo.svg"; // ReactComponent로 불러오기
import { ReactComponent as WriteIcon } from "../assets/icons/writeIcon.svg"; // ReactComponent로 불러오기

function FoundPage() {
  return (
    <div>
      <div className={styles.zummLogoContainer}>
        <Logo className={styles.zuumLogo}/>
      </div>
      <div className={styles.title}>
        <span className={styles.Lost}>FOUND</span> 
        <span className={styles.comma}>, </span>
        <span className={styles.restTitle}>물건을 찾았어요</span>
      </div>
      <div className={styles.intro}>혹시 잃어버린 물건이 있나요? 여기에서 확인해보세요!</div>
      <div className={styles.writeIcon}>
        <WriteIcon/>
      </div>
    </div>
  )
}

export default FoundPage
