import React, { useState, useEffect } from "react";
import LayoutWeb from "./LayoutWeb";
import LayoutMobile from "./LayoutMobile";

const Layout = ({ children }) => {
  const [browser, setBrowser] = useState(); // 웹인지 모바일인지 인식

  useEffect(()=>{
    const user = navigator.userAgent;
    // 기본 환경 웹으로 설정
    setBrowser("web")
  
    // userAgent 문자열에 iPhone, Android 일 경우 모바일로 업데이트
    if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
        setBrowser("mobile")
    }
},[])

  return browser === "mobile" ? <LayoutMobile>{children}</LayoutMobile> : <LayoutWeb>{children}</LayoutWeb>;
};

export default Layout;