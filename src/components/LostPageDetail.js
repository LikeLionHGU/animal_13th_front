import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import styles from "../styles/DetailPage.module.css";

function LostPageDetail( ) {
  const [lostDetail, setLostDetail] = useState(null);
  const [isUser, setIsUser] = useState("");
  const { id } = useParams();
  
  const [comments, setComments] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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

const onSubmit = async (event) => {
  event.preventDefault();
  if (showLoading) return;

  setShowLoading(true);

  const formData = new FormData();

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const boardData = {
    content: event.target.comment.value,
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

    const { isSuccess } = response.data;
    if (isSuccess === 1) {
      alert("업로드 완료");
      // navigate("/");
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

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setImageFile(file);
  }
};

  return (
    <div className={`${styles.container} ${showLoading ? styles.blur : ""}`}>
      {showLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingText}>Loading...</div>
        </div>
      )}
      {lostDetail ? 
      <>
      <div>
        <div>title: {`${lostDetail.title}`}</div>
        <div>category: {`${lostDetail.category}`}</div>
        <div>Date: {`${lostDetail.printDate}`}</div>
        <div>title: {`${lostDetail.title}`}</div>
        <div>Content: {`${lostDetail.content}`}</div>
        <img src={lostDetail.image} alt={lostDetail.title}/>
        {lostDetail.comments.map((item) => (
                    <div
                    key={item.id} // key는 item.board.id가 아닌 item.id 사용
                    style={{ cursor: "pointer" }}
                    >
                        <div>comment: {`${item.content}`}</div>
                        <div>등록날짜: {`${item.regDate}`}</div>
                        <div>Print Date: {`${item.printDate}`}</div>
                        <img src={item.image} alt={item.id}/>
                        <div>comments userID: {`${item.userId}`}</div>
                    </div>
                ))}
    </div>
    </> :
      <>
        <h1>Loading...</h1>
      </>
    }
    <form onSubmit={onSubmit}>
      <input id="comment" type="text" ></input>
      <input id="galleryInput" type="file" accept="image/*" onChange={handleFileChange}  />
        {imageFile ? (
          <div onClick={() => document.getElementById("galleryInput").click()} >
            <img src={URL.createObjectURL(imageFile)} alt="Uploaded"  />
          </div>
        ):<div></div>}
        <button className={styles.button} type="submit">완료</button>
    </form>
    </div>
  )
}

export default LostPageDetail