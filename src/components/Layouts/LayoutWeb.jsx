import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../../styles/Layout.module.css";
import { ReactComponent as Logo } from "../../assets/icons/zuumLogo.svg";
import { ReactComponent as BigLogo } from "../../assets/icons/zuumLogoBig.svg";
import GoogleLoginButton from "../API/GoogleLoginButton"; // GoogleLoginButton 추가
import axios from "axios";
import { googleLogout } from "@react-oauth/google";

const Layout = ({ children, setisLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  //로그인, 로그아웃 글자
  const [islogin, setIslogin] = useState("Login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [newsList, setNewsList] = useState();
  const [showBlur, setShowBlur] = useState(true); //블러처리 하려고 띄움(글자랑 다르게 대문자자)

  const newsRef = useRef(null);

  const onAlertBtnClick = () => {
      const fetchData = async () => {
        try {
            const response = await axios.get("https://koyangyee.info/notification");
            console.log("알림: ", response.data.notifications);
            console.log("데이터: ", response.data);
            setNewsList(response.data.notifications);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    fetchData();
    // const intervalId = setInterval(fetchData, 10000);

    // return () => clearInterval(intervalId);
  }
    
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newsRef.current && !newsRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 방지
    } else {
      document.body.style.overflow = "auto"; // 스크롤 가능
    }
  }, [isLoginModalOpen]);

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false); // 로그인 모달 닫기
    setIslogin("Logout");
    setShowBlur(false);
    setisLoggedIn(true);
    document.body.style.overflow = "auto"; // 스크롤 다시 가능하도록 설정
  };

  return (
    <div className={styles.container}>
      {isAuthLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingText}>로그인 중...</div>
        </div>
      )}
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
              HOME
            </Link>
            <Link to="/lost-page" className={location.pathname === "/lost-page" ? styles.active : ""}>
              LOST
            </Link>
            <Link to="/found-page" className={location.pathname === "/found-page" ? styles.active : ""}>
              FOUND
            </Link>
          </nav>
        </div>

        <div className={styles.rightSection}>
        <button onClick={() => onAlertBtnClick()}> 알림받기</button>
        <Link
          onClick={() => {
            if (islogin === "Login") {
              // 로그인 상태가 아니면 로그인 모달 열기
              setIsLoginModalOpen(true);
            } else {
              // 로그인 상태이면 로그아웃 모달 열기
              setIsLogoutModalOpen(true);
            }
          }}
          className={isLoginModalOpen || isLogoutModalOpen ? styles.active : ""}
        >
          {islogin}
        </Link>
          <Link onClick={() => setIsModalOpen(true)} className={isModalOpen ? styles.active : ""}>
            Alert
          </Link>
          <Link to="/mypage" className={location.pathname === "/mypage" ? styles.active : ""}>
            My page
          </Link>
        </div>
      </header>

        {/* 로그인 모달 */}
        {isLoginModalOpen && (
          <div className={styles.loginModalOverlay}>
            <div className={styles.loginModal}>
              <h2>로그인 하시겠습니까?</h2>
              <div 
              onClick={() => 
                setIsLoginModalOpen(false)

              }
              className={styles.googleLoginContainer}>
                <GoogleLoginButton 
                  onLoginSuccess={handleLoginSuccess} 
                  setIsAuthLoading={setIsAuthLoading}
                />
              </div>
              <button 
                className={styles.closeButton} 
                onClick={() => setIsLoginModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
      )}


        {isLogoutModalOpen && (
          <div className={styles.loginModalOverlay}>
            <div className={styles.loginModal}>
              <h2>로그아웃 하시겠습니까?</h2>
              <button 
               className={styles.closeButton} 
                onClick={() =>{ 
                  //handleLogout();
                  setIslogin("Login"); // 상태 변경
                  setIsLogoutModalOpen(false);
                  setShowBlur(true);
              }}
              >
                확인
              </button>
            </div>
          </div>
        )}


      {/* 뉴스 모달 */}
      {isModalOpen && (
        <div className={styles.modal} ref={newsRef}>
          <h2 className={styles.modalTitle}>새로운 소식</h2>
          <ul className={styles.newsList}>
            {newsList.map((news) => (
              <li key={news.id} className={styles.newsItem}>
                <span className={styles.newsCategory}>• {news.category}</span>
                <strong>{news.title}</strong>
                <span className={styles.newsDate}>{news.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <h3>사업자 정보</h3>
            <p>
              (주)주움 | 경상북도 포항시 북구 흥해읍 한동로 558 <br/>
              dongmulnongjangteam | 동물농장<br/>
              Planner: 이선유<br/>
              Designer: 김채원<br/>
              Frontend: 한규호, 박서연 (깃허브)<br/>
              Backend: 권혁민, 여지현 (깃허브)
            </p>
          </div>
          <div className={styles.footerRight}>
            <BigLogo/>
          </div>
        </footer>

    </div>
  );
};

export default Layout;