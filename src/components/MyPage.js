import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as Profile } from "../assets/icons/profileZuumuck.svg"; 
import { ReactComponent as MypageBackgroundImg } from "../assets/icons/mypageBackgroundImg.svg"; 
import axios from "axios";
import styles from '../styles/Mypage.module.css'

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

function MyPage() {
    const navigate = useNavigate();

    const [myLost, setMyLost] = useState();
    const [myFound, setMyFound] = useState();
    const [userInfo, setUserInfo] = useState("");
    const [loading, setLoading] = useState(true);
    const [isLoggedin, setIsLoggedin] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get("https://koyangyee.info/board/lost/mypage/main");
              console.log("Lost: ", response.data.board);
              setMyLost(response.data.board);
          } catch (error) {
              console.error("오류 발생:", error);
          }
      };
      fetchData();
  }, []);

 useEffect(() => {
     const fetchData = async () => {
       try {
             const response = await axios.get("https://koyangyee.info/board/found/mypage/main");
             console.log("Found: ", response.data.board);
             setMyFound(response.data.board);
       } catch (error) {
             console.error("오류 발생:", error);
       } finally {
         setLoading(false);
       }
     };
     fetchData();
 }, []);

 useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get("https://koyangyee.info/auth/islogin");
          console.log("isLogin: ", response.data.isLogin);
      } catch (error) {
          console.error("오류 발생:", error);
      }
  };
  fetchData();
}, []);

 useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get("https://koyangyee.info/user");
          console.log("user: ", response.data);
          setUserInfo(response.data);
          setIsLoggedin(response.data.isLogin);
          if(response.data.isLogin === 0){
            alert("로그인이 필요한 페이지입니다.");
            navigate("/");
        }
      } catch (error) {
          console.error("오류 발생:", error);
      }
  };
  fetchData();
}, []);

    const myFoundPageClick = () => {
        navigate("/mypage-found");
    }

    const myLostPageClick = () => {
        navigate("/mypage-lost");
    }

  return (
    <div>
        <div className={styles.backgroundWrapper}>
            <MypageBackgroundImg className={styles.background} preserveAspectRatio="none" />
        </div>
        <div className={styles.contentsContainer}>
            <div className={styles.contents}>
                <div className={styles.mypageTopElements}>
                    <Profile className={styles.profileImage} />
                    <span className={styles.userInfo}>
                    {userInfo ? (
                    <>
                        <div className={styles.greeting}>{`안녕하세요, ${userInfo.username}님`}</div>
                        <div className={styles.emailDisplay}>{`${userInfo.email}`}</div>
                    </>
                    ) : (
                    <p>정보를 불러오는 중...</p>
                )}
                </span> 
            </div>
            <div className={styles.title} style={{justifyContent: "space-between"}}>
                <div className={styles.titleText}>
                    <span className={styles.mypageSmallTitle}>내가 작성한 LOST</span> 
                    <span className={styles.lineLost}></span>
                    <div className={styles.stroke}></div>
                </div>
                <span className={styles.showMore} onClick={myLostPageClick}>더보기</span>
            </div>
            <div>
                {myLost ? 
                <>
                    <div className={styles.cardList} >

                        { myLost.map((item) => ( // 띄우는 콘텐츠들 배치하기
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
                </> :
                <>
                    불러온 정보 없음
                </>} 
            </div>

            <div className={styles.title} style={{justifyContent: "space-between"}}>
                        <div className={styles.titleText}>
                            <span className={styles.mypageSmallTitle}>내가 작성한 FOUND</span>
                            <span className={styles.lineFound}></span>
                            <div className={styles.stroke}></div>
                        </div>
                        <span className={styles.showMore} onClick={myFoundPageClick}>더보기</span>
                    </div>

                    <div>
                    {loading ? (
                <p>로딩 중...</p> // 로딩 중 메시지 표시
                    ) : myFound ?
                    <div className={styles.cardList} >
                        
                        {myFound.map((item) => (
                             <Link to={`/found-detail/${item.id}`}
                             style={{ textDecoration: "none", color: "inherit" }} >
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
                        <p>불러온 정보 없음</p> // 데이터가 없을 경우
                    )}
                    </div>
        </div>                 
       </div>            
    </div>
  )
}

export default MyPage