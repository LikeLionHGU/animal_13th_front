import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../../styles/LayoutMobile.module.css";
import { ReactComponent as SmallLogo } from "../../assets/icons/zuumLogoSmall.svg";

import { ReactComponent as LoginIcon } from "../../assets/icons/mobileLoginIcon.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/mobileNotificationIcon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/mobileProfileIcon.svg";
// import GoogleLoginButton from "../API/GoogleLoginButton"; // GoogleLoginButton 추가

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
    <div className={styles.layoutMobileContainer}>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            <SmallLogo />
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
            {/* <GoogleLoginButton /> */}
          <button className={styles.headerButtonDesign}>
            <LoginIcon/>
          </button>
          <button onClick={() => setIsModalOpen(true)} className={styles.headerButtonDesign}>
            <NotificationIcon/>
          </button>
          <button onClick={() => navigate("/mypage")} className={styles.headerButtonDesign}>
            <ProfileIcon/>
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
            <p className={styles.footerText}>
              (주)주움 | 경상북도 포항시 북구 흥해읍 한동로 558 <br/>
              dongmulnongjangteam | 동물농장<br/>
            </p>
          </div>
          <div className={styles.footerRight}>
            <SmallLogo/>
          </div>
        </footer>
    </div>
  );
};

export default Layout;