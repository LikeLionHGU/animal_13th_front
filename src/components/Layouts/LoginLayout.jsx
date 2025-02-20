import React, { useState, useEffect} from "react";
import styles from "../../styles/Layout.module.css";
import GoogleLoginButton from "../API/GoogleLoginButton";

const LoginLayout = ({setShowLogin}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [islogin, setIslogin] = useState("Login");

  useEffect( () =>{
    localStorage.getItem("isLogin") === "1"
    ? setIsLogoutModalOpen(true)
    : setIsLoginModalOpen(true)

    }, [] )

  const handleLoginSuccess = () => {
    localStorage.setItem("isLogin", "1");
    window.location.reload();
    setIsLoginModalOpen(false);
    setIslogin("Logout");
    document.body.style.overflow = "auto";
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    window.location.reload();
    setIsLogoutModalOpen(false);
  };

  return (
    <div className={styles.loginContainer}>
      {isAuthLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingText}>로그인 중...</div>
        </div>
      )}

      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <div className={styles.FoundModalOverlay}>
          <div className={styles.Loginmodal}>
            <h2>로그인 하시겠습니까?</h2>
            <div className={styles.googleLoginContainer}>
              <GoogleLoginButton
                onLoginSuccess={handleLoginSuccess}
                setIsAuthLoading={setIsAuthLoading}
              />
            </div>
            <button className={styles.closeButton} onClick={() => {
                setIsLoginModalOpen(false);
                setShowLogin(false);
                
                }}>
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 로그아웃 모달 */}
      {isLogoutModalOpen && (
        <div className={styles.FoundModalOverlay}>
          <div className={styles.Loginmodal}>
            <h2>로그아웃 하시겠습니까?</h2>
            <button className={styles.closeButton} onClick={() => {
                setShowLogin(false);
                }}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginLayout;
