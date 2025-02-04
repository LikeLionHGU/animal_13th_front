//import styled from "styled-components";
import { NavermapsProvider } from "react-naver-maps";
import SimpleNaverMap from "./SimpleNaverMap";
import { useNavigate } from "react-router-dom";
import styles from "../styles/FoundFormMap.module.css";

function Api() {
    const navigate = useNavigate();

    const mapCompleteClick = () => {
      navigate("/found-form")
    }

    return (
      <div>
        <NavermapsProvider
        ncpClientId='pfx4scf0lr' // 지도서비스 Client ID
      >
        <div className={styles.mapSize}>
          <SimpleNaverMap />
        </div>
      </NavermapsProvider>
      <div>
        <button onClick={mapCompleteClick}>완료</button>
      </div>
    </div>
    );
  }
  
  export default Api;