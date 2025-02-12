import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/GoogleLoginStyle.module.css';
햣 
function GoogleLoginButton() {
    const responseMessage = (response) => {
        console.log(response); // 로그인 성공시 respons.credential 로 토큰 받아올 수 있음
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