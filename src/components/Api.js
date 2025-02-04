//import styled from "styled-components";
import { NavermapsProvider } from "react-naver-maps";
import SimpleNaverMap from "./SimpleNaverMap";
function Api() {
    return (
      <NavermapsProvider
      ncpClientId='pfx4scf0lr' // 지도서비스 Client ID
    >
      <div style={{ display: "flex", width: "100dvw", height: "100dvh" }}>
        <SimpleNaverMap />
      </div>
    </NavermapsProvider>
    );
  }
  
  export default Api;