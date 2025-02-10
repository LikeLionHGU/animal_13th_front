import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "./MapnLocation";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import styles from "../styles/Form.module.css";

const FoundForm = () => {
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태
  const navigate = useNavigate();
  const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;

  // 파일 선택 시 상태에 저장
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // 선택한 파일 저장
    }
  };

  // 폼 제출 시 이미지 포함하여 데이터 전송
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("category", event.target.category.value);
    formData.append("content", event.target.content.value);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post("https:...", formData, { //https://koyangyee.info/board/add
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("업로드 완료:", response.data);
      alert("업로드 완료");
      navigate("/");
    } catch (error) {
      alert("업로드 오류");
      console.error("업로드 오류:", error);
    }
  };

  // 자동 높이 조절
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div>
      <h1>Found 글 작성 페이지</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input id="title" type="text" placeholder="제목" required />
        </div>
        <div>
          <select id="category" required>
            <option value="">카테고리</option>
            <option value="1">전자기기</option>
            <option value="2">카드/지갑/현금</option>
            <option value="3">택배</option>
            <option value="4">도서 및 서류</option>
            <option value="5">의류/액세서리</option>
            <option value="6">가방</option>
            <option value="7">기타</option>
          </select>
        </div>
        <button type="button" onClick={() => document.getElementById("cameraInput").click()}>
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
          {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Captured" className={styles.imgDisplay} />}
        </div>
        <div>
          <textarea
            className={styles.contentTextBox}
            id="content"
            placeholder="내용"
            onInput={autoResize}
            ref={textareaRef}
            required
          />
        </div>
        <h1>물건을 잃어버린 위치를 입력해 주세요!</h1>
        <NavermapsProvider ncpClientId={MapAPIid}>
          <div className={styles.mapSize}>
            <MapnLocation />
          </div>
        </NavermapsProvider>
        <div>
          <input id="detailLocation" type="text" placeholder="상세위치" required />
        </div>
        <div>
          <button type="submit">완료</button>
        </div>
      </form>
    </div>
  );
};

export default FoundForm;
