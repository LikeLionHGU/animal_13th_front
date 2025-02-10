import { useState, useRef, useEffect } from "react";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "./MapnLocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Form.module.css";

const FoundForm = () => {
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태
  const navigate = useNavigate();
  const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;
  const [location, setLocation] = useState({ lat: 36.08333, lng: 129.36667 }); // MapnLocation에서 값 받아오기

  const [displayLocation, setDisplayLocation] = useState(`${location.lat}, ${location.lng}`);

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

  useEffect(() => {
    // location이 변경될 때마다 displayLocation을 업데이트
    setDisplayLocation(`${location.lat}, ${location.lng}`);
  }, [location]);

  // 파일 선택 시 상태에 저장
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // 폼 제출 시 모든 데이터를 formData에 추가
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append("latitude", location.lat);
    formData.append("longitude", location.lng);

    try {
      // FormData 확인용 코드
      console.log("FormData 내용:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      // 나중에 여기까지는 지우기

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

   const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
      <h1>Found 글 작성 페이지</h1>
        {browser === "web" ?
        <>
          <div>웹입니다</div>
        </> :
        <>
          <div>모바일입니다</div>
        </>}
        <div>
          <input name="title" type="text" placeholder="제목" required />
        </div>
        <div>
          <select name="category" required>
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


        <div>
          <button type="button" onClick={() => document.getElementById("galleryInput").click()}>
            사진 첨부
          </button>
          <input
            id="galleryInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.imgInput}
          />
        </div>

        <div className={styles.imgContainer}>
          {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className={styles.imgDisplay} />}
        </div>

        <div>
          <textarea 
            name="content" 
            placeholder="내용" 
            ref={textareaRef} 
            onInput={autoResize} 
            className={styles.contentTextBox}
            required />
        </div>

        <div>
          <input name="phoneNum" type="text" maxlength="13" placeholder="전화번호 (선택) (예시: 010-1234-1234)" className={styles.textboxSize}/>
        </div>

        <h1>물건을 찾은 위치를 입력해 주세요!</h1>

        <NavermapsProvider ncpClientId={MapAPIid}>
          <div className={styles.mapSize}>
            <MapnLocation setLocation={setLocation} />
          </div>
        </NavermapsProvider>

        <div>
          <input name="location" type="text" value={displayLocation} className={styles.textboxSize} readOnly />
        </div>

        <div>
          <input name="detailLocation" type="text" placeholder="상세위치" className={styles.textboxSize} />
        </div>

        <div>
          <button type="submit">완료</button>
        </div>
      </form>
      <div className={styles.sidebar}>
        <h2>Lost 게시글</h2>
        <ul className={styles.postList}>
          <div className={styles.postItem}>Lost 게시글</div>
          <div className={styles.postItem}>Lost 게시글</div>
          <div className={styles.postItem}>Lost 게시글</div>
          <div className={styles.postItem}>Lost 게시글</div>
          <div className={styles.postItem}>Lost 게시글</div>
          <div className={styles.postItem}>Lost 게시글</div>
          <div className={styles.postItem}>Lost 게시글</div>
          <div className={styles.postItem}>Lost 게시글</div>
        </ul>
      </div>
    </div>
  );
};

export default FoundForm;