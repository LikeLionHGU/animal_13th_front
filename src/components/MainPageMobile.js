import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
//import GoogleLoginButton from '../components/API/GoogleLoginButton';
import styles from '../styles/MainpageMobile.module.css'
import { ReactComponent as WriteLost } from "../assets/icons/WriteLost.svg"; 
import { ReactComponent as WriteFound } from "../assets/icons/WriteFound.svg"; 
import { ReactComponent as Banner } from "../assets/icons/mainpageBanner.svg"; 
import axios from "axios";
import {Link} from "react-router-dom";

const categoryMap = {
    1: "전자기기",
    2: "카드/학생증",
    3: "지갑/현금",
    4: "택배",
    5: "도서 및 서류",
    6: "의류/액세서리",
    7: "가방",
    8: "기타",
  };


function MainPageMobile() {
    const navigate = useNavigate();
    
    const [lostMain, setLostMain] = useState();
    const [foundMain, setFoundMain] = useState();
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

     useEffect(() => {
         const fetchData = async () => {
             try {
                 const response = await axios.get("https://koyangyee.info/board/lost/main");
                 console.log("Lost: ", response.data.board);
                 setLostMain(response.data.board);
             } catch (error) {
                 console.error("오류 발생:", error);
             }
         };
         fetchData();
     }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
                const response = await axios.get("https://koyangyee.info/board/found/main");
                console.log("Found: ", response.data.board);
                setFoundMain(response.data.board);
          } catch (error) {
                console.error("오류 발생:", error);
          } finally {
            setLoading(false); // 로딩 완료
          }
        };
        fetchData();
    }, []);

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
            <div className={styles.bannerWrapper}>
                <Banner className={styles.banner}/>
            </div>
            <div className={styles.contents}>
                <div className={styles.mainpageButtons}>
                    <WriteLost style={{cursor: "pointer"}} onClick={lostFormClick}/>
                    <WriteFound style={{cursor: "pointer"}} onClick={foundFormClick}/>
                </div>
            <div className={styles.title}>
                    <span className={styles.titleText}>
                        <span className={styles.Lost}>LOST, 분실물</span>
                        <span className={styles.lineLost}></span>
                        <div className={styles.stroke}></div>
                    </span>
                    <span className={styles.showMore} onClick={lostPageClick}>더보기</span>
                </div>
                <div>
                    
                    {lostMain ? 
                    
                        <div className={styles.cardList} >

                            { lostMain.slice(0, 3).map((item) => ( // 띄우는 콘텐츠들 배치하기
                        <Link to={`/lost-detail/${item.id}`}
                            style={{ textDecoration: "none", color: "inherit" }} >
                        <div
                                key={item.id}
                                className={styles.cardContainer}
                                style={{ cursor: "pointer" }}
                                >
                                    
                                <img src={item.image} alt={item.title} className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <span className={styles.cardTitle}>{item.title}</span>
                                    <span className={styles.cardCategory}>
                                        {categoryMap[item.category] || "기타"}
                                    </span>
                                    <span className={styles.cardDate}>{item.printDate}</span>
                                </div>
                            </div>
                            </Link>
                            ))}
                        </div>
                    :
                    <>
                        {loading ? <>로딩 중...</> : <></> }
                    </>} 
                </div>

                <div className={styles.title}>
                    <div className={styles.titleText}>
                        <span className={styles.Lost}>FOUND, 습득물</span>
                        <span className={styles.lineFound}></span>
                        <div className={styles.stroke}></div>
                    </div>
                    <span className={styles.showMore} onClick={foundPageClick}>더보기</span>
                </div>

                <div>
                {loading ? (
            <p>로딩 중...</p> // 로딩 중 메시지 표시
                ) : foundMain ?
                <div className={styles.cardList} >
                    {foundMain.slice(0, 3).map((item) => (
                        <Link to={`/found-detail/${item.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <div
                        key={item.id} // key는 item.board.id가 아닌 item.id 사용
                        style={{ cursor: "pointer" }}
                        >
                            <div className={styles.cardContainer}>
                                <img src={item.image} alt={item.title} className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <span className={styles.cardTitle}>{item.title}</span>
                                        <span className={styles.cardCategory}>
                                        {categoryMap[item.category] || "기타"}
                                        </span>
                                    <span className={styles.cardDate}>{item.printDate}</span> 
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))}
                    </div>
                    
                : (
                    <p></p> // 데이터가 없을 경우
                )}
                </div>
            </div>
            </div>
            
                
    )
}

export default MainPageMobile
