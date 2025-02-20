import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import styles from "../../styles/GoogleLoginStyle.module.css";
axios.defaults.withCredentials = true;

function GoogleLoginButton( { onLoginSuccess, setIsAuthLoading }) {
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
            alert("로그인 성공");
            if (onLoginSuccess) {
                onLoginSuccess(); // 부모 컴포넌트에서 전달한 로그인 성공 처리 실행
            }

        } catch (error) {
            console.error("로그인 요청 실패:", error);
            alert("로그인 실패. 다시 시도해주세요.");
        } finally {
            if (setIsAuthLoading) setIsAuthLoading(false);
        }
    };

    const errorMessage = (error) => {
        console.error("구글 로그인 오류:", error);
    };

    // const handleLogout = async () => {
    //     try {
    //         console.log("로그아웃 함수 실행")
    //         // 1️⃣ 구글 SDK를 사용하여 클라이언트 측 로그아웃
    //         googleLogout(); // Google OAuth 상태 초기화

    //         // 2️⃣ 백엔드에도 로그아웃 요청
    //         await axios.post("https://koyangyee.info/auth/logout", {}, { withCredentials: true });

    //         alert("로그아웃 되었습니다.");
    //         setIsAuthenticated(false); // 상태 업데이트
    //     } catch (error) {
    //         console.error("로그아웃 실패:", error);
    //         alert("로그아웃 실패. 다시 시도해주세요.");
    //     }
    // };


    return (
        <div> {/* 필요할 때만 보이게 */}
            <GoogleOAuthProvider clientId={clientId}>
                <div className={styles.googleLoginButton}>
                    <GoogleLogin 
                    onSuccess={responseMessage} 
                    onError={errorMessage}>
                        login
                    </GoogleLogin>
                </div>
            </GoogleOAuthProvider>
        </div>

        
    );
}

export default GoogleLoginButton;