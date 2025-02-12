import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/GoogleLoginStyle.module.css';
import axios from "axios";

function GoogleLoginButton() {
    const postData = async (e) => {
        try {
          const url = "https://koyangyee.info/auth/login"; // ✅ 요청을 보낼 엔드포인트
          const data = {
            token: e,
          }; // ✅ 전송할 데이터
      
          const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer your_token", // ✅ 필요 시 인증 토큰 추가
          }; // ✅ 요청 헤더 설정
      
          const response = await axios.post(url, data, { headers });
      
          console.log("✅ 응답 데이터:", response.data);
          return response.data;
        } catch (error) {
          console.error("❌ 요청 실패:", error.response ? error.response.data : error.message);
        }
      };

    const responseMessage = (response) => {
        console.log(response); // 로그인 성공시 response.credential 로 토큰 받아올 수 있음
        postData(response.credential);
        alert("로그인 성공");
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div>
            <div className={styles.googleLoginButton}>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
        </div>
    )
}
export default GoogleLoginButton;