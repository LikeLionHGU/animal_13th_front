import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Form.module.css?v=2";
import FoundSearch from "../Small/FoundLostSearch"; 

import { ReactComponent as Banner } from "../../assets/icons/MyLostFoundPageBanner.svg";
import { ReactComponent as ImageUploadField } from "../../assets/icons/imageUploadField.svg"; // ReactComponent로 불러오기
import { ReactComponent as ImageUploadFieldHover } from "../../assets/icons/imageUploadFieldHover.svg"; 
import UploadConfirmModal from "../UploadConfirmModal";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (bytes)

const categories = [
  { id: 1, name: "전자기기" },
  { id: 2, name: "카드/학생증" },
  { id: 3, name: "지갑/현금" },
  { id: 4, name: "택배" },
  { id: 5, name: "도서 및 서류" },
  { id: 6, name: "의류/액세서리" },
  { id: 7, name: "가방" },
  { id: 8, name: "기타" },
];

const categoryMap = {
  1: "전자기기",
  2: "카드/학생증",
  3: "지갑/현금",
  4: "택배",
  5: "도서 및 서류",
  6: "의류/액세서리",
  7: "가방",
  8: "기타",
};

const LostForm = () => {
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 관리
  const [selectCategory, setCategory] = useState(null); 

  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
  const [userInfo, setUserInfo] = useState("");

  const [lost, setLost] = useState();
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("https://koyangyee.info/user");
            console.log("user: ", response.data);
            setUserInfo(response.data);
            if(response.data.isLogin === 0){
              alert("로그인이 필요한 페이지입니다.");
              navigate("/");
          }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showModal || showLoading) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [showModal, showLoading]);

 
  const handleFileUpload = (file) => {
    // 1. 파일 용량 체크 (10MB 초과 시 알림)
    if (file.size > MAX_FILE_SIZE) {
      alert("파일이 너무 큽니다. 10MB 이하의 이미지를 업로드해주세요.");
      return;
    }

    // 2. 문제없는 경우 상태에 저장
    setImageFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    // 드래그 중인 파일이 영역을 완전히 벗어났을 때만 상태 변경
    if (e.relatedTarget === null || !e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // 드롭 이후 드래그 상태 해제
  
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = async (event) => {
    setShowModal(false);
    setShowLoading(true);
  
    const formData = new FormData();
    
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const boardData = {
      title: document.getElementById("title").value,
      category: selectCategory,
      phoneNum: document.getElementById("phoneNum").value,
      content: document.getElementById("content").value,
      location: document.getElementById("location").value,
      boardType: 1,
      latitude: 2.234,
      longitude: 3.234234,
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
      console.log("isLogin:", response.data.isLogin);
      console.log("isSuccess:", response.data.isSuccess);



      if (response.data.isLogin === 1 && response.data.isSuccess === 1) {
        console.log("업로드 완료:", response.data);
        console.log("isLogin:", response.data.isLogin);
        console.log("isSuccess:", response.data.isSuccess);
        alert("업로드 완료");
        navigate("/"); 
      } else {
        if (response.data.isSuccess === 0) {
          alert("업로드에 실패했습니다. 다시 시도해주세요.");
          console.error("서버에서 업로드를 실패로 처리했습니다.");
          navigate("/"); 
        } else if (response.data.isLogin === 0){
          alert("로그인 정보 없음");
          navigate("/"); 
        }
      }
    } catch (error) {
      console.error("업로드 오류:", error);
      alert("업로드 오류: " + (error.response?.data?.message || "서버에 문제가 있습니다."));
    }finally {
      setShowLoading(false);
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

useEffect(() => {
  if (location) {
    setLocation(location); // 사용자가 입력한 텍스트 그대로 저장
  }
}, [location]); 

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("카테고리: ", selectCategory);
      let url = "";
      url=`https://koyangyee.info/board/found/all/category/new?category=${selectCategory}`;
      if (keyword !== undefined) {
        url=`https://koyangyee.info/board/found/all/category/search/new?category=${selectCategory}&search=${keyword}`;
      }
      const response = await axios.get(encodeURI(url));
      console.log("GET URL: ", url);
      console.log("Response: ", response.data);
      setLost(response.data.board);
    } catch (error) {
      console.error("오류 발생:", error.response?.data || error.message);
    }
  };

  fetchData();
}, [selectCategory, keyword]); // keyword 상태가 변경될 때도 반영되도록 포함


  return (
    <div className={styles.backcolor}>
      <div className={styles.bannerWrapper}>
          <Banner className={styles.banner}/>
      </div>
      <div className={`${styles.container} ${showLoading ? styles.blur : ""}`}>
        {showLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingText}>Loading...</div>
          </div>
        )}
        
        <form onSubmit={onSubmit} className={styles.formContainer}>
          <div className={styles.formContentsContainer}>
        <h1 className={styles.formTitle}>LOST 글쓰기</h1>
        <div className={styles.formGroup}>
            <input id="title" name="title" type="text" placeholder="어떤 물건인지 간단하게 알려주세요 (ex. 검정색 지갑)" className={styles.formField} required />
            <label htmlFor="title" className={styles.formLabel}>분실물 명<span style={{ color: "red" }}>*</span></label>
          </div>

          <div className={styles.categoryTitle} htmlFor="category">
              카테고리 <span style={{ color: "red" }}>*</span>
            </div>     
          <div className={styles.filterContainer}>
            {categories.map((category) => (
              <button
                key={category.id}
                id="category"
                type="button"
                className={`${styles.filterButton} ${selectCategory === category.id ? styles.active : ""}`}
                onClick={() => onCategorySelect(category.id)}
                required
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className={styles.formGroup}>
            <input id="location" name="location" type="text" placeholder="예상 분실 위치 (선택)" className={`${styles.textboxSize} ${styles.formField}` }  />
            <label htmlFor="location" className={styles.formLabel}>예상 위치</label>
          </div>

          <div className={styles.formGroup}>
            <input id="phoneNum" name="phoneNum" type="text" maxLength="13" placeholder="전화번호 (선택) (예시: 010-1234-1234) " className={`${styles.textboxSize} ${styles.formField}`}/>
            <label htmlFor="phoneNum" className={styles.formLabel}>전화번호 (예시: 010-1234-1234)</label>
          </div>

          <div>
            <h3 className={styles.categoryTitle}>상세정보</h3>
            <textarea
              className={styles.contentTextBox}
              name="content"
              id="content"
              placeholder="추가적인 정보가 있으면 알려주세요."
              onInput={autoResize}
              ref={textareaRef}
            />
          </div>
          
          <h3 className={styles.categoryTitle}>사진</h3>

 
          <div
            className={`${styles.dragDropArea} ${isDragging ? styles.dragActive : ""}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            >
            <input
            id="galleryInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.imgInput}
            />

            {imageFile ? (
            <div
            onClick={() => document.getElementById("galleryInput").click()}
            className={styles.imgContainer}
            >
            <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            className={styles.imgDisplay}
            />
            </div>
            ) : (
            <div
            onClick={() => document.getElementById("galleryInput").click()}
            style={{ cursor: "pointer" }}
            >
            {/* 드래그 상태에 따라 이미지 변경 */}
            {isDragging ? (
            <ImageUploadFieldHover className={styles.imgUploadField} />
            ) : (
            <ImageUploadField className={styles.imgUploadField} />
            )}
            <p className={styles.dragDropText}>
            </p>
            </div>
            )}
          </div>
    
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">완료</button>
          </div>
          </div>
        </form>
        {showModal && <UploadConfirmModal onClose={() => setShowModal(false)} onConfirm={handleConfirm} />}
    
        <div className={styles.page}> 
          <div className={styles.positionSticky}>
            <div className={styles.sidebar}> 
              <div className={styles.sidebarTitle}>여기에 있나요?</div>
              <FoundSearch setKeyword={setKeyword}/>
                {lost ?
                <div className={styles.cardList} >
                { lost.map((item) => ( 
              <div
                key={item.id}
                className={styles.cardContainer}
                style={{ cursor: "pointer" }}
              >
              <img src={item.image} alt={item.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardCategory}>
                  {categoryMap[item.category] || "기타"}
                </span>
                <span className={styles.cardDate}>{item.printDate}</span>
                <span className={styles.cardLocation}>{item.location}</span>
                <span className={styles.sidebarCommentBtn}>제보하기</span>
                <span className={styles.cardContent}>{item.content}</span>
              </div>
          </div>
          ))}
          </div>:
          <div>
            불러오는 중...
          </div>}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostForm;