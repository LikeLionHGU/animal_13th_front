import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "../API/MapnLocation";
import axios from "axios";
import styles from "../../styles/FormMobile.module.css";

import { ReactComponent as ImageUploadField } from "../../assets/icons/imageUploadField.svg"; // ReactComponent로 불러오기
import UploadConfirmModal from "../UploadConfirmModal";

const FoundFormMobile = () => {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태s
  const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;
  const [location, setLocation] = useState({ lat: 36.103096, lng: 129.387299 }); // MapnLocation에서 값 받아오기

  const [displayLocation, setDisplayLocation] = useState(`${location.lat}, ${location.lng}`);

  const [selectCategory, setCategory] = useState("") // 카테고리 선택 감지
  const [address, setAddress] = useState(""); //좌표 주소로 변환 

  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

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

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  // 폼 제출 시 모든 데이터를 formData에 추가
  const handleConfirm = async (event) => {
    if (showLoading) return;

    setShowModal(false);
    setShowLoading(true);

    const formData = new FormData();
  
    // 이미지 파일이 있으면 추가
    if (imageFile) {
      formData.append("image", imageFile);
    }

const boardData = {
  title: document.getElementById("title")?.value || "",
  category: selectCategory,
  phoneNum: document.getElementById("phoneNum")?.value || "",
  content: document.getElementById("content")?.value || "",
  location: displayLocation,
  detailLocation: document.getElementById("detailLocation")?.value || "",
  boardType: 0,
  latitude: location.lat,
  longitude: location.lng,
};
  
    // JSON 형태로 변환 후 추가
    formData.append("board", new Blob([JSON.stringify(boardData)], { type: "application/json" }));
  
    try {
      const response = await axios.post("https://koyangyee.info/board/found/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, 
      });

      const { isSuccess } = response.data;
      if (isSuccess === 1) {
        alert("업로드 완료");
        navigate("/");
      } else {
        alert("업로드 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error.message);
      alert("알 수 없는 오류가 발생했습니다.");
    } finally {
      setShowLoading(false);
    }
  };

  const onCategorySelect = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  }

   const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div>
      <h1 className={styles.title}>FOUND 글쓰기</h1>
    
    <div className={styles.formMobileContainer}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
           <label htmlFor="title" className={styles.formLabel}>습득물 명 <span style={{ color: "red" }}>*</span></label>
            <input id="title" name="title" type="text" placeholder="어떤 물건인지 간단하게 알려주세요 (ex. 검정색 지갑)" className={styles.formField} required />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="category">
            카테고리 <span style={{ color: "red" }}>*</span>
          </label>
          <select name="category" id="category" value={selectCategory} onChange={onCategorySelect} className={styles.formField} style={{cursor: "pointer"}} required>
            <option value=""></option>
            <option value="1" >전자기기</option>
            <option value="2" >카드/학생증</option>
            <option value="3" >지갑/현금</option>
            <option value="4" >택배</option>
            <option value="5" >도서 및 서류</option>
            <option value="6" >의류/액세서리</option>
            <option value="7" >가방</option>
            <option value="8" >기타</option>
          </select>
        </div>
        
        <div className={styles.mapContainer}>
          <h2 className={styles.detailLabel}>위치 <span style={{ color: "red" }}>*</span></h2>
          <div>
            <NavermapsProvider ncpClientId={MapAPIid}>
              <div className={styles.mapSize}>
                <MapnLocation setLocation={setLocation} setAddress={setAddress}/>
              </div>
            </NavermapsProvider>
            <input id="location" name="location" type="text" value={address} className={styles.addressDisplay} readOnly />
          </div>
        </div>

        <div className={styles.formGroup}>
          <input id="detailLocation" name="detailLocation" type="text" placeholder="(ex. 뉴턴 102호)" className={`${styles.textboxSize} ${styles.formField}`} />
          <label htmlFor="detailLocation" className={styles.formLabel}>상세위치</label>
        </div>

        <div className={styles.formGroup}>
          <input id="phoneNum" name="phoneNum" type="text" maxLength="13" placeholder="(ex. 010-1234-1234) " className={`${styles.textboxSize} ${styles.formField}`}/>
          <label htmlFor="phoneNum" className={styles.formLabel}>전화번호</label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.detailLabel} htmlFor="content">상세정보</label>
          <textarea 
            name="content" 
            placeholder="추가적인 정보가 있으면 알려주세요." 
            ref={textareaRef} 
            onInput={autoResize} 
            className={styles.contentTextBox}
            />
        </div>

        <div>
         <h3 className={styles.detailLabel}>사진</h3>
          <input
            id="galleryInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.imgInput}
          />
          {imageFile ? 
          <>
            <div onClick={() => document.getElementById("galleryInput").click()}  className={styles.imgContainer}>
              {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className={styles.imgDisplay} />}
            </div>
          </> :
          <>
            <ImageUploadField className={styles.imgUploadField} style={{cursor: "pointer"}} onClick={() => document.getElementById("galleryInput").click()}/>
          </>}
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">완료</button>
        </div>
      </form>

      {showModal && <UploadConfirmModal onClose={() => setShowModal(false)} onConfirm={handleConfirm} />}

    </div>
    </div>
  );
};

export default FoundFormMobile;