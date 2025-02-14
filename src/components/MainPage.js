import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from './GoogleLoginButton';
import styles from '../styles/Page.module.css'
import { ReactComponent as WriteLost } from "../assets/icons/WriteLost.svg"; 
import { ReactComponent as WriteFound } from "../assets/icons/WriteFound.svg"; 
import axios from "axios";
import {Link} from "react-router-dom";


function MainPage() {
    const navigate = useNavigate();
    
    const [lostMain, setLostMain] = useState();
    const [foundMain, setFoundMain] = useState();
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("https://koyangyee.info/board/lost/main");
    //             console.log("Lost: ", response.data.board);
    //             setLoundMain(response.data);
    //         } catch (error) {
    //             console.error("오류 발생:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

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

    const handleClick = () => {

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

            <div>
                {/* {lostMain ? 
                <>
                    <div>
                    {lostMain.map((item) => ( // 띄우는 콘텐츠들 배치하기
                        <div
                        // className={styles.cell}
                        key={item.board.id}
                        onClick={() => handleClick(item)}
                        style={{ cursor: "pointer" }}
                        >
                            <div>{item.board.image}</div>
                            <div>
                                <span>{item.board.title}</span>
                                <span>{item.board.category}</span>
                                <span>{item.board.printDate}분 전</span>
                            </div>
                        </div>
                        ))}
                    </div>
                </> :
                <>
                    불러온 정보 없음
                </>} */}
                
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

            <div>
            {loading ? (
        <p>로딩 중...</p> // 로딩 중 메시지 표시
            ) : foundMain ? ( // foundMain이 빈 배열이 아닐 때만 표시
                <div>
                {foundMain.map((item) => (
                    <div
                    key={item.id} // key는 item.board.id가 아닌 item.id 사용
                    onClick={() => handleClick(item)}
                    style={{ cursor: "pointer" }}
                    >
                    <div>
                        <img src={item.image} alt={item.title} width={100} />
                    </div>
                    <div>
                        <span>{item.title}</span>
                        <span>{item.category}</span>
                        <span>{item.updateDate}분 전</span>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <p>불러온 정보 없음</p> // 데이터가 없을 경우
            )}
            </div>
        </div>
    )
}

export default MainPage
