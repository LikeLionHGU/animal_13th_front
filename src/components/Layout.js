import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Layout.module.css";
import { ReactComponent as Logo } from "../assets/icons/zuumLogo.svg";

const Layout = ({ children }) => {
  const location = useLocation(); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newsList, setNewsList] = useState([
    { id: 1, title: "iPhone 13", category: "FOUND", date: "1일 전" },
  ]); // 나중에 axios로 값 받아와서 수정

  const newsRef = useRef(null); // 모달 위치 참조

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
            <Link
              to="/"
              className={location.pathname === "/" ? styles.active : ""}
            >
              HOME
            </Link>
            <Link
              to="/lost-page"
              className={location.pathname === "/lost-page" ? styles.active : ""}
            >
              LOST
            </Link>
            <Link
              to="/found-page"
              className={location.pathname === "/found-page" ? styles.active : ""}
            >
              FOUND
            </Link>
          </nav>
        </div>

        <div className={styles.rightSection}>
          <Link to="/login">Login</Link>
          <button onClick={() => setIsModalOpen(true)} className={styles.news}>
            News
          </button>
          <Link to="/mypage">My page</Link>
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
    </div>
  );
};

export default Layout;