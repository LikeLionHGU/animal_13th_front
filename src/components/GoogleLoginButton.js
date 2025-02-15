import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import styles from "../styles/GoogleLoginStyle.module.css";
axios.defaults.withCredentials = true;

function GoogleLoginButton({ loginTriggerRef }) {
    const [clientId, setClientId] = useState(""); 
    const googleLoginRef = useRef(null); 

    useEffect(() => {
        const fetchClientId = async () => {
            try {
                const response = await axios.get("https://koyangyee.info/auth/login/clientid");
                setClientId(response.data.clientId);
                console.log("✅ 백엔드에서 받아온 Client ID:", response.data.clientId);
            } catch (error) {
                console.error("❌ Client ID 가져오기 실패:", error);
            }
        };

        fetchClientId();
    }, []);

    useEffect(() => {
        if (loginTriggerRef?.current) {
            loginTriggerRef.current.onclick = () => {
                if (googleLoginRef.current) {
                    googleLoginRef.current.click();
                }
            };
        }
    }, [clientId]);

    const responseMessage = async (response) => {
        try {
            console.log("✅ 구글 로그인 응답:", response);
            const googleIdToken = response.credential;

            if (!googleIdToken) {
                console.error("❌ 토큰이 없습니다.");
                alert("로그인 실패. 다시 시도해주세요.");
                return;
            }

            const request = await axios.post(
                "https://koyangyee.info/auth/login",
                { googleIdToken },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
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
        <div style={{ display: "none" }}>
            {clientId ? (
                <GoogleOAuthProvider clientId={clientId}>
                    <div className={styles.googleLoginButton}>
                        <GoogleLogin
                            onSuccess={responseMessage}
                            onError={errorMessage}
                            ref={googleLoginRef} 
                        />
                    </div>
                </GoogleOAuthProvider>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default GoogleLoginButton;