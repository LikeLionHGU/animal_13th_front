import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/GoogleLoginStyle.module.css';
import axios from "axios";

function GoogleLoginButton() {
    const postData = async (e) => {
        try {
            // 1️⃣ 백엔드에 토큰 전달하여 OAuth 인증 진행
            const request = await axios.post(

                "https://koyangyee.info/auth/login",
                { googleIdToken },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("✅ 로그인 성공:", request.data);

            // 2️⃣ 로그인 성공 후, 백엔드에서 Client ID 가져오기
            const responseClientId = await axios.get("https://koyangyee.info/auth/login/clientid");
            setClientId(responseClientId.data.clientId); // { clientId: "YOUR_CLIENT_ID" }

            console.log("✅ 백엔드에서 받아온 Client ID:", responseClientId.data.clientId);
            alert("로그인 성공");
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