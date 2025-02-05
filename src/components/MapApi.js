//import styled from "styled-components";
import { NavermapsProvider } from "react-naver-maps";
import MapnLocation from "./MapnLocation";
import { useNavigate } from "react-router-dom";
import styles from "../styles/FoundFormMap.module.css";

function MapApi() {
    const navigate = useNavigate();

    const mapCompleteClick = () => {
      navigate("/found-form")
    }
    const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;
    console.log(MapAPIid);

    const MapAPIid = process.env.REACT_APP_MAP_CLIENT_ID;
    console.log(MapAPIid);

    return (
      <div>
        <NavermapsProvider
        ncpClientId={MapAPIid} // 지도서비스 Client ID
      >
        <div className={styles.mapSize}>
          <MapnLocation />
        </div>
      </NavermapsProvider>
      <div>
        <button onClick={mapCompleteClick}>완료</button>
      </div>
    </div>
    );
  }
  
  export default MapApi;