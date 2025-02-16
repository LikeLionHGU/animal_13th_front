import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Layout.module.css";
import { ReactComponent as Logo } from "../assets/icons/zuumLogo.svg";
import GoogleLoginButton from "./GoogleLoginButton"; // GoogleLoginButton 추가

import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
axios.defaults.withCredentials = true;

const Layout = ({ children }) => {
  const location = useLocation();
  const triggerLogin = useRef({ current: null }); // 초기값을 객체로 설정하여 undefined 방지
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsList, setNewsList] = useState([
    { id: 1, title: "iPhone 13", category: "FOUND", date: "1일 전" },
  ]);

  const newsRef = useRef(null);

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

  // 구글 로그인
  const [clientId, setClientId] = useState(""); // 백엔드에서 받아온 Client ID 저장

    useEffect(() => {
        // 백엔드에서 Google Client ID 가져오기
        const fetchClientId = async () => {
            try {
                const response = await axios.get("https://koyangyee.info/auth/login/clientid");
                setClientId(response.data.clientId);
                console.log("백엔드에서 받아온 Client ID:", response.data.clientId);
            } catch (error) {
                console.error("Client ID 가져오기 실패:", error);
            }
        };

        fetchClientId();
    }, []);

    const responseMessage = async (response) => {
        try {
            console.log("구글 로그인 응답:", response);
            const googleIdToken = response.credential;

            if (!googleIdToken) {
                console.error("토큰이 없습니다.");
                alert("로그인 실패. 다시 시도해주세요.");
                return;
            }

            // 백엔드에 구글 토큰 전송
            const request = await axios.post(
                "https://koyangyee.info/auth/login",
                { googleIdToken },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            console.log("✅ 로그인 성공:", request.data);
            alert("로그인 성공");

        } catch (error) {
            console.error("❌ 로그인 요청 실패:", error);
            alert("로그인 실패. 다시 시도해주세요.");
        }
    };

    const errorMessage = (error) => {
        console.error("❌ 구글 로그인 오류:", error);
    };

  return (
    <div className={styles.container}>
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
          {/* Login 버튼 클릭 시 Google 로그인 실행 */}

            {clientId ? (
                <GoogleOAuthProvider clientId={clientId}>
                    <div className={styles.googleLoginButton}>
                        <button className={styles.headerButtonDesign} onSuccess={responseMessage} onError={errorMessage}>login</button>
                    </div>
                </GoogleOAuthProvider>
            ) : (
                <p>Loading...</p>
            )}
        

          {/* <button onClick={() => triggerLogin.current && triggerLogin.current()} className={styles.headerButtonDesign}>
            Login
          </button> */}
          <button onClick={() => setIsModalOpen(true)} className={styles.headerButtonDesign}>
            News
          </button>
          <button onClick={() => navigate("/mypage")} className={styles.headerButtonDesign}>
            My page
          </button>
        </div>
      </header>

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

      {/* GoogleLoginButton을 Layout에서 숨김 처리하고 버튼 클릭 시 실행 */}
      <GoogleLoginButton triggerLogin={triggerLogin} />

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;