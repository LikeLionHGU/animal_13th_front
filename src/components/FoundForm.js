import { useState, useRef, useEffect } from "react";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "./MapnLocation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Form.module.css?v=2";

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

  const fetchAddressFromCoords = (lat, lng) => {
  if (!window.naver || !window.naver.maps) {
    console.error("네이버 지도 API가 로드되지 않았습니다.");
    return;
  }

  window.naver.maps.Service.reverseGeocode(
    {
      coords: new window.naver.maps.LatLng(lat, lng),
      orders: [window.naver.maps.Service.OrderType.ADDR, window.naver.maps.Service.OrderType.ROAD_ADDR].join(","),
    },
    (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK) {
        console.error("역 지오코딩 실패:", status);
        return;
      }
      
      const result = response.v2.addresses[0]?.roadAddress || response.v2.addresses[0]?.jibunAddress || "주소를 찾을 수 없음";
      setAddress(result);
      console.log("변환된 주소:", result);
    }
  );
};


  // const [textAddress, setTextAddress] = useState("");

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
  
    const formData = new FormData();
  
    // 이미지 파일이 있으면 추가
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    // 폼 데이터 수집
    const boardData = {
      title: event.target.title.value,
      category: selectCategory,
      phoneNum: event.target.phoneNum.value,
      content: event.target.content.value,
      location: displayLocation,
      detailLocation: event.target.detailLocation.value,
      boardType: 0,
      latitude: location.lat,
      longitude: location.lng,
    };
  
    // JSON 형태로 변환 후 추가
    formData.append("board", new Blob([JSON.stringify(boardData)], { type: "application/json" }));
  
    try {
      // FormData 확인용 (나중에 제거)
      console.log("FormData 내용:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
  
      // 서버로 데이터 전송
      const response = await axios.post("https://koyangyee.info/board/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("업로드 완료:", response.data);
      alert("업로드 완료");
      navigate("/");
    } catch (error) {
      // alert("업로드 오류");
      console.error("업로드 오류:", error);
      navigate("/");
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
            <option value="" readOnly>카테고리</option>
            <option value="1" readOnly>전자기기</option>
            <option value="2" readOnly>카드/학생증</option>
            <option value="3" readOnly>지갑/현금</option>
            <option value="4" readOnly>택배</option>
            <option value="5" readOnly>도서 및 서류</option>
            <option value="6" readOnly>의류/액세서리</option>
            <option value="7" readOnly>가방</option>
            <option value="8" readOnly>기타</option>
          </select>
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
          <input id="phoneNum" name="phoneNum" type="text" maxLength="13" placeholder="전화번호 (선택) (예시: 010-1234-1234) " className={`${styles.textboxSize} ${styles.formField}`}/>
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

        {/* boardType 전송 (보여주지는 않음) */}
        <div> 
          <input id="boardType" name="boardType" type="number" value="0" style={{display: "none"}} readOnly/> 
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