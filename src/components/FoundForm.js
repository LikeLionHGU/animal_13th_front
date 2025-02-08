//import styled from "styled-components";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "./MapnLocation";
import { useNavigate } from "react-router-dom";

import { useState, useRef } from "react";
import axios from "axios";
import styles from "../styles/Form.module.css";

const FoundForm = () => {
  const textareaRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();
  const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;

  const CompleteClick = () => {
    navigate("/")
  }

  // 파일 선택 시 자동 업로드
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file)); // 미리보기 설정
      await uploadImage(file); // 이미지 자동 업로드
    }
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("https://your-server.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("업로드 완료:", response.data);
    } catch (error) {
        alert("업로드 오류");
      console.error("업로드 오류:", error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 기존 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞게 높이 조절
    }
  };

  return (
    <div>
        <h1>Found 글 작성 페이지</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              id="title"
              type="text"
              placeholder="제목"
            />
          </div>
          <div>
            <select id="category">
              <option value="-1">카테고리</option>
              <option value="1">전자기기</option>
              <option value="2">옷</option>
              <option value="3">학생증/지갑</option>
            </select>
          </div>

          <button 
              onClick={() => document.getElementById("cameraInput").click()} 
          >
              사진 첨부
          </button>

          <input 
            id="cameraInput"
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={handleFileChange} 
            className={styles.imgInput}
          />

          <div className={styles.imgContainer}>
              {/* 촬영한 이미지 미리보기 */}
              {imageSrc && <img src={imageSrc} alt="Captured" className={styles.imgDisplay}/>}
          </div>
          <div>
            <textarea
              className={styles.contentTextBox}
              id="content"
              type="text"
              placeholder="내용"
              onInput={autoResize}
              ref={textareaRef}
            />
          </div>
          <NavermapsProvider
          ncpClientId={MapAPIid} // 지도서비스 Client ID
        >
          <div className={styles.mapSize}>
            <MapnLocation />
          </div>
        </NavermapsProvider>
        <div>
          <button onClick={CompleteClick}>완료</button>
        </div>
      </form>
    </div>
  ); 
};

export default FoundForm;