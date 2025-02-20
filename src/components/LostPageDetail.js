import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "../styles/LostDetail.module.css";
import { ReactComponent as ImgUploadIcon } from "../assets/icons/ImgUploadIcon.svg";
import { ReactComponent as SendIcon } from "../assets/icons/commentSendButton.svg";


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

function LostPageDetail( ) {
  const [lostDetail, setLostDetail] = useState(null);
  const [isUser, setIsUser] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [comment, setComment] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://koyangyee.info/board/lost/${id}`);
            console.log("foundDetail: ", response.data.board);
            console.log("IsUser: ", response.data.isUser);
            setLostDetail(response.data.board);
            setIsUser(response.data.isUser);
            console.log("comment: ", response.data.board.comments.content);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    fetchData();
}, [id]);

const handleImageClick = () => {
  document.getElementById("galleryInput").click();
};


const onDeleteClick = () => {
  const fetchData = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
        const response = await axios.delete(`https://koyangyee.info/board/lost/${id}`);

        if (response.status === 200) {
          alert("삭제가 완료되었습니다.");
          navigate("/found-page"); // 삭제 후 목록 페이지로 이동
        } else {
          alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }
    } catch (error) {
        console.error("오류 발생:", error);
       alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };
  fetchData();
}

const onEditClick = () => {
  
}
const onSubmitClick = async (event) => {
  event.preventDefault();
  if (showLoading) return;

  if (!comment.trim()) {
    alert("댓글 내용을 입력해주세요.");
    return;
  }

  setShowLoading(true);

  const formData = new FormData();

  // 이미지 파일 추가
  if (imageFile) {
    formData.append("image", imageFile);
  }

  // 댓글 데이터 추가
  const boardData = {
    content: comment,
  };
  formData.append("content", new Blob([JSON.stringify(boardData)], { type: "application/json" }));

  try {
    console.log("FormData 내용:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const response = await axios.post(`https://koyangyee.info/comment/add/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    if (response.data.isSuccess === 1) {
      alert("업로드 완료");
      navigate(`/lost-detail/${id}`); // 업로드 후 상세 페이지로 이동
    } else {
      alert("업로드 실패. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("요청 중 오류 발생:", error.message);
    alert("알 수 없는 오류가 발생했습니다.");
  } finally {
    setShowLoading(false);
    setComment(""); // 입력 필드 초기화
    setUploadedImage("");
  }
};

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     setImageFile(file);
//   }
// };

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  }
};

if (!lostDetail) {
  return <div>Loading...</div>;
}

return (
  <div className={styles.backcolor}>
    <div className={styles.contentContainer}>
      <div className={styles.detailContentsContainer}>
        <div className={styles.detailContents}>
          <div className={styles.foundDetailTitle}>LOST 글 상세조회</div>
          <div className={styles.pathTop}>
            <span className={styles.path}>{"HOME > LOST > "}</span> 
            <span className={styles.pathTitle}>{`${lostDetail.title}`}</span>
          </div>

          <div className={styles.imgNcontentscontainer}>
          <span className={styles.imgContainer}>
            <img className={styles.img} src={lostDetail.image} alt={lostDetail.title}/>
          </span>
          <span className={styles.topRight}>
            <div className={styles.contentsTitle}>{`${lostDetail.title}`}</div>
            <div className={styles.catNDate}>
              <span className={styles.category}>{categoryMap[lostDetail.category] || "기타"}</span>
              <span className={styles.printDate}>{` - ${lostDetail.printDate}`}</span>
            </div>
            <div className={styles.explocation}>
              <span className={styles.expLocationText}>{"예상 위치 "}</span>
              <span className={styles.expLocationValue}>{`${lostDetail.location}`}</span>
            </div>
            <div className={styles.phone}>
              <span className={styles.phoneTitle}>전화번호</span>
              <span className={styles.phoneNum}>{lostDetail.PhoneNum === "undefined" ? `${lostDetail.category}` : "없음"}</span>
            </div>
            <div className={styles.contentBox}>
              <div className={styles.contentContent}>{`${lostDetail.content}`}</div>
            </div>
          </span>
        </div>
        <form className={styles.commentSendContainer} onSubmit={onSubmitClick}>
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Uploaded"
            className={styles.imgInputIcon}
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <ImgUploadIcon
            className={styles.imgInputIcon}
            onClick={handleImageClick}
          />
        )}
      <input
            maxLength={100}
            className={styles.commentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="제보해 주세요!"
            name="comment"
          />
          <button type="submit" className={styles.sendIconBtn}>
            <SendIcon />
          </button>
          <input
            id="galleryInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{display: "none"}}
          />
      </form>
      {lostDetail.comments ? <div className={styles.cardList} >
    {lostDetail.comments.map((item) => ( // 띄우는 콘텐츠들 배치하기
    <div
        className={styles.cardContainer}
        style={{ cursor: "pointer" }}
        >
          <div>
            <img src={item.image} alt={item.userName} className={styles.cardImage} />
            </div>
          <div>{`천사${item.id}`}</div>
        <div className={styles.cardContent}>
            <span className={styles.cardTitle}>{item.content}</span>
            <span className={styles.cardDate}>{item.printDate}</span>
        </div>
    </div>

    ))}
</div>:<div>댓글없음</div>}

        {isUser ? <>
          <button onClick={() => onEditClick()}> 수정 </button>
          <button onClick={() => onDeleteClick()}> 삭제 </button>
        </>:<>
        </>}
        </div>
      </div>
    </div>
  </div>
)
}

export default LostPageDetail