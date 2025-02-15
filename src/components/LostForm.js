import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Form.module.css";

import { ReactComponent as ImageUploadField } from "../assets/icons/imageUploadField.svg"; // ReactComponent로 불러오기

const categories = [
  { id: "1", name: "전자기기" },
  { id: "2", name: "카드/학생증" },
  { id: "3", name: "지갑/현금" },
  { id: "4", name: "택배" },
  { id: "5", name: "도서 및 서류" },
  { id: "6", name: "의류/액세서리" },
  { id: "7", name: "가방" },
  { id: "8", name: "기타" },
];

const LostForm = () => {
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const [browser, setBrowser] = useState(); // 웹인지 모바일인지 인식
  const [selectCategory, setCategory] = useState(categories[0].id); 

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
  
    const formData = new FormData();
    
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    const boardData = {
      title: event.target.title.value,
      category: selectCategory,
      phoneNum: event.target.phoneNum.value,
      content: event.target.content.value,
      location: location, // 수정
      detailLocation: event.target.detailLocation.value,
      boardType: 0,
      latitude: 3.5555,
      longitude: 2.434234,
    };
  
    formData.append("board", new Blob([JSON.stringify(boardData)], { type: "application/json" }));
  
    try {
      console.log("FormData 내용:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
  
      const response = await axios.post("https://koyangyee.info/board/lost/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // 추가
      });
  
      console.log("업로드 완료:", response.data);
      alert("업로드 완료");
      navigate("/");
  
    } catch (error) {
      console.error("업로드 오류:", error);
      alert("업로드 오류: " + (error.response?.data?.message || "서버에 문제가 있습니다."));
    }
  };

  const onCategorySelect = (categoryId) => {
    console.log(categoryId);
    setCategory(categoryId);
  }

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

useEffect(() => {
  if (location) {
    setLocation(location); // 사용자가 입력한 텍스트 그대로 저장
  }
}, [location]); 
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
      <h1>LOST 글 작성 페이지</h1>
      <div className={styles.formGroup}>
          <input id="title" name="title" type="text" placeholder="  " className={styles.formField} required />
          <label htmlFor="title" className={styles.formLabel}>분실물명</label>
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

        <div className={styles.formGroup}>
          <input value={location} id="location" name="location" type="text" placeholder="예상 분실 위치 (선택)" className={`${styles.textboxSize} ${styles.formField}` }  onChange={(e) => setLocation(e.target.value)}/>
          <label htmlFor="location" className={styles.formLabel}>예상 분실 위치 (선택)</label>
        </div>

        <div className={styles.formGroup}>
          <input id="phoneNum" name="phoneNum" type="text" maxLength="13" placeholder="전화번호 (선택) (예시: 010-1234-1234) " className={`${styles.textboxSize} ${styles.formField}`}/>
          <label htmlFor="phoneNum" className={styles.formLabel}>전화번호 (선택) (예시: 010-1234-1234)</label>
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