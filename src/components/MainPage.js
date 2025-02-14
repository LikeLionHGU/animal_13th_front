import React from 'react'
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from './GoogleLoginButton';
import styles from '../styles/Page.module.css'
import { ReactComponent as WriteLost } from "../assets/icons/WriteLost.svg"; 
import { ReactComponent as WriteFound } from "../assets/icons/WriteFound.svg"; 


function MainPage() {
    const navigate = useNavigate();

    const foundFormClick = () => {
        navigate("/found-form");
    }

    const lostFormClick = () => {
        navigate("/lost-form");
    }

    const foundPageClick = () => {
        navigate("/found-page");
    }

    const lostPageClick = () => {
        navigate("/lost-page");
    }
    
    return (
        <div>
            <div><GoogleLoginButton/></div>
            <div className={styles.mainpageButtons}>
                <WriteLost style={{cursor: "pointer"}} onClick={lostFormClick}/>
                <WriteFound style={{cursor: "pointer"}} onClick={foundFormClick}/>
            </div>
            <div className={styles.title} style={{justifyContent: "space-between"}}>
                <div className={styles.titleText}>
                    <span className={styles.Lost}>LOST</span> 
                    <span className={styles.comma}>, </span>
                    <span  className={styles.restTitle}>물건을 잃어버렸어요
                    </span>
                    <span className={styles.lineLost}></span>
                    <div className={styles.stroke}></div>
                </div>
                <span className={styles.showMore} onClick={lostPageClick}>더보기</span>

            </div>
            <div className={styles.title} style={{justifyContent: "space-between"}}>
                <div className={styles.titleText}>
                    <span className={styles.Lost}>FOUND</span> 
                    <span className={styles.comma}>,</span>
                    <span className={styles.restTitle}>물건을 찾았어요</span>
                    <span className={styles.lineFound}></span>
                    <div className={styles.stroke}></div>
                </div>
                <span className={styles.showMore} onClick={foundPageClick}>더보기</span>
            </div>
        </div>
    )
}

export default MainPage
