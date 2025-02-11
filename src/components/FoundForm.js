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
  const [location, setLocation] = useState({ lat: 36.103096, lng: 129.387299 }); // MapnLocation에서 값 받아오기

  const [displayLocation, setDisplayLocation] = useState(`${location.lat}, ${location.lng}`);

  const [browser, setBrowser] = useState(); // 웹인지 모바일인지 인식
  const [selectCategory, setCategory] = useState("") // 카테고리 선택 감지
  const [address, setAddress] = useState(""); //좌표 주소로 변환 

  const [textAddress, setTextAddress] = useState("");

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
    if (location && typeof location.lat === "function") {
      setDisplayLocation(`${location.lat()}, ${location.lng()}`); // 함수면 호출해서 값만 저장
    } else {
      setDisplayLocation(`${location.lat}, ${location.lng}`); // 아니면 그냥 사용
    }
  }, [location]); //마커 위치 업데이트 

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

  const onCategorySelect = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  }

  useEffect(() => {
    console.log(selectCategory); // 카테고리 변경시 마다 카테고리 Int 값 selectCategory에 업데이트
  }, [selectCategory]);

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
        <div className={styles.formGroup}>
          <input id="title" name="title" type="text" placeholder="  " className={styles.formField} required />
          <label htmlFor="title" className={styles.formLabel}>제목</label>
        </div>
        <div className={styles.formGroup}>
          <select name="category" id="category" onChange={onCategorySelect} className={styles.formField} style={{cursor: "pointer"}} required>
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

        <div>
          <button type="button" className={styles.button} onClick={() => document.getElementById("galleryInput").click()}>
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

        <div className={styles.formGroup}>
          <input id="phoneNum" name="phoneNum" type="text" maxlength="13" placeholder="전화번호 (선택) (예시: 010-1234-1234) " className={`${styles.textboxSize} ${styles.formField}`}/>
          <label htmlFor="phoneNum" className={styles.formLabel}>전화번호 (선택) (예시: 010-1234-1234)</label>
        </div>

        <div>
          <textarea 
            name="content" 
            placeholder="추가적인 정보가 있으면 알려주세요." 
            ref={textareaRef} 
            onInput={autoResize} 
            className={styles.contentTextBox}
            required />
        </div>

        <h2>물건을 찾은 위치를 입력해 주세요!</h2>

        <NavermapsProvider ncpClientId={MapAPIid}>
          <div className={styles.mapSize}>
            <MapnLocation setLocation={setLocation} setAddress={setAddress}/>
          </div>
        </NavermapsProvider>

        <div>
          <input name="location" type="text" value={address} className={styles.addressDisplay} readOnly />
        </div>

        <div className={styles.formGroup}>
          <input id="detailLocation" name="detailLocation" type="text" placeholder="상세위치" className={`${styles.textboxSize} ${styles.formField}`} />
          <label htmlFor="detailLocation" className={styles.formLabel}>상세위치</label>
        </div>

        <div>
          <button className={styles.button} type="submit">완료</button>
        </div>
      </form>
      {browser === "web" ?
        <>
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
        </> :
        <>
          <div></div>
        </>}
    </div>
  );
};

export default FoundForm;