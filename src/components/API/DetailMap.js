import { useEffect, useState } from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from "react-naver-maps";

function DetailMap({ lat, lng }) {
  const [apiLoaded, setApiLoaded] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat, lng });

  const navermaps = useNavermaps();

  // 네이버 지도 API 로딩 확인
  useEffect(() => {
    const checkNaverAPI = setInterval(() => {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        clearInterval(checkNaverAPI);
        console.log("네이버 지도 API 로드 완료!");
        setApiLoaded(true);
        console.log("받아온 위치 확인: ", lat);
        console.log("받아온 위치 확인: ", lng);
      }
    }, 500);

    return () => clearInterval(checkNaverAPI);
  }, []);

  // lat, lng props 값이 변경될 때마다 마커 위치 업데이트

  return (
    <MapDiv style={{ width: "100%", height: "100%" }}>
      {!apiLoaded ? (
        "loading..."
      ) : (
        <NaverMap
          zoom={19}
          center={markerPosition} // center를 markerPosition으로 설정
        >
          {markerPosition && <Marker position={markerPosition} />}
        </NaverMap>
      )}
    </MapDiv>
  );
}

export default DetailMap;


