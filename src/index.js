import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
const googleCientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
root.render(
  <GoogleOAuthProvider clientId={googleCientID}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);