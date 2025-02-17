import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Form.module.css";

import { ReactComponent as ImageUploadField } from "../../assets/icons/imageUploadField.svg"; // ReactComponent로 불러오기

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
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const [browser, setBrowser] = useState(null); // 웹인지 모바일인지 인식
  const [selectCategory, setCategory] = useState(null); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); 
    }
  };

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
      location: event.target.location.value , //오류 원인: event. 연결 안 해줘서&detail대신에 location쓰므로 detail 삭제!
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

      const { isLogin, isSuccess } = response.data;

      if (isLogin === 1 && isSuccess === 1) {
        console.log("업로드 완료:", response.data);
        alert("업로드 완료");
        navigate("/"); 
      } else {
        if (isSuccess === 0) {
          alert("업로드에 실패했습니다. 다시 시도해주세요.");
          console.error("서버에서 업로드를 실패로 처리했습니다.");
        } else if (isLogin === 0){
          alert("로그인 정보 없음");
          navigate("/"); 
        }
      }
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
          <input id="location" name="location" type="text" placeholder="예상 분실 위치 (선택)" className={`${styles.textboxSize} ${styles.formField}` }  />
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
     

        <div className={styles.buttonContainer}>
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