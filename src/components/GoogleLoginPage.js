import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styles from '../styles/GoogleLoginStyle.module.css';

function GoogleLoginPage() {
    const responseMessage = (response) => {
        console.log(response);
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
export default GoogleLoginPage;