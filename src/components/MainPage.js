import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Mainpage.module.css";
import { ReactComponent as WriteLost } from "../assets/icons/WriteLost.svg";
import { ReactComponent as WriteFound } from "../assets/icons/WriteFound.svg";
import { ReactComponent as Banner } from "../assets/icons/mainpageBanner.svg";
import { ReactComponent as Blur } from "../assets/icons/blur.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MainPageMobile from "./MainPageMobile";
import LoginLayout from "./Layouts/LoginLayout";
//import MainPageWeb from "./MainPageWeb";

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

function MainPage() {
  const navigate = useNavigate();
  const [lostMain, setLostMain] = useState();
  const [foundMain, setFoundMain] = useState();
  const [loading, setLoading] = useState(true);
  const [browser, setBrowser] = useState("web"); // 기본값 "web"
  const [showLogin, setshowLogin] = useState(false);

  useEffect(() => {
    // 디바이스 환경 감지
    const user = navigator.userAgent;
    if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
      setBrowser("mobile");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://koyangyee.info/board/lost/main"
        );
        console.log("Lost: ", response.data.board);
        setLostMain(response.data.board);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://koyangyee.info/board/found/main"
        );
        console.log("Found: ", response.data.board);
        setFoundMain(response.data.board);
      } catch (error) {
        console.error("오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const foundFormClick = () => navigate("/found-form");

  const lostFormClick = async () => {
    try {
      const response = await axios.get("https://koyangyee.info/user");
      console.log("user: ", response.data);

      if (response.data.isLogin === 0) {
        const result = await Swal.fire({
          title: "로그인이 필요합니다.",
          text: "분실물 등록을 위해 로그인해 주세요.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });

        if (result.isConfirmed) navigate("/");
        return;
      }

      navigate("/lost-form");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const foundPageClick = () => navigate("/found-page");
  const lostPageClick = () => navigate("/lost-page");

  if (browser === "mobile") {
    return <MainPageMobile />;
  }

  return (
    <div>
      <div className={styles.bannerWrapper}>
        <Banner className={styles.banner} />
      </div>
      <div className={styles.contents}>
        <div className={styles.mainpageButtons}>
          <WriteLost style={{ cursor: "pointer" }} onClick={lostFormClick} />
          <WriteFound style={{ cursor: "pointer" }} onClick={foundFormClick} />
        </div>
        <div className={styles.title}>
          <span className={styles.titleText}>
            <span className={styles.Lost}>LOST</span>
            <span className={styles.comma}>, </span>
            <span className={styles.restTitle}>분실물</span>
            <span className={styles.lineLost}></span>
            <div className={styles.stroke}></div>
          </span>
          <span className={styles.showMore} onClick={lostPageClick}>
            더보기
          </span>
        </div>
        <div>
          {loading ? (
            <>로딩 중...</>
          ) : lostMain ? (
            <div className={styles.cardList}>
              {lostMain.map((item) => (
                <Link
                  to={`/lost-detail/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    key={item.id}
                    className={styles.cardContainer}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardContent}>
                      <span className={styles.cardTitle}>{item.title}</span>
                      <span className={styles.cardCategory}>
                        {categoryMap[item.category] || "기타"}
                      </span>
                      <span className={styles.cardDate}>{item.printDate}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>불러온 정보 없음</>
          )}
        </div>

        <div className={styles.title}>
          <div className={styles.titleText}>
            <span className={styles.Lost}>FOUND</span>
            <span className={styles.comma}>,</span>
            <span className={styles.restTitle}>습득물</span>
            <span className={styles.lineFound}></span>
            <div className={styles.stroke}></div>
          </div>
          <span className={styles.showMore} onClick={foundPageClick}>
            더보기
          </span>
        </div>

        <div>
          {loading ? (
            <p>로딩 중...</p>
          ) : foundMain ? (
            localStorage.getItem("isLogin") === "1" ? (
              <div className={styles.cardList}>
                {foundMain.map((item) => (
                  <Link
                    to={`/found-detail/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div key={item.id} style={{ cursor: "pointer" }}>
                      <div className={styles.cardContainer}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                          <span className={styles.cardTitle}>{item.title}</span>
                          <span className={styles.cardCategory}>
                            {categoryMap[item.category] || "기타"}
                          </span>
                          <span className={styles.cardDate}>
                            {item.printDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.blur}>
                <div className={styles.blurText}>
                  로그인을 해야지 열람 가능해요!
                </div>
                <button
                  className={styles.blurButton}
                  onClick={() => setshowLogin(true)}
                >
                  로그인
                </button>
                <Blur />
              </div>
            )
          ) : (
            <p>불러온 정보 없음</p>
          )}
        </div>
      </div>
      {showLogin && <LoginLayout />}
    </div>
  );
}

export default MainPage;
