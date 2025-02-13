import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Layout.module.css";
import Sidebar from "./Sidebar"; // 네비게이션 바 추가
import { ReactComponent as Logo } from "../assets/icons/zuumLogo.svg"; 
import { ReactComponent as NotificationIcon } from "../assets/icons/notification.svg"; 
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg"; 

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* 상단 네비게이션 바 */}
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <div className={styles.icons}>
          <Link to="/alert-page">
            <NotificationIcon className={styles.icon} />
          </Link>
          <Link to="/mypage">
            <ProfileIcon className={styles.icon} />
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <Sidebar /> {/* 왼쪽 사이드바 */}
        <main className={styles.main}>{children}</main> {/* 페이지 컨텐츠 */}
      </div>
    </div>
  );
};

export default Layout;