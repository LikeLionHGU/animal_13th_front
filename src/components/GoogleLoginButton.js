import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function GoogleLoginButton() {
    const [clientId, setClientId] = useState(""); // 로그인 후 받아올 Client ID 저장

    const responseMessage = async (response) => {
        console.log("✅ 구글 로그인 응답:", response);
        const googleIdToken = response.credential;

        if (!googleIdToken) {
            console.error("❌ 토큰이 없습니다.");
            alert("로그인 실패. 다시 시도해주세요.");
            return;
        }

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
            console.error("❌ 로그인 요청 실패:", error);
            alert("로그인 실패. 다시 시도해주세요.");
        }
    };

    const errorMessage = (error) => {
        console.error("❌ 구글 로그인 오류:", error);
    };

    return (
        <div>
            <div>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
        </div>
    );
}

export default GoogleLoginButton;

