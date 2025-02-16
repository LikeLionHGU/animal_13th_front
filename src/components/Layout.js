import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Layout.module.css";
import { ReactComponent as Logo } from "../assets/icons/zuumLogo.svg";
import { ReactComponent as BigLogo } from "../assets/icons/zuumLogoBig.svg";
import GoogleLoginButton from "./GoogleLoginButton"; // GoogleLoginButton 추가

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

            <GoogleLoginButton />

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