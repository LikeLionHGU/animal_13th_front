import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "../API/MapnLocation";
import axios from "axios";
import styles from "../../styles/Form.module.css?v=2";
import FoundSearch from "../Small/FoundSearch"; 

import { ReactComponent as ImageUploadField } from "../../assets/icons/imageUploadField.svg";
import UploadConfirmModal from "../UploadConfirmModal";

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

const FoundFormWeb = () => {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;

  const [location, setLocation] = useState({ lat: 36.103096, lng: 129.387299 }); // MapnLocation에서 값 받아오기
  const [getApi, setGetApi] = useState(0);

  const [displayLocation, setDisplayLocation] = useState(`${location.lat}, ${location.lng}`);
  const [selectCategory, setCategory] = useState(0);
  const [address, setAddress] = useState("");
  const [lost, setLost] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (showModal || showLoading) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

  const [browser, setBrowser] = useState(); // 웹인지 모바일인지 인식
  const [selectCategory, setCategory] = useState(0) // 카테고리 선택 감지
  const [address, setAddress] = useState(""); //좌표 주소로 변환 
  const [lost, setLost] = useState([]);
  /*useEffect(() => {
    setLost([
      {
        "id":1,
        "title":"first",
        "category":2,
        "timeType":2,
        "printDate":"30",
        "image":"logo192.png"
      },
      {
        "id":4,
        "title":"second",
        "category":3,
        "timeType":4,
        "printDate":"12/4/25",
        "image":"logo512.png"
      }
    ]);
  }, []);  */
  
  
  useEffect(()=>{
    const user = navigator.userAgent;
    // 기본 환경 웹으로 설정
    setBrowser("web")
  
    // userAgent 문자열에 iPhone, Android 일 경우 모바일로 업데이트
    if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
        setBrowser("mobile")

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
        console.log("request: ", selectCategory);
        const response = await axios.get("https://koyangyee.info/board/found/all/category/new", {
          params: { category: selectCategory },
          withCredentials: true,
        });
        console.log("Response: ", response.data);
        setLost(response.data.board || []);
      } catch (error) {
        console.error("오류 발생:", error.response?.data || error.message);
      }
    };
    fetchData();
  }, [selectCategory]);


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

  const handleConfirm = async () => {
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
      location: displayLocation,
      detailLocation: document.getElementById("detailLocation").value,
      boardType: 0,
      latitude: location.lat,
      longitude: location.lng,
    };

    formData.append("board", new Blob([JSON.stringify(boardData)], { type: "application/json" }));

    try {
      console.log("FormData 내용:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

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
    
  const onCategorySelect = (categoryId) => {
    console.log(categoryId);
    setCategory(categoryId);
    setGetApi(1);
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
    <div className={`${styles.container} ${showLoading ? styles.blur : ""}`}>
      {showLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingText}>Loading...</div>
        </div>
      )}

      <form onSubmit={onSubmit} className={styles.formContainer}>
        <h1>FOUND 글쓰기</h1>
        <div className={styles.formGroup}>
          <input id="title" type="text" className={styles.formField} required />
          <label htmlFor="title" className={styles.formLabel}>습득물명 (필수)</label>
        </div>

        <h3>카테고리</h3>
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.filterButton} ${selectCategory === category.id ? styles.active : ""}`}
              onClick={() => setCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <h2>물건을 찾은 위치를 입력해 주세요!</h2>
        <NavermapsProvider ncpClientId={MapAPIid}>
          <div className={styles.mapSize}>
            <MapnLocation setLocation={setLocation} setAddress={setAddress} />
          </div>
        </NavermapsProvider>
        <input name="location" type="text" value={address} className={styles.addressDisplay} readOnly />

        <div className={styles.formGroup}>
          <input id="detailLocation" type="text" className={styles.formField} />
          <label htmlFor="detailLocation" className={styles.formLabel}>상세위치</label>
        </div>

        <div className={styles.formGroup}>
          <input id="phoneNum" type="text" maxLength="13" className={styles.formField} />
          <label htmlFor="phoneNum" className={styles.formLabel}>전화번호 (선택)</label>
        </div>

        <h3>상세정보</h3>
        <textarea id="content" ref={textareaRef} className={styles.contentTextBox} onInput={() => {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }}/>

        <h3>사진</h3>
        <input id="galleryInput" type="file" accept="image/*" onChange={handleFileChange} className={styles.imgInput} />
        {imageFile ? (
          <div onClick={() => document.getElementById("galleryInput").click()} className={styles.imgContainer}>
            <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className={styles.imgDisplay} />
          </div>
        ) : (
          <ImageUploadField className={styles.imgUploadField} style={{ cursor: "pointer" }} onClick={() => document.getElementById("galleryInput").click()} />
        )}

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">완료</button>
        </div>
      </form>

      {showModal && <UploadConfirmModal onClose={() => setShowModal(false)} onConfirm={handleConfirm} />}

      {lost && getApi === 1 ?
        <div className={styles.page}> 
      <FoundSearch selectCategory={selectCategory} setLost={setLost} />
      <div className={styles.sidebar} > 
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
          <span className={styles.cardCategory}>{item.category}</span>
          <span className={styles.cardDate}>{item.printDate}</span>
        </div>
      </div>
      ))}
      </div>
      </div>
        </div> :
        <>
          <div></div>
        </>}
    </div>
  );
};

export default FoundFormWeb;