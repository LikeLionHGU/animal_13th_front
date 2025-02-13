import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Sidebar.module.css"; // CSS 파일
import { ReactComponent as ZUlogo } from "../assets/icons/zuLogo.svg"; // ReactComponent로 불러오기

const Sidebar = () => {
  const location = useLocation(); // 현재 경로 확인

  return (
    <div className={styles.sidebar}>
      <ZUlogo className={styles.logo}/>
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
  );
};

export default Sidebar;