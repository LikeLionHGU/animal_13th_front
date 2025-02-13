import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleLogin} from "@react-oauth/google";
//import styles from "./GoogleLoginStyle.module.css";

function GoogleLoginButton() {
    const [clientId, setClientId] = useState("");

    // 1️) 백엔드에서 Google Client ID 가져오기
    useEffect(() => {
        const fetchClientId = async () => {
            try {
                const response = await axios.get("https://koyangyee.info/auth/login/clientid");
                setClientId(response.data.clientId); // { clientId: "YOUR_CLIENT_ID" }
            } catch (error) {
                console.error("❌ 클라이언트 ID 가져오기 실패:", error);
            }
        };

        fetchClientId();
    }, []);

    const responseMessage = async (response) => {
        console.log("✅ 구글 로그인 응답:", response);
        const googleIdToken = response.credential;

        if (!googleIdToken) {
            console.error("❌ 토큰이 없습니다.");
            alert("로그인 실패. 다시 시도해주세요.");
            return;
        }

        try {
            // 2️) 백엔드에 토큰 전달
            const request = await axios.post(
                "https://koyangyee.info/auth/login",
                { googleIdToken},
                { headers: { "Content-Type": "application/json" } }
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
        <div>
            {clientId ? (
                <div /*className={styles.googleLoginButton}*/>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
            ) : (
                <p>Google 로그인 정보를 불러오는 중...</p>
            )}
        </div>
    );
}

export default GoogleLoginButton;
