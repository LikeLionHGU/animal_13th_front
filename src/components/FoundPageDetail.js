import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import styles from '../styles/FoundDetail.module.css';
import { useNavigate } from "react-router-dom";

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

function FoundPageDetail( ) {
  const [foundDetail, setFoundDetail] = useState(null);
  const [isUser, setIsUser] = useState("");
  const [sawPeople, setSawpeople] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://koyangyee.info/board/found/${id}`);
        console.log("foundDetail: ", response.data.board);
        console.log("IsUser: ", response.data.isUser);
        setFoundDetail(response.data.board);
        setIsUser(response.data.isUser);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
}, [id]);

const onDeleteClick = () => {
  const fetchData = async () => {
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
        const response = await axios.delete(`https://koyangyee.info/board/found/${id}`);

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
  /*사용자 정보 PUSH*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`https://koyangyee.info/board/found/saw/${id}`);
        console.log( response);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, [id]);

   /* 사용자 이름 GET해오기 */
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://koyangyee.info/board/found/saw/${id}`);
        console.log("유저 데이터: ", response.data.people);
        setSawpeople(response.data.people || []); // 만약 undefined가 오면 빈 배열로 설정
        console.log("조회한 사람 리스트: ", response.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, [id]);


  // 로딩 처리
  if (!foundDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.backcolor}>
      <div className={styles.contentContainer}>
      <div className={styles.container4two}>
       
        <div className={styles.detailContentsContainer}>
          <div className={styles.detailContents}>
            <div className={styles.foundDetailTitle}>FOUND 글 상세조회</div>
            <div className={styles.pathTop}>
              <span className={styles.path}>{"HOME > FOUND > "}</span> 
              <span className={styles.pathTitle}>{`${foundDetail.title}`}</span>
            </div>

            <div className={styles.imgNcontentscontainer}>
            <span className={styles.imgContainer}>
              <img className={styles.img} src={foundDetail.image} alt={foundDetail.title}/>
            </span>
            <span className={styles.topRight}>
              <div className={styles.contentsTitle}>{`${foundDetail.title}`}</div>
              <div className={styles.catNDate}>
                <span className={styles.category}>{categoryMap[foundDetail.category] || "기타"}</span>
                <span className={styles.printDate}>{` - ${foundDetail.printDate}`}</span>
              </div>
              <div className={styles.phone}>
                <span className={styles.phoneTitle}>전화번호</span>
                <span className={styles.phoneNum}>{foundDetail.PhoneNum === "undefined" ? `${foundDetail.category}` : "없음"}</span>
              </div>
              <div className={styles.contentBox}>
              <div className={styles.contentContent}>{`${foundDetail.content}`}</div>
              </div>
            </span>
          </div>
          <div>
            <h2>위치</h2>
            <div className={styles.address}>주소 <span> 주소 띄우기</span></div>
            <div className={styles.detailLocation}>상세위치 <span>{foundDetail.detailLocation === "null" ? `${foundDetail.detailLocation}` : "없음"}</span></div>
          </div>
          <div className={styles.mapSize}>
            {/* 여기에 지도 넣기 */}
          </div>
          {isUser ? <>
            <button onClick={() => onEditClick()}> 수정 </button>
            <button onClick={() => onDeleteClick()}> 삭제 </button>
          </>:<>
          </>}
          </div>
        </div>
        <div className={styles.sawPeopleContainer}>
          <div className={styles.sawPeopleContents}>
            <div className={styles.sawPeopleTitle}>조회한 사람</div>
            <div className={styles.filterContainer}>
            {sawPeople.map((person) => (
            <div key={person.userName} className={styles.sawNames}>
            {person.userName}
          </div>
          ))}

        </div>
          </div>
        </div>
      </div>
   
      </div>
    </div>
  );
}

export default FoundPageDetail;
