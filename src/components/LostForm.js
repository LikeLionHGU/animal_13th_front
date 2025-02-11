import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Form.module.css?v=2";

const LostForm = () => {
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태
  const navigate = useNavigate();

  const [browser, setBrowser] = useState(); // 웹인지 모바일인지 인식

  // 파일 선택 시 상태에 저장
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // 선택한 파일 저장
    }
  };

  // 폼 제출 시 모든 데이터를 formData에 추가
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      console.log("FormData 내용:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await axios.post("https://koyangyee.info/board/add", formData, {
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

  useEffect(()=>{
    const user = navigator.userAgent;
    // 기본 환경 웹으로 설정
    setBrowser("web")
  
    // userAgent 문자열에 iPhone, Android 일 경우 모바일로 업데이트
    if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
        setBrowser("mobile")
    }
},[])

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
      <h1>Lost 글 작성 페이지</h1>
      <div className={styles.formGroup}>
          <input id="title" name="title" type="text" placeholder="  " className={styles.formField} required />
          <label htmlFor="title" className={styles.formLabel}>제목</label>
        </div>
        <div className={styles.formGroup}>
          <select name="category" id="category" className={styles.formField} style={{cursor: "pointer"}} required>
            <option value="">카테고리</option>
            <option value="1">전자기기</option>
            <option value="2">카드/지갑/현금</option>
            <option value="3">택배</option>
            <option value="4">도서 및 서류</option>
            <option value="5">의류/액세서리</option>
            <option value="6">가방</option>
            <option value="7">기타</option>
          </select>
          {/* <label htmlFor="category" className={styles.formLabel}>카테고리</label> */}
        </div>
        <button type="button" className={styles.button} onClick={() => document.getElementById("cameraInput").click()}>
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
            name="content"
            placeholder="추가적인 정보가 있으면 알려주세요."
            onInput={autoResize}
            ref={textareaRef}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input id="phoneNum" name="phoneNum" type="text" maxlength="13" placeholder="전화번호 (선택) (예시: 010-1234-1234) " className={`${styles.textboxSize} ${styles.formField}`}/>
          <label htmlFor="phoneNum" className={styles.formLabel}>전화번호 (선택) (예시: 010-1234-1234)</label>
        </div>
        <div className={styles.formGroup}>
          <input id="location" name="location" type="text" placeholder="예상 분실 위치 (선택)" className={`${styles.textboxSize} ${styles.formField}`}/>
          <label htmlFor="location" className={styles.formLabel}>예상 분실 위치 (선택)</label>
        </div>
        <div>
          <button className={styles.button} type="submit">완료</button>
        </div>
      </form>
      {browser === "web" ?
        <>
          <div className={styles.sidebar}>
            <h2>Found 게시글</h2>
            <ul className={styles.postList}>
              <div className={styles.postItem}>Found 게시글</div>
              <div className={styles.postItem}>Found 게시글</div>
              <div className={styles.postItem}>Found 게시글</div>
              <div className={styles.postItem}>Found 게시글</div>
              <div className={styles.postItem}>Found 게시글</div>
              <div className={styles.postItem}>Found 게시글</div>
              <div className={styles.postItem}>Found 게시글</div>
              <div className={styles.postItem}>Found 게시글</div>
            </ul>
          </div>
        </> :
        <>
          <div></div>
        </>}
    </div>
  );
};

export default LostForm;