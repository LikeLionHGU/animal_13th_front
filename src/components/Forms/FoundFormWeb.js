import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "../API/MapnLocation";
import axios from "axios";
import styles from "../../styles/Form.module.css?v=2";

import { ReactComponent as ImageUploadField } from "../../assets/icons/imageUploadField.svg"; // ReactComponent로 불러오기

const categories = [
  { id: 1 , name: "전자기기" },
  { id: 2, name: "카드/학생증" },
  { id: 3, name: "지갑/현금" },
  { id: 4, name: "택배" },
  { id: 5, name: "도서 및 서류" },
  { id: 6, name: "의류/액세서리" },
  { id: 7, name: "가방" },
  { id: 8, name: "기타" },
];

const FoundForm = () => {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태s
  const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;
  const [location, setLocation] = useState({ lat: 36.103096, lng: 129.387299 }); // MapnLocation에서 값 받아오기

  const [displayLocation, setDisplayLocation] = useState(`${location.lat}, ${location.lng}`);

  const [browser, setBrowser] = useState(); // 웹인지 모바일인지 인식
  const [selectCategory, setCategory] = useState(0) // 카테고리 선택 감지
  const [address, setAddress] = useState(""); //좌표 주소로 변환 
  const [lost, setLost] = useState("");

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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("request: ", { category: selectCategory });
  
        const response = await axios.post(
          "https://koyangyee.info/board/found/all/category/new",
          { category: selectCategory },  // JSON 형태로 요청 본문에 포함
          {
            headers: {
              "Content-Type": "application/json",  // JSON 요청임을 명시
            },
          }
        );
  
        // 📌 Response 확인
        console.log("Response: ", response.data); 
        
        // 📌 Lost 데이터 저장
        setLost(response.data);  
        
      } catch (error) {
        console.error("오류 발생:", error.response?.data || error.message);
      }
    };
  
    fetchData();
  }, [selectCategory]);
  


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
      locaton: displayLocation,
      detailLocation: event.target.detailLocation.value,
      boardType: 0,
      latitude: location.lat,
      longitude: location.lng,
    };
  
    // JSON 형태로 변환 후 추가
    formData.append("board", new Blob([JSON.stringify(boardData)], { type: "application/json" }));
  
    try {
      // FormData 확인용
      console.log("FormData 내용:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      //여기까지는 나중에 삭제
  
      // 서버로 데이터 전송
      const response = await axios.post("https://koyangyee.info/board/found/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, 
      });

    const { isLogin, isSuccess } = response.data;

    if (isSuccess === 1) {
      console.log("업로드 완료:", response.data);
      alert("업로드 완료");
      navigate("/"); 
    } else {
      if (isSuccess === 0) {
        alert("업로드에 실패했습니다. 다시 시도해주세요.");
        console.error("서버에서 업로드를 실패로 처리했습니다.");
      }
    }
  } catch (error) {
    console.error("요청 중 오류 발생:", error.message);
    alert("알 수 없는 오류가 발생했습니다.");
  }
};
  const onCategorySelect = (categoryId) => {
    console.log(categoryId);
    setCategory(categoryId);
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
      <h1>FOUND 글 작성</h1>
        <div className={styles.formGroup}>
          <input id="title" name="title" type="text" placeholder="  " className={styles.formField} required />
          <label htmlFor="title" className={styles.formLabel}>습득물명 (필수)</label>
        </div>

      <h3>카테고리</h3>     
      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`${styles.filterButton} ${selectCategory === category.id ? styles.active : ""}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
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

        <div className={styles.formGroup}>
          <input id="phoneNum" name="phoneNum" type="text" maxLength="13" placeholder="전화번호 (선택) (예시: 010-1234-1234) " className={`${styles.textboxSize} ${styles.formField}`}/>
          <label htmlFor="phoneNum" className={styles.formLabel}>전화번호 (선택)</label> {/* (예시: 010-1234-1234) */}
        </div>

        <div>
          <h3>상세정보</h3>
          <textarea 
            name="content" 
            placeholder="추가적인 정보가 있으면 알려주세요." 
            ref={textareaRef} 
            onInput={autoResize} 
            className={styles.contentTextBox}
            // required 
            />
        </div>

        <div>
         <h3>사진</h3>
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
        
        {/* boardType 전송 (보여주지는 않음) */}
        <div> 
          <input id="boardType" name="boardType" type="number" value="0" style={{display: "none"}} readOnly/> 
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">완료</button>
        </div>
      </form>
      {lost ?
        <>
      <div className={styles.sidebar} /*사이드바*/> 
          <div className={styles.cardList} >
          { lost.map((item) => ( // 띄우는 콘텐츠들 배치하기
        <div
          key={item.id}
          className={styles.cardContainer}
          /*onClick={() => handleClick(item)}*/
          style={{ cursor: "pointer" }}
        >
        <img src={item.image} alt={item.title} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <span className={styles.cardTitle}>{item.title}</span>
          <span className={styles.cardCategory}>{item.category}</span>
          <span className={styles.cardDate}>{item.printDate}</span>
        </div>
      </div>
      ))}
      </div>
      </div>
        </> :
        <>
          <div></div>
        </>}
    </div>
  );
};

export default FoundForm;