import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "../API/MapnLocation";
import axios from "axios";
import styles from "../../styles/Form.module.css?v=2";
import LostSearch from "../Small/FoundLostSearch"; 
import { ReactComponent as Banner } from "../../assets/icons/MyLostFoundPageBanner.svg";
import { ReactComponent as ImageUploadField } from "../../assets/icons/imageUploadField.svg";
import { ReactComponent as ImageUploadFieldHover } from "../../assets/icons/imageUploadFieldHover.svg"; 
import UploadConfirmModal from "../UploadConfirmModal";
import DefaultImg from "../../assets/icons/DefaultImg.svg";

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

const FoundFormWeb = () => {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 관리

  const [location, setLocation] = useState({ lat: 36.103096, lng: 129.387299 }); // MapnLocation에서 값 받아오기

  const [displayLocation, setDisplayLocation] = useState(`${location.lat}, ${location.lng}`);
  const [selectCategory, setCategory] = useState(0);
  const [lost, setLost] = useState("");
  const [address, setAddress] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [keyword, setKeyword] = useState();

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

  useEffect(() => {
    if (location && typeof location.lat === "function") {
      setDisplayLocation(`${location.lat()}, ${location.lng()}`);
    } else {
      setDisplayLocation(`${location.lat}, ${location.lng}`);
    }
  }, [location]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("카테고리: ", selectCategory);
        let url = "";
        url=`https://koyangyee.info/board/lost/all/category/new?category=${selectCategory}`;
        if (keyword !== undefined) {
          url=`https://koyangyee.info/board/lost/all/category/search/new?category=${selectCategory}&search=${keyword}`;
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

  const handleConfirm = async () => {
    if (showLoading) return;

    setShowModal(false);
    setShowLoading(true);

    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      try {
        const response = await fetch(DefaultImg);
        const blob = await response.blob();
        const defaultFile = new File([blob], "DefaultImg.svg", { type: "image/svg+xml" });
        formData.append("image", defaultFile);
      } catch (err) {
        console.error("기본 이미지 불러오기 실패:", err);
        alert("기본 이미지를 불러올 수 없습니다.");
      }
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

    formData.append("board", new Blob([JSON.stringify(boardData)], { type: "application/json" }));

    try {

      const response = await axios.post("https://koyangyee.info/board/found/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const { isSuccess } = response.data;
      console.log(response);
      console.log(imageFile);
      if (response.data.isSuccess === 1) {
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

  const onCategorySelect = (categoryId) => {
    // 이미 같은 카테고리라면 변경하지 않음
    if (categoryId !== selectCategory) {
      setCategory(categoryId);
    }
  };

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
            <h1 className={styles.formTitle}>FOUND 글쓰기</h1>
            <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.formLabel}>습득물 명 <span style={{ color: "red" }}>*</span></label>
              <input id="title" type="text" className={styles.formField} placeholder="어떤 물건인지 간단하게 알려주세요 (ex. 검정색 지갑)" required />
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

            <h2 className={styles.categoryTitle}>위치 <span style={{ color: "red" }}>*</span></h2>
            <NavermapsProvider ncpClientId={MapAPIid}>
              <div className={styles.mapSize}>
                <MapnLocation setLocation={setLocation} setAddress={setAddress} />
              </div>
            </NavermapsProvider>
            <input name="location" type="text" value={address} className={styles.addressDisplay} readOnly />

            <div className={styles.formGroup}>
              <input id="detailLocation" type="text" className={styles.formField} placeholder="물건이 어디에 있는지 상세히 알려주세요 (ex. 뉴턴 102호)" />
              <label htmlFor="detailLocation" className={styles.formLabel}>상세위치</label>
            </div>

            <div className={styles.formGroup}>
              <input id="phoneNum" type="text" maxLength="13" placeholder="010-XXXX-XXXX" className={styles.formField} />
              <label htmlFor="phoneNum" className={styles.formLabel}>전화번호</label>
            </div>

            <h3 className={styles.categoryTitle}>상세정보</h3>
            <textarea id="content" ref={textareaRef} className={styles.contentTextBox} onInput={() => {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }}/>


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
              <LostSearch setKeyword={setKeyword}/>
                {lost ?
                <div className={styles.cardList} >
                { lost.map((item) => ( 
              <div
                key={item.id}
                className={styles.cardContainer}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/lost-detail/${item.id}`)}
              >
             <div className={styles.imageContainerSide}>
                <img src={item.image} alt={item.title} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>{item.title}</div>
                <div className={styles.cardContent}>
                  {item.content.length > 15 ? `${item.content.slice(0, 15)}...` : item.content}
              </div>
                <div className={styles.sidebarCommentBtn}>제보하기</div>
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

export default FoundFormWeb;