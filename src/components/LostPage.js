import React from 'react'
import styles from '../styles/Page.module.css'
import { ReactComponent as Logo } from "../assets/icons/zuumLogo.svg"; // ReactComponent로 불러오기
import { ReactComponent as WriteIcon } from "../assets/icons/writeIcon.svg"; // ReactComponent로 불러오기

function LostPage() {
  return (
    <div>
      <div className={styles.zummLogoContainer}>
        <Logo className={styles.zuumLogo}/>
      </div>
      <div className={styles.title}>
        <span className={styles.Lost}>LOST</span> 
        <span className={styles.comma}>, </span>
        <span className={styles.restTitle}>물건을 잃어버렸어요</span>
      </div>
      <div className={styles.intro}>잃어버린 물건을 찾고 계신가요? 빠르게 되찾을 수 있도록 정보를 공유해 주세요!</div>
      <div className={styles.writeIcon}>
        <WriteIcon/>
      </div>
    </div>
  )
}

export default LostPage
