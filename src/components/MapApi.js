//import styled from "styled-components";
import { NavermapsProvider } from "react-naver-maps";
import SimpleNaverMap from "./SimpleNaverMap";
import { useNavigate } from "react-router-dom";

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
        <div style={{ display: "flex", width: "100dvw", height: "100dvh" }}>
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